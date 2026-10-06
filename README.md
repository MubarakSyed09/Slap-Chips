# 🥔 Slap Chips ✋💥

> **The ultimate high-stakes anime & tabletop snack duel! Hide secret traps, crunch crispy chips, and deliver comical critical slaps in 3D tabletop arenas.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Play_Now-success?style=for-the-badge&logo=github)](https://mubaraksyed09.github.io/Slap-Chips/)
[![Tech](https://img.shields.io/badge/Pure_Web_Tech-HTML5_|_CSS3_|_ES6-orange?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Audio](https://img.shields.io/badge/Audio-Web_Audio_API-blueviolet?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Multiplayer](https://img.shields.io/badge/Multiplayer-BroadcastChannel_&_LocalStorage-blue?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)

🎮 **Play Live in Browser:** [https://mubaraksyed09.github.io/Slap-Chips/](https://mubaraksyed09.github.io/Slap-Chips/)

---

## 📖 Table of Contents
- [Game Overview](#-game-overview)
- [Key Features](#-key-features)
- [Anime Roster & Fighters](#-anime-roster--fighters)
- [How to Play](#-how-to-play)
- [Game Modes](#-game-modes)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Local Development](#-local-development)
- [Deploying to Google Play (Android APK)](#-deploying-to-google-play-android-apk)

---

## 🎮 Game Overview

**Slap Chips** is a turn-based multiplayer bluffing and reflex game. Two players sit across a 3D marble table with trays containing 12 covered potato chips each. 

Before the crunching begins, each player plants **3 secret slap traps** on their opponent's tray. During the match, players take turns eating chips. Pick a safe chip and you gain points — but trigger a hidden trap, and you face a **high-speed Slap QTE Power Meter**!

---

## ✨ Key Features

- 🍱 **Two-Phase Tactical Gameplay:**
  - **Setup Phase:** Plant 3 concealed traps on your rival's tray.
  - **Eating Phase:** Alternate turns picking chips while calculating safe probability.
- ⚡ **Dynamic Slap QTE Power Meter:** 
  - Oscillating needle with critical sweet spots. Time your tap perfectly to score up to **x3.0 Critical Damage**!
  - Physical tabletop lunge and recoil animations with neon slash VFX.
- 👥 **Universal Friends Multiplayer:**
  - Generate a 4-digit room code to play with friends across tabs, windows, or devices.
  - Live waiting room lobby with real-time avatar sync and a 3-second battle countdown.
- 🤖 **Single-Player VS Computer:**
  - Battle against **Robo-Chip 3000** in a sunny park arena with distant aura spectators.
- 🎡 **Daily Lucky Spin & Progression Economy:**
  - Interactive 8-wedge prize wheel with 24-hour cooldowns.
  - Win free coins, gems, and jackpots!
  - **Zero-Loss Rule:** Losing never deducts your hard-earned points.
- 🛒 **Snack Cosmetics Shop:**
  - Unlock custom chip flavors (Sour Cream & Onion, Flaming Chili, Golden Cheese, Truffle Salt).
- 🎵 **100% Procedural Web Audio API Soundboard:**
  - Realistic multi-burst chip crunches, snappy ratchet wheel ticks, alarm buzzers, celebratory victory fanfares, and an upbeat 145 BPM procedural arcade BGM.
  - Punchy slap impact with resonant sub-bass and comical voice overtones.

---

## 🥋 Anime Roster & Fighters

| Character | Class / Title | Special Slap VFX | Catchphrase |
| :--- | :--- | :--- | :--- |
| **sap1kaa** | Aesthetic Hoodie Girl | Cyber Glitch Matrix | *"Nom nom... You stepped right on my secret slap!"* |
| **Kenji** | Shonen Flame Ninja | Flame Palm Burst | *"My fiery spirit will never hit a trap!"* |
| **Aoi** | Cyber Virtual Idol | Laser Pulse Shock | *"Synchronizing table frequencies! Ready, go!"* |
| **Ren** | Blade Prodigy | Blade Smack Cut | *"The blade of destiny never hesitates."* |
| **Sakura** | Kawaii Star Student | Star Blossom Burst | *"Snack time is the best part of school!"* |
| **Shinji** | Mecha Vanguard | Plasma Storm Burst | *"I won’t run away from a table showdown!"* |
| **Robo-Chip 3000** | Chrome Robot AI | Electro-Shock Overload | *"CALCULATING OPTIMAL SLAP TRAJECTORY..."* |

---

## 🕹️ How to Play

1. **Step 1 — Hide Slaps:** Click 3 slots on your opponent's tray to plant hidden slap traps.
2. **Step 2 — Eat Chips:** On your turn, choose a covered chip from your tray.
   - **✨ Safe Chip:** Satisfying crunch! Turn passes to opponent.
   - **✋ Slap Trap:** Alarm sounds! The attacker charges the Slap Power Meter.
3. **Step 3 — QTE Slap Meter:** Stop the needle in the center for maximum damage (1 heart lost).
4. **Step 4 — Knockout:** The first player to lose all 3 hearts suffers a **FATAL SLAP** with meme KO animations and zero-gravity flying debris!

---

## 🎯 Game Modes

1. **🤖 VS Computer:**
   - Instant single-player match against Robo-Chip 3000 in the Park Arena.
2. **👥 Play with Friends (Passcode Room):**
   - Host generates a 4-digit code (e.g. `8492`).
   - Friend enters the code on their device or second browser tab.
   - Host clicks **START MATCH NOW** for a synchronized battle launch!
3. **🎡 Lucky Spin:**
   - Free daily spin for bonus coins and gems.
4. **🏆 Tournament & Bonus:**
   - Gauntlet rounds against AI opponents with increasing streaks.

---

## 💻 Tech Stack & Architecture

- **Front-End:** Vanilla HTML5, Semantic DOM, Glassmorphic CSS3 (Warm Beige & Luxury Gold Theme).
- **Game Engine:** Custom lightweight state machine (`js/game.js`) with deterministic turn resolution.
- **Multiplayer Networking:** Peer-to-peer sync via `BroadcastChannel` API with `localStorage` polling fallback (`js/network.js`).
- **Audio Synthesis:** Zero external audio files required! 100% synthesized through Web Audio API oscillators, biquad filters, and white noise buffers (`js/audio.js`).
- **Physics & VFX:** Custom lightweight zero-gravity particle emitter for chip crumbs and KO debris (`js/physics.js`).
- **Persistence:** Local client save system tracking streaks, win/loss history, unlocked flavors, and currency (`js/storage.js`).

---

## 🚀 Local Development

To run the game locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MubarakSyed09/Slap-Chips.git
   cd Slap-Chips
