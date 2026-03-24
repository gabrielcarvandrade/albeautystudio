"use client";

import { useEffect } from "react";

export default function ClickRipple() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const ripple = document.createElement("span");
      const size = 100;
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX - size / 2}px;
        top:  ${e.clientY - size / 2}px;
        width: 0; height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(196,136,110,0.25) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        animation: ripple-expand 0.6s ease-out forwards;
        transform: translate(0, 0);
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return null;
}
