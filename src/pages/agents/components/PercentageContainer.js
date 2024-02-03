import React, { useEffect, useState } from "react";
import PercentageUI from "../../components/common/ui-view/PercentageUI";
import { Card, Col, Label, FormGroup } from "reactstrap";
import { handleApiError } from "../../../modules/utilities/responseHandlers";
import LoadingSpinner from "../../components/common/ui-view/SpinnerUI";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../modules/auth/redux/authSelector";
import { useQuery, useQueryClient } from "react-query";
import { fetchData } from "../../../modules/utilities/util_query";
import ToastUI from "../../components/common/ui-view/ToastUI";

const PercentageContainer = ({ title = "", invert = false, agentId, url }) => {
  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const [showDetails, setShowDetails] = useState(false);
  const today = new Date();
  const sevenDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

  const formattedToday = today.toISOString().slice(0, 10);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);
  const [queryStartDate, setQueryStartDate] = useState(startDate);
  const [queryEndDate, setQueryEndDate] = useState(endDate);

  const result = useQuery(
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
        let data = response?.data?.data;
        setData(data);
      },
      onError: (error) => {
        handleApiError(
          error,
          <ToastUI error message={error?.response?.data?.detail || "Something went wrong, Please try again later"} />,
        );
      },
    },
  );

  const onApplyClick = () => {
    // queryClient.invalidateQueries(`${url}?startDate=${startDate}&endDate=${endDate}`);
    setStartDate(queryStartDate);
    setEndDate(queryEndDate);
  };

  const { isLoading } = result;

  return (
    <>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner">
            <div className="card-title">
              <h5>{title}</h5>
            </div>
            <div className="card-title-group">
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
          <form style={{ display: "flex", justifyContent: "center" }}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <PercentageUI title={title} invert={invert} percentage={data?.percentage || 0} />
            )}
          </form>
        </div>
      </Card>
    </>
  );
};

export default PercentageContainer;
