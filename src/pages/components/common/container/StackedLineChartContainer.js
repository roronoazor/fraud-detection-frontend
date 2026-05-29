import React, { useEffect, useState } from "react";
import StackedLineChartUI from "../ui-view/StackedLineChartUI";
import { handleApiError } from "../../../../modules/utilities/responseHandlers";
import LoadingSpinner from "../ui-view/SpinnerUI";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../../modules/auth/redux/authSelector";
import { useQuery } from "react-query";
import { fetchData } from "../../../../modules/utilities/util_query";
import { formatCurrencyNumber } from "../../../../modules/utilities";
import ToastUI from "../ui-view/ToastUI";

export const solidLineChart = (data, planSet) => {
  let labels, totalTxnData, suspectedTxnData;
  const last30Days = data?.last_30_days || {};

  if (planSet === "7") {
    labels = Object.keys(last30Days).slice(-7);
    totalTxnData = labels.map((date) => last30Days[date]?.total_txn || 0);
    suspectedTxnData = labels.map((date) => last30Days[date]?.suspected_txn || 0);
  } else if (planSet === "15") {
    labels = Object.keys(last30Days).slice(-15);
    totalTxnData = labels.map((date) => last30Days[date]?.total_txn || 0);
    suspectedTxnData = labels.map((date) => last30Days[date]?.suspected_txn || 0);
  } else {
    labels = Object.keys(last30Days);
    totalTxnData = labels.map((date) => last30Days[date]?.total_txn || 0);
    suspectedTxnData = labels.map((date) => last30Days[date]?.suspected_txn || 0);
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

const StackedLineChartContainer = ({ title = "", url, type }) => {
  const [planSet, setPlanSet] = useState("30");
  const [totalTxn, setTotalTxn] = useState(0);
  const [suspectedTxn, setSuspectedTxn] = useState(0);
  const [requestFailed, setRequestFailed] = useState(false);

  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const result = useQuery(
    [
      `${url}?type=${type}`,
      {
        url: `${url}?type=${type}`,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data?.data || {};
        setRequestFailed(false);
        setData(data);
        calculateTotalAndSuspectedTxn(data);
      },
      onError: (error) => {
        setRequestFailed(true);
        setData({});
        calculateTotalAndSuspectedTxn({});
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const changePlanSet = (value) => {
    setPlanSet(value);
  };

  const calculateTotalAndSuspectedTxn = (data) => {
    let total = 0;
    let suspected = 0;

    for (const date in data?.last_30_days) {
      if (data?.last_30_days.hasOwnProperty(date)) {
        const dailyData = data.last_30_days[date];
        total += dailyData.total_txn;
        suspected += dailyData.suspected_txn;
      }
    }

    setTotalTxn(total);
    setSuspectedTxn(suspected);
  };

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <StackedLineChartUI
      planSet={planSet}
      title={title}
      changePlanSet={changePlanSet}
      chartData={solidLineChart(data, planSet)}
      totalTxn={formatCurrencyNumber(totalTxn)}
      suspectedTxn={formatCurrencyNumber(suspectedTxn)}
      emptyMessage={requestFailed ? "Backend unavailable" : "No transaction data"}
    />
  );
};
export default StackedLineChartContainer;
