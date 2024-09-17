import React from "react";
import StatCardUI from "../ui-view/StatCardUI";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { handleApiError, handleApiSuccess } from "../../../../modules/utilities/responseHandlers";
import ToastUI from "../ui-view/ToastUI";
import { getAuthToken } from "../../../../modules/auth/redux/authSelector";
import { fetchData } from "../../../../modules/utilities/util_query";
import LoadingSpinner from "../ui-view/SpinnerUI";
import { formatCurrencyNumber } from "../../../../modules/utilities";

const StatCardContainer = ({ titleLabel, url, subValueLabel, subValueLabel2 }) => {
  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const result = useQuery(
    [
      `${url}`,
      {
        url: url,
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
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <StatCardUI
      titleLabel={titleLabel}
      titleValue={formatCurrencyNumber(data?.total ? data?.total : data?.today ? data?.today : "0")}
      subValueLabel={subValueLabel}
      subValue={formatCurrencyNumber(data?.active ? data?.active : data?.month ? data?.month : "0")}
      subValueLabel2={subValueLabel2}
      subValue2={formatCurrencyNumber(data?.inactive ? data?.inactive : data?.week ? data?.week : "0")}
    />
  );
};

StatCardUI.propTypes = {
  url: PropTypes.string,
  titleLabel: PropTypes.string,
  subValueLabel: PropTypes.string,
  subValueLabel2: PropTypes.string,
};

export default StatCardContainer;
