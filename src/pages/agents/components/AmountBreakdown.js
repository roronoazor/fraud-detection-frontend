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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const generateDoughnutData = (labels, data) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const AmountBreakdown = ({ url, agentId }) => {
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
  const [labels, setLabels] = useState([]);
  const [countData, setCountData] = useState([]);
  const [amountData, setAmountData] = useState([]);

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

        setLabels(Object.keys(data));
        setCountData(Object.keys(data).map((item) => data[item]?.count));
        setAmountData(Object.keys(data).map((item) => data[item]?.amount));
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
              <h5>Agent Transaction Breakdown</h5>
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
                      {amountData.length === 0 ? (
                        <div className="text-center my-2">No data available</div>
                      ) : (
                        <>
                          <Doughnut data={generateDoughnutData(labels, amountData)} />;
                        </>
                      )}
                    </>
                  )}

                  {metricType == "byCount" && (
                    <>
                      {countData.length == 0 ? (
                        <div className="text-center my-2">No data available</div>
                      ) : (
                        <>
                          <Doughnut data={generateDoughnutData(labels, countData)} />;
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

export default AmountBreakdown;
