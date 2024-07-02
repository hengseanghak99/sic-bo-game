import React, { useState } from 'react';
import dice1 from './images/dice1.png';
import './styles.css'; // Import your CSS file with the animation styles

const AnimatedElement = () => {
  const [rolling, setRolling] = useState(false);

  const handleAnimation = () => {
    setRolling(true);

    // Simulate end of animation
    setTimeout(() => {
      setRolling(false);
    }, 2000); // Duration of animation
  };

  return (
    <div>
      <button onClick={handleAnimation}>Start Animation</button>
      <img
        src={dice1}
        alt="Rotating Element"
        className={rolling ? 'element-to-rotate' : ''}
      />
    </div>
  );
};

export default AnimatedElement;
