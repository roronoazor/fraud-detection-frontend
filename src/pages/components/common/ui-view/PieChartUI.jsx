import React from "react";
import { PreviewCard } from "../../../../components/Component";
import { PieChartExample } from "../../../../components/charts/Chart";

const PieChartUI = ({ title, data={} }) => {
  
  return (
    <PreviewCard>
        <div className="card-head text-center">
        <h6 className="title">{title}</h6>
        </div>
        <div className="nk-ck-sm">
            <PieChartExample data={data} />
        </div>
    </PreviewCard>
  );
};
export default PieChartUI;
