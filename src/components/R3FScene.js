import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function HackerOrb() {
  const mesh = useRef();
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#00ffff'),
        emissive: new THREE.Color('#00ffff'),
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.8,
        wireframe: true,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!mesh.current) return;
    mesh.current.rotation.x = t * 0.25;
    mesh.current.rotation.y = t * 0.5;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.15;
    mesh.current.scale.setScalar(1 + Math.sin(t) * 0.06);
  });

  return (
    <mesh ref={mesh} geometry={geometry} material={material} position={[0, 0, 0]} />
  );
}

export default function R3FScene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 4.2], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[2, 4, 2]} intensity={1.2} color={'#ff2bd6'} />
      <pointLight position={[-2, -2, -2]} intensity={1.0} color={'#00ffff'} />

      <Suspense fallback={null}>
        <Stars radius={30} depth={10} factor={2} fade speed={1} />
      </Suspense>

      <HackerOrb />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  );
}

