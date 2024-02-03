import React from "react";
import { Icon } from "../../../components/Component";
import { CardTitle, Card, Label, FormGroup } from "reactstrap";
import { LineChartExample } from "../../../components/charts/Chart";

const TimeBreakdown = () => {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const onApplyClick = () => {};

  return (
    <React.Fragment>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner border-bottom">
            <div className="card-title-group">
              <div className="card-title">
                <h5>Service Usage</h5>
              </div>
              <div className="card-tools mr-n1" style={{ display: "flex", alignItems: "flex-end" }}>
                <FormGroup style={{ marginRight: "5px" }}>
                  <Label htmlFor="default-0" className="form-label ">
                    Start Date
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      name="start_date"
                      type="date"
                      id="default-0"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </FormGroup>
                <FormGroup style={{ marginRight: "5px" }}>
                  <Label htmlFor="default-0" className="form-label">
                    End Date
                  </Label>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      name="end_date"
                      type="date"
                      id="default-0"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </FormGroup>
                <button className="btn btn-primary" style={{ marginBottom: "18px" }} onClick={onApplyClick}>
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="card-inner">
            <LineChartExample />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TimeBreakdown;
