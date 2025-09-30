import { MeshDistortMaterial, Text } from '@react-three/drei'
import * as THREE from 'three';
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/three';

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function Bubble({ 
  children, 
  scale: baseScale = 1, 
  position = [0, 0, 0],
  isSelected,
  isOtherSelected,
  moreText,
  onClick,
  ...props 
}) {
  const [hovered, setHovered] = useState(false);

  // Calculate the Y position for the text
  const textYPosition = isSelected ? 0.9 : 0.2;
  const fontSize = isSelected ? .2 : .4

  // Calculate animation values
  const { scale, pos, opacity } = useSpring({
    scale: isSelected ? baseScale * 40 : isOtherSelected ? baseScale * 3 : hovered ? baseScale * 1.15 : baseScale,
    pos: isSelected ? [0, 0, -60] : isOtherSelected ? [
      position[0] * 15,
      position[1] === -.5 ? (position[1] - 5.5) * 7 : position[1] * 7, 
      position[2] - 15
    ] : position,
    opacity: isOtherSelected ? 0.3 : 1,
    config: { mass: 1, tension: 300, friction: 25 },
  });

  return (
    <animated.group
      {...props}
      scale={scale}
      position={pos}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      cursor="pointer"
    >
      <animated.mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <AnimatedMeshDistortMaterial
          distort={0.25}
          transmission={1.05}
          thickness={-0.5}
          roughness={0}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1200]}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={1.5}
          transparent={true}
          opacity={opacity}
          depthWrite={false}
        />
      </animated.mesh>
      {children && (
        <Text
          fontSize={fontSize}
          color="#3A3A6A"
          position={[0, textYPosition, 0.0]}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          textAlign="center"
          side={THREE.DoubleSide}
        >
          {children}
        </Text>
      )}
      {isSelected && moreText && (
        <Text
          fontSize={0.105}
          color="#3A3A6A"
          position={[0.1, 0, 0.0]}
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
          textAlign="left"
          side={THREE.DoubleSide}
        >
          {moreText}
        </Text>
      )}
    </animated.group>
  );
}