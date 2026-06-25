import * as THREE from 'three';

const canvas = document.querySelector('#system-scene');
const wrap = document.querySelector('[data-scene-wrap]');
if (!canvas || !wrap) throw new Error('Không tìm thấy vùng hiển thị 3D.');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
camera.position.set(0, 0.1, 8.4);

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const root = new THREE.Group();
root.rotation.set(-0.08, -0.22, 0.08);
scene.add(root);

scene.add(new THREE.HemisphereLight(0xffffff, 0xb9ccff, 2.15));
const key = new THREE.DirectionalLight(0xffffff, 3.2);
key.position.set(4, 5, 6);
scene.add(key);
const rim = new THREE.PointLight(0x4b78ff, 9, 14, 2);
rim.position.set(-3.5, 1.2, 4);
scene.add(rim);
const cyan = new THREE.PointLight(0x36d7ec, 6, 11, 2);
cyan.position.set(3.2, -2.2, 2);
scene.add(cyan);

const coreGeometry = new THREE.IcosahedronGeometry(1.48, 3);
const coreMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xeaf1ff,
  roughness: 0.31,
  metalness: 0.02,
  clearcoat: 0.75,
  clearcoatRoughness: 0.24,
  transparent: true,
  opacity: 0.96
});
const core = new THREE.Mesh(coreGeometry, coreMaterial);
core.scale.set(1.02, 1.09, 1.02);
root.add(core);

const wire = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.515, 2)),
  new THREE.LineBasicMaterial({ color: 0x3c73ff, transparent: true, opacity: 0.31 })
);
wire.scale.y = 1.08;
root.add(wire);

const inner = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.54, 2),
  new THREE.MeshBasicMaterial({ color: 0x4b78ff, transparent: true, opacity: 0.13 })
);
root.add(inner);

const nodeCount = 52;
const nodeGeometry = new THREE.SphereGeometry(0.045, 10, 10);
const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x2f69ff });
const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
const dummy = new THREE.Object3D();
const positions = [];
const golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < nodeCount; i += 1) {
  const y = 1 - (i / (nodeCount - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = golden * i;
  const scale = 1.66 + (i % 5) * 0.014;
  const p = new THREE.Vector3(
    Math.cos(theta) * radius * scale,
    y * scale * 1.07,
    Math.sin(theta) * radius * scale
  );
  positions.push(p);
  dummy.position.copy(p);
  const s = i % 11 === 0 ? 1.7 : 1;
  dummy.scale.setScalar(s);
  dummy.updateMatrix();
  nodes.setMatrixAt(i, dummy.matrix);
}
nodes.instanceMatrix.needsUpdate = true;
root.add(nodes);

const edgePoints = [];
let edgeCount = 0;
for (let i = 0; i < positions.length && edgeCount < 95; i += 1) {
  for (let j = i + 1; j < positions.length && edgeCount < 95; j += 1) {
    const d = positions[i].distanceTo(positions[j]);
    if (d > 0.48 && d < 0.88 && ((i * 13 + j * 7) % 4 === 0)) {
      edgePoints.push(positions[i], positions[j]);
      edgeCount += 1;
    }
  }
}
const edgesGeometry = new THREE.BufferGeometry().setFromPoints(edgePoints);
const edges = new THREE.LineSegments(
  edgesGeometry,
  new THREE.LineBasicMaterial({ color: 0x5792ff, transparent: true, opacity: 0.21 })
);
root.add(edges);

const ringMaterials = [
  new THREE.MeshBasicMaterial({ color: 0x2f69ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.17, side: THREE.DoubleSide }),
  new THREE.MeshBasicMaterial({ color: 0x7857ff, transparent: true, opacity: 0.13, side: THREE.DoubleSide })
];
const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.18, 0.012, 8, 140), ringMaterials[0]);
ringA.rotation.set(1.18, 0.1, -0.38);
root.add(ringA);
const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.38, 0.009, 8, 140), ringMaterials[1]);
ringB.rotation.set(0.45, 1.15, 0.28);
root.add(ringB);
const ringC = new THREE.Mesh(new THREE.TorusGeometry(1.96, 0.008, 8, 140), ringMaterials[2]);
ringC.rotation.set(1.75, 0.35, 0.72);
root.add(ringC);

const satelliteGeometry = new THREE.SphereGeometry(0.105, 16, 16);
const satelliteData = [
  { color: 0x2f69ff, radius: 2.18, speed: 0.27, tilt: 0.55, offset: 0 },
  { color: 0x06b6d4, radius: 2.38, speed: -0.19, tilt: 1.28, offset: 2.3 },
  { color: 0x7857ff, radius: 1.98, speed: 0.23, tilt: 2.05, offset: 4.2 }
];
const satellites = satelliteData.map((data) => {
  const mesh = new THREE.Mesh(
    satelliteGeometry,
    new THREE.MeshBasicMaterial({ color: data.color })
  );
  mesh.userData = data;
  root.add(mesh);
  return mesh;
});

const particleCount = 110;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i += 1) {
  const r = 2.9 + ((i * 29) % 100) / 100 * 1.45;
  const theta = (i * 17.17) % (Math.PI * 2);
  const phi = Math.acos(1 - 2 * (((i * 47) % 101) / 101));
  particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  particlePositions[i * 3 + 1] = r * Math.cos(phi) * 0.8;
  particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({ color: 0x5e8bff, size: 0.028, transparent: true, opacity: 0.48, sizeAttenuation: true })
);
root.add(particles);

let width = 1;
let height = 1;
const pointer = new THREE.Vector2(0, 0);
const pointerTarget = new THREE.Vector2(0, 0);
const orbitAxis = new THREE.Vector3(1, 0, 0);
const clock = new THREE.Clock();
let firstFrame = true;
let visible = true;
let running = !document.hidden;
let frameId = 0;

function drawFrame(staticFrame = false) {
  const t = staticFrame ? 0 : clock.getElapsedTime();

  if (!staticFrame) {
    pointer.lerp(pointerTarget, 0.035);
    root.rotation.y = -0.22 + t * 0.055 + pointer.x * 0.12;
    root.rotation.x = -0.08 + Math.sin(t * 0.32) * 0.035 - pointer.y * 0.08;
    root.position.y = Math.sin(t * 0.55) * 0.06;
    wire.rotation.y = -t * 0.025;
    inner.rotation.y = t * 0.19;
    particles.rotation.y = -t * 0.012;
  } else {
    root.rotation.set(-0.12, -0.28, 0.08);
    root.position.y = 0;
  }

  satellites.forEach((mesh) => {
    const { radius, speed, tilt, offset } = mesh.userData;
    const angle = staticFrame ? offset : t * speed + offset;
    mesh.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.35) * (staticFrame ? 0.35 : 0.48),
      Math.sin(angle) * radius
    );
    mesh.position.applyAxisAngle(orbitAxis, tilt - Math.PI / 2);
  });

  camera.position.x += (pointer.x * 0.22 - camera.position.x) * (staticFrame ? 1 : 0.03);
  camera.position.y += (0.1 + pointer.y * 0.13 - camera.position.y) * (staticFrame ? 1 : 0.03);
  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);

  if (firstFrame) {
    firstFrame = false;
    wrap.classList.add('scene-ready');
  }
}

function resize() {
  const rect = wrap.getBoundingClientRect();
  width = Math.max(1, Math.floor(rect.width));
  height = Math.max(1, Math.floor(rect.height));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  if (reduceMotion.matches && !firstFrame) drawFrame(true);
}

function stopLoop() {
  if (!frameId) return;
  cancelAnimationFrame(frameId);
  frameId = 0;
}

function loop() {
  frameId = 0;
  if (!visible || !running || reduceMotion.matches) return;
  drawFrame(false);
  frameId = requestAnimationFrame(loop);
}

function syncLoop() {
  if (reduceMotion.matches) {
    stopLoop();
    drawFrame(true);
    return;
  }
  if (visible && running && !frameId) frameId = requestAnimationFrame(loop);
  if (!visible || !running) stopLoop();
}

resize();
const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(wrap);

const onPointerMove = (event) => {
  const rect = wrap.getBoundingClientRect();
  pointerTarget.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
  pointerTarget.y = -(((event.clientY - rect.top) / rect.height - 0.5) * 2);
};
if (!reduceMotion.matches) wrap.addEventListener('pointermove', onPointerMove, { passive: true });
wrap.addEventListener('pointerleave', () => pointerTarget.set(0, 0));

const visibilityObserver = new IntersectionObserver((entries) => {
  visible = entries[0]?.isIntersecting ?? true;
  syncLoop();
}, { threshold: 0.02 });
visibilityObserver.observe(wrap);

document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  syncLoop();
});

syncLoop();
