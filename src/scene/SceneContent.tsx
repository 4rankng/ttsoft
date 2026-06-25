import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Faithful React Three Fiber port of demo/from-chatgpt/site/scene.js.
 *
 * The scene is a decorative hero visual: a physical icosahedron core wrapped in
 * a wireframe shell, an inner glow mesh, an instanced Fibonacci-sphere network
 * with connecting edges, three tilted orbital rings, three satellites, and a
 * particle field. A pointer-parallax nudges the root group + camera.
 *
 * Animation is driven by useFrame; the parent Canvas switches frameloop to
 * "demand" under prefers-reduced-motion, rendering exactly one static frame.
 */

const NODE_COUNT = 52;
const PARTICLE_COUNT = 110;

// Golden-angle Fibonacci sphere distribution, matching scene.js exactly.
function buildNetwork() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const positions: THREE.Vector3[] = [];
  const matrices: THREE.Matrix4[] = [];
  const dummy = new THREE.Object3D();

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const scale = 1.66 + (i % 5) * 0.014;
    const p = new THREE.Vector3(
      Math.cos(theta) * radius * scale,
      y * scale * 1.07,
      Math.sin(theta) * radius * scale,
    );
    positions.push(p);

    const s = i % 11 === 0 ? 1.7 : 1;
    dummy.position.copy(p);
    dummy.scale.setScalar(s);
    dummy.updateMatrix();
    matrices.push(dummy.matrix.clone());
  }

  // Build connecting edges with the same distance/modulo rule as scene.js.
  const edgePoints: THREE.Vector3[] = [];
  let edgeCount = 0;
  for (let i = 0; i < positions.length && edgeCount < 95; i += 1) {
    for (let j = i + 1; j < positions.length && edgeCount < 95; j += 1) {
      const d = positions[i].distanceTo(positions[j]);
      if (d > 0.48 && d < 0.88 && (i * 13 + j * 7) % 4 === 0) {
        edgePoints.push(positions[i], positions[j]);
        edgeCount += 1;
      }
    }
  }

  return { matrices, edgePoints };
}

function buildParticles() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const r = 2.9 + ((i * 29) % 100) / 100 * 1.45;
    const theta = (i * 17.17) % (Math.PI * 2);
    const phi = Math.acos(1 - 2 * (((i * 47) % 101) / 101));
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.cos(phi) * 0.8;
    arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  return arr;
}

const SATELLITE_DATA = [
  { color: '#2f69ff', radius: 2.18, speed: 0.27, tilt: 0.55, offset: 0 },
  { color: '#06b6d4', radius: 2.38, speed: -0.19, tilt: 1.28, offset: 2.3 },
  { color: '#7857ff', radius: 1.98, speed: 0.23, tilt: 2.05, offset: 4.2 },
] as const;

const RINGS = [
  { args: [2.18, 0.012, 8, 140], color: '#2f69ff', opacity: 0.18, rotation: [1.18, 0.1, -0.38] as const },
  { args: [2.38, 0.009, 8, 140], color: '#06b6d4', opacity: 0.17, rotation: [0.45, 1.15, 0.28] as const },
  { args: [1.96, 0.008, 8, 140], color: '#7857ff', opacity: 0.13, rotation: [1.75, 0.35, 0.72] as const },
] as const;

type SceneContentProps = {
  /** When true, render a single static pose and skip per-frame work. */
  reducedMotion: boolean;
  /** Pointer target in normalized [-1, 1] space (parallax source). */
  pointer: React.MutableRefObject<THREE.Vector2>;
};

export function SceneContent({ reducedMotion, pointer }: SceneContentProps) {
  const { camera } = useThree();

  const rootRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const satelliteRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Pre-compute the static geometry data once.
  const { matrices, edgePoints } = useMemo(buildNetwork, []);
  const edgePositions = useMemo(() => new Float32Array(edgePoints.flatMap((v) => [v.x, v.y, v.z])), [edgePoints]);
  const particlePositions = useMemo(buildParticles, []);

  // Apply the pre-computed instance matrices once the InstancedMesh mounts.
  useLayoutEffect(() => {
    const inst = nodesRef.current;
    if (!inst) return;
    matrices.forEach((m, i) => inst.setMatrixAt(i, m));
    inst.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  // Camera base position from scene.js.
  useMemo(() => {
    camera.position.set(0, 0.1, 8.4);
  }, [camera]);

  // Pointer smoothing target, lerped each frame.
  const smoothed = useRef(new THREE.Vector2(0, 0));
  const orbitAxis = useMemo(() => new THREE.Vector3(1, 0, 0), []);

  useFrame((state) => {
    const root = rootRef.current;
    if (!root) return;

    if (reducedMotion) {
      // Static-frame pose — no per-frame work. Camera stays at base.
      root.rotation.set(-0.12, -0.28, 0.08);
      root.position.y = 0;
      // Position satellites at their offset pose.
      SATELLITE_DATA.forEach((data, i) => {
        const mesh = satelliteRefs.current[i];
        if (!mesh) return;
        const angle = data.offset;
        mesh.position.set(
          Math.cos(angle) * data.radius,
          Math.sin(angle * 1.35) * 0.35,
          Math.sin(angle) * data.radius,
        );
        mesh.position.applyAxisAngle(orbitAxis, data.tilt - Math.PI / 2);
      });
      return;
    }

    const t = state.clock.getElapsedTime();

    // Smooth the pointer toward its target.
    smoothed.current.lerp(pointer.current, 0.035);

    root.rotation.y = -0.22 + t * 0.055 + smoothed.current.x * 0.12;
    root.rotation.x = -0.08 + Math.sin(t * 0.32) * 0.035 - smoothed.current.y * 0.08;
    root.position.y = Math.sin(t * 0.55) * 0.06;

    if (wireRef.current) wireRef.current.rotation.y = -t * 0.025;
    if (innerRef.current) innerRef.current.rotation.y = t * 0.19;
    if (particlesRef.current) particlesRef.current.rotation.y = -t * 0.012;

    SATELLITE_DATA.forEach((data, i) => {
      const mesh = satelliteRefs.current[i];
      if (!mesh) return;
      const angle = t * data.speed + data.offset;
      mesh.position.set(
        Math.cos(angle) * data.radius,
        Math.sin(angle * 1.35) * 0.48,
        Math.sin(angle) * data.radius,
      );
      mesh.position.applyAxisAngle(orbitAxis, data.tilt - Math.PI / 2);
    });

    // Camera parallax toward pointer, matching scene.js lerp factors.
    const camTargetX = smoothed.current.x * 0.22;
    const camTargetY = 0.1 + smoothed.current.y * 0.13;
    camera.position.x += (camTargetX - camera.position.x) * 0.03;
    camera.position.y += (camTargetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Lighting — matches scene.js colors/intensities/positions. */}
      <hemisphereLight color="#ffffff" groundColor="#b9ccff" intensity={2.15} />
      <directionalLight color="#ffffff" intensity={3.2} position={[4, 5, 6]} />
      <pointLight color="#4b78ff" intensity={9} distance={14} decay={2} position={[-3.5, 1.2, 4]} />
      <pointLight color="#36d7ec" intensity={6} distance={11} decay={2} position={[3.2, -2.2, 2]} />

      <group ref={rootRef} rotation={[-0.08, -0.22, 0.08]}>
        {/* Core: high-subdiv physical icosahedron. */}
        <mesh scale={[1.02, 1.09, 1.02]}>
          <icosahedronGeometry args={[1.48, 3]} />
          <meshPhysicalMaterial
            color="#eaf1ff"
            roughness={0.31}
            metalness={0.02}
            clearcoat={0.75}
            clearcoatRoughness={0.24}
            transparent
            opacity={0.96}
          />
        </mesh>

        {/* Wireframe shell. */}
        <lineSegments ref={wireRef} scale={[1, 1.08, 1]}>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.515, 2)]} />
          <lineBasicMaterial color="#3c73ff" transparent opacity={0.31} />
        </lineSegments>

        {/* Inner glow mesh. */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.54, 2]} />
          <meshBasicMaterial color="#4b78ff" transparent opacity={0.13} />
        </mesh>

        {/* Instanced network nodes. Matrices are applied via useLayoutEffect. */}
        <instancedMesh ref={nodesRef} args={[undefined, undefined, NODE_COUNT]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#2f69ff" />
        </instancedMesh>

        {/* Network edges as line segments. */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[edgePositions, 3]}
              count={edgePositions.length / 3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#5792ff" transparent opacity={0.21} />
        </lineSegments>

        {/* Three orbital rings. */}
        {RINGS.map((r, i) => (
          <mesh key={i} rotation={r.rotation as unknown as THREE.Euler}>
            <torusGeometry args={r.args as unknown as [number, number, number, number]} />
            <meshBasicMaterial color={r.color} transparent opacity={r.opacity} side={THREE.DoubleSide} />
          </mesh>
        ))}

        {/* Three satellites on tilted orbital axes. */}
        {SATELLITE_DATA.map((data, i) => (
          <mesh
            key={i}
            ref={(el) => { satelliteRefs.current[i] = el; }}
          >
            <sphereGeometry args={[0.105, 16, 16]} />
            <meshBasicMaterial color={data.color} />
          </mesh>
        ))}

        {/* Particle field. */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
              count={particlePositions.length / 3}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#5e8bff"
            size={0.028}
            transparent
            opacity={0.48}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
}
