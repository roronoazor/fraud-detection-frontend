import React, { useState } from "react";
import { Card, FormGroup, Label, ListGroup, ListGroupItem, Progress } from "reactstrap";
import { getAuthToken } from "../../../modules/auth/redux/authSelector";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/common/ui-view/SpinnerUI";
import { handleApiError } from "../../../modules/utilities/responseHandlers";
import { useQuery } from "react-query";
import { fetchData } from "../../../modules/utilities/util_query";
import ToastUI from "../../components/common/ui-view/ToastUI";
import { formatCurrencyNumber } from "../../../modules/utilities";

const ProvidersList = ({ serviceType, title, url }) => {
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
  const [providerByCount, setProviderByCount] = useState([]);
  const [providerByAmount, setProviderByAmount] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  const onApplyClick = () => {
    setStartDate(queryStartDate);
    setEndDate(queryEndDate);
  };

  const fetchInfo = useQuery(
    [
      `${url}?serviceType=${serviceType}&startDate=${startDate}&endDate=${endDate}`,
      {
        url: `${url}?serviceType=${serviceType}&startDate=${startDate}&endDate=${endDate}`,
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
        if (title == "Providers") {
          setProviderByAmount(data?.top_providers_by_amount);
          setProviderByCount(data?.top_providers_by_count);
        } else if (title == "Agents") {
          setProviderByAmount(data?.top_agents_by_amount);
          setProviderByCount(data?.top_agents_by_count);
        }
        setTotalCount(data?.total_transactions?.total_count);
        setTotalAmount(data?.total_transactions?.total_amount);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error message="Failed to fetch data, Please contact admin" />);
      },
    },
  );
  const { isLoading } = fetchInfo;

  return (
    <Card className="card-bordered card-stretch">
      <div className="card-inner-group">
        <div className="card-inner">
          <div className="card-title">
            <h5>
              Top {title} {metricType == "byAmount" ? "By Amount" : "By Count"}
            </h5>
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
                <Label htmlFor="start-date" className="form-label">
                  Start Date
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="start_date"
                    type="date"
                    id="start-date"
                    value={queryStartDate}
                    onChange={(e) => setQueryStartDate(e.target.value)}
                  />
                </div>
              </FormGroup>
              <FormGroup style={{ marginRight: "5px" }}>
                <Label htmlFor="end-date" className="form-label">
                  End Date
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="end_date"
                    type="date"
                    id="end-date"
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form>
            {metricType == "byAmount" && providerByAmount.length != 0 && (
              <>
                <h6>Total Amount: ₦{`${formatCurrencyNumber(totalAmount)}`}</h6>
              </>
            )}

            {metricType == "byCount" && providerByCount.length != 0 && (
              <>
                <strong>
                  <h6>Total Count: {`${formatCurrencyNumber(totalCount)}`}</h6>
                </strong>
              </>
            )}
            {metricType == "byAmount" && (
              <>
                {providerByAmount.length === 0 ? (
                  <div className="text-center my-2">No data available</div>
                ) : (
                  <ListGroup numbered>
                    {providerByAmount.map((provider, index) => {
                      const { provider: name, total_amount, successful_amount } = provider;
                      const providerTransactionPercentage = (total_amount / totalAmount) * 100;
                      const successRate = (successful_amount / total_amount) * 100;

                      return (
                        <ListGroupItem key={index} style={{ marginBottom: "15px" }}>
                          <div>
                            <strong>{name.toUpperCase()}</strong>
                          </div>
                          <div>
                            Total Amount: ₦{formatCurrencyNumber(total_amount)} (
                            {providerTransactionPercentage.toFixed(2)}% of total)
                          </div>
                          <Progress value={providerTransactionPercentage} style={{ marginBottom: "10px" }} />
                          <div>
                            Successful Amount: ₦{formatCurrencyNumber(successful_amount)} ({successRate.toFixed(2)}%
                            successful)
                          </div>
                          <Progress color="success" value={successRate} />
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                )}
              </>
            )}
            {metricType == "byCount" && (
              <>
                {providerByCount.length === 0 ? (
                  <div>No data available</div>
                ) : (
                  <ListGroup numbered>
                    {providerByCount.map((provider, index) => {
                      const { provider: name, total_count, successful_count } = provider;
                      const providerTransactionPercentage = (total_count / totalCount) * 100;
                      const successRate = (successful_count / total_count) * 100;

                      return (
                        <ListGroupItem key={index} style={{ marginBottom: "15px" }}>
                          <div>
                            <strong>{name.toUpperCase()}</strong>
                          </div>
                          <div>
                            Total Transactions: {formatCurrencyNumber(total_count)} (
                            {providerTransactionPercentage.toFixed(2)}% of total)
                          </div>
                          <Progress value={providerTransactionPercentage} style={{ marginBottom: "10px" }} />
                          <div>
                            Successful Transactions: {formatCurrencyNumber(successful_count)} ({successRate.toFixed(2)}%
                            successful)
                          </div>
                          <Progress color="success" value={successRate} />
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                )}
              </>
            )}
          </form>
        )}
      </div>
    </Card>
  );
};

export default ProvidersList;
