/**
 * Character definitions, High-Level SVGs, Expressions, and Slap VFX specs.
 * Features 6 Studio-Quality Anime Characters & Robo-Chip 3000 (Chrome Robot AI).
 */

const CHARACTERS = {
  // ==========================================
  // 1. ANIME CHARACTER 1: sap1kaa (Aesthetic Hoodie Girl)
  // ==========================================
  sap1kaa: {
    id: 'sap1kaa',
    name: 'sap1kaa',
    title: 'Aesthetic Hoodie Girl',
    description: 'Aesthetic anime avatar with wavy ash-blonde hair, oversized cat-ear hoodie, soft blush, and tactical chip instincts.',
    primaryColor: '#F8FAFC',
    secondaryColor: '#E2E8F0',
    accentColor: '#F43F5E',
    vfxType: 'glitch',
    vfxName: 'Aesthetic Cyber Glitch',
    vfxDesc: 'Unleashes a dazzling holographic glitch and neon matrix fracture!',
    catchphrase: 'Nom nom... You stepped right on my secret slap!',
    quotes: {
      turn: ["Hmm, let me inspect this row...", "This chip looks super safe!", "Watch this clean crunch.", "Eenie meenie miny moe..."],
      safe: ["Yay! Safe and crunchy! ✨", "Hehe, 10/10 flavor!", "Your turn now, don't miss!"],
      trap: ["KYAAA! A SLAP TRAP?!", "NOOO! WHO PLANTED THIS?!", "WAIT WAIT WAIT!"],
      slap: ["SLAP TIME! TAKE THIS!", "HI-YAH! Critical hit!", "Gotcha right there! ✨"],
      slapped: ["Ouuuch! My hoodie!", "Hey! That was my good side!", "Oof, that stung!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let eyeLeft = `<ellipse cx="68" cy="90" rx="5.5" ry="6.5" fill="#3b2f2f" /><circle cx="66" cy="87" r="2.2" fill="#fff" /><circle cx="70" cy="93" r="1" fill="#fff" />`;
      let eyeRight = `<ellipse cx="92" cy="90" rx="5.5" ry="6.5" fill="#3b2f2f" /><circle cx="90" cy="87" r="2.2" fill="#fff" /><circle cx="94" cy="93" r="1" fill="#fff" />`;
      let mouth = `<path d="M76 103 Q80 107 84 103" stroke="#d97706" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
      let extras = `<ellipse cx="60" cy="96" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.65" /><ellipse cx="100" cy="96" rx="4.5" ry="2.5" fill="#fca5a5" opacity="0.65" />`;

      if (expression === 'nervous') {
        eyeLeft = `<ellipse cx="68" cy="92" rx="5" ry="5" fill="#3b2f2f" />`;
        eyeRight = `<ellipse cx="92" cy="92" rx="5" ry="5" fill="#3b2f2f" />`;
        mouth = `<path d="M75 106 Q80 101 85 106" stroke="#d97706" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
        extras += `<circle cx="105" cy="79" r="3.5" fill="#38bdf8" opacity="0.9" />`;
      } else if (expression === 'shocked') {
        eyeLeft = `<circle cx="68" cy="88" r="8" fill="#3b2f2f" /><circle cx="66" cy="86" r="3" fill="#fff" />`;
        eyeRight = `<circle cx="92" cy="88" r="8" fill="#3b2f2f" /><circle cx="90" cy="86" r="3" fill="#fff" />`;
        mouth = `<ellipse cx="80" cy="106" rx="7" ry="9" fill="#111" />`;
      } else if (expression === 'slapped') {
        eyeLeft = `<path d="M64 86 L72 94 M72 86 L64 94" stroke="#3b2f2f" stroke-width="3" stroke-linecap="round" />`;
        eyeRight = `<path d="M88 86 L96 94 M96 86 L88 94" stroke="#3b2f2f" stroke-width="3" stroke-linecap="round" />`;
        mouth = `<path d="M74 108 Q80 98 86 108" stroke="#d97706" stroke-width="3.5" fill="none" stroke-linecap="round" />`;
        extras = `<circle cx="56" cy="96" r="7" fill="#f43f5e" opacity="0.75" />`;
      } else if (expression === 'victorious') {
        eyeLeft = `<path d="M63 90 Q68 83 73 90" stroke="#3b2f2f" stroke-width="3" fill="none" stroke-linecap="round" />`;
        eyeRight = `<path d="M87 90 Q92 83 97 90" stroke="#3b2f2f" stroke-width="3" fill="none" stroke-linecap="round" />`;
        mouth = `<path d="M74 102 Q80 114 86 102 Z" fill="#f43f5e" />`;
      }

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <defs>
            <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#e2e8f0"/>
            </linearGradient>
            <linearGradient id="chairWood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#8d5b35"/>
              <stop offset="100%" stop-color="#542e14"/>
            </linearGradient>
          </defs>
          <!-- Wooden Chair Backrest -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="url(#chairWood)" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- White Oversized Hoodie Torso -->
          <rect x="46" y="118" width="68" height="66" rx="10" fill="url(#hoodieGrad)" stroke="#cbd5e1" stroke-width="3" />
          <path d="M72 120 L80 135 L88 120" stroke="#94a3b8" stroke-width="2.5" fill="none" />
          <circle cx="80" cy="148" r="3.5" fill="#cbd5e1" />

          <!-- Blocky Anime Head -->
          <rect x="52" y="64" width="56" height="50" rx="10" fill="#fff1e6" stroke="#222" stroke-width="3" />

          <!-- Cat-ear Hoodie Frame -->
          <path d="M42 62 C40 30 60 18 80 18 C100 18 120 30 118 62 C120 88 114 98 110 102 C104 70 100 35 80 35 C60 35 56 70 50 102 C46 98 40 88 42 62 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="3.5" />
          <!-- Cat Ears -->
          <polygon points="46,36 34,12 58,26" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
          <polygon points="48,34 39,18 54,27" fill="#fecdd3" />
          <polygon points="114,36 126,12 102,26" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
          <polygon points="112,34 121,18 106,27" fill="#fecdd3" />

          <!-- Wavy Ash-Blonde Hair Bangs -->
          <path d="M52 64 C56 48 70 46 80 48 C90 46 104 48 108 64 C100 58 92 68 80 62 C68 68 60 58 52 64 Z" fill="#e8dacb" stroke="#333" stroke-width="2" />
          <path d="M46 68 Q40 98 45 125 Q52 115 50 85 Z" fill="#e8dacb" stroke="#333" stroke-width="2" />

          <!-- Face -->
          ${eyeLeft}
          ${eyeRight}
          ${mouth}
          ${extras}

          <!-- Arms Resting on Table with soft drop shadow -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="url(#hoodieGrad)" stroke="#cbd5e1" stroke-width="3" />
          <rect x="22" y="170" width="26" height="18" rx="5" fill="#fff1e6" stroke="#cbd5e1" stroke-width="2.5" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="url(#hoodieGrad)" stroke="#cbd5e1" stroke-width="3" />
          <rect x="112" y="170" width="26" height="18" rx="5" fill="#fff1e6" stroke="#cbd5e1" stroke-width="2.5" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 2. ANIME CHARACTER 2: kenji (Shonen Flame Ninja)
  // ==========================================
  kenji: {
    id: 'kenji',
    name: 'Kenji',
    title: 'Shonen Flame Ninja',
    description: 'Energetic martial fighter with spiky black anime hair, crimson ninja forehead protector, and blazing slap strikes.',
    primaryColor: '#DC2626',
    secondaryColor: '#1E293B',
    accentColor: '#F59E0B',
    vfxType: 'hand_slap',
    vfxName: 'Flame Palm Burst',
    vfxDesc: 'Unleashes a blazing crimson palm strike engulfed in fiery anime sparks!',
    catchphrase: 'My fiery spirit will never hit a trap!',
    quotes: {
      turn: ["Focus my chakra... this chip is mine!", "Nothing can stop my blazing appetite!", "A true warrior picks with honor."],
      safe: ["YOSH! Pure delicious power!", "Crispy mastery! Try to keep up!", "Full energy restored!"],
      trap: ["N-NANI?! A HIDDEN EXPLOSIVE?!", "BAKANA! TRAPPED?!", "MY GUARD WAS DOWN!"],
      slap: ["SECRET ART: BLISTERING SLAP!", "TAKE MY BURNING STRIKE!", "FULL POWER SMACK!"],
      slapped: ["UGHH! A formidable counter!", "Not bad... but I won't yield!", "My headband took the brunt!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let eyeLeft = `<polygon points="62,88 74,90 64,94" fill="#111" /><circle cx="68" cy="91" r="2.2" fill="#fff" />`;
      let eyeRight = `<polygon points="98,88 86,90 96,94" fill="#111" /><circle cx="92" cy="91" r="2.2" fill="#fff" />`;
      let mouth = `<path d="M72 104 Q80 110 88 104" stroke="#111" stroke-width="3" fill="none" stroke-linecap="round" />`;

      if (expression === 'shocked') {
        eyeLeft = `<circle cx="68" cy="89" r="7" fill="#111" /><circle cx="67" cy="88" r="2.5" fill="#fff" />`;
        eyeRight = `<circle cx="92" cy="89" r="7" fill="#111" /><circle cx="91" cy="88" r="2.5" fill="#fff" />`;
        mouth = `<ellipse cx="80" cy="106" rx="7" ry="10" fill="#111" />`;
      } else if (expression === 'slapped') {
        eyeLeft = `<line x1="62" y1="86" x2="74" y2="94" stroke="#111" stroke-width="3.5" /><line x1="74" y1="86" x2="62" y2="94" stroke="#111" stroke-width="3.5" />`;
        eyeRight = `<line x1="86" y1="86" x2="98" y2="94" stroke="#111" stroke-width="3.5" /><line x1="98" y1="86" x2="86" y2="94" stroke="#111" stroke-width="3.5" />`;
        mouth = `<path d="M70 108 Q80 96 90 108" stroke="#111" stroke-width="3.5" fill="none" />`;
      } else if (expression === 'victorious') {
        mouth = `<path d="M70 100 Q80 116 90 100 Z" fill="#ef4444" stroke="#111" stroke-width="2" />`;
      }

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Dark Ninja Robe & Red Trim -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="#1e293b" stroke="#000" stroke-width="3" />
          <polygon points="56,118 80,145 104,118" fill="#dc2626" />
          <line x1="80" y1="145" x2="80" y2="180" stroke="#f59e0b" stroke-width="3" />

          <!-- Blocky Head -->
          <rect x="52" y="62" width="56" height="52" rx="8" fill="#fed7aa" stroke="#222" stroke-width="3" />

          <!-- Spiky Black Anime Hair -->
          <polygon points="46,55 35,32 55,42 65,18 78,38 90,14 98,36 118,22 112,48 126,42 118,65 50,65" fill="#0f172a" stroke="#020617" stroke-width="2.5" />

          <!-- Crimson Forehead Protector (Ninja Headband) -->
          <rect x="50" y="62" width="60" height="14" rx="2" fill="#dc2626" stroke="#000" stroke-width="2.5" />
          <rect x="70" y="64" width="20" height="10" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
          <circle cx="80" cy="69" r="2.5" fill="#dc2626" />

          <!-- Face -->
          ${eyeLeft}
          ${eyeRight}
          ${mouth}

          <!-- Arms on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="#1e293b" stroke="#000" stroke-width="3" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#fed7aa" stroke="#000" stroke-width="2.5" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="#1e293b" stroke="#000" stroke-width="3" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#fed7aa" stroke="#000" stroke-width="2.5" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 3. ANIME CHARACTER 3: aoi (Cyber Virtual Idol)
  // ==========================================
  aoi: {
    id: 'aoi',
    name: 'Aoi',
    title: 'Cyber Virtual Idol',
    description: 'Futuristic idol avatar with glowing cyan twin-tails, holographic cyber visor, and high-frequency soundwave slaps.',
    primaryColor: '#06B6D4',
    secondaryColor: '#3B82F6',
    accentColor: '#A855F7',
    vfxType: 'glitch',
    vfxName: 'Laser Pulse Shock',
    vfxDesc: 'Renders dazzling neon cyber soundwaves that overload your opponent!',
    catchphrase: 'Synchronizing table frequencies! Ready, go!',
    quotes: {
      turn: ["Analyzing potato density...", "Frequency check: 100% crunchy!", "Let's put on a table show!"],
      safe: ["Melodic crunch! That's an S-Rank!", "Safe note hit! Woohoo!", "Rhythm combo continuing!"],
      trap: ["SYSTEM OVERLOAD! TRAP DETECTED!", "KYAAA! My frequency dropped!", "WARNING: SLAP INCOMING!"],
      slap: ["CYBER BEAT DROP!", "SYNTH WAVE SMACK!", "SONIC SLAP RESONANCE!"],
      slapped: ["Owie! My twin-tails are desynced!", "B-buffering... recalibrating!", "That was off-key!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let mouth = `<path d="M75 104 Q80 108 85 104" stroke="#ec4899" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
      if (expression === 'shocked') mouth = `<ellipse cx="80" cy="106" rx="6" ry="8" fill="#111" />`;
      if (expression === 'victorious') mouth = `<path d="M74 102 Q80 112 86 102 Z" fill="#ec4899" />`;

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Cyan Twin-Tails -->
          <path d="M48 65 C20 60 12 110 24 165 C32 140 38 95 50 82 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="2.5" />
          <path d="M112 65 C140 60 148 110 136 165 C128 140 122 95 110 82 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="2.5" />

          <!-- Cyber Jacket -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="#0f172a" stroke="#06b6d4" stroke-width="2.5" />
          <line x1="80" y1="120" x2="80" y2="180" stroke="#06b6d4" stroke-width="3" />
          <circle cx="65" cy="145" r="4" fill="#a855f7" />
          <circle cx="95" cy="145" r="4" fill="#a855f7" />

          <!-- Head -->
          <rect x="52" y="62" width="56" height="52" rx="8" fill="#ffe4e6" stroke="#222" stroke-width="3" />
          <!-- Bangs -->
          <path d="M50 64 C56 50 70 48 80 50 C90 48 104 50 110 64 Z" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />

          <!-- Cyber Visor Glasses with Hologram Scan -->
          <rect x="55" y="78" width="50" height="18" rx="4" fill="rgba(6, 182, 212, 0.85)" stroke="#38bdf8" stroke-width="2" />
          <line x1="58" y1="87" x2="102" y2="87" stroke="#fff" stroke-width="2" stroke-dasharray="4,3" />

          ${mouth}

          <!-- Arms on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2.5" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#ffe4e6" stroke="#0891b2" stroke-width="2" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="2.5" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#ffe4e6" stroke="#0891b2" stroke-width="2" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 4. ANIME CHARACTER 4: ren (Blade Prodigy)
  // ==========================================
  ren: {
    id: 'ren',
    name: 'Ren',
    title: 'Blade Prodigy',
    description: 'Stoic samurai anime swordsman with spiky golden hair, traditional black haori, and lightning-quick table reflexes.',
    primaryColor: '#F59E0B',
    secondaryColor: '#18181B',
    accentColor: '#EF4444',
    vfxType: 'hand_slap',
    vfxName: 'Blade Smack Cut',
    vfxDesc: 'Slices through the air with a supersonic sonic blade slap!',
    catchphrase: 'The blade of destiny never hesitates.',
    quotes: {
      turn: ["My blade senses the safest chip.", "A warrior never flinches.", "Predictable table formations."],
      safe: ["Flawless cut. Delicious.", "Clean crunch. My blade approves.", "Next slice belongs to you."],
      trap: ["Tch! A concealed trap!", "Impossible... my senses missed it!", "Bracing for the strike..."],
      slap: ["THUNDER CUT SLAP!", "ONE STRIKE KNOCKOUT!", "TASTE THE BLADE SMACK!"],
      slapped: ["A solid blow... commendable.", "Hmph. I felt that.", "My resolve remains unshaken!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let mouth = `<line x1="74" y1="104" x2="86" y2="104" stroke="#111" stroke-width="3" stroke-linecap="round" />`;
      if (expression === 'shocked') mouth = `<ellipse cx="80" cy="106" rx="6" ry="9" fill="#111" />`;
      if (expression === 'victorious') mouth = `<path d="M74 102 Q80 110 86 102" stroke="#111" stroke-width="3" fill="none" />`;

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Samurai Haori -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="#18181b" stroke="#000" stroke-width="3" />
          <polygon points="60,118 80,148 100,118" fill="#f59e0b" />
          <circle cx="80" cy="160" r="6" fill="#ef4444" />

          <!-- Head -->
          <rect x="52" y="62" width="56" height="52" rx="8" fill="#ffedd5" stroke="#222" stroke-width="3" />

          <!-- Golden Spiky Anime Hair -->
          <polygon points="46,55 32,38 52,42 60,16 75,34 85,12 95,34 115,20 110,46 128,42 116,66 50,66" fill="#facc15" stroke="#ca8a04" stroke-width="2.5" />

          <!-- Eyes -->
          <line x1="62" y1="88" x2="74" y2="90" stroke="#111" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="68" cy="91" r="2" fill="#111" />
          <line x1="98" y1="88" x2="86" y2="90" stroke="#111" stroke-width="3.5" stroke-linecap="round" />
          <circle cx="92" cy="91" r="2" fill="#111" />

          ${mouth}

          <!-- Arms on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="#18181b" stroke="#000" stroke-width="3" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#ffedd5" stroke="#000" stroke-width="2.5" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="#18181b" stroke="#000" stroke-width="3" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#ffedd5" stroke="#000" stroke-width="2.5" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 5. ANIME CHARACTER 5: sakura (Kawaii Star Student)
  // ==========================================
  sakura: {
    id: 'sakura',
    name: 'Sakura',
    title: 'Kawaii Star Student',
    description: 'Cheerful anime girl with pastel pink twin buns, star hair clips, sailor ribbon uniform, and cute slap combos.',
    primaryColor: '#EC4899',
    secondaryColor: '#FDF2F8',
    accentColor: '#F472B6',
    vfxType: 'explosion',
    vfxName: 'Star Blossom Burst',
    vfxDesc: 'Detonates a dazzling shower of cherry blossoms and glittering golden stars!',
    catchphrase: 'Snack time is the best part of school!',
    quotes: {
      turn: ["Ooh, which crispy chip shall I eat?", "Star power guide my crunch!", "This looks so sweet and crunchy!"],
      safe: ["Yummy! 100% star rating! ⭐", "Hehe, perfectly safe! Your turn!", "Snack perfection achieved!"],
      trap: ["WAAAH! A SLAP IN MY SNACK?!", "NO FAIR! THAT STUNG!", "MY TWIN BUNS SHOOK!"],
      slap: ["CHERRY BLOSSOM SLAP!", "KAWAII SMACKDOWN!", "STAR BURST SMACK! ⭐"],
      slapped: ["Ouchie! My ribbon is ruined!", "Tears in my eyes... you meanie!", "Oof, right in the cheek!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let mouth = `<path d="M75 104 Q80 109 85 104" stroke="#e11d48" stroke-width="2.5" fill="none" stroke-linecap="round" />`;
      if (expression === 'shocked') mouth = `<circle cx="80" cy="106" r="7" fill="#111" />`;
      if (expression === 'victorious') mouth = `<path d="M74 102 Q80 114 86 102 Z" fill="#f43f5e" />`;

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Twin Buns -->
          <circle cx="44" cy="48" r="16" fill="#f472b6" stroke="#db2777" stroke-width="2.5" />
          <circle cx="116" cy="48" r="16" fill="#f472b6" stroke="#db2777" stroke-width="2.5" />
          <polygon points="44,40 46,45 51,45 47,48 49,53 44,50 39,53 41,48 37,45 42,45" fill="#fde047" />
          <polygon points="116,40 118,45 123,45 119,48 121,53 116,50 111,53 113,48 109,45 114,45" fill="#fde047" />

          <!-- Sailor Uniform -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="#f8fafc" stroke="#3b82f6" stroke-width="2.5" />
          <polygon points="56,118 80,138 104,118" fill="#3b82f6" />
          <polygon points="76,132 84,132 86,152 74,152" fill="#ef4444" />

          <!-- Head -->
          <rect x="52" y="62" width="56" height="52" rx="10" fill="#fff1f2" stroke="#222" stroke-width="3" />
          <path d="M50 64 C56 50 70 48 80 50 C90 48 104 50 110 64 Z" fill="#f472b6" stroke="#db2777" stroke-width="2" />

          <!-- Eyes -->
          <ellipse cx="68" cy="88" rx="5" ry="6" fill="#831843" /><circle cx="66" cy="86" r="2" fill="#fff" />
          <ellipse cx="92" cy="88" rx="5" ry="6" fill="#831843" /><circle cx="90" cy="86" r="2" fill="#fff" />
          <circle cx="60" cy="95" r="4" fill="#fca5a5" opacity="0.65" />
          <circle cx="100" cy="95" r="4" fill="#fca5a5" opacity="0.65" />

          ${mouth}

          <!-- Arms on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="#f8fafc" stroke="#3b82f6" stroke-width="2.5" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#fff1f2" stroke="#3b82f6" stroke-width="2" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="#f8fafc" stroke="#3b82f6" stroke-width="2.5" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#fff1f2" stroke="#3b82f6" stroke-width="2" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 6. ANIME CHARACTER 6: shinji (Mecha Vanguard)
  // ==========================================
  shinji: {
    id: 'shinji',
    name: 'Shinji',
    title: 'Mecha Vanguard',
    description: 'Determined mecha pilot with messy indigo anime hair, high-tech flight plugsuit, and high-energy plasma slaps.',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E1B4B',
    accentColor: '#10B981',
    vfxType: 'tornado',
    vfxName: 'Plasma Storm Burst',
    vfxDesc: 'Ignites a roaring vortex of emerald and sapphire plasma energy!',
    catchphrase: 'I won’t run away from a table showdown!',
    quotes: {
      turn: ["Pilot synchronization at 100%...", "Targeting coordinate row...", "Executing chip consumption protocol."],
      safe: ["Crunch confirmed! Power levels stable!", "Clean hit, no resistance!", "Reactor output optimal."],
      trap: ["CRITICAL ALARM! AMBUSH DETECTED!", "EJECT! IT'S A SLAP TRAP!", "HULL INTEGRITY COMPROMISED!"],
      slap: ["SYNCHRO SLAP STRIKE!", "PLASMA BURST CANNON!", "MAXIMUM IMPACT SLAP!"],
      slapped: ["Cockpit rattled! Damage control!", "Argh! Synchro rate dropped!", "Rebooting defensive systems!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let mouth = `<path d="M74 104 Q80 108 86 104" stroke="#111" stroke-width="2.5" fill="none" />`;
      if (expression === 'shocked') mouth = `<ellipse cx="80" cy="106" rx="6" ry="9" fill="#111" />`;
      if (expression === 'victorious') mouth = `<path d="M72 101 Q80 114 88 101 Z" fill="#2563eb" />`;

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Mecha Pilot Plugsuit Torso -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="#1e1b4b" stroke="#3b82f6" stroke-width="3" />
          <polygon points="60,118 80,140 100,118" fill="#3b82f6" />
          <circle cx="80" cy="155" r="5" fill="#10b981" />
          <line x1="60" y1="165" x2="100" y2="165" stroke="#10b981" stroke-width="2" />

          <!-- Head -->
          <rect x="52" y="62" width="56" height="52" rx="8" fill="#fed7aa" stroke="#222" stroke-width="3" />

          <!-- Messy Indigo Hair -->
          <polygon points="46,55 35,35 52,42 62,16 76,34 88,14 100,34 116,24 112,48 126,45 116,68 50,68" fill="#312e81" stroke="#1e1b4b" stroke-width="2.5" />

          <!-- Headset -->
          <rect x="48" y="75" width="6" height="14" rx="2" fill="#10b981" />
          <rect x="106" y="75" width="6" height="14" rx="2" fill="#10b981" />

          <!-- Eyes -->
          <polygon points="63,88 73,89 65,93" fill="#1e40af" /><circle cx="68" cy="90" r="1.8" fill="#60a5fa" />
          <polygon points="97,88 87,89 95,93" fill="#1e40af" /><circle cx="92" cy="90" r="1.8" fill="#60a5fa" />

          ${mouth}

          <!-- Arms on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="#1e1b4b" stroke="#3b82f6" stroke-width="3" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#3b82f6" stroke="#1e1b4b" stroke-width="2" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="#1e1b4b" stroke="#3b82f6" stroke-width="3" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#3b82f6" stroke="#1e1b4b" stroke-width="2" />
        </svg>
      `;
    }
  },

  // ==========================================
  // 7. ROBOT OPPONENT: robo_chip (Robo-Chip 3000)
  // ==========================================
  robo_chip: {
    id: 'robo_chip',
    name: 'Robo-Chip 3000',
    title: 'AI Tabletop Automaton',
    description: 'Chrome-plated robotic competitor equipped with sensor antennae, digital eye display, and hydraulic slap mechanics.',
    primaryColor: '#64748B',
    secondaryColor: '#0EA5E9',
    accentColor: '#EF4444',
    vfxType: 'glitch',
    vfxName: 'Electro-Shock Overload',
    vfxDesc: 'Discharges 50,000 volts of pure robotic vengeance into your chips!',
    catchphrase: 'CALCULATING OPTIMAL SLAP TRAJECTORY... PROBABILITY OF WIN: 99.8%.',
    quotes: {
      turn: ["BEEP-BOOP! SCANNING TRAY THERMAL SIGNATURE...", "COMPUTING TASTE ALGORITHM...", "CHIP SELECTED VIA RANDOM SEED."],
      safe: ["CRUNCH EXECUTED WITH 0% ERROR.", "DIGESTION SUBROUTINE: COMPLETE.", "PROBABILITY FAVORS THE MACHINE."],
      trap: ["WARNING! SLAP TRAP CONTACT!", "ERROR 404: SAFETY NOT FOUND!", "CORE TEMPERATURE CRITICAL!"],
      slap: ["MAXIMUM HYDRAULIC SLAP DEPLOYED!", "DELIVERING PHYSICAL MALWARE!", "TERMINATION SEQUENCE ACTIVE!"],
      slapped: ["GEARS RATTLING! BZZZZT!", "CIRCUIT COMPROMISED! REBOOTING...", "HYDRAULIC PRESSURE REDUCED!"]
    },
    drawAvatarSvg: function(expression = 'idle', width = 160, height = 200) {
      let visorFill = '#00f0ff';
      let eyeGraphic = `
        <rect x="64" y="84" width="10" height="6" rx="2" fill="#00f0ff" />
        <rect x="86" y="84" width="10" height="6" rx="2" fill="#00f0ff" />
        <line x1="68" y1="102" x2="92" y2="102" stroke="#00f0ff" stroke-width="3" stroke-dasharray="4,2" />
      `;

      if (expression === 'nervous') {
        visorFill = '#facc15';
        eyeGraphic = `
          <rect x="64" y="84" width="10" height="4" fill="#facc15" />
          <rect x="86" y="84" width="10" height="4" fill="#facc15" />
          <path d="M68 104 Q80 98 92 104" stroke="#facc15" stroke-width="3" fill="none" />
        `;
      } else if (expression === 'shocked') {
        visorFill = '#ef4444';
        eyeGraphic = `
          <circle cx="68" cy="86" r="6" fill="#ef4444" /><text x="65" y="90" fill="#fff" font-size="9" font-family="monospace">!</text>
          <circle cx="92" cy="86" r="6" fill="#ef4444" /><text x="89" y="90" fill="#fff" font-size="9" font-family="monospace">!</text>
          <rect x="72" y="100" width="16" height="6" fill="#ef4444" />
        `;
      } else if (expression === 'slapped') {
        visorFill = '#a855f7';
        eyeGraphic = `
          <line x1="62" y1="80" x2="74" y2="92" stroke="#ef4444" stroke-width="3" /><line x1="74" y1="80" x2="62" y2="92" stroke="#ef4444" stroke-width="3" />
          <line x1="86" y1="80" x2="98" y2="92" stroke="#ef4444" stroke-width="3" /><line x1="98" y1="80" x2="86" y2="92" stroke="#ef4444" stroke-width="3" />
          <text x="66" y="105" fill="#ef4444" font-size="8" font-family="monospace">ERR_0x1</text>
        `;
      } else if (expression === 'victorious') {
        visorFill = '#10b981';
        eyeGraphic = `
          <polygon points="68,80 71,87 78,87 72,91 75,98 68,94 62,98 64,91 59,87 66,87" fill="#10b981" />
          <polygon points="92,80 95,87 102,87 96,91 99,98 92,94 86,98 88,91 83,87 90,87" fill="#10b981" />
          <path d="M70 102 Q80 110 90 102" stroke="#10b981" stroke-width="3" fill="none" />
        `;
      }

      return `
        <svg viewBox="0 0 160 200" width="${width}" height="${height}" class="avatar-seated-svg expression-${expression}">
          <defs>
            <linearGradient id="chromeChassis" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="50%" stop-color="#475569"/>
              <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
            <radialGradient id="arcReactor" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="40%" stop-color="#00f0ff"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </radialGradient>
          </defs>

          <!-- Wooden Chair -->
          <rect x="34" y="22" width="92" height="98" rx="5" fill="#6d4122" stroke="#381d0b" stroke-width="3.5" />
          <line x1="54" y1="26" x2="54" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="80" y1="26" x2="80" y2="118" stroke="#381d0b" stroke-width="5" />
          <line x1="106" y1="26" x2="106" y2="118" stroke="#381d0b" stroke-width="5" />
          <rect x="30" y="20" width="100" height="12" rx="4" fill="#a0693e" stroke="#381d0b" stroke-width="3" />

          <!-- Dual Antennae with Blinking Beacons -->
          <line x1="72" y1="60" x2="68" y2="28" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
          <circle cx="68" cy="24" r="5" fill="${visorFill}" stroke="#0f172a" stroke-width="2" />
          <line x1="88" y1="60" x2="92" y2="28" stroke="#64748b" stroke-width="4" stroke-linecap="round" />
          <circle cx="92" cy="24" r="5" fill="${visorFill}" stroke="#0f172a" stroke-width="2" />

          <!-- Chrome Torso Chassis -->
          <rect x="46" y="118" width="68" height="66" rx="8" fill="url(#chromeChassis)" stroke="#0f172a" stroke-width="3.5" />
          <!-- Chest Arc Reactor Power Core -->
          <circle cx="80" cy="148" r="14" fill="#0f172a" stroke="#00f0ff" stroke-width="2" />
          <circle cx="80" cy="148" r="9" fill="url(#arcReactor)" />
          <!-- Rivets -->
          <circle cx="52" cy="125" r="2.5" fill="#cbd5e1" />
          <circle cx="108" cy="125" r="2.5" fill="#cbd5e1" />
          <circle cx="52" cy="177" r="2.5" fill="#cbd5e1" />
          <circle cx="108" cy="177" r="2.5" fill="#cbd5e1" />

          <!-- Metal Head Chassis -->
          <rect x="48" y="58" width="64" height="56" rx="8" fill="url(#chromeChassis)" stroke="#0f172a" stroke-width="3.5" />
          <!-- Sensor Bolts -->
          <rect x="42" y="74" width="7" height="22" rx="2" fill="#334155" stroke="#0f172a" stroke-width="2" />
          <rect x="111" y="74" width="7" height="22" rx="2" fill="#334155" stroke="#0f172a" stroke-width="2" />

          <!-- Digital LED Visor Screen -->
          <rect x="54" y="72" width="52" height="34" rx="5" fill="#090d16" stroke="#00f0ff" stroke-width="2" />
          ${eyeGraphic}

          <!-- Hydraulic Robotic Arms Resting on Table -->
          <path d="M46 124 L28 148 L32 175 L52 175 L48 138 Z" fill="url(#chromeChassis)" stroke="#0f172a" stroke-width="3" />
          <rect x="22" y="170" width="26" height="18" rx="4" fill="#94a3b8" stroke="#0f172a" stroke-width="2.5" />
          <path d="M114 124 L132 148 L128 175 L108 175 L112 138 Z" fill="url(#chromeChassis)" stroke="#0f172a" stroke-width="3" />
          <rect x="112" y="170" width="26" height="18" rx="4" fill="#94a3b8" stroke="#0f172a" stroke-width="2.5" />
        </svg>
      `;
    }
  }
};

// Aliases for backwards compatibility
CHARACTERS.bacon_hair = CHARACTERS.kenji;
CHARACTERS.noob = CHARACTERS.sap1kaa;
CHARACTERS.classic_rookie = CHARACTERS.robo_chip;
CHARACTERS.troll_king = CHARACTERS.shinji;

// Image 5 Reference: Fatal Slap Troll Win & Crying Blue KO Overlays
CHARACTERS.getTrollWinSvg = function(width = 120, height = 120) {
  return `
    <svg viewBox="0 0 100 100" width="${width}" height="${height}" class="troll-face-svg">
      <ellipse cx="50" cy="50" rx="46" ry="44" fill="#ffffff" stroke="#111" stroke-width="4" />
      <!-- Arching Smug Eyebrows -->
      <path d="M22 34 Q34 22 46 32" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />
      <path d="M54 32 Q66 22 78 34" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round" />
      <!-- Squinting Eyes -->
      <path d="M26 42 Q34 38 42 42" stroke="#111" stroke-width="3.5" fill="none" />
      <circle cx="34" cy="40" r="2.5" fill="#111" />
      <path d="M58 42 Q66 38 74 42" stroke="#111" stroke-width="3.5" fill="none" />
      <circle cx="66" cy="40" r="2.5" fill="#111" />
      <!-- Big Iconic Troll Grin with Teeth -->
      <path d="M20 54 Q50 92 80 54 Q50 68 20 54 Z" fill="#ffffff" stroke="#111" stroke-width="4" stroke-linejoin="round" />
      <line x1="30" y1="58" x2="30" y2="68" stroke="#111" stroke-width="2.5" />
      <line x1="40" y1="62" x2="40" y2="76" stroke="#111" stroke-width="2.5" />
      <line x1="50" y1="64" x2="50" y2="80" stroke="#111" stroke-width="2.5" />
      <line x1="60" y1="62" x2="60" y2="76" stroke="#111" stroke-width="2.5" />
      <line x1="70" y1="58" x2="70" y2="68" stroke="#111" stroke-width="2.5" />
      <line x1="22" y1="62" x2="78" y2="62" stroke="#111" stroke-width="2" />
      <path d="M14 50 Q18 56 22 54" stroke="#111" stroke-width="2.5" fill="none" />
      <path d="M86 50 Q82 56 78 54" stroke="#111" stroke-width="2.5" fill="none" />
    </svg>
  `;
};

CHARACTERS.getCryingKoSvg = function(width = 120, height = 120) {
  return `
    <svg viewBox="0 0 100 100" width="${width}" height="${height}" class="crying-ko-svg">
      <!-- Blue-tinted sobbing face -->
      <circle cx="50" cy="50" r="45" fill="#38bdf8" stroke="#0369a1" stroke-width="4" />
      <!-- Sad Angled Eyebrows -->
      <path d="M22 28 L40 36" stroke="#075985" stroke-width="4.5" stroke-linecap="round" />
      <path d="M78 28 L60 36" stroke="#075985" stroke-width="4.5" stroke-linecap="round" />
      <!-- Tightly shut crying eyes -->
      <path d="M25 44 L38 44" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
      <path d="M62 44 L75 44" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
      <!-- Giant streaming tear waterfalls -->
      <path d="M24 46 C20 60 16 85 24 100 C30 100 32 80 30 46 Z" fill="#67e8f9" opacity="0.95" stroke="#0284c7" stroke-width="1.5" />
      <path d="M70 46 C68 80 70 100 76 100 C84 85 80 60 76 46 Z" fill="#67e8f9" opacity="0.95" stroke="#0284c7" stroke-width="1.5" />
      <!-- Wide open wailing mouth -->
      <ellipse cx="50" cy="70" rx="18" ry="16" fill="#0f172a" stroke="#0369a1" stroke-width="3" />
      <ellipse cx="50" cy="76" rx="10" ry="7" fill="#f43f5e" />
    </svg>
  `;
};

if (typeof window !== 'undefined') {
  window.CHARACTERS = CHARACTERS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHARACTERS };
}
