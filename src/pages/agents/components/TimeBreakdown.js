import React, { useState } from "react";
import { Icon } from "../../../components/Component";
import { CardTitle, Row, Col, Card, Label, FormGroup } from "reactstrap";
import { fetchData } from "../../../modules/utilities/util_query";
import ToastUI from "../../components/common/ui-view/ToastUI";
import { formatCurrencyNumber } from "../../../modules/utilities";
import { useQuery } from "react-query";
import { handleApiError } from "../../../modules/utilities/responseHandlers";
import { getAuthToken } from "../../../modules/auth/redux/authSelector";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/common/ui-view/SpinnerUI";

const TimeBreakdown = ({ url, agentId }) => {
  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const today = new Date();
  const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  const formattedToday = today.toISOString().slice(0, 10);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);
  const [queryStartDate, setQueryStartDate] = useState(startDate);
  const [queryEndDate, setQueryEndDate] = useState(endDate);
  const [metricType, setMetricType] = useState("byAmount");
  const [hourBreakdownByCount, setHourBreakdownByCount] = useState([]);
  const [hourBreakdownByAmount, setHourBreakdownByAmount] = useState([]);

  const onApplyClick = () => {
    setStartDate(queryStartDate);
    setEndDate(queryEndDate);
  };

  const fetchInfo = useQuery(
    [
      `${url}?agentId=${agentId}&startDate=${startDate}&endDate=${endDate}`,
      {
        url: `${url}?agentId=${agentId}&startDate=${startDate}&endDate=${endDate}`,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data?.data;
        setHourBreakdownByAmount(data?.amount_by_hour);
        setHourBreakdownByCount(data?.count_by_hour);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error message="Failed to fetch data, Please contact admin" />);
      },
    },
  );
  const { isLoading } = fetchInfo;

  return (
    <React.Fragment>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner border-bottom">
            <div className="card-title">
              <h5>Peak Transaction Hours</h5>
            </div>
            <div className="card-title-group">
              <div className="card-tools mr-n1" style={{ display: "flex", alignItems: "flex-end" }}>
                <FormGroup style={{ marginRight: "5px" }}>
                  <Label htmlFor="metric-type" className="form-label">
                    Metric Type
                  </Label>
                  <div className="form-control-wrap">
                    <select
                      className="form-control"
                      name="metric_type"
                      id="metric-type"
                      value={metricType}
                      onChange={(e) => {
                        setMetricType(e.target.value);
                      }}
                    >
                      <option value="byAmount">By Amount</option>
                      <option value="byCount">By Count</option>
                    </select>
                  </div>
                </FormGroup>
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
                      value={queryStartDate}
                      onChange={(e) => setQueryStartDate(e.target.value)}
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
                      value={queryEndDate}
                      onChange={(e) => setQueryEndDate(e.target.value)}
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
            {isLoading ? (
              <>
                <LoadingSpinner />
              </>
            ) : (
              <div className="timeline">
                <ul className="timeline-list">
                  {metricType == "byAmount" && (
                    <>
                      {hourBreakdownByAmount.length === 0 ? (
                        <div className="text-center my-2">No data available</div>
                      ) : (
                        <>
                          {hourBreakdownByAmount.map((item) => {
                            const hour = item.hour;
                            const amOrPm = hour >= 12 ? "PM" : "AM";
                            const displayHour = hour > 12 ? hour - 12 : hour;

                            return (
                              <li className="timeline-item" key={item.hour}>
                                <div className="timeline-status bg-primary"></div>
                                <div className="timeline-date">
                                  {displayHour} {amOrPm} <Icon name="alarm-alt"></Icon>
                                </div>
                                <div className="timeline-data">
                                  <h6 className="timeline-title">Transactions: ₦{formatCurrencyNumber(item.amount)}</h6>
                                  <div className="timeline-des">
                                    <p>Percentage of Total: {item.percentage}%</p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}

                  {metricType == "byCount" && (
                    <>
                      {hourBreakdownByCount.length == 0 ? (
                        <div className="text-center my-2">No data available</div>
                      ) : (
                        <>
                          {hourBreakdownByCount.map((item) => {
                            const hour = item.hour;
                            const amOrPm = hour >= 12 ? "PM" : "AM";
                            const displayHour = hour > 12 ? hour - 12 : hour;

                            return (
                              <li className="timeline-item" key={item.hour}>
                                <div className="timeline-status bg-primary"></div>
                                <div className="timeline-date">
                                  {displayHour} {amOrPm} <Icon name="alarm-alt"></Icon>
                                </div>
                                <div className="timeline-data">
                                  <h6 className="timeline-title">Count: {formatCurrencyNumber(item.count)}</h6>
                                  <div className="timeline-des">
                                    <p>Percentage of Total: {item.percentage}%</p>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TimeBreakdown;
