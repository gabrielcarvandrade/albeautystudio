"use client";

import { useId } from "react";

interface PetalDividerProps {
  color?: string;
  className?: string;
}

export default function PetalDivider({ color = "var(--border)", className = "" }: PetalDividerProps) {
  const id = useId();

  return (
    <div className={`w-full flex items-center justify-center py-2 ${className}`}>
      <svg
        width="320"
        height="24"
        viewBox="0 0 320 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="12" x2="128" y2="12" stroke={color} strokeWidth="0.8" />
        {/* Central floral motif */}
        <g transform="translate(160, 12)">
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={`${id}-petal-${i}`}
              cx={Math.cos((angle * Math.PI) / 180) * 5}
              cy={Math.sin((angle * Math.PI) / 180) * 5}
              rx="2.5"
              ry="1.2"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 5} ${Math.sin((angle * Math.PI) / 180) * 5})`}
              fill={color}
              opacity="0.7"
            />
          ))}
          {/* Center dot */}
          <circle cx="0" cy="0" r="1.5" fill={color} opacity="0.9" />
        </g>
        <line x1="192" y1="12" x2="320" y2="12" stroke={color} strokeWidth="0.8" />

        {/* Small diamonds on line */}
        <rect x="58" y="9.5" width="5" height="5" transform="rotate(45 60.5 12)" fill={color} opacity="0.5" />
        <rect x="254" y="9.5" width="5" height="5" transform="rotate(45 256.5 12)" fill={color} opacity="0.5" />
      </svg>
    </div>
  );
}
