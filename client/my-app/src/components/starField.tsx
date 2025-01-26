import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CosmicVortex: React.FC = () => {
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const diskRef = useRef<THREE.Points>(null);
  const starCount = 2000;

  const positions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 20 + 5;
      const angle = Math.random() * Math.PI * 2;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 2;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (blackHoleRef.current) {
      blackHoleRef.current.rotation.y += 0.01;
    }
    if (diskRef.current) {
      diskRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <color attach="background" args={['black']} />
      
      <points ref={diskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color={new THREE.Color(0xffffff)} />
      </points>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 10]} intensity={1} color={new THREE.Color(0xffffff)} />
    </>
  );
};

export default CosmicVortex;
