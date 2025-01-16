import Lottie from 'lottie-react';
import confettiAnimation from './confetti.json'

const Confetti = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center z-10">
      <div className="absolute top-0 w-64 h-64 z-10">
        <Lottie animationData={confettiAnimation} loop={false} />
      </div>
    </div>
  );
};

export default Confetti;
