import { Canvas } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
} from '@react-three/drei'
import BubbleGroup from './components/bubbles/bubbleGroup'
import Header from './components/Header'
import { useState } from 'react';

export default function App() {
  const [selectedBubble, setSelectedBubble] = useState(null);

  const handleBubbleSelect = (index) => {
    setSelectedBubble(index);
  };

  const handleBackClick = () => {
    setSelectedBubble(null);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Header */}
      <Header />
      
      {/* Three.js Canvas */}
      <Canvas camera={{ fov: 100 }}>
        <ambientLight intensity={0.3} />
        <BubbleGroup 
          onBubbleSelect={handleBubbleSelect} 
          selectedBubble={selectedBubble} 
        />
        <Environment preset="dawn" background blur={0.5} />
        <OrbitControls/>
        
      </Canvas>
      
      {/* Back button - rendered in regular DOM */}
      {selectedBubble !== null && (
        <button 
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '100px', // Adjusted to account for header
          left: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: '#6C4F8C',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        ← Back
      </button>
      )}
    </div>
  );
}