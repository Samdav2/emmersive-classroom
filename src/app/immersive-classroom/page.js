"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the reusable VR viewer component
const VRSceneViewer = dynamic(() => import('../scene/VRSceneViewer'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      <p className="text-white font-orbitron text-xl animate-pulse">
        Initializing Emmersive Education...
      </p>
    </div>
  )
});

const classroomContent = [
  {
    id: 1,
    type: 'video',
    title: 'Journey Through the Cosmos',
    description: 'A virtual lecture hall set within a swirling nebula.',
    mediaUrl: 'https://placehold.co/1920x1080/000000/FFFFFF/mp4?text=360+Cosmos+Video',
    poster: 'https://placehold.co/600x400/1a202c/00ffff?text=Cosmos+Lecture'
  },
  {
    id: 2,
    type: 'image',
    title: 'The Quantum Realm Lab',
    description: 'Manipulate subatomic particles...',
    mediaUrl: 'https://cdn.eso.org/images/publicationjpg/mmb-coatn-tank-pano2.jpg'
  },
  {
    id: 3,
    type: 'image',
    title: 'Ancient Rome Colosseum',
    description: 'Walk the grounds of the Colosseum...',
    mediaUrl: 'https://placehold.co/1920x1080/1a202c/f6928a?text=360+Rome+View'
  },
  {
    id: 4,
    type: 'video',
    title: 'Deep Ocean Biology',
    description: 'An underwater classroom...',
    mediaUrl: 'https://placehold.co/1920x1080/000000/FFFFFF/mp4?text=360+Ocean+Video',
    poster: 'https://placehold.co/600x400/1a202c/43c6ac?text=Ocean+Biology'
  },
  {
    id: 5,
    type: 'image',
    title: 'Shakespeare on Stage',
    description: 'A fully interactive Globe Theatre...',
    mediaUrl: 'https://placehold.co/1920x1080/1a202c/f09819?text=360+Theatre+View'
  },
  {
    id: 6,
    type: 'image',
    title: 'Architectural Sandbox',
    description: 'A collaborative design space...',
    mediaUrl: 'https://placehold.co/1920x1080/1a202c/8e9eab?text=360+Architecture+View'
  }
];

const MediaCard = ({ item, onViewVR }) => (
  <motion.div className="media-card group flex flex-col" layout>
    <div className="relative">
      <img
        src={item.poster || item.mediaUrl}
        alt={item.title}
        className="w-full h-56 object-cover rounded-t-lg bg-slate-800"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/600x400/1a202c/ff0000?text=Image+Error';
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
      <div className="absolute top-2 right-2 bg-cyan-500/80 text-black text-xs font-bold uppercase px-2 py-1 rounded">
        {item.type}
      </div>
    </div>
    <div className="p-5 flex-grow flex flex-col">
      <h4 className="font-orbitron text-xl font-bold text-cyan-300 mb-2">{item.title}</h4>
      <p className="text-sm text-gray-400 mb-4 flex-grow">{item.description}</p>
      <motion.button
        onClick={() => onViewVR(item)}
        className="w-full mt-auto py-2 bg-purple-600/80 text-white rounded-md hover:bg-purple-500 transition-colors duration-300 font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        View in VR
      </motion.button>
    </div>
  </motion.div>
);

const ImmersiveClassroomsPage = () => {
  const [vrMedia, setVrMedia] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-cyan-400 drop-shadow-glow">Emmersive Ed</div>
            <motion.button
              onClick={() => window.history.back()}
              className="px-5 py-2 bg-gray-700/50 text-white rounded-full hover:bg-gray-600/70 transition-all duration-300 flex items-center backdrop-blur-sm border border-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Portal
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <main className="pt-24">
          <motion.div
            key="classroom-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-6 py-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 drop-shadow-glow"
            >
              Immersive Classrooms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
            >
              Dynamic virtual environments for lectures and discussions that foster deep engagement.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {classroomContent.map(item => (
                <MediaCard key={item.id} item={item} onViewVR={setVrMedia} />
              ))}
            </motion.div>
          </motion.div>
        </main>

        <footer className="bg-black/50 backdrop-blur-sm py-12 text-center border-t border-gray-800 mt-20">
          <div className="container mx-auto px-6">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Emmersive Education. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {vrMedia && (
          <VRSceneViewer
  material={{
    mediaUrl: vrMedia.mediaUrl,
    mediaType: vrMedia.type, // 🔁 FIX: type should be mapped to mediaType
  }}
  onClose={() => setVrMedia(null)}
/>

        )}
      </AnimatePresence>
    </>
  );
};

export default ImmersiveClassroomsPage;
