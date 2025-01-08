import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const ConfettiExplosion: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize(); 

  useEffect(() => {
    setShowConfetti(true);
    // const timer = setTimeout(() => setShowConfetti(false), 5000);

    // return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
    </div>
  );
};

export default ConfettiExplosion;
