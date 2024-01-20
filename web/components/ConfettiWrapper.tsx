import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiWrapperProps {
  numberOfPieces: number;
}

export default function ConfettiWrapper({ numberOfPieces }: ConfettiWrapperProps) {
  const [pieces, setPieces] = useState<number>(numberOfPieces);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPieces(0);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  return <Confetti numberOfPieces={pieces} />;
};
