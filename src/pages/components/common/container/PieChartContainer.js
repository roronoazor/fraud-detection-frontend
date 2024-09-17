import React, { useEffect, useState } from "react";
import { handleApiError } from "../../../../modules/utilities/responseHandlers";
import LoadingSpinner from "../ui-view/SpinnerUI";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../../modules/auth/redux/authSelector";
import { useQuery } from "react-query";
import { fetchData } from "../../../../modules/utilities/util_query";
import ToastUI from "../ui-view/ToastUI";
import PieChartUI from "../ui-view/PieChartUI";
import { useHistory } from "react-router";

const setChartData = (data) => {
  return {
    labels: ["Total Transactions", "Suspected Transactions"],
    dataUnit: "N",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["rgba(143, 234, 197, 0.8)", "rgba(244, 170, 164, 0.8)"],
        data: [data?.total_transactions, data?.suspected_transactions],
      },
    ],
  };
};

const PieChartContainer = ({ title = "", url, type, startDate, endDate }) => {
  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const [showDetails, setShowDetails] = useState(false);
  const history = useHistory();

  const result = useQuery(
    [
      `${url}?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      {
        url: `${url}?type=${type}&startDate=${startDate}&endDate=${endDate}`,
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
        if (data?.suspected_transactions == 0) {
          setShowDetails(false);
        } else {
          setShowDetails(true);
        }

        setData(data);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const onDetailClick = () => {
    history.push(`/monitoring/rule/suspected?productType=${type}&startDate=${startDate}&endDate=${endDate}`);
  };

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

  return <PieChartUI title={title} data={setChartData(data)} showDetails={showDetails} onDetailClick={onDetailClick} />;
};
export default PieChartContainer;
