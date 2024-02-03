import React from "react";
import { Icon } from "../../../components/Component";
import { CardTitle, Card, Label, FormGroup } from "reactstrap";

const notificationData = [
  {
    id: 1,
    date: "13 Nov",
    text: "Submitted KYC Application",
    subtitle: "Re-submitted KYC Application form.",
    time: "09:30am",
    fill: "bg-primary",
    outline: true,
  },
  {
    id: 2,
    date: "14 Nov",
    text: "Cancel KYC Application",
    subtitle: "Cancel KYC Application form.",
    time: "09:30am",
    fill: "bg-primary",
    outline: false,
  },
  {
    id: 3,
    date: "15 Nov",
    text: "New KYC Application",
    subtitle: "New application for KYC",
    time: "09:30am",
    fill: "bg-primary",
    outline: false,
  },
];

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
                <h5>Breakdown by time</h5>
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
            <div className="timeline">
              <h6 className="timeline-head">November, 2019</h6>
              <ul className="timeline-list">
                {notificationData.map((item) => {
                  return (
                    <>
                      <li className="timeline-item" key={item.id}>
                        <div className={`timeline-status ${item.fill} ${item.outline ? "is-outline" : ""}`}></div>
                        <div className="timeline-date">
                          {item.date} <Icon name="alarm-alt"></Icon>
                        </div>
                        <div className="timeline-data">
                          <h6 className="timeline-title">{item.text}</h6>
                          <div className="timeline-des">
                            <p>{item.subtitle}</p>
                            <span className="time">{item.time}</span>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TimeBreakdown;
