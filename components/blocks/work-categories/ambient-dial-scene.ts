import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// A reference-based reconstruction, not a measured scan of the product.
export function createAmbientDialScene(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
  camera.position.set(0, 0.15, 7.2);
  camera.lookAt(0, 0, 0);
  const generator = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = generator.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  generator.dispose();
  const key = new THREE.DirectionalLight(0xfff5e5, 4);
  key.position.set(-3, 5, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4;
  key.shadow.camera.right = 4;
  key.shadow.camera.top = 4;
  key.shadow.camera.bottom = -4;
  key.shadow.normalBias = 0.025;
  key.shadow.bias = -0.0002;
  key.shadow.radius = 4;
  scene.add(key, new THREE.HemisphereLight(0xffffff, 0x91897f, 2));

  const product = new THREE.Group();
  scene.add(product);
  const silver = new THREE.MeshStandardMaterial({
    color: 0xc7c3bb,
    metalness: 0.88,
    roughness: 0.29,
  });
  const edge = new THREE.MeshStandardMaterial({
    color: 0x9a9892,
    metalness: 0.9,
    roughness: 0.27,
  });
  const black = new THREE.MeshStandardMaterial({
    color: 0x151716,
    roughness: 0.36,
    metalness: 0.3,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x101514,
    roughness: 0.22,
    metalness: 0.12,
    clearcoat: 1,
  });
  const blue = new THREE.MeshBasicMaterial({ color: 0x278bd8 });
  const track = new THREE.MeshBasicMaterial({ color: 0x242c2c });

  function panel(
    width: number,
    height: number,
    depth: number,
    radius: number,
    material: THREE.Material,
    y = 0,
    z = 0,
  ) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const bottom = -height / 2;
    shape.moveTo(x + radius, bottom);
    shape.lineTo(x + width - radius, bottom);
    shape.quadraticCurveTo(x + width, bottom, x + width, bottom + radius);
    shape.lineTo(x + width, bottom + height - radius);
    shape.quadraticCurveTo(
      x + width,
      bottom + height,
      x + width - radius,
      bottom + height,
    );
    shape.lineTo(x + radius, bottom + height);
    shape.quadraticCurveTo(x, bottom + height, x, bottom + height - radius);
    shape.lineTo(x, bottom + radius);
    shape.quadraticCurveTo(x, bottom, x + radius, bottom);
    const bevel = Math.min(depth * 0.24, 0.055);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 16,
    });
    geometry.translate(0, 0, -depth / 2);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    product.add(mesh);
    return mesh;
  }
  panel(1.65, 2.8, 0.25, 0.25, edge, 0, -0.07);
  panel(1.65, 2.8, 0.13, 0.25, silver, 0, 0.12);
  panel(1.36, 1.42, 0.025, 0.16, black, 0.47, 0.209);
  panel(1.32, 1.38, 0.012, 0.15, glass, 0.47, 0.231);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.46, 0.016, 8, 100),
    track,
  );
  ring.position.set(0, 0.47, 0.247);
  product.add(ring);
  // Fixed geometry + draw range avoids reallocating buffers while turning the dial.
  const arcGeometry = new THREE.RingGeometry(
    0.443,
    0.48,
    128,
    1,
    Math.PI / 2 - Math.PI * 2,
    Math.PI * 2,
  );
  const arc = new THREE.Mesh(arcGeometry, blue);
  arc.position.set(0, 0.47, 0.252);
  product.add(arc);
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.023, 24), blue);
  dot.position.set(0, 0.47, 0.253);
  product.add(dot);

  const dial = new THREE.Group();
  dial.position.set(0, -0.82, 0.31);
  product.add(dial);
  function cylinder(
    radius: number,
    depth: number,
    z: number,
    material: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, depth, 96),
      material,
    );
    mesh.rotation.x = Math.PI / 2;
    mesh.position.z = z;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    dial.add(mesh);
  }
  cylinder(0.43, 0.12, -0.015, black);
  cylinder(0.414, 0.18, 0.035, edge);
  cylinder(
    0.404,
    0.018,
    0.132,
    new THREE.MeshStandardMaterial({
      color: 0xd7d7d4,
      metalness: 1,
      roughness: 0.3,
    }),
  );
  const grooves = new THREE.BufferGeometry();
  const points: number[] = [];
  for (let radius = 0.045; radius < 0.399; radius += 0.006) {
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      const b = ((i + 1) / 96) * Math.PI * 2;
      points.push(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        0.143,
        Math.cos(b) * radius,
        Math.sin(b) * radius,
        0.143,
      );
    }
  }
  grooves.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  // Hairline concentric machining marks on the aluminium face.
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x888a88,
    transparent: true,
    opacity: 0.2,
  });
  dial.add(new THREE.LineSegments(grooves, lineMaterial));
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), silver);
  marker.scale.set(0.6, 2, 0.25);
  marker.position.set(0, 0.33, 0.148);
  dial.add(marker);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.12 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.52;
  ground.receiveShadow = true;
  scene.add(ground);

  let frame = 0;
  let visible = true;
  let disposed = false;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const target = { x: 0.1, y: -0.32, dial: 0 };
  product.rotation.set(target.x, target.y, -0.035);
  function render() {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const rate = motion.matches ? 1 : 0.16;
    product.rotation.x += (target.x - product.rotation.x) * rate;
    product.rotation.y += (target.y - product.rotation.y) * rate;
    dial.rotation.z += (target.dial - dial.rotation.z) * rate;
    renderer.render(scene, camera);
    if (
      Math.abs(target.x - product.rotation.x) +
        Math.abs(target.y - product.rotation.y) +
        Math.abs(target.dial - dial.rotation.z) >
      0.001
    )
      requestRender();
  }
  function requestRender() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function resize() {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.z = Math.max(7.2, 4.8 / camera.aspect);
    camera.updateProjectionMatrix();
    requestRender();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  visibilityObserver.observe(host);
  document.addEventListener('visibilitychange', requestRender);
  motion.addEventListener('change', requestRender);
  resize();
  function setValue(value: number) {
    const segments = Math.round((value / 100) * 128);
    arcGeometry.setDrawRange((128 - segments) * 6, segments * 6);
    target.dial = (-value / 100) * Math.PI * 1.5;
    requestRender();
  }
  setValue(28);
  return {
    rotate(x: number, y: number) {
      target.x = THREE.MathUtils.clamp(x, -0.32, 0.38);
      target.y = THREE.MathUtils.clamp(y, -1.15, 1.15);
      requestRender();
    },
    setValue,
    reset() {
      target.x = 0.1;
      target.y = -0.32;
      requestRender();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', requestRender);
      motion.removeEventListener('change', requestRender);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments
        ) {
          geometries.add(object.geometry);
          const list = Array.isArray(object.material)
            ? object.material
            : [object.material];
          list.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      environment.dispose();
      key.shadow.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
