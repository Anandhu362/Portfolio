import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false); // Start as not visible

  useEffect(() => {
    // FIX: Check for touch devices. If it's a touch device, don't run the effect.
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
      return; 
    }

    const onMouseMove = (e: MouseEvent) => {
      // Make cursor visible on first move
      if (!isVisible) {
        setIsVisible(true);
      }
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, .cursor-hoverable')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
        if ((e.target as Element).closest('a, button, .cursor-hoverable')) {
            setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isVisible]); // Added isVisible to the dependency array

  // The component returns null if it shouldn't be visible (e.g., on touch devices)
  if (!isVisible) {
      return null;
  }

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover-active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;