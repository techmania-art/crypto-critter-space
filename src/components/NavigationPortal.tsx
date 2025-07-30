import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface PortalMeshProps {
  title: string;
  color: string;
  onClick: () => void;
  position: [number, number, number];
}

const PortalMesh: React.FC<PortalMeshProps> = ({ title, color, onClick, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        <Center position={[0, 0, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.05}
            curveSegments={12}
          >
            {title}
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>
    </Float>
  );
};

interface NavigationPortalProps {
  onNavigate: (page: string) => void;
}

const NavigationPortal: React.FC<NavigationPortalProps> = ({ onNavigate }) => {
  return (
    <div className="h-64 w-full rounded-xl glass-effect border border-primary/30 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#b794f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#63b3ed" />
        
        <PortalMesh
          title="Pet Care"
          color="#9f7aea"
          position={[-2.5, 0, 0]}
          onClick={() => onNavigate('pet')}
        />
        
        <PortalMesh
          title="Gallery"
          color="#4fd1c7"
          position={[0, 0, 0]}
          onClick={() => onNavigate('gallery')}
        />
        
        <PortalMesh
          title="Shop"
          color="#68d391"
          position={[2.5, 0, 0]}
          onClick={() => onNavigate('shop')}
        />
      </Canvas>
    </div>
  );
};

export default NavigationPortal;