/**
 * ZeroGravityPhysics - Matter.js 2D Anti-Gravity Physics Engine
 * Creates interactive zero-gravity floating chips, badges, cards, and debris bursts.
 */
class ZeroGravityPhysics {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.engine = null;
    this.render = null;
    this.runner = null;
    this.bodies = [];
    this.walls = [];
    this.mouseConstraint = null;
    this.debrisBodies = [];
    this.isInitialized = false;
    this.microImpulseInterval = null;
  }

  init() {
    if (this.isInitialized) return;

    // Check if Matter is loaded from CDN
    if (typeof Matter === 'undefined') {
      console.warn('Matter.js not detected. Retrying in 200ms...');
      setTimeout(() => this.init(), 200);
      return;
    }

    const { Engine, Render, Runner, World, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Vector } = Matter;

    // Create engine with zero gravity
    this.engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 }
    });

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create custom renderer on the provided canvas
    this.render = Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
        showSleeping: false
      }
    });

    Render.run(this.render);

    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    // Setup bounding walls
    this._createWalls(width, height);

    // Setup interactive mouse / touch dragging
    const mouse = Mouse.create(this.render.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: {
          visible: false
        }
      }
    });
    Composite.add(this.engine.world, this.mouseConstraint);
    this.render.mouse = mouse;

    // Spawn initial floating zero-gravity elements
    this._spawnFloatingElements(width, height);

    // Micro-impulse timer to keep objects gently drifting in zero gravity
    this._startMicroImpulses();

    // Listen to resize
    window.addEventListener('resize', () => this.handleResize());

    this.isInitialized = true;
  }

  _createWalls(width, height) {
    const { Bodies, Composite } = Matter;
    const thickness = 100;

    // Remove existing walls if any
    if (this.walls.length > 0) {
      Composite.remove(this.engine.world, this.walls);
      this.walls = [];
    }

    const wallOptions = {
      isStatic: true,
      restitution: 0.9,
      friction: 0.05,
      render: { visible: false }
    };

    const top = Bodies.rectangle(width / 2, -thickness / 2, width * 2, thickness, wallOptions);
    const bottom = Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, wallOptions);
    const left = Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const right = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);

    this.walls = [top, bottom, left, right];
    Composite.add(this.engine.world, this.walls);
  }

  _spawnFloatingElements(width, height) {
    const { Bodies, Composite, Body } = Matter;

    const itemsCount = Math.max(8, Math.min(18, Math.floor(width / 90)));
    const chipColors = ['#FFC107', '#FF9800', '#FF5722', '#E91E63', '#00E5FF', '#76FF03'];

    for (let i = 0; i < itemsCount; i++) {
      const x = Math.random() * (width - 120) + 60;
      const y = Math.random() * (height - 120) + 60;
      const radius = 24 + Math.random() * 16;
      const color = chipColors[i % chipColors.length];

      // Alternating between circular crispy chips, snack cards, and star badges
      let body;
      const type = i % 3;

      if (type === 0) {
        // Oval crisp chip
        body = Bodies.circle(x, y, radius, {
          restitution: 0.88,
          frictionAir: 0.008,
          density: 0.001,
          render: {
            fillStyle: color,
            strokeStyle: '#222',
            lineWidth: 3
          }
        });
      } else if (type === 1) {
        // Playing card / chip pack
        body = Bodies.rectangle(x, y, radius * 1.6, radius * 2.2, {
          restitution: 0.82,
          frictionAir: 0.01,
          density: 0.0015,
          chamfer: { radius: 6 },
          render: {
            fillStyle: '#1E293B',
            strokeStyle: color,
            lineWidth: 3
          }
        });
      } else {
        // Triangular nacho chip
        body = Bodies.polygon(x, y, 3, radius * 1.3, {
          restitution: 0.85,
          frictionAir: 0.009,
          density: 0.001,
          render: {
            fillStyle: '#F59E0B',
            strokeStyle: '#78350F',
            lineWidth: 3
          }
        });
      }

      // Initial gentle drift velocity
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.2,
        y: (Math.random() - 0.5) * 2.2
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      this.bodies.push(body);
    }

    Composite.add(this.engine.world, this.bodies);
  }

  _startMicroImpulses() {
    const { Body } = Matter;
    // Every 4 seconds, nudge objects that have slowed down to preserve zero-gravity feel
    this.microImpulseInterval = setInterval(() => {
      if (!this.engine) return;
      this.bodies.forEach(body => {
        const speed = Body.getSpeed(body);
        if (speed < 0.3) {
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.0012,
            y: (Math.random() - 0.5) * 0.0012
          });
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);
        }
      });
    }, 3500);
  }

  /**
   * Spawns an explosive burst of 30+ physical bodies on Fatal Slap!
   * @param {number} originX Screen X
   * @param {number} originY Screen Y
   */
  explodeFatalSlapDebris(originX, originY) {
    if (!this.engine) return;
    const { Bodies, Composite, Body } = Matter;

    const x = originX || window.innerWidth / 2;
    const y = originY || window.innerHeight / 2;
    const debrisCount = 35;
    const colors = ['#FFD700', '#FF3D00', '#00E5FF', '#FFEB3B', '#E040FB', '#FFFFFF'];

    const newDebris = [];

    for (let i = 0; i < debrisCount; i++) {
      const radius = 10 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      const speed = 7 + Math.random() * 16;
      const color = colors[i % colors.length];

      // Alternating shapes: small circles (coins/chips) and triangles/squares (fragments)
      let body;
      const shapeType = i % 3;

      if (shapeType === 0) {
        body = Bodies.circle(x, y, radius, {
          restitution: 0.95,
          frictionAir: 0.004,
          density: 0.002,
          render: { fillStyle: color, strokeStyle: '#111', lineWidth: 2 }
        });
      } else if (shapeType === 1) {
        body = Bodies.rectangle(x, y, radius * 1.5, radius * 1.5, {
          restitution: 0.9,
          frictionAir: 0.005,
          density: 0.002,
          render: { fillStyle: color, strokeStyle: '#111', lineWidth: 2 }
        });
      } else {
        body = Bodies.polygon(x, y, 3, radius * 1.2, {
          restitution: 0.92,
          frictionAir: 0.005,
          density: 0.002,
          render: { fillStyle: color, strokeStyle: '#111', lineWidth: 2 }
        });
      }

      Body.setVelocity(body, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);

      newDebris.push(body);
    }

    Composite.add(this.engine.world, newDebris);
    this.debrisBodies.push(...newDebris);

    // Clean up debris bodies after 12 seconds so performance remains top-notch
    setTimeout(() => {
      if (this.engine) {
        Composite.remove(this.engine.world, newDebris);
        this.debrisBodies = this.debrisBodies.filter(b => !newDebris.includes(b));
      }
    }, 12000);
  }

  handleResize() {
    if (!this.render || !this.engine) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.render.canvas.width = width;
    this.render.canvas.height = height;
    this.render.options.width = width;
    this.render.options.height = height;

    this._createWalls(width, height);
  }

  /**
   * Spawns an extra floating chip into zero gravity
   */
  spawnExtraFloatingChip(color = '#FFC107', x = null, y = null) {
    if (!this.engine) return;
    const { Bodies, Composite, Body } = Matter;

    const posX = x !== null ? x : window.innerWidth / 2 + (Math.random() - 0.5) * 100;
    const posY = y !== null ? y : window.innerHeight / 2 + (Math.random() - 0.5) * 100;
    const radius = 26 + Math.random() * 12;

    const chip = Bodies.circle(posX, posY, radius, {
      restitution: 0.9,
      frictionAir: 0.008,
      density: 0.001,
      render: {
        fillStyle: color,
        strokeStyle: '#111',
        lineWidth: 3
      }
    });

    Body.setVelocity(chip, {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8
    });
    Body.setAngularVelocity(chip, (Math.random() - 0.5) * 0.15);

    Composite.add(this.engine.world, chip);
    this.bodies.push(chip);
    return chip;
  }

  /**
   * Shakes and scatters all floating zero-g bodies
   */
  nudgeAllBodies() {
    if (!this.engine) return;
    const { Body } = Matter;

    this.bodies.forEach(body => {
      Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
    });
  }

  destroy() {
    if (this.microImpulseInterval) {
      clearInterval(this.microImpulseInterval);
    }
    if (this.runner) {
      Matter.Runner.stop(this.runner);
    }
    if (this.render) {
      Matter.Render.stop(this.render);
    }
    if (this.engine) {
      Matter.World.clear(this.engine.world);
      Matter.Engine.clear(this.engine);
    }
  }
}

window.ZeroGravityPhysics = ZeroGravityPhysics;
