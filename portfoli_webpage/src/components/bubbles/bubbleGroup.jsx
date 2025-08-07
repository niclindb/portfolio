import { Float } from '@react-three/drei'
import Bubble from './bubble'
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

const bubblePositions = [
    { // center
      position: [0, -.5, 0.25], 
      scale: 1.35,
      floatIntensity: 2.3,
      speed: 1.2,
      rotationIntensity: .8,
      text: "About Me",
      moreText: "I'm a passionate developer with experience in React, Three.js, and modern web technologies. I love creating interactive 3D experiences and building beautiful user interfaces."
    },
    { // left
      position: [-3.1, 1.1, 0], 
      scale: 1.1,
      floatIntensity: 2.7,
      speed: 1.2,
      rotationIntensity: .8,
      text: "Projects",
      moreText: "Shopify Inventory Management App\n   React, JavaScript\nBuilt-in Shopify web application for managing dual-location inventory.\n\nShopify POS App\n  React, JavaScript\nImplimented product cost lookup, automatic discount, product holds, and charge account orders."
    },
    { // right
      position: [2.7, -1.8, 0], 
      scale: 1.15,
      floatIntensity: 2.4,
      speed: 1.2,
      rotationIntensity: .8,
      text: "Contact",
      moreText: "Let's get in touch!\n\nEmail: niclindb@nmu.edu\n\nGitHub: https://github.com/niclindb"
    },
    { // top
      position: [2.48, 1.2, 0.1], 
      scale: 1.1,
      floatIntensity: 2.1,
      speed: 1.2,
      rotationIntensity: .8,
      text: "Skills",
      moreText: "Frontend: React, Vue, TypeScript | Backend: Node.js, Python, SQL | 3D: Three.js, WebGL | Tools: Git, Docker, AWS"
    },
    { // bottom left
      position: [-2.6, -1.9, 0.1], 
      scale: 1.1,
      floatIntensity: 2.3,
      speed: 1.3,
      rotationIntensity: .8,
      text: "Education",
      moreText: "Northern Michigan University \n\nBachelor of Science in Computer Science, Minor in Mathematics\n  \nGPA: 3.75"
    },
  ]

export default function BubbleGroup({ onBubbleSelect, selectedBubble }) {
  const { camera } = useThree();
  
  // Animate camera when selection changes
  useEffect(() => {
    const targetZ = selectedBubble !== null ? 30 : 5;
    const duration = 1000; // 1 second
    const startZ = camera.position.z;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      camera.position.z = startZ + (targetZ - startZ) * easeOutCubic;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [selectedBubble, camera]);

  const handleBubbleClick = (index) => {
    onBubbleSelect(index);
  };

  return (
    <>
      {bubblePositions.map((bubble, index) => {
        const bubbleComponent = (
          <Bubble 
            scale={bubble.scale} 
            position={bubble.position}
            isSelected={selectedBubble === index}
            isOtherSelected={selectedBubble !== null && selectedBubble !== index}
            onClick={() => handleBubbleClick(index)}
            moreText={bubble.moreText}
          >
            {bubble.text}
          </Bubble>
        );

        return (
          <Float 
            key={index}
            floatIntensity={bubble.floatIntensity}
            speed={bubble.speed}
            rotationIntensity={bubble.rotationIntensity}
            enabled={selectedBubble !== index} // Disable float for selected bubble
          >
            {bubbleComponent}
          </Float>
        );
      })}
    </>
  )
}