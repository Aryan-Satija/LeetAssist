import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RevolvingNebula: React.FC = () => {
  const nebulaRef = useRef<THREE.Points>(null);
  const particleCount = 10000;
  const nebulaRadius = 20;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * nebulaRadius;

      const i3 = i * 3;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const hue = Math.random() * 0.1 + 0.6; 
      const saturation = 0.5 + Math.random() * 0.5;
      const lightness = 0.4 + Math.random() * 0.4;
      const color = new THREE.Color().setHSL(hue, saturation, lightness);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 0.5 + 0.1;
    }

    return [positions, colors, sizes];
  }, []);

  useFrame(({ clock }) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      
      const positionAttribute = nebulaRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      const positionArray = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positionArray[i3];
        const y = positionArray[i3 + 1];
        const z = positionArray[i3 + 2];

        positionArray[i3] = x + Math.sin(clock.getElapsedTime() * 0.1 + y) * 0.01;
        positionArray[i3 + 1] = y + Math.cos(clock.getElapsedTime() * 0.1 + x) * 0.01;
        positionArray[i3 + 2] = z + Math.sin(clock.getElapsedTime() * 0.1 + z) * 0.01;
      }

      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <>
      <color attach="background" args={['black']} />
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  );
};

export default RevolvingNebula;
