import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PetMeshProps {
  happiness: number;
  isFeeding: boolean;
}

const PetMesh: React.FC<PetMeshProps> = ({ happiness, isFeeding }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Breathing animation
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(1 + breathe);
      
      // Happy bouncing based on happiness level
      if (happiness > 0.7) {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.2;
      }
      
      // Feeding animation
      if (isFeeding) {
        meshRef.current.rotation.y += 0.05;
      }
    }
  });

  const baseColor = new THREE.Color().setHSL(
    0.8 - (happiness * 0.3), // Purple to cyan based on happiness
    0.8,
    0.5 + (happiness * 0.3)
  );

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <dodecahedronGeometry args={[1.5]} />
        <meshStandardMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

interface TokenMeshProps {
  type: 'eth' | 'btc';
  position: [number, number, number];
  onClick: () => void;
}

const TokenMesh: React.FC<TokenMeshProps> = ({ type, position, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  const color = type === 'eth' ? '#627eea' : '#f7931a';

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={(e) => {
        if (e.object instanceof THREE.Mesh) {
          e.object.scale.setScalar(1.2);
        }
      }}
      onPointerLeave={(e) => {
        if (e.object instanceof THREE.Mesh) {
          e.object.scale.setScalar(1);
        }
      }}
    >
      {type === 'eth' ? (
        <octahedronGeometry args={[0.3]} />
      ) : (
        <sphereGeometry args={[0.3]} />
      )}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const VirtualPet: React.FC = () => {
  const [happiness, setHappiness] = useState(0.5);
  const [tokens, setTokens] = useState({ eth: 10, btc: 5 });
  const [isFeeding, setIsFeeding] = useState(false);
  const { toast } = useToast();

  const feedPet = useCallback((tokenType: 'eth' | 'btc') => {
    if (tokens[tokenType] > 0) {
      setTokens(prev => ({ ...prev, [tokenType]: prev[tokenType] - 1 }));
      setHappiness(prev => Math.min(1, prev + 0.1));
      setIsFeeding(true);
      
      toast({
        title: "🍽️ Pet Fed!",
        description: `Your pet enjoyed the ${tokenType.toUpperCase()} token!`,
      });

      setTimeout(() => setIsFeeding(false), 1000);
    } else {
      toast({
        title: "💸 No Tokens Left!",
        description: `You need more ${tokenType.toUpperCase()} tokens to feed your pet.`,
        variant: "destructive"
      });
    }
  }, [tokens, toast]);

  const addTokens = useCallback((tokenType: 'eth' | 'btc') => {
    setTokens(prev => ({ ...prev, [tokenType]: prev[tokenType] + 5 }));
    toast({
      title: "💰 Tokens Added!",
      description: `Added 5 ${tokenType.toUpperCase()} tokens to your wallet.`,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-space relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary rounded-full animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 6 + 's',
              animationDuration: (Math.random() * 4 + 4) + 's'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-neon bg-clip-text text-transparent glow-text mb-4">
            CryptoPet
          </h1>
          <p className="text-xl text-muted-foreground">
            Feed your digital companion with virtual tokens
          </p>
        </header>

        {/* Pet Display */}
        <div className="mx-auto max-w-4xl">
          <div className="h-96 mb-8 rounded-2xl glass-effect border border-primary/30 overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#b794f6" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#63b3ed" />
              
              <PetMesh happiness={happiness} isFeeding={isFeeding} />
              
              {/* Floating tokens */}
              <TokenMesh
                type="eth"
                position={[-3, 1, 0]}
                onClick={() => feedPet('eth')}
              />
              <TokenMesh
                type="btc"
                position={[3, -1, 0]}
                onClick={() => feedPet('btc')}
              />
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>

          {/* Stats and Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Happiness Meter */}
            <div className="glass-effect rounded-xl p-6 border border-primary/30">
              <h3 className="text-xl font-semibold mb-4 text-primary">Happiness</h3>
              <div className="w-full bg-secondary rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-neon h-4 rounded-full transition-all duration-500"
                  style={{ width: `${happiness * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round(happiness * 100)}% Happy
              </p>
            </div>

            {/* Token Wallet */}
            <div className="glass-effect rounded-xl p-6 border border-primary/30">
              <h3 className="text-xl font-semibold mb-4 text-accent">Wallet</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    ETH
                  </span>
                  <span className="font-mono">{tokens.eth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    BTC
                  </span>
                  <span className="font-mono">{tokens.btc}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="glass-effect rounded-xl p-6 border border-primary/30">
              <h3 className="text-xl font-semibold mb-4 text-digital-green">Controls</h3>
              <div className="space-y-3">
                <Button
                  variant="feed"
                  className="w-full"
                  onClick={() => feedPet('eth')}
                  disabled={tokens.eth === 0}
                >
                  Feed ETH 🍎
                </Button>
                <Button
                  variant="feed"
                  className="w-full"
                  onClick={() => feedPet('btc')}
                  disabled={tokens.btc === 0}
                >
                  Feed BTC 🥕
                </Button>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => addTokens('eth')}
                  >
                    +5 ETH
                  </Button>
                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => addTokens('btc')}
                  >
                    +5 BTC
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet;