/**
 * SlapChipsGame - Core Game Engine & State Machine
 * Manages game state, rounds, turn timers, QTE slap meter, AI logic, and match outcomes.
 */

const GameState = {
  TITLE_SCREEN: 'TITLE_SCREEN',
  CHAR_SELECT: 'CHAR_SELECT',
  SETUP_TRAPS: 'SETUP_TRAPS',
  PLAYER_TURN: 'PLAYER_TURN',
  OPPONENT_TURN: 'OPPONENT_TURN',
  SLAP_MINIGAME: 'SLAP_MINIGAME',
  ROUND_RESULT: 'ROUND_RESULT',
  GAME_OVER: 'GAME_OVER'
};

class SlapChipsGame {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;
    this.state = GameState.TITLE_SCREEN;

    // Match State
    this.playerCharacter = 'noob';
    this.opponentCharacter = 'classic_rookie';
    this.opponentName = 'Robloxian Bot';

    this.playerHearts = 3;
    this.opponentHearts = 3;
    this.maxHearts = 3;

    // Trays (12 slots: 0 to 11)
    // Traps are the indices of slots planted with a slap
    this.playerTraps = new Set();    // Traps hidden by AI on Player's tray
    this.opponentTraps = new Set();  // Traps hidden by Player on Opponent's tray

    // Eaten status arrays (length 12 each): null | 'safe' | 'slap'
    this.playerTrayState = new Array(12).fill(null);
    this.opponentTrayState = new Array(12).fill(null);

    // Setup phase state
    this.playerPendingTraps = new Set(); // Slots player clicks to hide on opponent tray

    // Turn & Timer
    this.turnTimer = 20;
    this.timerInterval = null;
    this.turnsCount = 0;
    this.slapsLandedByPlayer = 0;
    this.safeChipsEatenByPlayer = 0;

    // QTE Slap Meter state
    this.qteAttacker = null; // 'player' | 'opponent'
    this.qteVictim = null;
    this.qteMeterValue = 1.0;
    this.qteDirection = 1;
    this.qteInterval = null;
    this.qteIsActive = false;

    // Online Multiplayer Sync State
    this.isOnlineMatch = false;
    this.isHost = true;
    this.remoteTrapsReceived = false;
    this.localTrapsPlaced = false;
  }

  // --- INITIALIZATION & MATCH SETUP ---

  startNewMatch(playerCharId = null, mode = 'computer', friendOpponentInfo = null) {
    this.mode = mode || 'computer';
    this.isOnlineMatch = (this.mode === 'friends' && typeof window !== 'undefined' && window.gameNetwork && !!window.gameNetwork.passcode);
    this.isHost = (this.isOnlineMatch && window.gameNetwork) ? window.gameNetwork.isHost : true;
    this.remoteTrapsReceived = false;
    this.localTrapsPlaced = false;

    if (playerCharId) {
      this.playerCharacter = playerCharId;
    } else {
      const profile = window.gameStorage.getProfile();
      this.playerCharacter = (profile && profile.equippedCharacter) || 'sap1kaa';
    }

    if (this.mode === 'computer') {
      // User plays against the 3D Robot in the park
      this.opponentCharacter = 'robo_chip';
      this.opponentName = 'Robo-Chip 3000';
    } else if (this.mode === 'friends') {
      // User plays against Friend
      this.opponentCharacter = (friendOpponentInfo && friendOpponentInfo.equippedCharacter) || 'kenji';
      this.opponentName = (friendOpponentInfo && friendOpponentInfo.username) || 'Friend';
    } else {
      this.opponentCharacter = 'robo_chip';
      this.opponentName = 'Robo-Chip 3000';
    }

    // Reset health and trays
    this.playerHearts = 3;
    this.opponentHearts = 3;

    this.playerTraps.clear();
    this.opponentTraps.clear();
    this.playerPendingTraps.clear();

    this.playerTrayState.fill(null);
    this.opponentTrayState.fill(null);

    this.turnsCount = 0;
    this.slapsLandedByPlayer = 0;
    this.safeChipsEatenByPlayer = 0;

    // Switch to SETUP_TRAPS state
    this.setState(GameState.SETUP_TRAPS);
    this._startTurnTimer(25, () => this._autoAssignPlayerTraps());

    this._notify('onMatchStart', {
      mode: this.mode,
      player: window.CHARACTERS[this.playerCharacter] || window.CHARACTERS.sap1kaa,
      opponent: window.CHARACTERS[this.opponentCharacter] || window.CHARACTERS.robo_chip,
      opponentName: this.opponentName
    });
  }

  // --- SETUP PHASE (HIDING SLAPS) ---

  /**
   * Called when player clicks an opponent tray slot during SETUP_TRAPS
   * @param {number} slotIndex (0 to 11)
   */
  handlePlayerTrapPlacement(slotIndex) {
    if (this.state !== GameState.SETUP_TRAPS) return;

    if (this.playerPendingTraps.has(slotIndex)) {
      this.playerPendingTraps.delete(slotIndex);
      window.gameAudio.playClick();
    } else {
      if (this.playerPendingTraps.size < 3) {
        this.playerPendingTraps.add(slotIndex);
        window.gameAudio.playClick();
      }
    }

    this._notify('onPendingTrapsUpdated', {
      placedCount: this.playerPendingTraps.size,
      slots: Array.from(this.playerPendingTraps)
    });

    // When 3 traps are chosen, finalize setup
    if (this.playerPendingTraps.size === 3) {
      setTimeout(() => this._finalizeSetupPhase(), 400);
    }
  }

  _autoAssignPlayerTraps() {
    while (this.playerPendingTraps.size < 3) {
      const rnd = Math.floor(Math.random() * 12);
      this.playerPendingTraps.add(rnd);
    }
    this._finalizeSetupPhase();
  }

  _finalizeSetupPhase() {
    this._stopTurnTimer();

    // Store opponent's traps planted by player
    this.opponentTraps = new Set(this.playerPendingTraps);

    if (this.isOnlineMatch && window.gameNetwork) {
      this.localTrapsPlaced = true;
      window.gameNetwork.sendAction('TRAPS_READY', {
        traps: Array.from(this.opponentTraps)
      });

      if (!this.remoteTrapsReceived) {
        this._notify('onWaitingForRemoteTraps', {
          msg: `3 Traps Set! Waiting for ${this.opponentName}...`
        });
        return;
      }
    } else {
      // AI randomly hides 3 traps on player's tray
      this.playerTraps.clear();
      while (this.playerTraps.size < 3) {
        const rnd = Math.floor(Math.random() * 12);
        this.playerTraps.add(rnd);
      }
    }

    this._notify('onSetupComplete');

    // Begin Match: In online match, Host goes first
    setTimeout(() => {
      if (this.isOnlineMatch) {
        if (this.isHost) {
          this._startPlayerTurn();
        } else {
          this._startOpponentTurnRemote();
        }
      } else {
        this.setState(GameState.PLAYER_TURN);
        this._startPlayerTurn();
      }
    }, 1200);
  }

  handleRemoteTrapsReady(trapsArray) {
    this.playerTraps = new Set(trapsArray);
    this.remoteTrapsReceived = true;

    if (this.localTrapsPlaced) {
      this._notify('onSetupComplete');
      setTimeout(() => {
        if (this.isHost) {
          this._startPlayerTurn();
        } else {
          this._startOpponentTurnRemote();
        }
      }, 1200);
    }
  }

  // --- TURN MANAGEMENT ---

  _startPlayerTurn() {
    this.setState(GameState.PLAYER_TURN);
    this.turnsCount++;
    this._startTurnTimer(20, () => this._autoPlayerSelectChip());

    this._notify('onTurnChange', {
      turn: 'player',
      bannerText: 'Your Turn to Eat! Pick a chip from your tray',
      secondsLeft: this.turnTimer
    });
  }

  _startOpponentTurn() {
    this.setState(GameState.OPPONENT_TURN);
    this.turnsCount++;
    this._startTurnTimer(20, () => {});

    this._notify('onTurnChange', {
      turn: 'opponent',
      bannerText: `${this.opponentName}'s Turn to Eat...`,
      secondsLeft: this.turnTimer
    });

    // Simulate AI thinking delay (1.2 to 2.2 seconds)
    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      if (this.state === GameState.OPPONENT_TURN) {
        this._executeOpponentChipSelection();
      }
    }, delay);
  }

  _startOpponentTurnRemote() {
    this.setState(GameState.OPPONENT_TURN);
    this.turnsCount++;
    this._startTurnTimer(25, () => {});

    this._notify('onTurnChange', {
      turn: 'opponent',
      bannerText: `${this.opponentName}'s Turn to Eat...`,
      secondsLeft: this.turnTimer
    });
  }

  // --- CONSUMPTION LOGIC ---

  /**
   * Player selects a chip on their own tray
   * @param {number} slotIndex 
   */
  handlePlayerSelectChip(slotIndex) {
    if (this.state !== GameState.PLAYER_TURN) return;
    if (this.playerTrayState[slotIndex] !== null) return; // already eaten

    this._stopTurnTimer();

    // Check if slot is trapped
    const isTrapped = this.playerTraps.has(slotIndex);

    if (isTrapped) {
      // Trapped! Slap incoming from Opponent!
      this.playerTrayState[slotIndex] = 'slap';
      window.gameAudio.playBuzzer();

      this._notify('onChipRevealed', {
        tray: 'player',
        slotIndex: slotIndex,
        type: 'slap'
      });

      if (this.isOnlineMatch && window.gameNetwork) {
        window.gameNetwork.sendAction('CHIP_REVEALED', {
          slotIndex: slotIndex,
          type: 'slap'
        });
        // Local player is victim, remote friend aims slap
        this._notify('onRemoteAttackerAiming', {
          attackerName: this.opponentName
        });
      } else {
        setTimeout(() => {
          this._launchSlapQte('opponent', 'player');
        }, 1000);
      }
    } else {
      // Safe chip!
      this.playerTrayState[slotIndex] = 'safe';
      this.safeChipsEatenByPlayer++;
      window.gameAudio.playChipCrunch();
      window.gameAudio.playSafeChip();

      this._notify('onChipRevealed', {
        tray: 'player',
        slotIndex: slotIndex,
        type: 'safe'
      });

      if (this.isOnlineMatch && window.gameNetwork) {
        window.gameNetwork.sendAction('CHIP_REVEALED', {
          slotIndex: slotIndex,
          type: 'safe'
        });
        setTimeout(() => {
          if (!this._checkRemainingChips()) {
            this._startOpponentTurnRemote();
          }
        }, 1400);
      } else {
        setTimeout(() => {
          if (!this._checkRemainingChips()) {
            this._startOpponentTurn();
          }
        }, 1400);
      }
    }
  }

  _autoPlayerSelectChip() {
    // Find all remaining covered chips on player's tray
    const available = [];
    for (let i = 0; i < 12; i++) {
      if (this.playerTrayState[i] === null) available.push(i);
    }
    if (available.length > 0) {
      const picked = available[Math.floor(Math.random() * available.length)];
      this.handlePlayerSelectChip(picked);
    }
  }

  /**
   * AI selects a chip on its own tray
   */
  _executeOpponentChipSelection() {
    this._stopTurnTimer();

    // Find all covered chips on opponent's tray
    const available = [];
    for (let i = 0; i < 12; i++) {
      if (this.opponentTrayState[i] === null) available.push(i);
    }
    if (available.length === 0) {
      this._checkRemainingChips();
      return;
    }

    const slotIndex = available[Math.floor(Math.random() * available.length)];
    const isTrapped = this.opponentTraps.has(slotIndex);

    if (isTrapped) {
      // Opponent hit player's trap! Player delivers slap!
      this.opponentTrayState[slotIndex] = 'slap';
      window.gameAudio.playBuzzer();

      this._notify('onChipRevealed', {
        tray: 'opponent',
        slotIndex: slotIndex,
        type: 'slap'
      });

      setTimeout(() => {
        this._launchSlapQte('player', 'opponent');
      }, 1000);
    } else {
      // Safe chip eaten by Opponent
      this.opponentTrayState[slotIndex] = 'safe';
      window.gameAudio.playChipCrunch();
      window.gameAudio.playSafeChip();

      this._notify('onChipRevealed', {
        tray: 'opponent',
        slotIndex: slotIndex,
        type: 'safe'
      });

      setTimeout(() => {
        if (!this._checkRemainingChips()) {
          this._startPlayerTurn();
        }
      }, 1400);
    }
  }

  // --- QTE SLAP POWER METER ---

  _launchSlapQte(attacker, victim) {
    this.setState(GameState.SLAP_MINIGAME);
    this.qteAttacker = attacker;
    this.qteVictim = victim;
    this.qteMeterValue = 1.0;
    this.qteDirection = 1;
    this.qteIsActive = true;

    const attackerChar = attacker === 'player' 
      ? window.CHARACTERS[this.playerCharacter] 
      : window.CHARACTERS[this.opponentCharacter];

    this._notify('onQteStart', {
      attacker: attacker,
      victim: victim,
      attackerChar: attackerChar
    });

    // Meter oscillates between 1.0 and 3.0
    // 60fps loop
    const speed = 0.055;
    this.qteInterval = setInterval(() => {
      this.qteMeterValue += speed * this.qteDirection;
      if (this.qteMeterValue >= 3.0) {
        this.qteMeterValue = 3.0;
        this.qteDirection = -1;
      } else if (this.qteMeterValue <= 1.0) {
        this.qteMeterValue = 1.0;
        this.qteDirection = 1;
      }

      this._notify('onQteTick', {
        meterValue: this.qteMeterValue
      });
    }, 16);

    // If opponent is attacker, AI auto-stops meter only in single-player computer mode
    if (attacker === 'opponent' && !this.isOnlineMatch) {
      const stopDelay = 700 + Math.random() * 900;
      setTimeout(() => {
        if (this.qteIsActive) {
          this.stopQte();
        }
      }, stopDelay);
    }
  }

  handleRemoteChipRevealed(slotIndex, type) {
    this._stopTurnTimer();
    this.opponentTrayState[slotIndex] = type;

    this._notify('onRemoteEatingStart', { slotIndex: slotIndex });

    if (type === 'slap') {
      window.gameAudio.playBuzzer();
      this._notify('onChipRevealed', {
        tray: 'opponent',
        slotIndex: slotIndex,
        type: 'slap'
      });

      // Remote friend stepped on your trap! YOU are the attacker!
      setTimeout(() => {
        this._launchSlapQte('player', 'opponent');
      }, 1000);
    } else {
      window.gameAudio.playChipCrunch();
      window.gameAudio.playSafeChip();
      this._notify('onChipRevealed', {
        tray: 'opponent',
        slotIndex: slotIndex,
        type: 'safe'
      });

      setTimeout(() => {
        if (!this._checkRemainingChips()) {
          this._startPlayerTurn();
        }
      }, 1400);
    }
  }

  handleRemoteSlapStrike(power, isFatal) {
    this.playerHearts = Math.max(0, this.playerHearts - 1);
    const victimHearts = this.playerHearts;
    const actualFatal = victimHearts === 0;

    this._notify('onQteStop', {
      attacker: 'opponent',
      victim: 'player',
      power: power,
      isFatal: actualFatal,
      attackerChar: window.CHARACTERS[this.opponentCharacter],
      victimChar: window.CHARACTERS[this.playerCharacter],
      remainingHearts: victimHearts
    });

    window.gameAudio.playWhoosh();
    setTimeout(() => {
      window.gameAudio.playSlap(power);
      window.gameAudio.playHeartBreak();

      if (actualFatal) {
        setTimeout(() => this._triggerFatalSlapSequence('opponent', 'player'), 1000);
      } else {
        setTimeout(() => {
          this.setState(GameState.ROUND_RESULT);
          this._startPlayerTurn();
        }, 1800);
      }
    }, 450);
  }

  /**
   * Called when player clicks "SLAP!" or AI finishes timing
   */
  stopQte() {
    if (!this.qteIsActive) return;
    this.qteIsActive = false;
    clearInterval(this.qteInterval);

    const finalPower = Math.round(this.qteMeterValue * 10) / 10;
    const attacker = this.qteAttacker;
    const victim = this.qteVictim;

    if (attacker === 'player') {
      this.slapsLandedByPlayer++;
    }

    // Apply damage (1 heart per slap)
    let victimHearts = 0;
    if (victim === 'player') {
      this.playerHearts = Math.max(0, this.playerHearts - 1);
      victimHearts = this.playerHearts;
    } else {
      this.opponentHearts = Math.max(0, this.opponentHearts - 1);
      victimHearts = this.opponentHearts;
    }

    const isFatal = victimHearts === 0;

    // Send slap strike over network if local player is attacker
    if (attacker === 'player' && this.isOnlineMatch && window.gameNetwork) {
      window.gameNetwork.sendAction('SLAP_STRIKE', {
        power: finalPower,
        isFatal: isFatal
      });
    }

    this._notify('onQteStop', {
      attacker: attacker,
      victim: victim,
      power: finalPower,
      isFatal: isFatal,
      attackerChar: attacker === 'player' ? window.CHARACTERS[this.playerCharacter] : window.CHARACTERS[this.opponentCharacter],
      victimChar: victim === 'player' ? window.CHARACTERS[this.playerCharacter] : window.CHARACTERS[this.opponentCharacter],
      remainingHearts: victimHearts
    });

    // Deliver slap animation and impact sound
    window.gameAudio.playWhoosh();
    setTimeout(() => {
      window.gameAudio.playSlap(finalPower);
      window.gameAudio.playHeartBreak();

      // Trigger character special sound effect
      const attackerObj = attacker === 'player' ? window.CHARACTERS[this.playerCharacter] : window.CHARACTERS[this.opponentCharacter];
      if (attackerObj.vfxType === 'glitch') window.gameAudio.playGlitch();
      else if (attackerObj.vfxType === 'explosion') window.gameAudio.playExplosion();
      else if (attackerObj.vfxType === 'tornado') window.gameAudio.playLightning();

      if (isFatal) {
        setTimeout(() => this._triggerFatalSlapSequence(attacker, victim), 1000);
      } else {
        // Next turn after slap animation
        setTimeout(() => {
          this.setState(GameState.ROUND_RESULT);
          if (victim === 'player') {
            this._startPlayerTurn();
          } else {
            this._startOpponentTurn();
          }
        }, 1800);
      }
    }, 450);
  }

  // --- FATAL SLAP & GAME OVER ---

  _triggerFatalSlapSequence(attacker, victim) {
    this.setState(GameState.GAME_OVER);
    this._stopTurnTimer();

    const isPlayerVictory = victim === 'opponent';

    // Calculate Points & Rewards
    const profile = window.gameStorage.getProfile() || {};
    let pointsEarned = 0;
    let newStreak = 0;

    if (isPlayerVictory) {
      newStreak = (profile.currentStreak || 0) + 1;
      const baseReward = 300;
      const streakBonus = (newStreak - 1) * 50;
      const heartsBonus = this.playerHearts * 25;
      pointsEarned = baseReward + streakBonus + heartsBonus;

      // Points increase on victory
      window.gameStorage.addPoints(pointsEarned);
      window.gameAudio.playFanfare();
    } else {
      newStreak = 0;
      // Requirement: when the user loses, nothing goes! Zero point loss.
      pointsEarned = 0;

      window.gameAudio.playDefeat();
    }

    // Save Last Match Data
    const lastMatchData = {
      lastPlayed: new Date().toISOString(),
      result: isPlayerVictory ? 'Victory' : 'Defeat',
      playerCharacter: (window.CHARACTERS[this.playerCharacter] || {}).name || 'sap1kaa',
      opponent: this.opponentName,
      cashEarned: pointsEarned,
      pointsEarned: pointsEarned,
      heartsLeft: this.playerHearts,
      turnsTaken: this.turnsCount,
      slapsLanded: this.slapsLandedByPlayer,
      safeChipsEaten: this.safeChipsEatenByPlayer
    };

    window.gameStorage.saveLastMatch(lastMatchData);

    // Update cumulative profile
    window.gameStorage.updateProfile({
      wins: (profile.wins || 0) + (isPlayerVictory ? 1 : 0),
      losses: (profile.losses || 0) + (isPlayerVictory ? 0 : 1),
      currentStreak: newStreak,
      bestStreak: Math.max(profile.bestStreak || 0, newStreak),
      slapsLanded: (profile.slapsLanded || 0) + this.slapsLandedByPlayer,
      safeChipsEaten: (profile.safeChipsEaten || 0) + this.safeChipsEatenByPlayer
    });

    this._notify('onGameOver', {
      result: isPlayerVictory ? 'Victory' : 'Defeat',
      cashEarned: pointsEarned,
      pointsEarned: pointsEarned,
      streak: newStreak,
      matchData: lastMatchData,
      profile: window.gameStorage.getProfile()
    });
  }

  // --- RECOVERY / TIE RESOLUTION ---

  _checkRemainingChips() {
    // If all chips on a tray are eaten, check if any covered chips remain
    const playerRemaining = this.playerTrayState.filter(s => s === null).length;
    const opponentRemaining = this.opponentTrayState.filter(s => s === null).length;

    if (playerRemaining === 0 && opponentRemaining === 0) {
      // Both trays empty! Determine winner by hearts left
      if (this.playerHearts > this.opponentHearts) {
        this._triggerFatalSlapSequence('player', 'opponent');
      } else if (this.opponentHearts > this.playerHearts) {
        this._triggerFatalSlapSequence('opponent', 'player');
      } else {
        // Sudden death bonus slap to break tie
        this._triggerFatalSlapSequence('player', 'opponent');
      }
      return true;
    }
    return false;
  }

  // --- TIMER UTILITY ---

  _startTurnTimer(seconds, onExpire) {
    this._stopTurnTimer();
    this.turnTimer = seconds;

    this.timerInterval = setInterval(() => {
      this.turnTimer--;

      if (this.turnTimer <= 5 && this.turnTimer > 0) {
        window.gameAudio.playTimerTick(true);
      } else if (this.turnTimer > 5) {
        window.gameAudio.playTimerTick(false);
      }

      this._notify('onTimerTick', {
        secondsLeft: this.turnTimer
      });

      if (this.turnTimer <= 0) {
        this._stopTurnTimer();
        if (typeof onExpire === 'function') {
          onExpire();
        }
      }
    }, 1000);
  }

  _stopTurnTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // --- STATE SETTER & OBSERVER ---

  setState(newState) {
    this.state = newState;
    this._notify('onStateChange', { state: newState });
  }

  _notify(eventName, data) {
    if (this.callbacks && typeof this.callbacks[eventName] === 'function') {
      try {
        this.callbacks[eventName](data);
      } catch (err) {
        console.error(`Error in game callback [${eventName}]:`, err);
      }
    }
  }
}

window.SlapChipsGame = SlapChipsGame;
window.GameState = GameState;
