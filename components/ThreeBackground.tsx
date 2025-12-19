import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Fix for React Three Fiber JSX types not being automatically picked up by the TypeScript compiler.
// We extend the React.JSX.IntrinsicElements interface with ThreeElements from @react-three/fiber.
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}

const ExtruderVisuals = () => (
  <group position={[0, 0.2, 0]}>
    {/* Heat Sink - Metallic Dark */}
    <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
    </mesh>
    {/* Heat Block - Dark */}
    <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
    </mesh>
    {/* Nozzle - Glowing Brass */}
    <mesh position={[0, -0.15, 0]}>
        <coneGeometry args={[0.08, 0.2, 16]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.8} roughness={0.2} metalness={1} />
    </mesh>
    {/* Part Cooling Fan Duct - Dark Plastic */}
    <mesh position={[0.25, 0.1, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.15, 0.4, 0.2]} />
        <meshStandardMaterial color="#0f172a" />
    </mesh>
    {/* Filament entering top - White */}
    <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshBasicMaterial color="#e2e8f0" opacity={0.8} transparent />
    </mesh>
    {/* Actual Light Source at nozzle tip */}
    <pointLight position={[0, -0.2, 0]} color="#fb923c" intensity={3} distance={2.5} decay={2} />
  </group>
);

const PrinterScene = () => {
  const objectRef = useRef<THREE.Group>(null);
  const nozzleRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    // Hexagonal twisted vase - slightly wider base
    const geo = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 6, 1, true);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const angle = (y + 1.25) * 1.5; 
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        pos.setX(i, x * cos - z * sin);
        pos.setZ(i, x * sin + z * cos);
    }
    geo.computeVertexNormals();
    geo.translate(0, 1.25, 0);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const loopDuration = 12;
    const progress = (t % loopDuration) / loopDuration;
    const scalePhase = progress < 0.9 ? progress / 0.9 : 1;
    const safeScale = Math.max(0.01, scalePhase);

    if (objectRef.current) {
        objectRef.current.scale.y = safeScale;
        // Slower rotation
        objectRef.current.rotation.y = t * 0.1;
    }

    if (nozzleRef.current) {
         const currentHeight = -1.5 + (2.5 * scalePhase);
         nozzleRef.current.position.y = currentHeight + 0.1;
         const speed = 4; // Slightly slower / more graceful
         const radius = 1.3; // Wider motion radius to match widened geometry and request
         nozzleRef.current.position.x = Math.sin(t * speed) * radius;
         nozzleRef.current.position.z = Math.cos(t * (speed * 0.8)) * radius;
    }
  });

  return (
    // Rotate the entire scene slightly to break the vertical stacking and add dimension
    // Shift up (Y=1.6) to position the print bed and object higher in the viewport
    <group rotation={[0, -0.25, 0]} position={[0, 1.6, 0]}>
      <group ref={nozzleRef}>
         <ExtruderVisuals />
      </group>

      <group position={[0, -1.5, 0]}>
        <group ref={objectRef}>
           {/* The Print - Brighter Wireframe */}
           <mesh geometry={geometry}>
             <meshBasicMaterial 
                color="#38bdf8" // Cyan/Blue wireframe
                wireframe 
                transparent 
                opacity={0.35} 
             />
           </mesh>
           <mesh geometry={geometry} scale={[0.99, 1, 0.99]}>
             <meshBasicMaterial color="#0ea5e9" transparent opacity={0.08} />
           </mesh>
        </group>

        {/* The Print Bed - Widened */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
           <circleGeometry args={[2.2, 32]} />
           <meshBasicMaterial color="#475569" wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
};

const ThreeBackground: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return <div className="fixed inset-0 -z-10 bg-maker-950" />;

  return (
    // Base bg-maker-950 ensures dark background even if canvas fails or loads late
    <div className="fixed inset-0 -z-10 bg-maker-950 overflow-hidden" aria-hidden="true">
      {/* 
        Gradient Overlay
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-maker-950/90 via-maker-950/20 to-maker-950/90 z-10 pointer-events-none" />
      
      <Canvas 
        // Zoomed out (Z: 7.5) and lowered slightly (Y: 1.0) for a wider, more majestic view
        camera={{ position: [0, 1.0, 7.5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="z-0"
      >
        <ambientLight intensity={0.5} />
        {/* Cool blue backlight - Increased intensity */}
        <pointLight position={[10, 10, 10]} color="#38bdf8" intensity={1.0} />
        {/* Warm accent light - Increased intensity */}
        <pointLight position={[-10, 5, -10]} color="#f97316" intensity={0.8} />
        
        <PrinterScene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;