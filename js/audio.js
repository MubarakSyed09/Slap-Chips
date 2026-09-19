/**
 * AudioEngine - Web Audio API Procedural Sound Synthesizer
 * 100% self-contained audio for Slap Chips.
 */
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.bgmGain = null;
    this.bgmPlaying = false;
    this.bgmInterval = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.7, this.ctx.currentTime);
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(muted ? 0 : 0.12, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // --- HELPER NOISE BUFFER ---
  _createNoiseBuffer(duration = 0.5) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // --- SOUND EFFECTS ---

  /**
   * Crisp potato chip crunch sound (layered micro-bursts of filtered noise and wafer snap)
   */
  playChipCrunch() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // 4 rapid crisp crackles
    for (let i = 0; i < 4; i++) {
      const offset = i * 0.038 + Math.random() * 0.015;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this._createNoiseBuffer(0.12);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800 + Math.random() * 900, now + offset);
      filter.Q.setValueAtTime(3.2, now + offset);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.55, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now + offset);
      noise.stop(now + offset + 0.1);
    }

    // High wafer snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = 'triangle';
    snap.frequency.setValueAtTime(1200, now);
    snap.frequency.exponentialRampToValueAtTime(180, now + 0.07);

    snapGain.gain.setValueAtTime(0.35, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    snap.connect(snapGain);
    snapGain.connect(this.masterGain);
    snap.start(now);
    snap.stop(now + 0.085);
  }

  /**
   * Cheerful sparkle chime when safely eating a chip
   */
  playSafeChip() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const offset = idx * 0.055;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + offset);

      gain.gain.setValueAtTime(0.22, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.28);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + offset);
      osc.stop(now + offset + 0.3);
    });
  }

  /**
   * Hard Slap Sound with dramatic "FAAAAHHH!" resonant air/voice overtone
   * @param {number} powerMultiplier (1.0 to 3.0)
   */
  playSlap(powerMultiplier = 1.0) {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const intensity = Math.min(Math.max(powerMultiplier, 1.0), 3.0);

    // 1. Sharp skin-to-skin slap impact crack
    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(0.22);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.18);
    filter.Q.setValueAtTime(2.2, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85 * intensity, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.22);

    // 2. Heavy sub impact thud
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180 * (1 + (intensity - 1) * 0.25), now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.22);

    oscGain.gain.setValueAtTime(0.85 * intensity, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.25);

    // 3. Resonant "FAAAAHHH!" vocal/air impact rush
    const faahNoise = this.ctx.createBufferSource();
    faahNoise.buffer = this._createNoiseBuffer(0.45);

    // Dual formant filters to simulate the open "AAAAHH" vocal tract
    const formant1 = this.ctx.createBiquadFilter();
    formant1.type = 'bandpass';
    formant1.frequency.setValueAtTime(800, now);
    formant1.frequency.linearRampToValueAtTime(650, now + 0.35);
    formant1.Q.setValueAtTime(4.0, now);

    const formant2 = this.ctx.createBiquadFilter();
    formant2.type = 'bandpass';
    formant2.frequency.setValueAtTime(1350, now);
    formant2.frequency.linearRampToValueAtTime(1100, now + 0.35);
    formant2.Q.setValueAtTime(5.0, now);

    const faahGain = this.ctx.createGain();
    faahGain.gain.setValueAtTime(0.6 * intensity, now);
    faahGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    faahNoise.connect(formant1);
    faahNoise.connect(formant2);
    formant1.connect(faahGain);
    formant2.connect(faahGain);
    faahGain.connect(this.masterGain);

    faahNoise.start(now);
    faahNoise.stop(now + 0.45);
  }

  /**
   * Ratchet tick sound for Daily Spin Wheel
   */
  playWheelTick() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * Fast hand whoosh sound
   */
  playWhoosh() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(0.25);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.25);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.25);
  }

  /**
   * UI Click / Blip
   */
  playClick() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * Alarm / Trap Buzzer sound
   */
  playBuzzer() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Dual sawtooth oscillators for a harsh jarring buzz
    [130, 137].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.setValueAtTime(0.05, now + 0.1);
      gain.gain.setValueAtTime(0.3, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.36);
    });
  }

  /**
   * Countdown timer tick
   */
  playTimerTick(isUrgent = false) {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const freq = isUrgent ? 1100 : 750;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.04);

    gain.gain.setValueAtTime(isUrgent ? 0.3 : 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Melodic Victory Fanfare
   */
  playFanfare() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const notes = [
      { f: 523.25, d: 0.12, t: 0.0 },   // C5
      { f: 659.25, d: 0.12, t: 0.12 },  // E5
      { f: 783.99, d: 0.14, t: 0.24 },  // G5
      { f: 1046.50, d: 0.35, t: 0.38 }, // C6
      { f: 1318.51, d: 0.6, t: 0.55 }   // E6 (celebratory long hold)
    ];

    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now + note.t);

      gain.gain.setValueAtTime(0.2, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  }

  /**
   * Sad defeat chord stabs
   */
  playDefeat() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const notes = [
      { f: 311.13, t: 0.0 },  // Eb4
      { f: 293.66, t: 0.25 }, // D4
      { f: 261.63, t: 0.5 },  // C4
      { f: 196.00, t: 0.8 }   // G3
    ];

    notes.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now + note.t);

      gain.gain.setValueAtTime(0.25, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + note.t);
      osc.stop(now + note.t + 0.45);
    });
  }

  /**
   * Digital Glitch sound for Cyber Fighter
   */
  playGlitch() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < 4; i++) {
      const offset = i * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const freqs = [350, 1200, 480, 2400];
      osc.frequency.setValueAtTime(freqs[i % freqs.length], now + offset);

      gain.gain.setValueAtTime(0.3, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + offset);
      osc.stop(now + offset + 0.055);
    }
  }

  /**
   * Deep explosion rumble for Classic Rookie
   */
  playExplosion() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this._createNoiseBuffer(1.0);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.8);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    noise.start(now);
    noise.stop(now + 0.95);

    // Deep sub bass
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(90, now);
    sub.frequency.exponentialRampToValueAtTime(30, now + 0.6);

    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    sub.connect(subGain);
    subGain.connect(this.masterGain);
    sub.start(now);
    sub.stop(now + 0.7);
  }

  /**
   * Lightning shock sound for Troll King
   */
  playLightning() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const offset = i * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800 + Math.random() * 800, now + offset);
      osc.frequency.exponentialRampToValueAtTime(100, now + offset + 0.06);

      gain.gain.setValueAtTime(0.35, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.065);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + offset);
      osc.stop(now + offset + 0.07);
    }
  }

  /**
   * Heart break / Damage sound
   */
  playHeartBreak() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * Procedural Looping Upbeat Daytime Arcade Background Music
   * Bouncy, catchy marimba/plink melody with groovy bass and light percussion
   */
  startBgm() {
    this.init();
    if (this.bgmPlaying || !this.ctx) return;
    this.bgmPlaying = true;
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.11, this.ctx.currentTime);
    this.bgmGain.connect(this.ctx.destination);

    // Cheerful Sunny Progression: F -> C -> G -> Am
    const chords = [
      { bass: 87.31, lead: [349.23, 440.00, 523.25, 698.46, 523.25, 440.00, 392.00, 440.00] },
      { bass: 130.81, lead: [523.25, 392.00, 329.63, 261.63, 329.63, 392.00, 523.25, 659.25] },
      { bass: 98.00,  lead: [392.00, 493.88, 587.33, 493.88, 392.00, 293.66, 392.00, 493.88] },
      { bass: 110.00, lead: [440.00, 523.25, 659.25, 523.25, 440.00, 329.63, 392.00, 440.00] }
    ];

    let chordIdx = 0;
    const stepTime = 0.165; // ~145 BPM bouncy tempo
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || !this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const chord = chords[chordIdx];

      // 1. Bouncy slap bassline (steps 0, 3, 4, 6)
      if (step === 0 || step === 3 || step === 4 || step === 6) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        const bassPitch = (step === 3 || step === 6) ? chord.bass * 1.5 : chord.bass;
        bassOsc.frequency.setValueAtTime(bassPitch, now);

        bassGain.gain.setValueAtTime(0.22, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(now);
        bassOsc.stop(now + 0.19);
      }

      // 2. Playful marimba / chip-plink lead melody
      const leadNote = chord.lead[step % chord.lead.length];
      const leadOsc = this.ctx.createOscillator();
      const leadGain = this.ctx.createGain();
      leadOsc.type = (step % 2 === 0) ? 'sine' : 'triangle';
      leadOsc.frequency.setValueAtTime(leadNote, now);

      leadGain.gain.setValueAtTime(0.1, now);
      leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      leadOsc.connect(leadGain);
      leadGain.connect(this.bgmGain);
      leadOsc.start(now);
      leadOsc.stop(now + 0.15);

      // 3. Crisp Hi-Hat / Snack shaker percussion on offbeats
      if (step % 2 === 1) {
        const hh = this.ctx.createBufferSource();
        hh.buffer = this._createNoiseBuffer(0.04);
        const hhFilter = this.ctx.createBiquadFilter();
        hhFilter.type = 'highpass';
        hhFilter.frequency.setValueAtTime(7000, now);
        const hhGain = this.ctx.createGain();
        hhGain.gain.setValueAtTime(0.06, now);
        hhGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        hh.connect(hhFilter);
        hhFilter.connect(hhGain);
        hhGain.connect(this.bgmGain);
        hh.start(now);
        hh.stop(now + 0.04);
      }

      step++;
      if (step >= 8) {
        step = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }
    }, stepTime * 1000);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

// Global audio engine singleton
if (typeof window !== 'undefined') {
  window.AudioEngine = AudioEngine;
  window.gameAudio = new AudioEngine();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioEngine };
}