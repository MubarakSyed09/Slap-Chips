/**
 * SlapChipsApp - Application Controller & DOM Binder
 * Coordinates Launch Screen, Main Lobby (Ludo King theme), 6 Anime Fighters,
 * Robot Park Arena, and Friends Passcode Room Multiplayer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Zero-Gravity Physics Engine Initialization
  const canvas = document.getElementById('physics-canvas');
  let physics = null;
  if (canvas && typeof ZeroGravityPhysics !== 'undefined') {
    physics = new ZeroGravityPhysics(canvas);
    physics.init();
  }

  // 2. DOM Screens & Modals
  const screens = {
    launch: document.getElementById('launch-screen'),
    lobby: document.getElementById('lobby-screen'),
    match: document.getElementById('match-screen')
  };

  const modals = {
    profile: document.getElementById('profile-modal'),
    friends: document.getElementById('friends-modal'),
    qte: document.getElementById('qte-modal'),
    outcome: document.getElementById('outcome-modal'),
    history: document.getElementById('history-modal'),
    rules: document.getElementById('how-to-play-modal'),
    shop: document.getElementById('shop-modal'),
    bank: document.getElementById('bank-modal'),
    ad: document.getElementById('ad-modal'),
    billing: document.getElementById('billing-modal'),
    spin: document.getElementById('spin-modal')
  };

  const vfxOverlay = document.getElementById('vfx-overlay');

  // Launch Screen Elements
  const btnLaunchStart = document.getElementById('btn-launch-start');

  // Lobby Screen Elements
  const btnProfileBadge = document.getElementById('btn-profile-badge');
  const btnSettingsGear = document.getElementById('btn-settings-gear');
  const topAvatarPreview = document.getElementById('top-avatar-preview');
  const lobbyGemsVal = document.getElementById('lobby-gems-val');
  const lobbyPointsVal = document.getElementById('lobby-points-val');
  const btnBuyGems = document.getElementById('btn-buy-gems');
  const btnBuyPoints = document.getElementById('btn-buy-points');
  const btnShopTop = document.getElementById('btn-shop-top');
  const btnAudioToggle = document.getElementById('btn-audio-toggle');

  // Mode Selection Buttons & Daily Spin
  const btnModeComputer = document.getElementById('btn-mode-computer');
  const btnModeFriends = document.getElementById('btn-mode-friends');
  const btnDailySpin = document.getElementById('btn-daily-spin');
  const spinFreeBadge = document.getElementById('spin-free-badge');
  const btnCloseSpin = document.getElementById('btn-close-spin');
  const btnSpinWheelCenter = document.getElementById('btn-spin-wheel-center');
  const wheelDisc = document.getElementById('wheel-disc');
  const spinStatusMsg = document.getElementById('spin-status-msg');
  const spinWinAnnouncement = document.getElementById('spin-win-announcement');
  const spinWinText = document.getElementById('spin-win-text');
  const btnClaimSpinReward = document.getElementById('btn-claim-spin-reward');
  const btnModeTournament = document.getElementById('btn-mode-tournament');
  const btnClaimBonus = document.getElementById('btn-claim-bonus');

  // Bottom Navigation
  const navHome = document.getElementById('nav-home');
  const navProfile = document.getElementById('nav-profile');
  const navShop = document.getElementById('nav-shop');
  const navStats = document.getElementById('nav-stats');
  const navRules = document.getElementById('nav-rules');

  // Profile Modal Elements
  const btnCloseProfile = document.getElementById('btn-close-profile');
  const profileModalAvatarPreview = document.getElementById('profile-modal-avatar-preview');
  const inputUsername = document.getElementById('input-username');
  const btnSaveUsername = document.getElementById('btn-save-username');
  const profilePointsDisplay = document.getElementById('profile-points-display');
  const profileWinsDisplay = document.getElementById('profile-wins-display');
  const profileStreakDisplay = document.getElementById('profile-streak-display');
  const animeRosterContainer = document.getElementById('anime-roster-container');

  // Friends Modal Elements
  const btnCloseFriends = document.getElementById('btn-close-friends');
  const tabBtnCreate = document.getElementById('tab-btn-create');
  const tabBtnJoin = document.getElementById('tab-btn-join');
  const tabContentCreate = document.getElementById('tab-content-create');
  const tabContentJoin = document.getElementById('tab-content-join');
  const createdPasscodeVal = document.getElementById('created-passcode-val');
  const btnCopyPasscode = document.getElementById('btn-copy-passcode');
  const createRoomStatus = document.getElementById('create-room-status');
  const btnStartFriendMatch = document.getElementById('btn-start-friend-match');
  const inputJoinPasscode = document.getElementById('input-join-passcode');
  const btnSubmitJoinRoom = document.getElementById('btn-submit-join-room');
  const btnOpenFriendTab = document.getElementById('btn-open-friend-tab');
  const btnSimulateFriend = document.getElementById('btn-simulate-friend-join');

  // Friends Live Waiting Room Elements
  const lobbyHostAvatar = document.getElementById('lobby-host-avatar');
  const lobbyHostName = document.getElementById('lobby-host-name');
  const lobbyGuestSlot = document.getElementById('lobby-guest-slot');
  const lobbyGuestAvatar = document.getElementById('lobby-guest-avatar');
  const lobbyGuestName = document.getElementById('lobby-guest-name');
  const lobbyGuestStatus = document.getElementById('lobby-guest-status');
  const joinRoomStatus = document.getElementById('join-room-status');
  const matchCountdownOverlay = document.getElementById('match-countdown-overlay');
  const countdownBigNum = document.getElementById('countdown-big-num');
  const countdownP1Name = document.getElementById('countdown-p1-name');
  const countdownP2Name = document.getElementById('countdown-p2-name');

  // Bank & Rewarded Ad Elements
  const btnCloseBank = document.getElementById('btn-close-bank');
  const bankCoinsDisplay = document.getElementById('bank-coins-display');
  const bankGemsDisplay = document.getElementById('bank-gems-display');
  const btnWatchAd = document.getElementById('btn-watch-ad');
  const btnCloseAd = document.getElementById('btn-close-ad');
  const adCountdownSeconds = document.getElementById('ad-countdown-seconds');
  const adProgressFill = document.getElementById('ad-progress-fill');
  const adFooterStatus = document.getElementById('ad-footer-status');
  const btnClaimAdReward = document.getElementById('btn-claim-ad-reward');
  const billingItemName = document.getElementById('billing-item-name');
  const billingItemPrice = document.getElementById('billing-item-price');
  const btnBillingCancel = document.getElementById('btn-billing-cancel');
  const btnBillingConfirm = document.getElementById('btn-billing-confirm');

  // Match Screen Elements (3D Park Arena)
  const robloxTurnText = document.getElementById('roblox-turn-text');
  const robloxTurnTimer = document.getElementById('roblox-turn-timer');
  const chipGridLeft = document.getElementById('chip-grid-left');
  const chipGridRight = document.getElementById('chip-grid-right');
  const avatarModelLeft = document.getElementById('avatar-model-left');
  const avatarModelRight = document.getElementById('avatar-model-right');
  const overheadNameLeft = document.getElementById('overhead-name-left');
  const overheadNameRight = document.getElementById('overhead-name-right');
  const heartsLeft = document.getElementById('hearts-left');
  const heartsRight = document.getElementById('hearts-right');
  const seatLeft = document.getElementById('seat-left');
  const seatRight = document.getElementById('seat-right');
  const handAnimLeft = document.getElementById('hand-anim-left');
  const handAnimRight = document.getElementById('hand-anim-right');
  const fatalSlapBanner = document.getElementById('fatal-slap-banner');
  const fatalBannerText = document.getElementById('fatal-banner-text');
  const slapStrikeVfx = document.getElementById('slap-strike-vfx');
  const robloxCashVal = document.getElementById('roblox-cash-val');
  const robloxBoostVal = document.getElementById('roblox-boost-val');
  const btnSlapBadge = document.getElementById('btn-slap-badge');
  const btnForfeit = document.getElementById('btn-forfeit');

  // QTE Elements
  const qteNeedle = document.getElementById('qte-needle');
  const qtePowerText = document.getElementById('qte-power-text');
  const qteTitle = document.getElementById('qte-title');
  const qteInstruction = document.getElementById('qte-instruction');
  const btnSlapQte = document.getElementById('btn-slap-qte');

  // Outcome Elements
  const outcomeTitle = document.getElementById('outcome-title');
  const outcomeFlavor = document.getElementById('outcome-flavor');
  const rewBase = document.getElementById('rew-base');
  const rewStreak = document.getElementById('rew-streak');
  const rewHearts = document.getElementById('rew-hearts');
  const rewTotal = document.getElementById('rew-total');
  const btnOutcomeReplay = document.getElementById('btn-outcome-replay');
  const btnOutcomeMenu = document.getElementById('btn-outcome-menu');

  // History & Rules Elements
  const historyTableBody = document.getElementById('history-table-body');
  const btnResetStats = document.getElementById('btn-reset-stats');
  const btnCloseHistory = document.getElementById('btn-close-history');
  const btnCloseRules = document.getElementById('btn-close-rules');

  // Shop Elements
  const btnCloseShop = document.getElementById('btn-close-shop');
  const shopWalletCash = document.getElementById('shop-wallet-cash');
  const flavorGrid = document.getElementById('flavor-grid');

  // --- AUDIO SETUP ---
  const savedSettings = window.gameStorage.getSettings();
  if (savedSettings.soundMuted) {
    window.gameAudio.setMuted(true);
    if (btnAudioToggle) btnAudioToggle.textContent = '🔇';
  }

  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      const isMuted = window.gameAudio.toggleMute();
      btnAudioToggle.textContent = isMuted ? '🔇' : '🔊';
      window.gameStorage.saveSettings({ soundMuted: isMuted });
      window.gameAudio.playClick();
    });
  }

  // Auto-start procedural BGM on first user touch
  const tryStartBgm = () => {
    window.gameAudio.init();
    window.gameAudio.startBgm();
    window.removeEventListener('pointerdown', tryStartBgm);
    window.removeEventListener('keydown', tryStartBgm);
  };
  window.addEventListener('pointerdown', tryStartBgm);
  window.addEventListener('keydown', tryStartBgm);

  // --- SCREEN & MODAL NAVIGATION ---
  function showScreen(screenKey) {
    Object.values(screens).forEach(s => {
      if (s) s.classList.remove('active');
    });
    if (screens[screenKey]) {
      screens[screenKey].classList.add('active');
    }
  }

  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('open');
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('open');
  }

  // --- CHAT & SPEECH BUBBLE HELPERS ---
  function addChatMessage(user, message, isGlobal = true) {
    // Chat box removed completely from match arena as requested
  }

  function showSpeechBubble(targetEl, text, duration = 2400) {
    if (!targetEl || !text) return;
    const existing = targetEl.querySelector('.speech-bubble');
    if (existing) existing.remove();

    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = text;
    targetEl.appendChild(bubble);

    setTimeout(() => {
      if (bubble && bubble.parentNode) {
        bubble.remove();
      }
    }, duration);
  }

  function getRandomQuote(quotesArray) {
    if (!quotesArray || quotesArray.length === 0) return '';
    return quotesArray[Math.floor(Math.random() * quotesArray.length)];
  }

  function formatPoints(val) {
    const num = Number(val) || 0;
    return num.toLocaleString();
  }

  // --- LOBBY & PROFILE REFRESH ---
  function refreshLobbyUI() {
    const profile = window.gameStorage.getProfile() || {};
    const charId = profile.equippedCharacter || 'sap1kaa';
    const charObj = window.CHARACTERS[charId] || window.CHARACTERS.sap1kaa;

    // Top-bar Avatar Preview
    if (topAvatarPreview) {
      topAvatarPreview.innerHTML = charObj.drawAvatarSvg('idle', 38, 38);
    }

    // Points and Gems
    if (lobbyPointsVal) lobbyPointsVal.textContent = formatPoints(profile.points || 4640);
    if (lobbyGemsVal) lobbyGemsVal.textContent = formatPoints(profile.gems || 150);
    if (robloxCashVal) robloxCashVal.textContent = `🪙 ${formatPoints(profile.points || 4640)}`;
    if (bankCoinsDisplay) bankCoinsDisplay.textContent = formatPoints(profile.points || 4640);
    if (bankGemsDisplay) bankGemsDisplay.textContent = formatPoints(profile.gems || 150);

    // Profile Modal Info
    if (profileModalAvatarPreview) {
      profileModalAvatarPreview.innerHTML = charObj.drawAvatarSvg('idle', 64, 64);
    }
    if (inputUsername) inputUsername.value = profile.username || 'Player 1';
    if (profilePointsDisplay) profilePointsDisplay.textContent = formatPoints(profile.points || 4640);
    if (profileWinsDisplay) profileWinsDisplay.textContent = profile.wins || 0;
    if (profileStreakDisplay) profileStreakDisplay.textContent = profile.currentStreak || 0;

    // Refresh Daily Spin status
    if (typeof updateDailySpinStatus === 'function') {
      updateDailySpinStatus();
    }
  }

  // --- 6 ANIME CHARACTERS ROSTER MODAL ---
  const ANIME_KEYS = ['sap1kaa', 'kenji', 'aoi', 'ren', 'sakura', 'shinji'];

  function renderAnimeCharacterGrid() {
    if (!animeRosterContainer) return;
    animeRosterContainer.innerHTML = '';

    const profile = window.gameStorage.getProfile() || {};
    const equipped = profile.equippedCharacter || 'sap1kaa';

    ANIME_KEYS.forEach(key => {
      const char = window.CHARACTERS[key];
      if (!char) return;

      const isSelected = char.id === equipped;
      const card = document.createElement('div');
      card.className = `anime-card ${isSelected ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="anime-avatar-box">
          ${char.drawAvatarSvg('idle', 85, 85)}
        </div>
        <div class="anime-name">${char.name}</div>
        <div class="anime-title">${char.title}</div>
        <div class="anime-vfx-spec">
          <strong style="color:#f472b6;">VFX:</strong> ${char.vfxName}
        </div>
        <button class="arcade-btn ${isSelected ? 'btn-green' : 'btn-primary'} anime-equip-btn">
          ${isSelected ? '✓ EQUIPPED' : 'EQUIP'}
        </button>
      `;

      const btn = card.querySelector('.anime-equip-btn');
      btn.addEventListener('click', () => {
        window.gameAudio.playClick();
        window.gameStorage.updateProfile({ equippedCharacter: char.id });
        renderAnimeCharacterGrid();
        refreshLobbyUI();
        spawnFloatingText(card, `${char.name} Equipped!`, 'safe');
      });

      animeRosterContainer.appendChild(card);
    });
  }

  // Save username from profile modal
  if (btnSaveUsername && inputUsername) {
    btnSaveUsername.addEventListener('click', () => {
      const newName = inputUsername.value.trim();
      if (newName) {
        window.gameStorage.setUsername(newName);
        window.gameAudio.playFanfare();
        refreshLobbyUI();
        spawnFloatingText(btnSaveUsername, 'Username Saved! ✓', 'safe');
      }
    });
  }

  // --- GAME ENGINE INITIALIZATION ---
  const game = new SlapChipsGame({
    onMatchStart: (data) => {
      // Names & Avatars
      overheadNameLeft.textContent = data.opponentName || 'Robo-Chip 3000';
      overheadNameRight.textContent = data.player.name || 'sap1kaa';

      avatarModelLeft.innerHTML = data.opponent.drawAvatarSvg('idle', 150, 180);
      avatarModelRight.innerHTML = data.player.drawAvatarSvg('idle', 150, 180);

      // Reset hearts (3 on each side)
      updateHeartsUI('left', 3);
      updateHeartsUI('right', 3);

      // Setup Trays: Left (opponent blue) is clickable for player to plant traps; Right (player peach) is covered
      buildRobloxTray('left', true);
      buildRobloxTray('right', false);

      robloxTurnText.textContent = `Plant 3 Slap Traps on ${data.opponentName}'s Tray!`;
      robloxTurnTimer.textContent = '25';
      robloxTurnTimer.classList.remove('urgent');

      refreshLobbyUI();
      addChatMessage('SYSTEM', `Match started vs ${data.opponentName}! Plant 3 slap traps on the blue tray.`);

      showScreen('match');
    },

    onPendingTrapsUpdated: (data) => {
      for (let i = 0; i < 12; i++) {
        const tile = chipGridLeft.children[i];
        if (!tile) continue;

        const existingBadge = tile.querySelector('.roblox-trap-badge');
        if (existingBadge) existingBadge.remove();

        if (data.slots.includes(i)) {
          const badge = document.createElement('div');
          badge.className = 'roblox-trap-badge';
          badge.textContent = '✋';
          tile.appendChild(badge);
          tile.classList.add('active-choice');
        } else {
          tile.classList.remove('active-choice');
        }
      }

      robloxTurnText.textContent = `Plant 3 Slap Traps (${data.placedCount}/3 placed)`;
    },

    onSetupComplete: () => {
      robloxTurnText.textContent = 'Trays Covered! Match Starting...';

      // Cover all chips
      buildRobloxTray('left', false);
      buildRobloxTray('right', false);

      addChatMessage('SYSTEM', 'All chips covered! Time to eat.');
    },

    onWaitingForRemoteTraps: (data) => {
      robloxTurnText.textContent = data.msg || `3 Traps Set! Waiting for ${game.opponentName}...`;
    },

    onRemoteEatingStart: (data) => {
      // Remote opponent reaches down to tray
      if (handAnimLeft) {
        handAnimLeft.classList.add('hand-eating-active-left');
        setTimeout(() => {
          handAnimLeft.classList.remove('hand-eating-active-left');
        }, 800);
      }
    },

    onRemoteAttackerAiming: (data) => {
      robloxTurnText.textContent = `💥 SLAP TRAP HIT! ${data.attackerName} is aiming their SLAP!`;
    },

    onTurnChange: (data) => {
      const isPlayer = data.turn === 'player';
      const pChar = window.CHARACTERS[game.playerCharacter] || window.CHARACTERS.sap1kaa;
      const oChar = window.CHARACTERS[game.opponentCharacter] || window.CHARACTERS.robo_chip;

      if (isPlayer) {
        robloxTurnText.textContent = 'Your turn to eat';
      } else {
        robloxTurnText.textContent = `${game.opponentName}'s turn to eat`;
      }

      robloxTurnTimer.textContent = data.secondsLeft;
      robloxTurnTimer.classList.remove('urgent');

      // Update avatar expressions based on turn
      avatarModelLeft.innerHTML = oChar.drawAvatarSvg(isPlayer ? 'nervous' : 'idle', 150, 180);
      avatarModelRight.innerHTML = pChar.drawAvatarSvg(isPlayer ? 'idle' : 'nervous', 150, 180);

      // Speech bubble
      if (isPlayer && pChar.quotes && pChar.quotes.turn) {
        showSpeechBubble(seatRight, getRandomQuote(pChar.quotes.turn));
      } else if (!isPlayer && oChar.quotes && oChar.quotes.turn) {
        showSpeechBubble(seatLeft, getRandomQuote(oChar.quotes.turn));
      }

      // Enable clicking on player's tray (right) only if player's turn
      updateRobloxTrayClickability(isPlayer);

      if (isPlayer) {
        addChatMessage('SYSTEM', 'Your turn to eat! Click a chip on your peach tray.');
      }
    },

    onTimerTick: (data) => {
      robloxTurnTimer.textContent = data.secondsLeft;
      if (data.secondsLeft <= 5) {
        robloxTurnTimer.classList.add('urgent');
      } else {
        robloxTurnTimer.classList.remove('urgent');
      }
    },

    onChipRevealed: (data) => {
      const isPlayerTray = data.tray === 'player';
      const grid = isPlayerTray ? chipGridRight : chipGridLeft;
      const tile = grid.children[data.slotIndex];
      if (!tile) return;

      const pChar = window.CHARACTERS[game.playerCharacter] || window.CHARACTERS.sap1kaa;
      const oChar = window.CHARACTERS[game.opponentCharacter] || window.CHARACTERS.robo_chip;
      const targetChar = isPlayerTray ? pChar : oChar;
      const targetSeat = isPlayerTray ? seatRight : seatLeft;
      const targetModel = isPlayerTray ? avatarModelRight : avatarModelLeft;

      if (data.type === 'safe') {
        tile.className = 'roblox-chip-tile tile-eaten';
        tile.innerHTML = `<span style="font-size: 1.1rem; opacity: 0.6;">✨</span>`;
        spawnFloatingText(tile, 'CRUNCH! SAFE ✨', 'safe');

        // Physical Hand Reach Animation (Arm reaches down to table tray)
        if (isPlayerTray && handAnimRight) {
          handAnimRight.classList.remove('hand-eating-active-right');
          void handAnimRight.offsetWidth;
          handAnimRight.classList.add('hand-eating-active-right');
          handAnimRight.innerHTML = '🤏🍟';
          setTimeout(() => {
            if (handAnimRight) {
              handAnimRight.classList.remove('hand-eating-active-right');
              handAnimRight.innerHTML = '';
            }
          }, 850);
        } else if (!isPlayerTray && handAnimLeft) {
          handAnimLeft.classList.remove('hand-eating-active-left');
          void handAnimLeft.offsetWidth;
          handAnimLeft.classList.add('hand-eating-active-left');
          handAnimLeft.innerHTML = '🤏🍟';
          setTimeout(() => {
            if (handAnimLeft) {
              handAnimLeft.classList.remove('hand-eating-active-left');
              handAnimLeft.innerHTML = '';
            }
          }, 850);
        }

        targetModel.innerHTML = targetChar.drawAvatarSvg('victorious', 150, 180);
        if (targetChar.quotes && targetChar.quotes.safe) {
          showSpeechBubble(targetSeat, getRandomQuote(targetChar.quotes.safe));
        }
        addChatMessage(targetChar.name, 'Mmm, delicious safe chip!');
      } else {
        tile.className = 'roblox-chip-tile tile-trapped';
        tile.innerHTML = `<span class="slap-hazard-icon">✋</span>`;
        spawnFloatingText(tile, 'SLAP TRAP TRIGGERED! 💥', 'slap');
        triggerScreenShake('shake-medium');

        targetModel.innerHTML = targetChar.drawAvatarSvg('shocked', 150, 180);
        if (targetChar.quotes && targetChar.quotes.trap) {
          showSpeechBubble(targetSeat, getRandomQuote(targetChar.quotes.trap));
        }
        addChatMessage(targetChar.name, 'NOOO! A SLAP TRAP!!');
      }
    },

    onQteStart: (data) => {
      const isPlayerAttacking = data.attacker === 'player';
      qteTitle.textContent = isPlayerAttacking ? 'YOUR SLAP POWER METER!' : 'OPPONENT CHARGING SLAP!';
      qteInstruction.textContent = isPlayerAttacking 
        ? 'Click SLAP NOW when needle is in the center!' 
        : `${data.attackerChar.name} is sizing up their slap...`;

      btnSlapQte.style.display = isPlayerAttacking ? 'block' : 'none';
      btnSlapQte.disabled = !isPlayerAttacking;

      openModal(modals.qte);
    },

    onQteTick: (data) => {
      const val = data.meterValue;
      let percent = 50;

      if (game.qteDirection > 0) {
        percent = ((val - 1.0) / 2.0) * 50;
      } else {
        percent = 100 - (((val - 1.0) / 2.0) * 50);
      }

      qteNeedle.style.left = `${percent}%`;

      const powerRound = Math.round(val * 10) / 10;
      const isCrit = powerRound >= 2.7;

      qtePowerText.textContent = isCrit ? `x${powerRound.toFixed(1)} CRITICAL!` : `x${powerRound.toFixed(1)} POWER`;
      qtePowerText.className = isCrit ? 'power-display-box crit' : 'power-display-box';
    },

    onQteStop: (data) => {
      closeModal(modals.qte);

      const isVictimPlayer = data.victim === 'player';
      const victimSeat = isVictimPlayer ? seatRight : seatLeft;
      const victimModel = isVictimPlayer ? avatarModelRight : avatarModelLeft;
      const attackerSeat = isVictimPlayer ? seatLeft : seatRight;

      // Physical Bodily Lunge & Recoil across table (Matching Image 4)
      if (isVictimPlayer) {
        // Attacker is Opponent (left), Victim is Player (right)
        if (seatLeft) {
          seatLeft.classList.add('slap-lunge-left');
          setTimeout(() => { if (seatLeft) seatLeft.classList.remove('slap-lunge-left'); }, 550);
        }
        if (seatRight) {
          seatRight.classList.add('slap-recoil-right');
          setTimeout(() => { if (seatRight) seatRight.classList.remove('slap-recoil-right'); }, 550);
        }
      } else {
        // Attacker is Player (right), Victim is Opponent (left)
        if (seatRight) {
          seatRight.classList.add('slap-lunge-right');
          setTimeout(() => { if (seatRight) seatRight.classList.remove('slap-lunge-right'); }, 550);
        }
        if (seatLeft) {
          seatLeft.classList.add('slap-recoil-left');
          setTimeout(() => { if (seatLeft) seatLeft.classList.remove('slap-recoil-left'); }, 550);
        }
      }

      // Neon Cyan/Green Slash Strike VFX line (Matching Image 4)
      if (slapStrikeVfx) {
        const slash = document.createElement('div');
        slash.className = 'slash-blade-line';
        slapStrikeVfx.appendChild(slash);
        setTimeout(() => slash.remove(), 450);
      }

      // Trigger Character Special Slap VFX
      triggerSlapVfx(data.attackerChar.vfxType, isVictimPlayer ? 'player' : 'opponent');

      // Screen Shake
      if (data.power >= 2.5 || data.isFatal) {
        triggerScreenShake('shake-heavy');
      } else if (data.power >= 1.8) {
        triggerScreenShake('shake-medium');
      } else {
        triggerScreenShake('shake-light');
      }

      // Update victim avatar to slapped
      victimModel.innerHTML = data.victimChar.drawAvatarSvg('slapped', 150, 180);

      // Update hearts (with green lightning damage fracture on hit heart!)
      updateHeartsUI(isVictimPlayer ? 'right' : 'left', data.remainingHearts);

      // Pop floating critical/slap text
      const text = data.power >= 2.5 ? `CRITICAL x${data.power}! 💥` : `SLAP x${data.power}! ✋`;
      spawnFloatingText(victimModel, text, data.power >= 2.5 ? 'crit' : 'slap');

      if (data.attackerChar.quotes && data.attackerChar.quotes.slap) {
        showSpeechBubble(attackerSeat, getRandomQuote(data.attackerChar.quotes.slap), 1800);
      }
      setTimeout(() => {
        if (data.victimChar.quotes && data.victimChar.quotes.slapped) {
          showSpeechBubble(victimSeat, getRandomQuote(data.victimChar.quotes.slapped), 2000);
        }
      }, 550);

      addChatMessage(data.attackerChar.name, `*SLAPS* with x${data.power} power!`);
    },

    onGameOver: (data) => {
      const isPlayerVictory = data.result === 'Victory';
      triggerFatalSequence(isPlayerVictory);

      addChatMessage('SYSTEM', `GAME OVER! Winner: ${isPlayerVictory ? 'You' : game.opponentName}!`);

      setTimeout(() => {
        outcomeTitle.textContent = isPlayerVictory ? 'VICTORY!' : 'DEFEAT!';
        outcomeTitle.className = `outcome-title ${isPlayerVictory ? 'victory' : 'defeat'}`;

        if (isPlayerVictory) {
          outcomeFlavor.textContent = 'Incredible tabletop master! You wiped their chips clean!';
          rewBase.textContent = '+300';
          rewStreak.textContent = `+${Math.max(0, data.streak - 1) * 50}`;
          rewHearts.textContent = `+${game.playerHearts * 25}`;
          rewTotal.textContent = `+${data.cashEarned} Points`;
        } else {
          // Requirement: When user loses, nothing goes! Points remain intact.
          outcomeFlavor.textContent = 'You took a fatal slap! No points deducted (Points kept safe).';
          rewBase.textContent = '+0';
          rewStreak.textContent = '+0';
          rewHearts.textContent = '+0';
          rewTotal.textContent = '+0 (No Loss)';
        }

        openModal(modals.outcome);
        refreshLobbyUI();
      }, 1800);
    }
  });

  // --- ROBLOX 3D TABLETOP TRAY BUILDER ---
  function buildRobloxTray(side, isSetupPhase) {
    const grid = side === 'left' ? chipGridLeft : chipGridRight;
    if (!grid) return;
    grid.innerHTML = '';

    const profile = window.gameStorage.getProfile() || {};
    const flavorId = profile.equippedFlavor || 'salted';
    const flavor = (window.CHIP_FLAVORS && window.CHIP_FLAVORS[flavorId]) || {
      color: '#f59e0b',
      highlight: '#fde68a',
      shadow: '#b45309'
    };

    for (let i = 0; i < 12; i++) {
      const tile = document.createElement('div');
      tile.className = 'roblox-chip-tile';
      tile.dataset.index = i;

      const state = side === 'right' ? game.playerTrayState[i] : game.opponentTrayState[i];

      if (state === 'safe') {
        tile.classList.add('tile-eaten');
        tile.innerHTML = `<span style="font-size: 1.1rem; opacity: 0.6;">✨</span>`;
      } else if (state === 'slap') {
        tile.classList.add('tile-trapped');
        tile.innerHTML = `<span class="slap-hazard-icon">✋</span>`;
      } else {
        const chip = document.createElement('div');
        chip.className = 'roblox-curved-chip';
        if (side === 'right' && flavor.color) {
          chip.style.background = `linear-gradient(135deg, ${flavor.highlight} 0%, ${flavor.color} 50%, ${flavor.shadow} 100%)`;
        }
        tile.appendChild(chip);

        if (isSetupPhase && side === 'left') {
          tile.classList.add('clickable');
          if (game.playerPendingTraps.has(i)) {
            tile.classList.add('active-choice');
            const trapBadge = document.createElement('div');
            trapBadge.className = 'roblox-trap-badge';
            trapBadge.textContent = '✋';
            tile.appendChild(trapBadge);
          }
          tile.addEventListener('click', () => {
            game.handlePlayerTrapPlacement(i);
          });
        } else if (!isSetupPhase && side === 'right') {
          tile.addEventListener('click', () => {
            game.handlePlayerSelectChip(i);
          });
        }
      }

      grid.appendChild(tile);
    }
  }

  function updateRobloxTrayClickability(isPlayerTurn) {
    if (!chipGridRight) return;
    for (let i = 0; i < 12; i++) {
      const tile = chipGridRight.children[i];
      if (!tile) continue;

      if (isPlayerTurn && game.playerTrayState[i] === null) {
        tile.classList.add('clickable');
      } else {
        tile.classList.remove('clickable');
      }
    }
  }

  function updateHeartsUI(side, heartsCount) {
    const container = (side === 'right' || side === 'player') ? heartsRight : heartsLeft;
    if (!container) return;
    const hearts = container.querySelectorAll('.head-heart, .roblox-heart-icon');

    hearts.forEach((heart, idx) => {
      if (idx < heartsCount) {
        heart.textContent = '❤️';
        heart.classList.remove('heart-broken', 'heart-lost', 'cracked', 'lost');
      } else if (idx === heartsCount) {
        heart.textContent = '💔';
        heart.classList.remove('heart-lost', 'lost');
        heart.classList.add('heart-broken');
      } else {
        heart.textContent = '💔';
        heart.classList.remove('heart-broken');
        heart.classList.add('heart-lost');
      }
    });
  }

  // --- FLOATING TEXT & VFX ---
  function spawnFloatingText(targetEl, text, type = 'safe') {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = `floating-text-popup floating-text-${type}`;
    popup.textContent = text;
    popup.style.left = `${rect.left + rect.width / 2 - 80}px`;
    popup.style.top = `${rect.top - 20}px`;

    vfxOverlay.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
  }

  function triggerScreenShake(intensity = 'shake-medium') {
    const app = document.getElementById('game-app');
    app.classList.remove('shake-light', 'shake-medium', 'shake-heavy');
    void app.offsetWidth;
    app.classList.add(intensity);
    setTimeout(() => {
      app.classList.remove('shake-light', 'shake-medium', 'shake-heavy');
    }, 700);
  }

  function triggerSlapVfx(vfxType, victim) {
    const targetBox = (victim === 'player' || victim === 'right') ? avatarModelRight : avatarModelLeft;
    if (!targetBox) return;
    const rect = targetBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (vfxType === 'hand_slap') {
      const hand = document.createElement('div');
      hand.className = 'vfx-hand-slap';
      hand.style.left = `${centerX - 130}px`;
      hand.style.top = `${centerY - 130}px`;

      const burst = document.createElement('div');
      burst.className = 'comic-impact-burst';
      burst.style.left = `${centerX - 110}px`;
      burst.style.top = `${centerY - 110}px`;

      vfxOverlay.appendChild(hand);
      vfxOverlay.appendChild(burst);

      setTimeout(() => {
        hand.remove();
        burst.remove();
      }, 700);
    } else if (vfxType === 'explosion') {
      const boom = document.createElement('div');
      boom.className = 'vfx-explosion';
      boom.style.left = `${centerX - 160}px`;
      boom.style.top = `${centerY - 160}px`;

      vfxOverlay.appendChild(boom);
      setTimeout(() => boom.remove(), 700);
    } else if (vfxType === 'glitch') {
      const bsod = document.createElement('div');
      bsod.className = 'vfx-glitch-overlay';
      bsod.innerHTML = `
        <div class="bsod-title">*** SYSTEM_SLAP_EXCEPTION ***</div>
        <div class="bsod-code">
          CRITICAL_CHIP_FAILURE_0x000000D1<br>
          MEMORY_DUMP: ALL_HEARTS_COMPROMISED<br>
          REBOOTING CHIP CONTAINER...
        </div>
      `;
      vfxOverlay.appendChild(bsod);
      setTimeout(() => bsod.remove(), 800);
    } else if (vfxType === 'tornado') {
      const tornado = document.createElement('div');
      tornado.className = 'vfx-tornado';
      tornado.style.left = `${centerX - 120}px`;
      tornado.style.top = `${centerY - 160}px`;

      vfxOverlay.appendChild(tornado);
      setTimeout(() => tornado.remove(), 750);
    }
  }

  function triggerFatalSequence(isPlayerVictory) {
    // 1. Show Fatal Slap Announcement Banner (Matching Image 5)
    if (fatalSlapBanner) {
      if (fatalBannerText) {
        fatalBannerText.textContent = isPlayerVictory 
          ? `FATAL SLAP! ${game.opponentName} IS OUT!` 
          : 'FATAL SLAP! YOU ARE OUT!';
      }
      fatalSlapBanner.classList.add('active');
    }

    // 2. Thunder Screen Flash & Screen Shake
    triggerScreenShake('shake-heavy');
    window.gameAudio.playLightning();

    // 3. Set Winner to Smug Troll Face and Loser to Crying Blue Face (Matching Image 5)
    if (isPlayerVictory) {
      if (avatarModelRight && window.CHARACTERS.getTrollWinSvg) {
        avatarModelRight.innerHTML = window.CHARACTERS.getTrollWinSvg(160, 195);
      }
      if (avatarModelLeft && window.CHARACTERS.getCryingKoSvg) {
        avatarModelLeft.innerHTML = window.CHARACTERS.getCryingKoSvg(160, 195);
      }
    } else {
      if (avatarModelLeft && window.CHARACTERS.getTrollWinSvg) {
        avatarModelLeft.innerHTML = window.CHARACTERS.getTrollWinSvg(160, 195);
      }
      if (avatarModelRight && window.CHARACTERS.getCryingKoSvg) {
        avatarModelRight.innerHTML = window.CHARACTERS.getCryingKoSvg(160, 195);
      }
    }

    // Physical Debris Explosion
    const victimBox = isPlayerVictory ? avatarModelLeft : avatarModelRight;
    if (victimBox && physics) {
      const rect = victimBox.getBoundingClientRect();
      physics.explodeFatalSlapDebris(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    setTimeout(() => {
      if (fatalSlapBanner) fatalSlapBanner.classList.remove('active');
    }, 3200);
  }

  // --- BUTTON EVENT LISTENERS ---

  // Launch Page -> Main Lobby
  if (btnLaunchStart) {
    btnLaunchStart.addEventListener('click', () => {
      window.gameAudio.playClick();
      refreshLobbyUI();
      showScreen('lobby');
    });
  }

  // Profile Button & Settings Gear -> Profile Modal
  const openProfileModal = () => {
    window.gameAudio.playClick();
    renderAnimeCharacterGrid();
    refreshLobbyUI();
    openModal(modals.profile);
  };
  if (btnProfileBadge) btnProfileBadge.addEventListener('click', openProfileModal);
  if (btnSettingsGear) btnSettingsGear.addEventListener('click', openProfileModal);
  if (btnCloseProfile) btnCloseProfile.addEventListener('click', () => closeModal(modals.profile));

  // Mode 1: VS Computer (Park Arena with Robo-Chip 3000)
  if (btnModeComputer) {
    btnModeComputer.addEventListener('click', () => {
      window.gameAudio.playClick();
      game.startNewMatch(null, 'computer');
    });
  }

  // Mode 2: Friends Room Modal (Universal Live Waiting Room Handshake)
  function startSynchronizedCountdown(hostName, guestName, onFinish) {
    if (matchCountdownOverlay) {
      matchCountdownOverlay.classList.add('active');
      if (countdownP1Name) countdownP1Name.textContent = hostName || 'Host';
      if (countdownP2Name) countdownP2Name.textContent = guestName || 'Friend';

      let count = 3;
      if (countdownBigNum) countdownBigNum.textContent = count;
      window.gameAudio.playTimerTick();

      const cdInterval = setInterval(() => {
        count--;
        if (count > 0) {
          if (countdownBigNum) countdownBigNum.textContent = count;
          window.gameAudio.playTimerTick();
        } else if (count === 0) {
          if (countdownBigNum) countdownBigNum.textContent = 'BATTLE!';
          window.gameAudio.playFanfare();
        } else {
          clearInterval(cdInterval);
          matchCountdownOverlay.classList.remove('active');
          if (onFinish) onFinish();
        }
      }, 1000);
    } else {
      if (onFinish) onFinish();
    }
  }

  // --- MODE 2: FRIENDS MULTIPLAYER & LIVE ROOM HANDSHAKE ---
  let activeRoomCode = null;
  let connectedFriendInfo = null;
  let hostAutoStartTimer = null;

  function triggerMatchLaunchForHost() {
    if (hostAutoStartTimer) {
      clearInterval(hostAutoStartTimer);
      hostAutoStartTimer = null;
    }
    if (!connectedFriendInfo) return;

    if (btnStartFriendMatch) {
      btnStartFriendMatch.disabled = true;
      btnStartFriendMatch.textContent = '⚔️ LAUNCHING BATTLE...';
    }

    const profile = window.gameStorage.getProfile() || {};
    window.gameAudio.playFanfare();

    // Broadcast countdown start to guest tab so both screens launch simultaneously
    if (window.gameNetwork) {
      window.gameNetwork.broadcastMatchStart(profile, connectedFriendInfo);
    }

    // Host countdown
    startSynchronizedCountdown(profile.username || 'Host', connectedFriendInfo.username || 'Friend', () => {
      closeModal(modals.friends);
      game.startNewMatch(null, 'friends', connectedFriendInfo);
    });
  }

  if (btnModeFriends) {
    btnModeFriends.addEventListener('click', () => {
      window.gameAudio.playClick();
      if (hostAutoStartTimer) {
        clearInterval(hostAutoStartTimer);
        hostAutoStartTimer = null;
      }
      connectedFriendInfo = null;

      activeRoomCode = window.gameNetwork ? window.gameNetwork.generatePasscode() : '7842';
      if (createdPasscodeVal) createdPasscodeVal.textContent = activeRoomCode;

      const profile = window.gameStorage.getProfile() || {};
      const hostChar = window.CHARACTERS[profile.equippedCharacter] || window.CHARACTERS.sap1kaa;

      // Slot 1: Host
      if (lobbyHostName) lobbyHostName.textContent = profile.username || 'Host Player';
      if (lobbyHostAvatar) lobbyHostAvatar.innerHTML = hostChar.drawAvatarSvg('idle', 70, 70);

      // Slot 2: Searching Radar (Waiting for friend to join with code)
      if (lobbyGuestName) lobbyGuestName.textContent = 'Searching...';
      if (lobbyGuestStatus) {
        lobbyGuestStatus.className = 'slot-status badge-waiting';
        lobbyGuestStatus.textContent = '⏳ WAITING FOR FRIEND';
      }
      if (lobbyGuestAvatar) {
        lobbyGuestAvatar.innerHTML = `
          <div class="radar-scan-circle">
            <div class="radar-sweep-beam"></div>
            <div class="radar-ping-dot"></div>
          </div>
          <span class="radar-icon-center">📡</span>
        `;
      }

      if (createRoomStatus) {
        createRoomStatus.textContent = `🟢 Room Open: Share code ${activeRoomCode} or click 'TEST IN 2ND TAB'!`;
      }

      // Universal Rule: Host CANNOT start match alone until friend joins!
      if (btnStartFriendMatch) {
        btnStartFriendMatch.disabled = true;
        btnStartFriendMatch.className = 'arcade-btn btn-disabled';
        btnStartFriendMatch.textContent = '🔒 WAITING FOR FRIEND TO JOIN (CANNOT START ALONE)';
      }

      // Default to Create tab
      if (tabBtnCreate && tabContentCreate && tabBtnJoin && tabContentJoin) {
        tabBtnCreate.classList.add('active');
        tabBtnJoin.classList.remove('active');
        tabContentCreate.classList.add('active');
        tabContentJoin.classList.remove('active');
      }

      if (window.gameNetwork) {
        window.gameNetwork.createRoom(activeRoomCode, profile);

        // Host receives event when friend joins
        window.gameNetwork.on('onFriendJoined', (friendInfo) => {
          connectedFriendInfo = friendInfo;
          if (lobbyGuestName) lobbyGuestName.textContent = friendInfo.username || 'Friend Player';
          const fChar = window.CHARACTERS[friendInfo.equippedCharacter] || window.CHARACTERS.kenji;
          if (lobbyGuestAvatar) lobbyGuestAvatar.innerHTML = fChar.drawAvatarSvg('idle', 70, 70);
          if (lobbyGuestStatus) {
            lobbyGuestStatus.className = 'slot-status badge-ready';
            lobbyGuestStatus.textContent = '🟢 READY TO BATTLE!';
          }

          window.gameAudio.playFanfare();

          // UNLOCK START BUTTON FOR HOST!
          if (btnStartFriendMatch) {
            btnStartFriendMatch.disabled = false;
            btnStartFriendMatch.className = 'arcade-btn btn-start-pulse';
            
            let autoSecs = 5;
            btnStartFriendMatch.innerHTML = `🚀 START MATCH NOW! ⚔️ <span style="font-size:0.85rem; opacity:0.9;">(${autoSecs}s)</span>`;
            if (createRoomStatus) {
              createRoomStatus.textContent = `🎉 ${friendInfo.username || 'Friend'} joined! Host: Click START MATCH NOW!`;
            }

            if (hostAutoStartTimer) clearInterval(hostAutoStartTimer);
            hostAutoStartTimer = setInterval(() => {
              autoSecs--;
              if (autoSecs > 0) {
                if (btnStartFriendMatch) {
                  btnStartFriendMatch.innerHTML = `🚀 START MATCH NOW! ⚔️ <span style="font-size:0.85rem; opacity:0.9;">(${autoSecs}s)</span>`;
                }
              } else {
                clearInterval(hostAutoStartTimer);
                hostAutoStartTimer = null;
                triggerMatchLaunchForHost();
              }
            }, 1000);
          }
        });
      }

      openModal(modals.friends);
    });
  }

  // Host clicks START MATCH NOW button
  if (btnStartFriendMatch) {
    btnStartFriendMatch.addEventListener('click', () => {
      window.gameAudio.playClick();
      if (!connectedFriendInfo) return;
      triggerMatchLaunchForHost();
    });
  }

  // Handle Synchronized Countdown message on Guest tab
  if (window.gameNetwork) {
    window.gameNetwork.on('onMatchCountdown', (data) => {
      closeModal(modals.friends);
      startSynchronizedCountdown(data.host.username || 'Host', data.guest.username || 'Friend', () => {
        game.startNewMatch(null, 'friends', data.host);
      });
    });

    // Handle real-time gameplay synchronization between peers
    window.gameNetwork.on('onGameAction', (msg) => {
      if (!game) return;
      if (msg.action === 'TRAPS_READY') {
        game.handleRemoteTrapsReady(msg.payload.traps);
      } else if (msg.action === 'CHIP_REVEALED') {
        game.handleRemoteChipRevealed(msg.payload.slotIndex, msg.payload.type);
      } else if (msg.action === 'SLAP_STRIKE') {
        game.handleRemoteSlapStrike(msg.payload.power, msg.payload.isFatal);
      }
    });
  }

  // Quick 1-Click "Test in 2nd Tab"
  if (btnOpenFriendTab) {
    btnOpenFriendTab.addEventListener('click', () => {
      window.gameAudio.playClick();
      const testUrl = window.location.origin + window.location.pathname + '?join=' + activeRoomCode;
      window.open(testUrl, '_blank', 'width=960,height=750');
    });
  }

  // Quick Instant Simulate Friend in Same Tab (For testing)
  if (btnSimulateFriend) {
    btnSimulateFriend.addEventListener('click', () => {
      window.gameAudio.playClick();
      const mockFriend = {
        username: 'Guest_Hero',
        equippedCharacter: 'kenji',
        points: 4850
      };
      if (window.gameNetwork && window.gameNetwork.callbacks['onFriendJoined']) {
        window.gameNetwork.callbacks['onFriendJoined'](mockFriend);
      }
    });
  }

  if (btnCloseFriends) {
    btnCloseFriends.addEventListener('click', () => {
      window.gameAudio.playClick();
      if (hostAutoStartTimer) {
        clearInterval(hostAutoStartTimer);
        hostAutoStartTimer = null;
      }
      if (window.gameNetwork) {
        window.gameNetwork.leaveRoom();
      }
      closeModal(modals.friends);
    });
  }

  // Room Tabs (Create vs Join)
  if (tabBtnCreate && tabBtnJoin) {
    tabBtnCreate.addEventListener('click', () => {
      tabBtnCreate.classList.add('active');
      tabBtnJoin.classList.remove('active');
      tabContentCreate.classList.add('active');
      tabContentJoin.classList.remove('active');
    });

    tabBtnJoin.addEventListener('click', () => {
      tabBtnJoin.classList.add('active');
      tabBtnCreate.classList.remove('active');
      tabContentJoin.classList.add('active');
      tabContentCreate.classList.remove('active');
    });
  }

  // Copy Passcode Button
  if (btnCopyPasscode) {
    btnCopyPasscode.addEventListener('click', () => {
      if (createdPasscodeVal && navigator.clipboard) {
        navigator.clipboard.writeText(createdPasscodeVal.textContent);
        btnCopyPasscode.textContent = '✓ COPIED!';
        setTimeout(() => { btnCopyPasscode.textContent = '📋 COPY'; }, 1500);
      }
    });
  }

  // Submit Join Room Button (Friend enters code to join)
  if (btnSubmitJoinRoom && inputJoinPasscode) {
    btnSubmitJoinRoom.addEventListener('click', () => {
      const code = inputJoinPasscode.value.trim();
      if (!code || code.length !== 4) {
        alert('Please enter a valid 4-digit room passcode!');
        return;
      }
      window.gameAudio.playClick();
      if (joinRoomStatus) joinRoomStatus.textContent = `⏳ Connecting to room ${code}...`;

      const profile = window.gameStorage.getProfile() || {};
      if (window.gameNetwork) {
        const room = window.gameNetwork.joinRoom(code, profile);

        // Switch guest's tab to show the live waiting room slots!
        if (tabBtnCreate && tabContentCreate && tabBtnJoin && tabContentJoin) {
          tabBtnCreate.classList.add('active');
          tabBtnJoin.classList.remove('active');
          tabContentCreate.classList.add('active');
          tabContentJoin.classList.remove('active');
        }

        if (createdPasscodeVal) createdPasscodeVal.textContent = code;
        if (lobbyHostName) lobbyHostName.textContent = (room && room.host && room.host.username) || 'Host Player';
        if (lobbyGuestName) lobbyGuestName.textContent = profile.username || 'You (Friend)';
        if (lobbyGuestStatus) {
          lobbyGuestStatus.className = 'slot-status badge-ready';
          lobbyGuestStatus.textContent = '🟢 CONNECTED';
        }
        if (createRoomStatus) {
          createRoomStatus.textContent = `🟢 Connected to Room ${code}! Waiting for host to click Start...`;
        }
        if (btnStartFriendMatch) {
          btnStartFriendMatch.disabled = true;
          btnStartFriendMatch.className = 'arcade-btn btn-disabled';
          btnStartFriendMatch.textContent = '⏳ WAITING FOR HOST TO START MATCH...';
        }
      }
    });
  }

  // Auto-Join Handler if '?join=CODE' is present in URL
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const autoCode = urlParams.get('join');
      if (autoCode && autoCode.length === 4) {
        setTimeout(() => {
          showScreen('lobby');
          openModal(modals.friends);
          if (tabBtnJoin && tabContentJoin && tabBtnCreate && tabContentCreate) {
            tabBtnJoin.classList.add('active');
            tabBtnCreate.classList.remove('active');
            tabContentJoin.classList.add('active');
            tabContentCreate.classList.remove('active');
          }
          if (inputJoinPasscode) inputJoinPasscode.value = autoCode;
          setTimeout(() => {
            if (btnSubmitJoinRoom) btnSubmitJoinRoom.click();
          }, 500);
        }, 300);
      }
    } catch (e) {}
  }

  // ==========================================================
  // DAILY LUCKY SPIN WHEEL (8-WEDGE SVG WHEEL - 24H COOLDOWN)
  // ==========================================================
  const SPIN_PRIZES = [
    { type: 'points', amount: 100, label: '+100 Coins 🪙', angle: 22.5 },
    { type: 'gems', amount: 10, label: '+10 Gems 💎', angle: 67.5 },
    { type: 'points', amount: 250, label: '+250 Coins 🪙', angle: 112.5 },
    { type: 'gems', amount: 25, label: '+25 Gems 💎', angle: 157.5 },
    { type: 'points', amount: 500, label: '+500 Coins 🪙', angle: 202.5 },
    { type: 'gems', amount: 50, label: '+50 Gems 💎', angle: 247.5 },
    { type: 'points', amount: 1000, label: '+1,000 Coins 🪙', angle: 292.5 },
    { type: 'gems', amount: 100, label: '👑 JACKPOT 💎100!', angle: 337.5 }
  ];

  let currentWheelDeg = 0;
  let isWheelSpinning = false;
  let pendingSpinPrize = null;

  function updateDailySpinStatus() {
    const canSpin = window.gameStorage.canDailySpin ? window.gameStorage.canDailySpin() : true;
    if (canSpin) {
      if (spinStatusMsg) spinStatusMsg.textContent = '🎁 Free Spin Available Now!';
      if (spinFreeBadge) {
        spinFreeBadge.textContent = 'FREE';
        spinFreeBadge.style.display = 'block';
      }
      if (btnSpinWheelCenter) {
        btnSpinWheelCenter.classList.remove('disabled');
      }
    } else {
      const remainingMs = window.gameStorage.getDailySpinCooldown ? window.gameStorage.getDailySpinCooldown() : 0;
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const mins = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      if (spinStatusMsg) spinStatusMsg.textContent = `⏳ Next Free Spin in ${hours}h ${mins}m`;
      if (spinFreeBadge) {
        spinFreeBadge.textContent = `${hours}h`;
        spinFreeBadge.style.display = 'block';
      }
      if (btnSpinWheelCenter) {
        btnSpinWheelCenter.classList.add('disabled');
      }
    }
  }

  function openDailySpinModal() {
    window.gameAudio.playClick();
    updateDailySpinStatus();
    if (spinWinAnnouncement) spinWinAnnouncement.style.display = 'none';
    openModal(modals.spin);
  }

  if (btnDailySpin) btnDailySpin.addEventListener('click', openDailySpinModal);
  if (btnCloseSpin) btnCloseSpin.addEventListener('click', () => closeModal(modals.spin));

  function executeDailySpin() {
    if (isWheelSpinning) return;
    if (window.gameStorage.canDailySpin && !window.gameStorage.canDailySpin()) {
      alert('Your daily spin is on cooldown! Come back tomorrow for another free spin.');
      return;
    }

    isWheelSpinning = true;
    if (btnSpinWheelCenter) btnSpinWheelCenter.classList.add('disabled');
    if (spinWinAnnouncement) spinWinAnnouncement.style.display = 'none';

    // Weighted random wedge
    const rand = Math.random() * 100;
    let prizeIdx = 0;
    if (rand < 25) prizeIdx = 0;       // 100 Coins (25%)
    else if (rand < 48) prizeIdx = 2;  // 250 Coins (23%)
    else if (rand < 63) prizeIdx = 1;  // 10 Gems (15%)
    else if (rand < 77) prizeIdx = 4;  // 500 Coins (14%)
    else if (rand < 88) prizeIdx = 3;  // 25 Gems (11%)
    else if (rand < 94) prizeIdx = 6;  // 1000 Coins (6%)
    else if (rand < 98) prizeIdx = 5;  // 50 Gems (4%)
    else prizeIdx = 7;                 // JACKPOT 💎100 (2%)

    const prize = SPIN_PRIZES[prizeIdx];
    pendingSpinPrize = prize;

    // Rotate 5 full revolutions + align target wedge to top needle
    const extraRounds = 5 * 360;
    const alignAngle = (360 - prize.angle);
    currentWheelDeg += extraRounds + alignAngle;

    if (wheelDisc) {
      wheelDisc.style.transform = `rotate(${currentWheelDeg}deg)`;
    }

    // Play ratchet clicks during rotation
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      if (window.gameAudio && window.gameAudio.playWheelTick) {
        window.gameAudio.playWheelTick();
      }
      if (tickCount > 28) clearInterval(tickInterval);
    }, 150);

    // After rotation completes (4.5s)
    setTimeout(() => {
      isWheelSpinning = false;
      clearInterval(tickInterval);
      if (window.gameStorage.recordDailySpin) {
        window.gameStorage.recordDailySpin();
      }
      window.gameAudio.playFanfare();

      if (spinWinAnnouncement && spinWinText) {
        spinWinText.textContent = prize.label;
        spinWinAnnouncement.style.display = 'block';
      }

      updateDailySpinStatus();
    }, 4600);
  }

  if (btnSpinWheelCenter) btnSpinWheelCenter.addEventListener('click', executeDailySpin);

  if (btnClaimSpinReward) {
    btnClaimSpinReward.addEventListener('click', () => {
      if (!pendingSpinPrize) return;
      window.gameAudio.playFanfare();

      if (pendingSpinPrize.type === 'points') {
        window.gameStorage.addPoints(pendingSpinPrize.amount);
        spawnFloatingText(document.body, `${pendingSpinPrize.label} Granted!`, 'safe');
      } else if (pendingSpinPrize.type === 'gems') {
        if (window.gameStorage.addGems) {
          window.gameStorage.addGems(pendingSpinPrize.amount);
        } else {
          const cur = window.gameStorage.getProfile() || {};
          window.gameStorage.updateProfile({ gems: (cur.gems || 150) + pendingSpinPrize.amount });
        }
        spawnFloatingText(document.body, `${pendingSpinPrize.label} Granted!`, 'safe');
      }

      pendingSpinPrize = null;
      refreshLobbyUI();
      closeModal(modals.spin);
    });
  }

  // Tournament Mode (3-match bracket vs AI)
  if (btnModeTournament) {
    btnModeTournament.addEventListener('click', () => {
      window.gameAudio.playClick();
      game.startNewMatch(null, 'computer');
      addChatMessage('TOURNAMENT', '🏆 Round 1 of 3: Battle Robo-Chip 3000 to advance!');
    });
  }

  // Claim Daily Bonus (+250 points with cooldown)
  if (btnClaimBonus) {
    btnClaimBonus.addEventListener('click', () => {
      window.gameAudio.playFanfare();
      window.gameStorage.addPoints(250);
      refreshLobbyUI();
      spawnFloatingText(btnClaimBonus, '+250 Daily Bonus Points! 🎁', 'safe');
    });
  }

  // ==========================================================
  // BANK & REWARD SHOP MODAL (REALISTIC ECONOMY - NO CHEAT CLICKS)
  // ==========================================================
  function openBankModal() {
    window.gameAudio.playClick();
    refreshLobbyUI();
    openModal(modals.bank);
  }

  // Clicking '+' on Coins or Gems opens the Bank Store
  if (btnBuyPoints) btnBuyPoints.addEventListener('click', openBankModal);
  if (btnBuyGems) btnBuyGems.addEventListener('click', openBankModal);
  if (btnCloseBank) btnCloseBank.addEventListener('click', () => closeModal(modals.bank));

  // 1. Rewarded Video Ad Player Simulation (+250 Free Coins)
  let adTimerInterval = null;

  if (btnWatchAd) {
    btnWatchAd.addEventListener('click', () => {
      closeModal(modals.bank);
      openModal(modals.ad);
      window.gameAudio.playClick();

      // Reset Ad State
      let timeLeft = 5;
      if (adCountdownSeconds) adCountdownSeconds.textContent = timeLeft;
      if (adProgressFill) adProgressFill.style.width = '0%';
      if (btnCloseAd) btnCloseAd.classList.add('disabled');
      if (btnClaimAdReward) btnClaimAdReward.style.display = 'none';
      if (adFooterStatus) adFooterStatus.style.display = 'block';

      if (adTimerInterval) clearInterval(adTimerInterval);

      const startTime = Date.now();
      const duration = 5000;

      adTimerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        if (adProgressFill) adProgressFill.style.width = `${progress}%`;

        const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
        if (adCountdownSeconds) adCountdownSeconds.textContent = remaining;

        if (elapsed >= duration) {
          clearInterval(adTimerInterval);
          adTimerInterval = null;
          const timerPill = document.getElementById('ad-timer-pill');
          if (timerPill) timerPill.textContent = '✅ REWARD READY!';
          if (btnCloseAd) btnCloseAd.classList.remove('disabled');
          if (adFooterStatus) adFooterStatus.style.display = 'none';
          if (btnClaimAdReward) btnClaimAdReward.style.display = 'block';
          window.gameAudio.playFanfare();
        }
      }, 100);
    });
  }

  function grantAdReward() {
    if (adTimerInterval) {
      clearInterval(adTimerInterval);
      adTimerInterval = null;
    }
    window.gameStorage.addPoints(250);
    window.gameAudio.playFanfare();
    refreshLobbyUI();
    spawnFloatingText(document.body, '+250 Free Coins Granted! 🪙', 'safe');
    closeModal(modals.ad);
  }

  if (btnClaimAdReward) btnClaimAdReward.addEventListener('click', grantAdReward);
  if (btnCloseAd) {
    btnCloseAd.addEventListener('click', () => {
      if (!btnCloseAd.classList.contains('disabled')) {
        grantAdReward();
      }
    });
  }

  // 2. Google Play Store In-App Purchases Simulator
  let pendingPurchase = null;

  document.querySelectorAll('.btn-buy-pack').forEach(btn => {
    btn.addEventListener('click', () => {
      window.gameAudio.playClick();
      pendingPurchase = {
        name: btn.dataset.name,
        cost: btn.dataset.cost,
        reward: Number(btn.dataset.reward),
        type: btn.dataset.type
      };
      if (billingItemName) billingItemName.textContent = pendingPurchase.name;
      if (billingItemPrice) billingItemPrice.textContent = pendingPurchase.cost;
      openModal(modals.billing);
    });
  });

  if (btnBillingCancel) {
    btnBillingCancel.addEventListener('click', () => {
      window.gameAudio.playClick();
      closeModal(modals.billing);
      pendingPurchase = null;
    });
  }

  if (btnBillingConfirm) {
    btnBillingConfirm.addEventListener('click', () => {
      if (!pendingPurchase) return;
      window.gameAudio.playFanfare();
      if (pendingPurchase.type === 'points') {
        window.gameStorage.addPoints(pendingPurchase.reward);
        spawnFloatingText(document.body, `+${formatPoints(pendingPurchase.reward)} Coins Purchased! 🪙`, 'safe');
      } else if (pendingPurchase.type === 'gems') {
        const cur = window.gameStorage.getProfile() || {};
        window.gameStorage.updateProfile({ gems: (cur.gems || 150) + pendingPurchase.reward });
        spawnFloatingText(document.body, `+${pendingPurchase.reward} Gems Purchased! 💎`, 'safe');
      }
      refreshLobbyUI();
      closeModal(modals.billing);
      pendingPurchase = null;
    });
  }

  // Bottom Navigation Handlers
  if (navHome) navHome.addEventListener('click', () => { window.gameAudio.playClick(); showScreen('lobby'); });
  if (navProfile) navProfile.addEventListener('click', openProfileModal);
  if (navShop) navShop.addEventListener('click', () => { window.gameAudio.playClick(); renderFlavorShop(); openModal(modals.shop); });
  if (navStats) navStats.addEventListener('click', () => { window.gameAudio.playClick(); renderHistoryTable(); openModal(modals.history); });
  if (navRules) navRules.addEventListener('click', () => { window.gameAudio.playClick(); openModal(modals.rules); });

  if (btnShopTop) {
    btnShopTop.addEventListener('click', () => {
      window.gameAudio.playClick();
      renderFlavorShop();
      openModal(modals.shop);
    });
  }

  if (btnCloseShop) btnCloseShop.addEventListener('click', () => closeModal(modals.shop));
  if (btnCloseRules) btnCloseRules.addEventListener('click', () => closeModal(modals.rules));
  if (btnCloseHistory) btnCloseHistory.addEventListener('click', () => closeModal(modals.history));

  // Slap Glove Badge Click
  if (btnSlapBadge) {
    btnSlapBadge.addEventListener('click', () => {
      window.gameAudio.playWhoosh();
      const profile = window.gameStorage.getProfile() || {};
      const totalSlaps = (profile.slapsLanded || 0) + (game ? game.slapsLandedByPlayer : 0);
      spawnFloatingText(btnSlapBadge, `Slaps Landed: ${totalSlaps} ✋`, 'crit');
      addChatMessage('Slap Glove', `Glove ready! Total slaps landed: ${totalSlaps}`);
    });
  }

  // QTE Button & Keyboard Support
  if (btnSlapQte) {
    btnSlapQte.addEventListener('click', () => {
      game.stopQte();
    });
  }

  const meterTrack = document.querySelector('.meter-track-container');
  if (meterTrack) {
    meterTrack.addEventListener('click', () => {
      if (game.qteIsActive && game.qteAttacker === 'player') {
        game.stopQte();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      if (game.qteIsActive && game.qteAttacker === 'player') {
        e.preventDefault();
        game.stopQte();
      }
    }
  });

  // Match Screen Forfeit
  if (btnForfeit) {
    btnForfeit.addEventListener('click', () => {
      if (confirm('Are you sure you want to forfeit this match?')) {
        window.gameAudio.playClick();
        game.setState(GameState.GAME_OVER);
        game._triggerFatalSlapSequence('opponent', 'player');
      }
    });
  }

  // Outcome Modal Buttons
  if (btnOutcomeReplay) {
    btnOutcomeReplay.addEventListener('click', () => {
      window.gameAudio.playClick();
      closeModal(modals.outcome);
      game.startNewMatch(null, game.mode || 'computer');
    });
  }

  if (btnOutcomeMenu) {
    btnOutcomeMenu.addEventListener('click', () => {
      window.gameAudio.playClick();
      closeModal(modals.outcome);
      refreshLobbyUI();
      showScreen('lobby');
    });
  }

  // Reset Stats Button
  if (btnResetStats) {
    btnResetStats.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset match history? (Points remain saved)')) {
        window.gameAudio.playClick();
        window.gameStorage.saveMatchHistory([]);
        renderHistoryTable();
        refreshLobbyUI();
      }
    });
  }

  // Render Match History Table
  function renderHistoryTable() {
    const history = window.gameStorage.getMatchHistory();
    const lastMatch = window.gameStorage.getLastMatch();
    const lastMatchContainer = document.getElementById('history-last-match-spotlight');

    if (lastMatchContainer) {
      if (lastMatch && lastMatch.result) {
        const isWin = lastMatch.result === 'Victory';
        lastMatchContainer.innerHTML = `
          <div style="background: rgba(15, 38, 92, 0.9); border: 2px solid #2563eb; border-radius: 12px; padding: 12px; margin-bottom: 14px; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: #ffd700; font-size: 1rem;">LAST MATCH RECAP</strong>
              <span style="background:${isWin ? '#16a34a' : '#dc2626'}; color:#fff; padding:2px 8px; border-radius:8px; font-weight:bold;">${lastMatch.result}</span>
            </div>
            <div style="font-size: 0.85rem; color: #cbd5e1; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              <div>Fighter: <strong>${lastMatch.playerCharacter}</strong></div>
              <div>Opponent: <strong>${lastMatch.opponent}</strong></div>
              <div>Points Won: <strong style="color:#fde047;">+${lastMatch.pointsEarned || lastMatch.cashEarned || 0}</strong></div>
              <div>Hearts Left: <strong>${'❤️'.repeat(lastMatch.heartsLeft || 0) || '0'}</strong></div>
            </div>
          </div>
        `;
      } else {
        lastMatchContainer.innerHTML = '';
      }
    }

    if (historyTableBody) {
      historyTableBody.innerHTML = '';
      if (history.length === 0) {
        historyTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 18px; color: #94a3b8;">No matches recorded yet.</td></tr>`;
        return;
      }
      history.forEach(m => {
        const tr = document.createElement('tr');
        const dateStr = m.lastPlayed ? new Date(m.lastPlayed).toLocaleDateString() : 'Recent';
        const isWin = m.result === 'Victory';
        tr.innerHTML = `
          <td>${dateStr}</td>
          <td><span style="color:${isWin ? '#4ade80' : '#f87171'}; font-weight:bold;">${m.result}</span></td>
          <td>${m.playerCharacter || 'sap1kaa'}</td>
          <td>${m.opponent || 'Robo-Chip'}</td>
          <td style="color: #fde047; font-weight: bold;">+${m.pointsEarned || m.cashEarned || 0}</td>
          <td>${'❤️'.repeat(m.heartsLeft || 0)}</td>
        `;
        historyTableBody.appendChild(tr);
      });
    }
  }

  // Render Chip Flavor Shop
  function renderFlavorShop() {
    const profile = window.gameStorage.getProfile() || {};
    if (shopWalletCash) shopWalletCash.textContent = formatPoints(profile.points || 4640);
    if (!flavorGrid) return;
    flavorGrid.innerHTML = '';

    const unlocked = profile.unlockedFlavors || ['salted'];
    const equipped = profile.equippedFlavor || 'salted';

    Object.values(window.CHIP_FLAVORS).forEach(flavor => {
      const card = document.createElement('div');
      const isUnlocked = unlocked.includes(flavor.id);
      const isEquipped = equipped === flavor.id;

      card.className = `flavor-card ${isEquipped ? 'equipped' : ''}`;
      card.innerHTML = `
        <div class="flavor-chip-preview" style="background: radial-gradient(circle at 35% 35%, ${flavor.highlight} 0%, ${flavor.color} 60%, ${flavor.shadow} 100%); width:50px; height:50px; border-radius:50%; margin:0 auto 6px;"></div>
        <div class="flavor-name" style="font-family:var(--font-display); font-size:1.1rem; color:#fff;">${flavor.name}</div>
        <div class="flavor-price" style="color:#fde047; font-size:0.9rem; margin:4px 0;">${isUnlocked ? 'OWNED' : `${flavor.cost} Pts`}</div>
        <button class="arcade-btn ${isEquipped ? 'btn-green' : (isUnlocked ? 'btn-blue' : 'btn-primary')}" style="padding: 6px 10px; font-size: 0.8rem; width: 100%;">
          ${isEquipped ? '✓ EQUIPPED' : (isUnlocked ? 'EQUIP' : 'BUY')}
        </button>
      `;

      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        window.gameAudio.playClick();
        const curProf = window.gameStorage.getProfile() || {};
        const curPoints = curProf.points || 4640;

        if (isUnlocked) {
          window.gameStorage.updateProfile({ equippedFlavor: flavor.id });
          renderFlavorShop();
          refreshLobbyUI();
        } else {
          if (curPoints >= flavor.cost) {
            const updatedUnlocked = [...unlocked, flavor.id];
            window.gameStorage.updateProfile({
              points: curPoints - flavor.cost,
              cash: curPoints - flavor.cost,
              unlockedFlavors: updatedUnlocked,
              equippedFlavor: flavor.id
            });
            window.gameAudio.playFanfare();
            renderFlavorShop();
            refreshLobbyUI();
          } else {
            alert(`Need ${flavor.cost - curPoints} more points! Win matches to earn points.`);
            window.gameAudio.playBuzzer();
          }
        }
      });

      flavorGrid.appendChild(card);
    });
  }

  // Initial Load
  refreshLobbyUI();
  renderAnimeCharacterGrid();
});
