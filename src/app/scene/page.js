"use client";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the component with SSR turned off
const VRSceneViewer = dynamic(
  () => import('./VRSceneViewer'), // Adjust the path to your component
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <p className="text-white text-lg">Loading Scene...</p>
      </div>
    ),
  }
);

export default function ScenePage() {
  // You can handle state for closing the viewer here if needed
  // For this example, we'll just render it directly.
  return <VRSceneViewer onClose={() => console.log('Viewer closed')} />;
}
