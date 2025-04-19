import React from 'react';

const CircularLoader = ({
  size = 48,
  strokeWidth = 4,
  color = 'text-black',
  label,
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
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

      {label && <span className="text-xl text-[#383A49]">{label}</span>}
    </div>
  );
};

export default CircularLoader;
