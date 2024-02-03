import React from "react";

const PercentageIndicator = ({ percentage }) => {
  const strokeColor = percentage < 50 ? "green" : percentage < 80 ? "orange" : "red";
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={radius} stroke="lightgray" strokeWidth="10" fill="transparent" />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke={strokeColor}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="transparent"
      />
      <text x="50%" y="50%" textAnchor="middle" stroke={`${strokeColor}`} strokeWidth="2px" dy=".3em">
        {percentage}%
      </text>
    </svg>
  );
};

export default PercentageIndicator;
