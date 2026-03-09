// components/RiskGauge.jsx
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function RiskGauge({ score }) {
  const safeScore = Math.min(Math.max(Number(score) || 0, 0), 1);
  const [animatedScore, setAnimatedScore] = useState(0);
  const previousScoreRef = useRef(0);

  useEffect(() => {
    const startValue = previousScoreRef.current;
    const endValue = safeScore;
    const durationMs = 850;
    let animationFrameId;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      const nextValue = startValue + (endValue - startValue) * eased;

      setAnimatedScore(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        previousScoreRef.current = endValue;
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [safeScore]);

  const angle = 180 - animatedScore * 180;
  const theta = (angle * Math.PI) / 180;
  const needleLength = 80;
  const centerX = 100;
  const centerY = 100;
  const needleX = centerX + Math.cos(theta) * needleLength;
  const needleY = centerY - Math.sin(theta) * needleLength;

  let needleColor = "#16a34a";
  let label = "Low Risk";
  if (animatedScore >= 0.35) {
    needleColor = "#ca8a04";
    label = "Suspicious";
  }
  if (animatedScore >= 0.65) {
    needleColor = "#dc2626";
    label = "High Risk";
  }

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 200 120"
        className="w-full h-auto"
        role="img"
        aria-label="Risk gauge"
      >
        <path
          d="M20 100 A80 80 0 0 1 76 24"
          stroke="#22c55e"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M76 24 A80 80 0 0 1 124 24"
          stroke="#facc15"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M124 24 A80 80 0 0 1 180 100"
          stroke="#ef4444"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />

        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={needleColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx={centerX} cy={centerY} r="6" fill={needleColor} />
      </svg>

      <div className="text-center -mt-1">
        <p className="text-2xl font-bold">
          {(animatedScore * 100).toFixed(1)}%
        </p>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      </div>
    </div>
  );
}

RiskGauge.propTypes = {
  score: PropTypes.number.isRequired,
};
