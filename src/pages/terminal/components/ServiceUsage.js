import React, { useState } from "react";
import { Icon } from "../../../components/Component";
import { CardTitle, Card, Label, FormGroup } from "reactstrap";
import { LineChartExample } from "../../../components/charts/Chart";
import { getAuthToken } from "../../../modules/auth/redux/authSelector";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/common/ui-view/SpinnerUI";
import { handleApiError } from "../../../modules/utilities/responseHandlers";
import { useQuery } from "react-query";
import { fetchData } from "../../../modules/utilities/util_query";
import ToastUI from "../../components/common/ui-view/ToastUI";
import { formatCurrencyNumber } from "../../../modules/utilities";

const formatData = (data) => {
  let labels = Object.keys(data);
  let totalTxnData = [];
  let suspectedTxnData = [];

  for (const key in data) {
    totalTxnData.push(data[key]?.total_txn);
    suspectedTxnData.push(data[key]?.suspected_txn);
  }

  return {
    labels: labels,
    dataUnit: "Transactions",
    lineTension: 0.4,
    legend: true,
    categoryPercentage: 0.9,
    barPercentage: 0.6,
    datasets: [
      {
        label: "Suspected Transactions",
        lineTension: 0.4,
        borderColor: "#ff0000",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        pointBorderWidth: 2,
        pointBackgroundColor: "white",
        pointRadius: 4,
        fill: true,
        data: suspectedTxnData,
      },
      {
        label: "Total Transactions",
        borderColor: "#5ce0aa",
        backgroundColor: "rgba(92, 224, 170, 0.5)",
        pointBorderWidth: 2,
        fill: true,
        pointBackgroundColor: "white",
        categoryPercentage: 0.9,
        barPercentage: 0.6,
        data: totalTxnData,
      },
    ],
  };
};

const ServiceUsage = ({ title = "Service Usage", serviceType, url, queryName = "serviceType" }) => {
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
  const [holder, setHolder] = useState({});

  const onApplyClick = () => {
    setStartDate(queryStartDate);
    setEndDate(queryEndDate);
  };

  const fetchInfo = useQuery(
    [
      `${url}?${queryName}=${serviceType}&startDate=${startDate}&endDate=${endDate}`,
      {
        url: `${url}?${queryName}=${serviceType}&startDate=${startDate}&endDate=${endDate}`,
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
        setHolder(data);
        if (metricType == "byAmount") {
          setData(data?.amount);
        } else if (metricType == "byCount") {
          setData(data?.count);
        }
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
              <h5>{title}</h5>
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
                        if (e.target.value == "byAmount") {
                          setData(holder?.amount);
                        } else if (e.target.value == "byCount") {
                          setData(holder?.count);
                        }
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
              <LoadingSpinner />
            ) : Object.keys(data).length == 0 ? (
              <div className="text-center">
                <Icon name="chart-line" size={50} color="gray" />
                <p className="text-gray">No Data Available</p>
              </div>
            ) : (
              <LineChartExample data={formatData(data)} />
            )}
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ServiceUsage;
