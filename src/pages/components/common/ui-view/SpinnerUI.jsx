import React from "react";
import { Spinner } from "reactstrap";

const LoadingSpinner = () => (
  <div style={spinnerContainerStyle}>
    <Spinner color="primary" size="" type="grow" />
  </div>
);

const spinnerContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default LoadingSpinner;
