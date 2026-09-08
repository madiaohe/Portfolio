'use client';

import { useEffect, useRef, useState } from 'react';

type MarbleControls = {
  scale: number;
  bands: number;
  detail: number;
  speed: number;
  warp: number;
  contrast: number;
  interaction: number;
  radius: number;
};

type MarbleSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  displayValue: string;
  onChange: (value: number) => void;
};

const DEFAULT_CONTROLS: MarbleControls = {
  scale: 2.6,
  bands: 180,
  detail: 0,
  speed: 0.4,
  warp: 3.84,
  contrast: 0.06,
  interaction: 0.9,
  radius: 0.17,
};

function MarbleSlider({
  label,
  min,
  max,
  step,
  value,
  displayValue,
  onChange,
}: MarbleSliderProps) {
  return (
    <label className="marble-control">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
      />
      <output>{displayValue}</output>
    </label>
  );
}

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uScale;
  uniform float uBands;
  uniform float uDetail;
  uniform float uSpeed;
  uniform float uWarp;
  uniform float uContrast;
  uniform vec2 uPointer;
  uniform float uPointerActive;
  uniform float uInteraction;
  uniform float uRadius;

  float hash(vec2 point) {
    vec3 point3 = fract(vec3(point.xyx) * 0.1031);
    point3 += dot(point3, point3.yzx + 33.33);
    return fract((point3.x + point3.y) * point3.z);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));

    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.8, 0.6, -0.6, 0.8);

    for (int octave = 0; octave < 3; octave++) {
      value += amplitude * noise(point);
      point = rotation * point * 2.03 + 17.13;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    float time = uTime * uSpeed;
    vec2 point =
      (vUv - 0.5) * vec2(aspect, 1.0) * 2.15 * uScale;

    vec2 pointerDelta =
      (vUv - uPointer) * vec2(aspect, 1.0);
    float pointerDistance = length(pointerDelta);
    float pointerFalloff =
      (1.0 - smoothstep(0.0, uRadius, pointerDistance)) *
      uPointerActive;
    vec2 pointerDirection =
      pointerDelta / max(pointerDistance, 0.001);
    float expulsion = pointerFalloff * pointerFalloff;
    point -= pointerDirection * expulsion * uInteraction * 0.62;

    float flowX = fbm(
      point * 0.62 + vec2(time * 0.18, -time * 0.12)
    );
    float flowY = fbm(
      point * 0.58 + vec2(4.7 - time * 0.14, 1.6 + time * 0.17)
    );
    vec2 flow = vec2(flowX, flowY) - 0.5;

    float marbleField = fbm(
      point * 0.46 + flow * uWarp + vec2(-time * 0.1, time * 0.08)
    );
    float phase =
      (marbleField + flow.x * 0.3 - flow.y * 0.2 + point.x * 0.018) *
        uBands +
      time * 1.9;
    float broadWave = sin(phase);
    float marble = smoothstep(-0.2, 0.2, broadWave);
    float contour = 1.0 - smoothstep(0.0, 0.12, abs(broadWave));
    float detailRegion = smoothstep(0.12, 0.34, abs(flowX - flowY));
    float fineWave = sin(
      phase * mix(1.25, 2.35, uDetail) + flowX * 4.0
    );
    float fineContour =
      1.0 - smoothstep(0.0, 0.11, abs(fineWave));

    float quietVariation = noise(point * 0.72 + flow * 0.8) * 0.012;
    vec3 deepBlack = vec3(0.0025);
    vec3 graphite = vec3(uContrast + quietVariation);
    vec3 color = mix(deepBlack, graphite, marble);
    color += vec3(contour * 0.012);
    color *= 1.0 - fineContour * detailRegion * marble * uDetail * 0.66;

    float clearedCore =
      (1.0 - smoothstep(0.0, uRadius * 0.58, pointerDistance)) *
      uPointerActive *
      min(uInteraction, 1.0);
    color *= 1.0 - clearedCore;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const TARGET_FRAME_INTERVAL = 1000 / 60;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function activateProgram(gl: WebGLRenderingContext, program: WebGLProgram) {
  gl.useProgram(program);
}

export function FluidFooter({
  showControls = true,
}: {
  showControls?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const drawCurrentFrameRef = useRef<(() => void) | null>(null);
  const controlsRef = useRef<MarbleControls>({ ...DEFAULT_CONTROLS });
  const [controls, setControls] = useState<MarbleControls>({
    ...DEFAULT_CONTROLS,
  });
  const [controlsOpen, setControlsOpen] = useState(true);

  const updateControl = (key: keyof MarbleControls, value: number) => {
    const nextControls = { ...controlsRef.current, [key]: value };
    controlsRef.current = nextControls;
    setControls(nextControls);
    window.requestAnimationFrame(() => drawCurrentFrameRef.current?.());
  };

  const resetControls = () => {
    const nextControls = { ...DEFAULT_CONTROLS };
    controlsRef.current = nextControls;
    setControls(nextControls);
    window.requestAnimationFrame(() => drawCurrentFrameRef.current?.());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    const gl = canvas?.getContext('webgl', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    });

    if (!canvas || !reveal || !gl) {
      return;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();

    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      return;
    }

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const scaleLocation = gl.getUniformLocation(program, 'uScale');
    const bandsLocation = gl.getUniformLocation(program, 'uBands');
    const detailLocation = gl.getUniformLocation(program, 'uDetail');
    const speedLocation = gl.getUniformLocation(program, 'uSpeed');
    const warpLocation = gl.getUniformLocation(program, 'uWarp');
    const contrastLocation = gl.getUniformLocation(program, 'uContrast');
    const pointerLocation = gl.getUniformLocation(program, 'uPointer');
    const pointerActiveLocation = gl.getUniformLocation(
      program,
      'uPointerActive',
    );
    const interactionLocation = gl.getUniformLocation(program, 'uInteraction');
    const radiusLocation = gl.getUniformLocation(program, 'uRadius');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let isActive = false;
    let isNearViewport = false;
    let needsResize = true;
    let elapsedTime = 0;
    let lastTimestamp = 0;
    let lastDrawTimestamp = 0;
    const pointer = {
      x: 0.5,
      y: 0.5,
      active: 0,
    };
    const targetPointer = {
      x: 0.5,
      y: 0.5,
      active: 0,
    };

    activateProgram(gl, program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const maxPixelRatio = window.innerWidth < 768 ? 1.15 : 1.35;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
      needsResize = false;
    };

    const draw = (time: number) => {
      if (needsResize) {
        resize();
      }

      const currentControls = controlsRef.current;
      pointer.x += (targetPointer.x - pointer.x) * 0.24;
      pointer.y += (targetPointer.y - pointer.y) * 0.24;
      pointer.active += (targetPointer.active - pointer.active) * 0.14;

      gl.uniform1f(timeLocation, time);
      gl.uniform1f(scaleLocation, currentControls.scale);
      gl.uniform1f(bandsLocation, currentControls.bands);
      gl.uniform1f(detailLocation, currentControls.detail);
      gl.uniform1f(speedLocation, currentControls.speed);
      gl.uniform1f(warpLocation, currentControls.warp);
      gl.uniform1f(contrastLocation, currentControls.contrast);
      gl.uniform2f(pointerLocation, pointer.x, pointer.y);
      gl.uniform1f(pointerActiveLocation, pointer.active);
      gl.uniform1f(interactionLocation, currentControls.interaction);
      gl.uniform1f(radiusLocation, currentControls.radius);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    drawCurrentFrameRef.current = () => draw(elapsedTime);

    const tick = (timestamp: number) => {
      if (!isActive || document.hidden || reducedMotion.matches) {
        animationFrame = 0;
        lastTimestamp = 0;
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      elapsedTime += Math.min((timestamp - lastTimestamp) / 1000, 0.05);
      lastTimestamp = timestamp;

      if (timestamp - lastDrawTimestamp >= TARGET_FRAME_INTERVAL) {
        draw(elapsedTime);
        lastDrawTimestamp = timestamp;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const syncActivity = () => {
      const shouldAnimate =
        isNearViewport && !reducedMotion.matches && !document.hidden;

      isActive = shouldAnimate;

      if (shouldAnimate && !animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      } else if (!shouldAnimate && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastTimestamp = 0;
        draw(elapsedTime);
      }
    };

    const handleResize = () => {
      needsResize = true;
      draw(elapsedTime);
      syncActivity();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        (event.target instanceof Element &&
          event.target.closest('.marble-controls'))
      ) {
        targetPointer.active = 0;
        return;
      }

      const nextX = event.clientX / Math.max(window.innerWidth, 1);
      const nextY = 1 - event.clientY / Math.max(window.innerHeight, 1);
      targetPointer.x = nextX;
      targetPointer.y = nextY;
      targetPointer.active = 1;

      if (isNearViewport && !isActive) {
        window.requestAnimationFrame(() => draw(elapsedTime));
      }
    };

    const handlePointerLeave = () => {
      targetPointer.active = 0;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        syncActivity();
      },
      { rootMargin: '35% 0px' },
    );
    const resizeObserver = new ResizeObserver(handleResize);

    intersectionObserver.observe(reveal);
    resizeObserver.observe(canvas);
    draw(elapsedTime);
    syncActivity();
    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave,
    );
    document.addEventListener('visibilitychange', syncActivity);
    reducedMotion.addEventListener('change', handleResize);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave,
      );
      document.removeEventListener('visibilitychange', syncActivity);
      reducedMotion.removeEventListener('change', handleResize);
      drawCurrentFrameRef.current = null;
      window.cancelAnimationFrame(animationFrame);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div ref={revealRef} className="fluid-footer-reveal">
      <footer
        className="fluid-footer"
        data-home-section="footer"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="fluid-footer__canvas" />
      </footer>

      {showControls ? (
        <aside
          className="marble-controls"
          data-open={controlsOpen}
          aria-label="Marble animation controls"
        >
          <div className="marble-controls__header">
            <button
              type="button"
              className="marble-controls__toggle"
              aria-expanded={controlsOpen}
              onClick={() => setControlsOpen((open) => !open)}
            >
              <span>MARBLE TUNER</span>
              <span aria-hidden="true">{controlsOpen ? '−' : '+'}</span>
            </button>
          </div>

          {controlsOpen ? (
            <div className="marble-controls__body">
              <MarbleSlider
                label="纹理尺度"
                min={0.65}
                max={2.6}
                step={0.01}
                value={controls.scale}
                displayValue={controls.scale.toFixed(2)}
                onChange={(value) => updateControl('scale', value)}
              />
              <MarbleSlider
                label="层纹密度"
                min={48}
                max={180}
                step={1}
                value={controls.bands}
                displayValue={String(Math.round(controls.bands))}
                onChange={(value) => updateControl('bands', value)}
              />
              <MarbleSlider
                label="局部细节"
                min={0}
                max={1}
                step={0.01}
                value={controls.detail}
                displayValue={controls.detail.toFixed(2)}
                onChange={(value) => updateControl('detail', value)}
              />
              <MarbleSlider
                label="流动速度"
                min={0.12}
                max={1.8}
                step={0.01}
                value={controls.speed}
                displayValue={controls.speed.toFixed(2)}
                onChange={(value) => updateControl('speed', value)}
              />
              <MarbleSlider
                label="变形强度"
                min={0.6}
                max={4.2}
                step={0.01}
                value={controls.warp}
                displayValue={controls.warp.toFixed(2)}
                onChange={(value) => updateControl('warp', value)}
              />
              <MarbleSlider
                label="明暗对比"
                min={0.025}
                max={0.12}
                step={0.001}
                value={controls.contrast}
                displayValue={controls.contrast.toFixed(3)}
                onChange={(value) => updateControl('contrast', value)}
              />
              <MarbleSlider
                label="驱散强度"
                min={0}
                max={2.4}
                step={0.01}
                value={controls.interaction}
                displayValue={controls.interaction.toFixed(2)}
                onChange={(value) => updateControl('interaction', value)}
              />
              <MarbleSlider
                label="驱散范围"
                min={0.05}
                max={0.42}
                step={0.01}
                value={controls.radius}
                displayValue={controls.radius.toFixed(2)}
                onChange={(value) => updateControl('radius', value)}
              />

              <button
                type="button"
                className="marble-controls__reset"
                onClick={resetControls}
              >
                RESET
              </button>
            </div>
          ) : null}
        </aside>
      ) : null}
    </div>
  );
}
