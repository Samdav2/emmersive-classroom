"use client";

import React, { Suspense, useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Box, Dodecahedron, Icosahedron, Octahedron, Tetrahedron} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- 3D Model Components ---
const AtomModel = () => {
  const groupRef = useRef();
  useFrame((_, delta) => { if(groupRef.current) groupRef.current.rotation.y += delta * 0.2; });
  return (
    <group ref={groupRef}>
      <Sphere args={[0.5, 32, 32]}><meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={0.5} roughness={0.3} metalness={0.8} /></Sphere>
      {[...Array(3)].map((_, i) => (
        <Torus key={i} args={[1.5, 0.03, 16, 100]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}><meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.7} /></Torus>
      ))}
    </group>
  );
};

const SolarSystemModel = () => {
    const groupRef = useRef();
    const planetRotations = useMemo(() => [...Array(4)].map(() => Math.random() * 10), []);
    useFrame(({ clock }) => { if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.05; });
    return (
        <group ref={groupRef}>
            <Sphere args={[0.8, 32, 32]}><meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={1} /></Sphere>
            {planetRotations.map((rotationY, i) => (
                <group key={i} rotation={[0, rotationY, 0]}>
                    <Sphere args={[0.1 + i * 0.05, 32, 32]} position={[1.5 + i * 0.5, 0, 0]}>
                        <meshStandardMaterial color={new THREE.Color().setHSL(i / 4, 0.7, 0.6)} />
                    </Sphere>
                </group>
            ))}
        </group>
    );
};

const DNAModel = () => {
    const groupRef = useRef();
    useFrame((_, delta) => { if(groupRef.current) groupRef.current.rotation.y += delta * 0.15; });
    const strands = useMemo(() => {
        const points = [];
        for (let i = 0; i < 20; i++) {
            const angle = i * 0.5;
            const x = Math.cos(angle) * 1.2;
            const z = Math.sin(angle) * 1.2;
            const y = i * 0.2 - 2;
            points.push({ p1: [x, y, z], p2: [-x, y, -z] });
        }
        return points;
    }, []);
    return (
        <group ref={groupRef}>
            {strands.map(({ p1, p2 }, i) => (
                <group key={i}>
                    <Sphere args={[0.15]} position={p1}><meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.4} /></Sphere>
                    <Sphere args={[0.15]} position={p2}><meshStandardMaterial color="magenta" emissive="magenta" emissiveIntensity={0.4} /></Sphere>
                </group>
            ))}
        </group>
    );
};

const CrystalModel = () => {
    const ref = useRef();
    useFrame((_, delta) => { if(ref.current) ref.current.rotation.x = ref.current.rotation.y += delta * 0.3; });
    return <Dodecahedron ref={ref} args={[1.2]}><meshStandardMaterial color="hotpink" emissive="hotpink" emissiveIntensity={0.3} roughness={0.1} metalness={0.9} /></Dodecahedron>
}

const VirusModel = () => {
    const ref = useRef();
    useFrame((_, delta) => { if(ref.current) ref.current.rotation.y += delta * 0.1; });
    return <Icosahedron ref={ref} args={[1.4, 0]}><meshStandardMaterial color="lime" flatShading /></Icosahedron>
}

const AnimalCellModel = () => (
    <group>
        <Sphere args={[1.5, 64, 64]}><meshStandardMaterial color="#ffc0cb" transparent opacity={0.3} /></Sphere>
        <Sphere args={[0.5, 32, 32]}><meshStandardMaterial color="purple" /></Sphere>
        <Sphere args={[0.2, 32, 32]} position={[0.8, 0.5, 0.5]}><meshStandardMaterial color="red" /></Sphere>
    </group>
);

const HeartModel = () => {
    const ref = useRef();
    useFrame(({ clock }) => { if(ref.current) ref.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 5) * 0.1); });
    return <Dodecahedron ref={ref} args={[1]}><meshStandardMaterial color="red" emissive="darkred" /></Dodecahedron>
}

const ParthenonModel = () => (
    <group rotation-x={-Math.PI / 2}>
        <Box args={[5, 3, 0.2]} position={[0, 0, 0]}><meshStandardMaterial color="ivory" /></Box>
        {[...Array(6)].map((_, i) => <Box key={i} args={[0.2, 0.2, 1.5]} position={[-2.2 + i * 0.88, 1, 0.75]}><meshStandardMaterial color="ivory" /></Box>)}
        {[...Array(6)].map((_, i) => <Box key={i} args={[0.2, 0.2, 1.5]} position={[-2.2 + i * 0.88, -1, 0.75]}><meshStandardMaterial color="ivory" /></Box>)}
    </group>
);

const VikingShipModel = () => (
    <group>
        <Box args={[4, 0.4, 1]}><meshStandardMaterial color="saddlebrown" /></Box>
        <Box args={[0.2, 1.5, 0.2]} position={[0, 0.75, 0]}><meshStandardMaterial color="sienna" /></Box>
    </group>
);

// --- Data for the Library ---
const instructionalMaterials = [
  { id: 'model_atom', type: 'model', category: 'Physics', title: 'Quantum Entanglement', description: 'An interactive model of a quantum particle, demonstrating entanglement principles.', component: AtomModel },
  { id: 'model_crystal', type: 'model', category: 'Physics', title: 'Crystal Lattice', description: 'A visualization of a crystal lattice structure, showing the arrangement of atoms.', component: CrystalModel },
  { id: 'model_newton', type: 'model', category: 'Physics', title: 'Newtonian Cradle', description: 'A simulation demonstrating conservation of momentum and energy.', component: () => <Tetrahedron args={[1.2]}><meshStandardMaterial color="silver" metalness={1} roughness={0.2} /></Tetrahedron> },
  { id: 'model_blackhole', type: 'model', category: 'Physics', title: 'Spacetime Curvature', description: 'Observe how mass curves spacetime in this gravity simulation.', component: () => <Torus args={[1.5, 0.05, 16, 100]}><meshStandardMaterial color="white" wireframe /></Torus> },
  { id: 'model_wave', type: 'model', category: 'Physics', title: 'Wave-Particle Duality', description: 'Explore the dual nature of light as both a wave and a particle.', component: () => <Octahedron args={[1.2]}><meshStandardMaterial color="yellow" wireframe /></Octahedron> },
  { id: 'model_dna', type: 'model', category: 'Biology', title: 'DNA Double Helix', description: 'A visual representation of the structure of a DNA molecule.', component: DNAModel },
  { id: 'model_virus', type: 'model', category: 'Biology', title: 'Virus Structure', description: 'An icosahedral model representing the capsid of a typical virus.', component: VirusModel },
  { id: 'model_cell', type: 'model', category: 'Biology', title: 'Animal Cell', description: 'A cross-section of an animal cell, showing its various organelles.', component: AnimalCellModel },
  { id: 'model_neuron', type: 'model', category: 'Biology', title: 'Neuron Synapse', description: 'Visualize the transmission of signals between two neurons.', component: () => <Tetrahedron args={[1.2]}><meshStandardMaterial color="lightblue" /></Tetrahedron> },
  { id: 'model_heart', type: 'model', category: 'Biology', title: 'Human Heart', description: 'An animated model showing the chambers and blood flow of the human heart.', component: HeartModel },
  { id: 'model_solar', type: 'model', category: 'Astronomy', title: 'Miniature Solar System', description: 'Explore the orbits and relative positions of planets in our solar system.', component: SolarSystemModel },
  { id: 'vid_cosmos', type: 'video', category: 'Astronomy', title: '360° Cosmos Tour', description: 'A breathtaking journey through nebulae and star clusters in full 360° video.', mediaUrl: 'https://placehold.co/1920x1080/000000/FFFFFF/mp4?text=360+Cosmos+Video' },
  { id: 'img_galaxy', type: 'image', category: 'Astronomy', title: 'Andromeda Galaxy', description: 'A stunning high-resolution 360° panorama of our nearest galactic neighbor.', mediaUrl: 'https://placehold.co/1920x1080/0c0a24/ffffff?text=Andromeda+Galaxy' },
  { id: 'model_exoplanet', type: 'model', category: 'Astronomy', title: 'Exoplanet Kepler-186f', description: 'A speculative model of the potentially habitable exoplanet, Kepler-186f.', component: () => <Sphere args={[1.2]}><meshStandardMaterial color="red" /></Sphere> },
  { id: 'model_iss', type: 'model', category: 'Astronomy', title: 'International Space Station', description: 'A detailed model of the ISS, orbiting the Earth.', component: () => <Box args={[2, 0.5, 1]}><meshStandardMaterial color="silver" /></Box> },
  { id: 'img_rome', type: 'image', category: 'History', title: '360° View of Rome', description: 'Stand in the center of the ancient Colosseum and look around in this static 360° image.', mediaUrl: 'https://placehold.co/1920x1080/1a202c/f6928a?text=360+Rome+View' },
  { id: 'img_pyramids', type: 'image', category: 'History', title: 'The Giza Pyramids', description: 'A 360° view from the sands of Giza, looking at the ancient pyramids.', mediaUrl: 'https://placehold.co/1920x1080/f5deb3/000000?text=Giza+Pyramids' },
  { id: 'model_parthenon', type: 'model', category: 'History', title: 'The Parthenon', description: 'A reconstructed 3D model of the Parthenon in ancient Athens.', component: ParthenonModel },
  { id: 'model_viking_ship', type: 'model', category: 'History', title: 'Viking Longship', description: 'Explore a detailed model of a Viking longship, a marvel of ancient engineering.', component: VikingShipModel },
  { id: 'vid_apollo', type: 'video', category: 'History', title: 'Apollo 11 Landing', description: 'Experience the historic moon landing in this immersive 360° recreation.', mediaUrl: 'https://placehold.co/1920x1080/cccccc/000000/mp4?text=Moon+Landing' },
];

const categories = ['All', 'Physics', 'Biology', 'Astronomy', 'History'];

// --- A-Frame VR Scene Viewer Component ---
// This component is now dynamically imported to prevent SSR errors.
const AFrameVRViewer = ({ material, onClose }) => {
  const { type, mediaUrl, component: ModelComponent } = material;
  const [loaded, setLoaded] = useState(false);
  const sceneRef = useRef(null);

  // Effect to import A-Frame and handle scene loading
  useEffect(() => {
    import('aframe');
    if (type === 'image' || type === 'video') {
      const aframeScene = sceneRef.current;
      if (aframeScene) {
        const handleSceneLoaded = () => setLoaded(true);
        aframeScene.addEventListener('loaded', handleSceneLoaded);
        return () => {
            if (aframeScene) {
                aframeScene.removeEventListener('loaded', handleSceneLoaded);
            }
        };
      }
    } else {
      setLoaded(true);
    }
  }, [type, material]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
        <FiX size={32} className="text-white" />
      </button>

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-[99] pointer-events-none">
          <p className="text-white text-lg animate-pulse bg-black/50 p-4 rounded-lg">Loading Scene...</p>
        </div>
      )}

      {(type === 'image' || type === 'video') && (
        <a-scene ref={sceneRef} embedded vr-mode-ui="enabled: false" key={mediaUrl}>
          <a-assets>
            {type === 'video' ? (
              <video id="media-asset" src={mediaUrl} loop autoPlay muted crossOrigin="anonymous"></video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img id="media-asset" src={mediaUrl} crossOrigin="anonymous" alt="" />
            )}
          </a-assets>
          {type === 'video' ? <a-videosphere src="#media-asset" /> : <a-sky src="#media-asset" />}
          <a-entity camera="true" look-controls="true" wasd-controls="true" position="0 1.6 0" />
        </a-scene>
      )}

      {type === 'model' && ModelComponent && (
        <Canvas camera={{ position: [0, 0, 7], fov: 60 }} className="w-full h-full">
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8A2BE2" />
          <Suspense fallback={null}><ModelComponent /></Suspense>
          <OrbitControls enableZoom autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      )}
    </motion.div>
  );
};

// --- Preview Modal Component ---
const PreviewModal = ({ material, onClose, onViewVR }) => (
    <motion.div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-lg flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            className="relative w-full max-w-5xl h-[80vh] bg-slate-900/50 border border-cyan-500/30 rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex-shrink-0 p-4 border-b border-cyan-500/20 flex justify-between items-center">
                <h2 className="font-orbitron text-2xl text-cyan-300 drop-shadow-glow">{material.title}</h2>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors"><FiX size={24} /></button>
            </div>
            <div className="flex-grow relative">
                {material.type === 'model' && material.component ? (
                    <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
                        <ambientLight intensity={0.7} />
                        <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
                        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8A2BE2" />
                        <Suspense fallback={null}>{React.createElement(material.component)}</Suspense>
                        <OrbitControls enableZoom autoRotate autoRotateSpeed={0.5} />
                    </Canvas>
                ) : (
                    <div className="relative w-full h-full">
                        {material.mediaUrl &&
                            <Image
                                src={material.mediaUrl}
                                alt={material.title}
                                layout="fill"
                                objectFit="contain"
                                unoptimized
                            />
                        }
                    </div>
                )}
            </div>
            <div className="flex-shrink-0 p-4 bg-black/30 border-t border-cyan-500/20">
                <p className="text-gray-300 text-sm mb-3">{material.description}</p>
                <button
                    onClick={() => onViewVR(material)}
                    className="w-full py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-500 transition-colors duration-300 font-semibold"
                >
                    Launch Full VR Experience
                </button>
            </div>
        </motion.div>
    </motion.div>
);

// --- Main Page Component ---
const InstructionalMaterialPage = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [vrMedia, setVrMedia] = useState(null);

  const handleViewVR = (material) => {
    setSelectedMaterial(null);
    setTimeout(() => setVrMedia(material), 300);
  };

  const filteredMaterials = useMemo(() => {
    return instructionalMaterials.filter(item => {
      const inCategory = activeCategory === 'All' || item.category === activeCategory;
      const inSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return inCategory && inSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <div className="w-full h-full bg-black/50 text-white relative flex flex-col p-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.button
              onClick={() => router.back()}
              className="mb-6 px-5 py-2 bg-white/10 text-white rounded-full hover:bg-white/30 transition-all duration-300 flex items-center backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Back
            </motion.button>
            <h2 className="font-orbitron text-4xl font-bold text-cyan-300 mb-4 drop-shadow-glow text-center">Instructional Library</h2>

            <div className="max-w-3xl mx-auto w-full">
                <div className="relative mb-4">
                    <FiSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/30 border border-cyan-700/50 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>

                <div className="flex justify-center space-x-2 mb-8 overflow-x-auto pb-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeCategory === cat ? 'bg-cyan-500 text-black' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
          </motion.div>
          <div className="flex-grow overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMaterials.map(item => (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedMaterial(item)}
                  className="holographic-item-card"
                  whileHover={{ y: -5, scale: 1.03 }}
                  layoutId={item.id}
                >
                  <div className="holographic-item-card-glow"></div>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-sm text-cyan-300/80">{item.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
      </div>

      <AnimatePresence>
        {selectedMaterial && (
            <PreviewModal
                material={selectedMaterial}
                onClose={() => setSelectedMaterial(null)}
                onViewVR={handleViewVR}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {vrMedia && (
          <AFrameVRViewer
            material={vrMedia}
            onClose={() => setVrMedia(null)}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .holographic-item-card {
            position: relative;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(12px);
            border-radius: 1rem;
            border: 1px solid rgba(0, 255, 255, 0.2);
            padding: 1.5rem;
            cursor: pointer;
            overflow: hidden;
            min-height: 120px;
        }
        .holographic-item-card-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 100%, rgba(0, 255, 255, 0.15), transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .holographic-item-card:hover .holographic-item-card-glow {
            opacity: 1;
        }
      `}</style>
    </>
  );
};

export default InstructionalMaterialPage;
