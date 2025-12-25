import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Stars, Sphere } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Play, Gamepad2 } from 'lucide-react';
import * as THREE from 'three';

// Floating name text in 3D
function FloatingName() {
  const textRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <group position={[0, 1, 0] as const}>
      <Text
        ref={textRef}
        fontSize={1.2}
        color="#f2c14f"
        anchorX="center"
        anchorY="middle"
      >
        DURAI B
      </Text>
    </group>
  );
}

// Rotating cubes representing skills
function SkillCube({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.8, 0.8, 0.8] as const} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[0, -0.8, 0] as const}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Animated particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f2c14f"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Central rotating sphere (portal effect)
function Portal() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.5, 32, 32] as const} position={[0, 0, 0] as const}>
      <meshStandardMaterial
        color="#8f70ff"
        emissive="#8f70ff"
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      {/* Lighting - increased intensity */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5] as const} intensity={2} />
      <pointLight position={[10, 10, 10] as const} intensity={2} />
      <pointLight position={[-10, -10, -10] as const} intensity={1} color="#f2c14f" />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* 3D Elements */}
      <FloatingName />
      <Portal />
      <Particles />

      {/* Skill cubes arranged in a circle */}
      <SkillCube position={[3, 1, -2] as const} color="#8f70ff" label="React" />
      <SkillCube position={[-3, 1, -2] as const} color="#f2c14f" label="Node.js" />
      <SkillCube position={[3, -1, -2] as const} color="#5b7bff" label="Python" />
      <SkillCube position={[-3, -1, -2] as const} color="#c084fc" label="AWS" />
      <SkillCube position={[0, 2, -2] as const} color="#7dd3fc" label="TypeScript" />
      <SkillCube position={[0, -2, -2] as const} color="#d946ef" label="AI/ML" />
    </>
  );
}

// Main GameIntro Component
interface GameIntroProps {
  onEnter: () => void;
}

export default function GameIntro({ onEnter }: GameIntroProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0b1026] via-[#1b0f35] to-[#0a081a]">
      {/* 3D Canvas */}
      <Canvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 8] as const, fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        {/* Subtitle */}
        <div className="mt-32 text-center pointer-events-none">
          <p className="text-2xl md:text-3xl text-primary/80 font-light tracking-wider">
            Full Stack Developer
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            IoT • AI/ML • Cloud Computing
          </p>
        </div>

        {/* Enter Button */}
        {showButton && (
          <div className="absolute bottom-20 pointer-events-auto">
            <Button
              onClick={onEnter}
              size="lg"
              className="hero-gradient text-white px-8 py-6 text-xl font-bold shadow-2xl hover:scale-110 transition-all duration-300 group"
            >
              <Gamepad2 className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Enter Portfolio
              <Play className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute bottom-8 text-center pointer-events-none">
          <p className="text-sm text-muted-foreground/60">
            Drag to rotate • Hover cubes to interact
          </p>
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 pointer-events-none" />
    </div>
  );
}
