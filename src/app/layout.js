// src/app/layout.js

import { Orbitron } from 'next/font/google'; // Import the Orbitron font
import './globals.css';

// Configure the font
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900']
});

export const metadata = {
  title: 'Emmersive Education',
  description: 'Immersive Virtual Experiences',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={orbitron.className}>{children}</body>
    </html>
  );
}
