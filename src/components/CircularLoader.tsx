import React from 'react';

const CircularLoader = ({
  size = 48,
  strokeWidth = 4,
  color = 'text-blue-500',
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      className={`animate-[spin_1.2s_linear_infinite] ${color}`}
      style={{ width: size, height: size }}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Background Circle */}
      <circle
        className="opacity-20"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Spinning Arc */}
      <circle
        className="stroke-current"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
        fill="none"
      />
    </svg>
  );
};

export default CircularLoader;
