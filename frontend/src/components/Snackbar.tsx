import React, { useState, useEffect } from "react";

interface SnackbarProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  duration = 2000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalTime = 20; // ms
    const totalSteps = duration / intervalTime;
    const decrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - decrement));
    }, intervalTime);

    const timeout = setTimeout(() => {
      onClose();
      clearInterval(timer);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-md shadow-lg relative overflow-hidden">
        {message}
        <div
          className="absolute bottom-0 left-0 h-1 bg-green-500 transition-all duration-20 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
