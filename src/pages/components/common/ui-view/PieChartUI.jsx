import React from "react";
import { PreviewCard } from "../../../../components/Component";
import { PieChartExample } from "../../../../components/charts/Chart";

const PieChartUI = ({ title, data={}, showDetails=false, onDetailClick=()=>{} }) => {
  return (
    <PreviewCard>
        <div className="card-head text-center">
        <h6 className="title">{title}</h6>
        {(showDetails) && (
          <div className="card-tools mr-n1">
            <button
              className="btn btn-danger my-1"
              onClick={onDetailClick}
            >
              View Details
            </button>
          </div>
        )}
        </div>
        <div className="nk-ck-sm">
            <PieChartExample data={data} />
        </div>
    </PreviewCard>
  );
};
export default PieChartUI;
