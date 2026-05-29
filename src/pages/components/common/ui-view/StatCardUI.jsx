import React from "react";
import PropTypes from "prop-types"; // Import PropTypes if needed
import { TooltipComponent } from "../../../../components/Component";
import { PreviewAltCard } from "../../../../components/Component";

const StatCardUI = ({ 
  titleLabel,
  titleValue,
  subValue,
  subValueLabel,
  subValueLabel2, 
  subValue2,
  errorMessage
}) => {
  return (
    <PreviewAltCard className="card-full card-bordered">
      <div className="card-title-group align-start mb-0">
        <div className="card-title">
          <h6 className="subtitle">{titleLabel}</h6>
        </div>
        <div className="card-tools">
          <TooltipComponent
            iconClass="card-hint"
            icon="help-fill"
            direction="left"
            id="invest-deposit"
            text={titleValue}
          ></TooltipComponent>
        </div>
      </div>
      <div className="card-amount">
        <span className="amount">{titleValue}</span>
        {errorMessage && <span className="sub-text text-danger d-block mt-1">{errorMessage}</span>}
      </div>
      <div className="invest-data">
        <div className="invest-data-amount g-2">
          <div className="invest-data-history">
            <div className="title">{subValueLabel}</div>
            <div className="amount">{subValue}</div>
          </div>
          <div className="invest-data-history">
            <div className="title">{subValueLabel2}</div>
            <div className="amount">{subValue2}</div>
          </div>
        </div>
      </div>
    </PreviewAltCard>
  );
};

StatCardUI.propTypes = {
  titleLabel: PropTypes.string,
  titleValue: PropTypes.string,
  subValue: PropTypes.string,
  subValueLabel: PropTypes.string,
  subValueLabel2: PropTypes.string, 
  subValue2: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default StatCardUI;
