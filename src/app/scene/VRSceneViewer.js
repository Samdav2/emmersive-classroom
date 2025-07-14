"use client";

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
// A-Frame is imported here. Since this entire component will be loaded dynamically
// on the client-side only, this will not cause a server-side rendering error.
import 'aframe';

// Data for the different scenes (360 images and video)
const hotspotData = [
  {
    id: 'scene1',
    label: 'Scene 1',
    // Replace with your actual image path
    mediaUrl: 'https://placehold.co/4096x2048/000000/FFFFFF?text=Scene+1',
    mediaType: 'image',
  },
  {
    id: 'scene2',
    label: 'Scene 2',
    // Replace with your actual image path
    mediaUrl: 'https://placehold.co/4096x2048/333333/FFFFFF?text=Scene+2',
    mediaType: 'image',
  },
  {
    id: 'scene3',
    label: '360 Video',
    // Replace with your actual video path. NOTE: Videos may not work from all sources.
    // It's best to host them on your own domain or a CDN with proper CORS policies.
    mediaUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    mediaType: 'video',
  },
];

/**
 * A component that renders a 360-degree image/video viewer using A-Frame,
 * or a 3D model viewer using React Three Fiber.
 * @param {object} props - The component props.
 * @param {object} props.material - The material/scene data to display.
 * @param {function} props.onClose - The function to call when the viewer is closed.
 */
const VRSceneViewerComponent = ({ material, onClose }) => {
  // Destructure component from material prop to determine render mode (A-Frame vs R3F)
  const { component: ModelComponent } = material || {};

  // State for the current scene being displayed. Initialized to null.
  const [sceneState, setSceneState] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const sceneRef = useRef(null);

  // --- FIX 1: Sync props to internal state ---
  // This effect runs when the component mounts and whenever the `material` prop changes.
  // It ensures the internal `sceneState` is updated correctly for the initial scene.
  useEffect(() => {
    if (material) {
      // When a new material is passed, update the internal state and reset loading.
      setSceneState({
        mediaUrl: material.mediaUrl,
        mediaType: material.mediaType,
      });
      setLoaded(false);
    }
  }, [material]);

  // --- FIX 2: Handle A-Frame scene loading robustly ---
  // This effect depends on `sceneState` and `ModelComponent`. It sets up the A-Frame listeners.
  useEffect(() => {
    // If it's a 3D model, we consider it loaded and let Suspense handle the rest.
    if (ModelComponent) {
      setLoaded(true);
      return; // Exit effect for 3D models
    }

    // If it's an A-Frame scene, but we don't have scene data yet, do nothing.
    if (!sceneState || !sceneState.mediaUrl) {
      return;
    }

    const aframeScene = sceneRef.current;
    if (aframeScene) {
      const handleSceneLoaded = () => {
        console.log('✅ A-Frame scene has loaded its assets.');
        setLoaded(true);
      };

      // --- FIX for race condition ---
      // Check if the scene has already loaded. If so, call the handler immediately.
      // Otherwise, add the event listener.
      if (aframeScene.hasLoaded) {
        handleSceneLoaded();
      } else {
        aframeScene.addEventListener('loaded', handleSceneLoaded);
      }

      // Cleanup function to remove the event listener on unmount or when dependencies change.
      return () => {
        if (aframeScene) {
          aframeScene.removeEventListener('loaded', handleSceneLoaded);
        }
      };
    }
  }, [ModelComponent, sceneState]); // Rerun effect if the component type or scene data changes

  /**
   * Switches the A-Frame scene to a new one.
   * @param {object} newScene - The new scene data from hotspotData.
   */
  const switchScene = (newScene) => {
    console.log('🔄 Switching to:', newScene.mediaUrl);
    setLoaded(false); // Set loading state to true
    setSceneState(newScene); // Update the scene state to trigger a re-render
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* --- FIX 3: Render Guard --- */}
      {/* Only render the scene content if sceneState is populated */}
      {sceneState && (
        <>
          {/* Conditional rendering: A-Frame for 360 media, R3F Canvas for 3D models */}
          {!ModelComponent ? (
            // A-Frame scene setup
            <a-scene
              ref={sceneRef}
              embedded
              vr-mode-ui="enabled: true; enterVRButton: #enter-vr-button"
              key={sceneState.mediaUrl}
            >
              <a-assets timeout="20000">
                {sceneState.mediaType === 'video' ? (
                  <video id="media-asset" src={sceneState.mediaUrl} loop autoPlay muted crossOrigin="anonymous" />
                ) : (
                  <img id="media-asset" src={sceneState.mediaUrl} crossOrigin="anonymous" alt="" />
                )}
              </a-assets>
              {sceneState.mediaType === 'video' ? (
                <a-videosphere src="#media-asset" />
              ) : (
                <a-sky src="#media-asset" />
              )}
              <a-entity camera look-controls wasd-controls position="0 1.6 0" />
            </a-scene>
          ) : (
            // React Three Fiber canvas for 3D models
            <Canvas camera={{ position: [0, 1.5, 5], fov: 70 }} style={{ height: '100vh', width: '100vw' }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <Suspense fallback={null}>
                <ModelComponent />
              </Suspense>
              <OrbitControls enableZoom autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          )}
        </>
      )}

      {/* Loading Indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-[99] pointer-events-none bg-black">
          <p className="text-white font-bold text-lg animate-pulse bg-black/50 p-4 rounded-lg">Loading Scene...</p>
        </div>
      )}

      <div id="enter-vr-button" className="absolute" />

      {/* Scene switcher UI (only shows for A-Frame scenes) */}
      {!ModelComponent && sceneState && (
        <div className="absolute top-4 left-4 space-y-2 z-[101] bg-black/30 p-3 rounded-xl backdrop-blur-md">
          {hotspotData.map((h) => (
            <button
              key={h.id}
              onClick={() => switchScene(h)}
              className={`block w-full text-left text-white text-sm hover:text-cyan-300 transition px-2 py-1 rounded ${
                sceneState.mediaUrl === h.mediaUrl ? 'bg-cyan-500/30 font-bold' : ''
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      )}

      {/* Exit Button */}
      <div className="absolute top-4 right-4 z-[101]">
        <motion.button
          onClick={onClose}
          className="px-5 py-2 bg-white/20 text-white rounded-full hover:bg-white/40 transition-all duration-300 flex items-center backdrop-blur-sm border border-white/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Exit
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VRSceneViewerComponent;
