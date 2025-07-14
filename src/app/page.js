"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';



// Component for the Home Page content
const HomePage = ({ learningCategories, handleEnterPortal, handleViewCategory, showPortalMessage }) => {
  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7 }}
      className="relative z-10"
    >
      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 drop-shadow-glow"
        >
          Learn Beyond Reality
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl"
        >
          Step into a new dimension of knowledge with Emmersive Education – your portal to the metaverse classroom.
        </motion.p>
        <motion.button
          onClick={handleEnterPortal}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)" }}
          className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-300"></span>
          <span className="relative z-10">Enter the Portal</span>
        </motion.button>

        {showPortalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 text-4xl font-bold text-cyan-400"
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              Initializing VR Environment...
            </motion.span>
          </motion.div>
        )}
      </section>

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-glow"
        >
          Explore Immersive Learning Worlds
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {learningCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="holographic-card group"
              onClick={() => handleViewCategory(category.id)}
            >
              <div className="holographic-card-glow"></div>
              <div className="holographic-card-border"></div>
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-semibold mb-4 text-cyan-300 group-hover:text-white transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {category.description}
                </p>
                <span
                  className="font-bold text-purple-400 group-hover:text-white transition-all duration-300"
                >
                  Explore World &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-500 drop-shadow-glow"
        >
          Transmissions from Our Learners
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { name: "Anya Sharma", text: "This isn't just learning; it's an experience. The VR labs feel more real than reality." },
            { name: "Kai Chen", text: "I never thought I could be this excited about studying. It's the future, and it's here now." },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 * index }}
              className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-purple-700/50 hover:border-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 opacity-20 hover:opacity-40 transition-opacity duration-300 rounded-2xl"></div>
              <p className="text-gray-300 text-lg italic mb-6 relative z-10">&quot;{testimonial.text}&quot;</p>
              <p className="text-cyan-400 font-semibold text-xl relative z-10">- &quot;{testimonial.name}&quot;</p>
              <div className="absolute top-4 right-4 w-16 h-16 bg-cyan-500/30 blur-2xl animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// Component for a Category Page
const CategoryPage = ({ currentCategory, setCurrentPage }) => {
  return (
    <motion.div
      key="category-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-20 min-h-[calc(100vh-80px)] relative z-10"
    >
      <motion.button
        onClick={() => setCurrentPage('home')}
        className="mb-12 px-6 py-2 bg-gray-700/50 text-white rounded-full hover:bg-gray-600/70 transition-all duration-300 flex items-center backdrop-blur-sm border border-gray-600"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Portal
      </motion.button>
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-glow"
      >
        {currentCategory?.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
      >
        {currentCategory?.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-black/30 backdrop-blur-lg rounded-2xl p-10 text-center text-gray-400 text-lg border-2 border-purple-500/40 shadow-lg shadow-purple-500/10"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Content Module Interface</h3>
        <p>Module content for &quot;{currentCategory?.title}&quot; would be dynamically loaded here.</p>
        &quot;<p className="mt-2 text-sm text-cyan-400/70">&quot;(e.g., interactive simulations, 3D model viewers, video streams)</p>
      </motion.div>
    </motion.div>
  );
};


// Main App component
const App = () => {
  const [showPortalMessage, setShowPortalMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mountRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const router = useRouter();

  const learningCategories = [
    { id: 'immersive-classroom', title: 'Immersive Classrooms', description: 'Dynamic virtual environments for lectures and discussions that foster deep engagement.' },
    { id: 'immersive-instruction-material', title: 'Holographic Instruction', description: 'Interact with 3D models, holographic diagrams, and animated concepts for enhanced understanding.' },
    { id: 'immersive-labs-simulations', title: 'VR Labs & Simulations', description: 'Conduct complex experiments and simulations in a safe, interactive, and hyper-realistic environment.' },
    { id: 'virtual-field-trips', title: 'Virtual Field Trips', description: 'Travel to historical sites, explore distant galaxies, or dive into the ocean depths from your device.' },
    { id: 'gamified-learning-experiences', title: 'Gamified Learning', description: 'Engage with educational content through interactive games, challenges, and competitive scenarios.' },
    { id: 'collaborative-vr-projects', title: 'Collaborative VR Projects', description: 'Work with peers in shared virtual spaces to build, design, and solve complex problems together.' },
  ];

  // Three.js Scene Setup
  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Particle System
    const particleCount = 7000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 500;
        color.setHSL(i / particleCount, 1.0, 0.5);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.7
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Mouse move listener
    const onMouseMove = (event) => {
        mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Animate particles
        particleSystem.rotation.y = elapsedTime * 0.05;

        // Make camera react to mouse
        camera.position.x += (mouse.current.x * 5 - camera.position.x) * 0.05;
        camera.position.y += (mouse.current.y * 5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', onMouseMove);
        if (currentMount && renderer.domElement) {
            currentMount.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  const handleEnterPortal = useCallback(() => {
    setShowPortalMessage(true);
    setTimeout(() => {
      setShowPortalMessage(false);
      console.log("Entering the VR portal...");
    }, 2500);
  }, []);

  const handleViewCategory = useCallback((categoryId) => {
    router.push(`/${categoryId}`);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router]);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  const currentCategory = learningCategories.find(cat => cat.id === currentPage);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <div ref={mountRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black z-0"></div>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-bold text-cyan-400 drop-shadow-glow cursor-pointer"
                    onClick={() => setCurrentPage('home')}
                >
                    Emmersive Ed
                </motion.div>

                <nav className="hidden md:flex items-center space-x-6">
                    {['home', 'categories', 'testimonials'].map((item, index) => (
                        <motion.a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (item === 'home') {
                                    setCurrentPage('home');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    const element = document.getElementById(item);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                            className="text-lg text-gray-300 hover:text-cyan-300 transition-colors duration-300 relative group"
                        >
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                        </motion.a>
                    ))}
                </nav>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xl z-40 flex flex-col items-center justify-center md:hidden"
            >
              <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white focus:outline-none">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <ul className="flex flex-col space-y-6 text-3xl text-center">
                {learningCategories.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <a href={`#${item.id}`} onClick={() => handleViewCategory(item.id)} className="block text-white hover:text-cyan-300 transition-colors duration-300 py-2">
                      {item.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="pt-[80px]">
            <AnimatePresence mode="wait">
            {currentPage === 'home' ? (
                <HomePage
                learningCategories={learningCategories}
                handleEnterPortal={handleEnterPortal}
                handleViewCategory={handleViewCategory}
                showPortalMessage={showPortalMessage}
                />
            ) : (
                <CategoryPage
                currentCategory={currentCategory}
                setCurrentPage={setCurrentPage}
                />
            )}
            </AnimatePresence>
        </main>

        <footer className="bg-black/50 backdrop-blur-sm py-12 text-center border-t border-gray-800">
          <div className="container mx-auto px-6">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Emmersive Education. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Roboto:wght@300;400&display=swap');

        body {
          font-family: 'Roboto', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, .font-orbitron {
            font-family: 'Orbitron', sans-serif;
        }

        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.6)) drop-shadow(0 0 15px rgba(192, 0, 255, 0.4));
        }

        .hover\\:shadow-xl-glow:hover {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3);
        }

        .holographic-card {
            position: relative;
            background: rgba(15, 23, 42, 0.3); /* slate-900 with opacity */
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            border: 1px solid rgba(0, 255, 255, 0.2);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            overflow: hidden;
        }

        .holographic-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: rgba(0, 255, 255, 0.6);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .holographic-card-glow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1), transparent 70%);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .holographic-card:hover .holographic-card-glow {
            opacity: 1;
        }

        .holographic-card-border {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            pointer-events: none;
        }

        .holographic-card:before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
                transparent,
                rgba(0, 255, 255, 0.2),
                transparent 30%
            );
            animation: rotate 6s linear infinite;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .holographic-card:hover:before {
            opacity: 1;
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
      `}</style>
    </div>
  );
};

export default App;
