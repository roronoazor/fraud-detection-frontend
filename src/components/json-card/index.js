import React from "react";
import { camelCaseToWords, formatCurrencyNumber } from "../../modules/utilities";

const JsonCard = (props) => {
  const { response, title } = props;
  let responseKeys;

  if (!response) {
    responseKeys = [];
  } else {
    responseKeys = Object.keys(response);
  }

  if (responseKeys.length <= 0) {
    return <></>;
  }

  responseKeys = responseKeys.filter((key) => !(typeof response[key] === "object" && response[key] !== null));

  return (
    <div className="card" style={{ border: "1px solid #ddd" }}>
      <div className="card-header">
        <h6>{title}</h6>
      </div>
      <div className="card-body">
        <div className="row">
          {responseKeys.map((item, index) => {
            let itemLabel =
              item === "rrn"
                ? "RRN"
                : item === "STAN" || item === "PAN" || item === "MTI"
                ? item
                : camelCaseToWords(item);

            return (
              <div key={index} className="col-md-4 mb-3">
                <strong>{itemLabel}</strong>
                <p>
                  {itemLabel.toUpperCase().includes("AMOUNT") ? (
                    <span>&#8358;{formatCurrencyNumber(response[item])}</span>
                  ) : (
                    response[item] || "-"
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JsonCard;
