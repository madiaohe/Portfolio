import { useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Icon drawing functions (simple stroked paths ~16×16)               */
/* ------------------------------------------------------------------ */
type IconDrawFn = (ctx: CanvasRenderingContext2D, s: number) => void;

const eye: IconDrawFn = (ctx, s) => {
  const h = s * 0.35;
  ctx.beginPath();
  ctx.moveTo(-s / 2, 0);
  ctx.bezierCurveTo(-s / 4, -h, s / 4, -h, s / 2, 0);
  ctx.bezierCurveTo(s / 4, h, -s / 4, h, -s / 2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.12, 0, Math.PI * 2);
  ctx.stroke();
};

const star: IconDrawFn = (ctx, s) => {
  const r = s * 0.45;
  const ri = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 2) * -1 + (Math.PI / 5) * i;
    const rad = i % 2 === 0 ? r : ri;
    const fn = i === 0 ? ctx.moveTo : ctx.lineTo;
    fn.call(ctx, Math.cos(a) * rad, Math.sin(a) * rad);
  }
  ctx.closePath();
  ctx.stroke();
};

const heart: IconDrawFn = (ctx, s) => {
  const r = s * 0.45;
  ctx.beginPath();
  ctx.moveTo(0, r * 0.35);
  ctx.bezierCurveTo(-r, -r * 0.2, -r * 0.5, -r, 0, -r * 0.45);
  ctx.bezierCurveTo(r * 0.5, -r, r, -r * 0.2, 0, r * 0.35);
  ctx.stroke();
};

const codeBrackets: IconDrawFn = (ctx, s) => {
  const h = s * 0.35;
  const w = s * 0.2;
  ctx.beginPath();
  ctx.moveTo(-w, -h);
  ctx.lineTo(-w * 2, 0);
  ctx.lineTo(-w, h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w, -h);
  ctx.lineTo(w * 2, 0);
  ctx.lineTo(w, h);
  ctx.stroke();
};

const pen: IconDrawFn = (ctx, s) => {
  const h = s * 0.4;
  ctx.beginPath();
  ctx.moveTo(-h * 0.15, h);
  ctx.lineTo(-h * 0.6, h * 0.55);
  ctx.lineTo(h * 0.4, -h);
  ctx.lineTo(h * 0.6, -h * 0.8);
  ctx.lineTo(-h * 0.4, h * 0.75);
  ctx.closePath();
  ctx.stroke();
};

const camera: IconDrawFn = (ctx, s) => {
  const w = s * 0.4;
  const h = s * 0.3;
  ctx.strokeRect(-w, -h * 0.6, w * 2, h * 1.5);
  ctx.beginPath();
  ctx.moveTo(-w * 0.3, -h * 0.6);
  ctx.lineTo(-w * 0.1, -h);
  ctx.lineTo(w * 0.1, -h);
  ctx.lineTo(w * 0.3, -h * 0.6);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, h * 0.15, h * 0.4, 0, Math.PI * 2);
  ctx.stroke();
};

const lightning: IconDrawFn = (ctx, s) => {
  const h = s * 0.45;
  ctx.beginPath();
  ctx.moveTo(h * 0.15, -h);
  ctx.lineTo(-h * 0.25, h * 0.05);
  ctx.lineTo(h * 0.05, h * 0.05);
  ctx.lineTo(-h * 0.15, h);
  ctx.lineTo(h * 0.25, -h * 0.05);
  ctx.lineTo(-h * 0.05, -h * 0.05);
  ctx.closePath();
  ctx.stroke();
};

const musicNote: IconDrawFn = (ctx, s) => {
  const h = s * 0.4;
  ctx.beginPath();
  ctx.moveTo(h * 0.2, -h);
  ctx.lineTo(h * 0.2, h * 0.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(-h * 0.05, h * 0.6, h * 0.25, h * 0.2, -0.3, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(h * 0.2, -h);
  ctx.lineTo(h * 0.5, -h * 0.7);
  ctx.lineTo(h * 0.5, -h * 0.3);
  ctx.stroke();
};

const compass: IconDrawFn = (ctx, s) => {
  const r = s * 0.4;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.7);
  ctx.lineTo(r * 0.2, 0);
  ctx.lineTo(0, r * 0.7);
  ctx.lineTo(-r * 0.2, 0);
  ctx.closePath();
  ctx.stroke();
};

const sun: IconDrawFn = (ctx, s) => {
  const r = s * 0.2;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 1.4, Math.sin(a) * r * 1.4);
    ctx.lineTo(Math.cos(a) * r * 2, Math.sin(a) * r * 2);
    ctx.stroke();
  }
};

const moon: IconDrawFn = (ctx, s) => {
  const r = s * 0.35;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(r * 0.4, -r * 0.3, r * 0.75, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  // re-draw outline
  ctx.beginPath();
  ctx.arc(r * 0.4, -r * 0.3, r * 0.75, 0, Math.PI * 2);
  ctx.stroke();
};

const diamond: IconDrawFn = (ctx, s) => {
  const h = s * 0.4;
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(h * 0.7, 0);
  ctx.lineTo(0, h);
  ctx.lineTo(-h * 0.7, 0);
  ctx.closePath();
  ctx.stroke();
};

const hexagon: IconDrawFn = (ctx, s) => {
  const r = s * 0.38;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const fn = i === 0 ? ctx.moveTo : ctx.lineTo;
    fn.call(ctx, Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.stroke();
};

const plus: IconDrawFn = (ctx, s) => {
  const h = s * 0.35;
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(0, h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-h, 0);
  ctx.lineTo(h, 0);
  ctx.stroke();
};

const arrowUp: IconDrawFn = (ctx, s) => {
  const h = s * 0.35;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, -h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-h * 0.5, -h * 0.4);
  ctx.lineTo(0, -h);
  ctx.lineTo(h * 0.5, -h * 0.4);
  ctx.stroke();
};

const triangle: IconDrawFn = (ctx, s) => {
  const r = s * 0.38;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.87, r * 0.5);
  ctx.lineTo(-r * 0.87, r * 0.5);
  ctx.closePath();
  ctx.stroke();
};

const grid: IconDrawFn = (ctx, s) => {
  const h = s * 0.35;
  ctx.strokeRect(-h, -h, h * 2, h * 2);
  ctx.beginPath();
  ctx.moveTo(0, -h);
  ctx.lineTo(0, h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-h, 0);
  ctx.lineTo(h, 0);
  ctx.stroke();
};

const wave: IconDrawFn = (ctx, s) => {
  const w = s * 0.4;
  const h = s * 0.15;
  ctx.beginPath();
  ctx.moveTo(-w, 0);
  ctx.bezierCurveTo(-w * 0.5, -h * 2, 0, -h * 2, w * 0.25, 0);
  ctx.bezierCurveTo(w * 0.5, h * 2, w * 0.75, h * 2, w, 0);
  ctx.stroke();
};

const iconDrawFns: IconDrawFn[] = [
  eye, star, heart, codeBrackets, pen, camera, lightning,
  musicNote, compass, sun, diamond, hexagon, plus,
  arrowUp, triangle, grid, wave, moon,
];

/* ------------------------------------------------------------------ */
/*  Particle                                                           */
/* ------------------------------------------------------------------ */
interface Particle {
  // base sphere position (unit sphere)
  theta: number;
  phi: number;
  iconIdx: number;
  size: number;
}

/* ------------------------------------------------------------------ */
/*  Fibonacci sphere distribution                                      */
/* ------------------------------------------------------------------ */
function fibSphere(count: number): { theta: number; phi: number }[] {
  const pts: { theta: number; phi: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 → 1
    const theta = goldenAngle * i;
    const phi = Math.acos(y);
    pts.push({ theta, phi });
  }
  return pts;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const PARTICLE_COUNT = 180;
const COLOR = '#AFAEA7';
const AUTO_SPEED = 0.0008;      // rad/frame auto-rotation
const DRAG_SENSITIVITY = 0.004; // mouse px → radians
const FRICTION = 0.95;          // velocity decay after release
const MIN_VEL = 0.00005;        // below this, snap to zero

export function IconSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  /* rotation state */
  const rotYRef = useRef(0);
  const rotXRef = useRef(0);
  const velYRef = useRef(0);
  const velXRef = useRef(0);

  /* drag state */
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  /* sphere bounds for hit-testing (updated each frame) */
  const sphereBoundsRef = useRef({ cx: 0, cy: 0, radius: 0 });

  /** Check if a point (in canvas-local coords) is inside the sphere circle */
  const isInsideSphere = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const { cx, cy, radius } = sphereBoundsRef.current;
    const dx = localX - cx;
    const dy = localY - cy;
    return dx * dx + dy * dy <= radius * radius;
  }, []);

  const init = useCallback(() => {
    const pts = fibSphere(PARTICLE_COUNT);
    particlesRef.current = pts.map((p, i) => ({
      theta: p.theta,
      phi: p.phi,
      iconIdx: i % iconDrawFns.length,
      size: 14 + Math.random() * 6,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    init();

    /* ---- resize -------------------------------------------------- */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sizeRef.current = { w, h, dpr };
    };
    resize();
    window.addEventListener('resize', resize);

    /* ---- drag interaction ---------------------------------------- */
    const onMouseDown = (e: MouseEvent) => {
      if (!isInsideSphere(e.clientX, e.clientY)) return;
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
      // kill existing momentum on grab
      velYRef.current = 0;
      velXRef.current = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      // update cursor based on hover over sphere
      if (!isDraggingRef.current) {
        canvas.style.cursor = isInsideSphere(e.clientX, e.clientY) ? 'grab' : 'default';
      }
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      velYRef.current = dx * DRAG_SENSITIVITY;
      velXRef.current = dy * DRAG_SENSITIVITY;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      if (isDraggingRef.current) {
        canvas.style.cursor = 'grab';
      }
      isDraggingRef.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    /* ---- touch support ------------------------------------------- */
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (!isInsideSphere(e.touches[0].clientX, e.touches[0].clientY)) return;
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      velYRef.current = 0;
      velXRef.current = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMouseRef.current.x;
      const dy = e.touches[0].clientY - lastMouseRef.current.y;
      velYRef.current = dx * DRAG_SENSITIVITY;
      velXRef.current = dy * DRAG_SENSITIVITY;
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);

    /* ---- animation loop ------------------------------------------ */
    const loop = () => {
      const { w, h, dpr } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.32;

      /* update sphere bounds for hit-testing */
      sphereBoundsRef.current = { cx, cy, radius };

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      /* — update rotation — */
      if (isDraggingRef.current) {
        // apply drag velocity directly
        rotYRef.current += velYRef.current;
        rotXRef.current += velXRef.current;
      } else {
        // apply inertia
        if (Math.abs(velYRef.current) > MIN_VEL || Math.abs(velXRef.current) > MIN_VEL) {
          rotYRef.current += velYRef.current;
          rotXRef.current += velXRef.current;
          velYRef.current *= FRICTION;
          velXRef.current *= FRICTION;
          if (Math.abs(velYRef.current) < MIN_VEL) velYRef.current = 0;
          if (Math.abs(velXRef.current) < MIN_VEL) velXRef.current = 0;
        } else {
          // auto-rotate when idle
          rotYRef.current += AUTO_SPEED;
        }
      }

      // clamp rotX to avoid flipping
      rotXRef.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, rotXRef.current));

      const rotY = rotYRef.current;
      const rotX = rotXRef.current;

      const particles = particlesRef.current;

      // compute projected positions & sort by depth
      const projected: {
        sx: number;
        sy: number;
        sz: number;
        p: Particle;
        scale: number;
        alpha: number;
      }[] = [];

      const cosRY = Math.cos(rotY);
      const sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX);
      const sinRX = Math.sin(rotX);

      for (const p of particles) {
        // sphere base position
        const sinPhi = Math.sin(p.phi);
        const bx = sinPhi * Math.cos(p.theta) * radius;
        const by = Math.cos(p.phi) * radius;
        const bz = sinPhi * Math.sin(p.theta) * radius;

        // rotate Y (horizontal drag)
        const rx1 = bx * cosRY - bz * sinRY;
        const rz1 = bx * sinRY + bz * cosRY;
        const ry1 = by;

        // rotate X (vertical drag)
        const ry2 = ry1 * cosRX - rz1 * sinRX;
        const rz2 = ry1 * sinRX + rz1 * cosRX;
        const rx2 = rx1;

        const tx = cx + rx2;
        const ty = cy + ry2;
        const tz = rz2;

        // perspective
        const perspective = 800;
        const scale = perspective / (perspective + tz);
        const sx = tx;
        const sy = ty;
        const alpha = Math.max(0.15, Math.min(1, 0.35 + scale * 0.65));

        projected.push({ sx, sy, sz: tz, p, scale, alpha });
      }

      // sort back-to-front
      projected.sort((a, b) => a.sz - b.sz);

      // draw
      for (const { sx, sy, p, scale, alpha } of projected) {
        const s = p.size * scale;
        if (s < 2) continue;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = COLOR;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        iconDrawFns[p.iconIdx](ctx, p.size);

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, [init, isInsideSphere]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ cursor: 'default' }}
    />
  );
}