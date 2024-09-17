import React from "react";
import { PreviewCard } from "../../../../components/Component";

const PercentageHolder = ({ percentage, title, invert=false }) => {
    
    if (invert){
      var strokeColor = percentage < 50 ? 'red' : percentage < 80 ? 'orange' : 'green';
    } else {
      var strokeColor = percentage < 50 ? 'green' : percentage < 80 ? 'orange' : 'red';
    }
    
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    return (
      <div className="m-2">
      <div>
        {title}
      </div>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="transparent"
        />
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
        <text x="50%" y="50%" textAnchor="middle" stroke="#000" strokeWidth="2px" dy=".3em">
          {percentage}%
        </text>
      </svg>
      </div>
    );
  };


const PercentageUI = ({ title1, title2, percentage1, percentage2, invert, showDetails=false, onDetailClick=()=>{} }) => {
  return (
    <>
        <div className="nk-ck-sm">
            <PercentageHolder title={title1} invert={invert} percentage={percentage1} />
        </div>
        <div className="nk-ck-sm">
            <PercentageHolder title={title2} invert={invert} percentage={percentage2} />
        </div>
    </>
  );
};

export default PercentageUI;
