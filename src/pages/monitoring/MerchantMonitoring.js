import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  BackTo,
  PreviewCard,
  Button,
  Col,
  BlockBetween,
  RSelect,
  NSComponent,
} from "../../components/Component";
import { FormGroup, Label, Row } from "reactstrap";
import { doughnutChartData, barChartStacked } from "../../pages/components/charts/ChartData";
import { PieChartExample, BarChartExample, LineChartExample } from "../../components/charts/Chart";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, DropdownItem } from "reactstrap";
import { useSelector } from "react-redux";
import ToastUI from "../components/common/ui-view/ToastUI";
import { useQuery } from "react-query";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { fetchData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import { handleApiError } from "../../modules/utilities/responseHandlers";
import {
  firstLetterUpper,
  getCurrentDateInput,
  calculateSuspectedTransactionPercentage,
} from "../../modules/utilities";
import { buildQueryString } from "../../modules/utilities";
import {
  GET_MERCHANT_VOLUMES_FOR_BAR_CHART,
  GET_MERCHANTS_USERS,
  GET_MERCHANT_ACTIVITY_FOR_PIE_CHART,
  GET_MERCHANT_TREND_FOR_LINE_CHART,
} from "../../config/urls";

const today = getCurrentDateInput();

const getMerchantName = (merchant) => {
  if (merchant?.businessName) {
    return merchant?.businessName;
  }

  if (merchant?.username) {
    return merchant?.username;
  }

  if (merchant?.firstName) {
    return `${merchant?.firstName} ${merchant?.lastName}`;
  }

  return "N/A";
};

const orderMerchantsByLabel = (p_merchants) => {
  const sortedMerchants = [...p_merchants]; // Create a shallow copy of the original array

  sortedMerchants.sort((a, b) => {
    const labelA = a.label.toUpperCase(); // Convert labels to uppercase for case-insensitive sorting
    const labelB = b.label.toUpperCase();

    if (labelA < labelB) {
      return -1; // a should come before b
    }
    if (labelA > labelB) {
      return 1; // a should come after b
    }
    return 0; // a and b are equal in terms of sorting
  });

  return sortedMerchants;
};

const generateDoughnutData = (labels, dataUnit, data) => {
  const backgroundColors = labels.map((_, index) => generateColor(index, labels.length));

  return {
    labels: labels,
    dataUnit: dataUnit,
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: backgroundColors,
        data: data,
      },
    ],
  };
};

// Function to generate a unique color based on the index
const generateColor = (index, total) => {
  const hue = Math.floor((360 / total) * index);
  return `hsl(${hue}, 70%, 70%)`;
};

const generateSingleBarChartData = (labels, data, labelName) => {
  return {
    labels: labels,
    stacked: true,
    dataUnit: "N",
    datasets: [
      {
        label: `${labelName}`,
        backgroundColor: "rgba(92, 224, 170, 0.5)",
        data: data,
      },
    ],
  };
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const generateTrendData = (labels, datasets) => {
  return {
    labels: labels,
    dataUnit: "N",
    lineTension: 0.4,
    legend: true,
    categoryPercentage: 0.9,
    barPercentage: 0.6,
    datasets: datasets.map((dataset) => {
      let color = getRandomColor();
      return {
        label: dataset.name,
        lineTension: 0.4,
        pointBorderWidth: 2,
        pointBackgroundColor: color,
        backgroundColor: color,
        pointRadius: 4,
        fill: true,
        data: dataset.data,
      };
    }),
  };
};

const MerchantRankings = ({ sm }) => {
  const token = useSelector(getAuthToken);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const lastSevenDays = sevenDaysAgo.toISOString().split("T")[0];
  const [filters, setFilters] = useState({
    type: "top",
    merchantLimit: 5,
    startDate: lastSevenDays,
    endDate: today,
  });
  const [urlWithFilters, setUrlWithFilters] = useState(buildQueryString(GET_MERCHANT_VOLUMES_FOR_BAR_CHART, filters));
  const [countChartData, setCountChartData] = useState({});
  const [amountChartData, setAmountChartData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilter = () => {
    setUrlWithFilters(buildQueryString(GET_MERCHANT_VOLUMES_FOR_BAR_CHART, filters));
  };

  const addVal = (n) => {
    setFilters({ ...filters, merchantLimit: filters?.merchantLimit + n });
  };
  const reduceVal = (n) => {
    if (filters?.merchantLimit > 0 && filters?.merchantLimit !== 0) {
      setFilters({ ...filters, merchantLimit: filters?.merchantLimit - n });
    }
  };

  const payload_data = {};
  const fetchInfo = useQuery(
    [
      "get-merchant-volume",
      {
        url: urlWithFilters,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let { data } = response;
        let { series_count, series_amount } = data;
        series_count = series_count || [];
        series_amount = series_amount || [];
        let seriesCount = series_count.length > 0 ? series_count[0] : {};
        let seriesAmount = series_amount.length > 0 ? series_amount[0] : {};

        let seriesCountData = seriesCount?.data;
        let seriesAmountData = seriesAmount?.data;

        let transactionCount = seriesCountData.map((d) => d?.transaction_count);
        let transactionAmount = seriesAmountData.map((d) => d?.transaction_amount);
        let transactionCountLabel = seriesCountData.map((d) => getMerchantName(d?.merchant));
        let transactionAmountLabel = seriesAmountData.map((d) => getMerchantName(d?.merchant));

        let singleAmountBarChartData = generateSingleBarChartData(
          transactionAmountLabel,
          transactionAmount,
          "Transaction Volume",
        );
        let singleCountBarChartData = generateSingleBarChartData(
          transactionCountLabel,
          transactionCount,
          "Transaction Count",
        );
        setCountChartData(singleCountBarChartData);
        setAmountChartData(singleAmountBarChartData);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );
  const { isLoading } = fetchInfo;

  if (isLoading) {
    <Block>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner">
            <LoadingSpinner />
          </div>
        </div>
      </Card>
    </Block>;
  }

  return (
    <Block>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner">
            <div className="card-title-group">
              <div className="card-title">
                <h5 className="title">Merchant Rankings</h5>
              </div>
              <div className="card-tools mr-n1">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="customRadio1"
                              name="type"
                              className="custom-control-input form-control"
                              value={filters?.type}
                              checked={filters?.type == "top"}
                              onChange={() => {
                                setFilters({ ...filters, type: "top" });
                              }}
                            />
                            <label className="custom-control-label" htmlFor="customRadio1">
                              Top
                            </label>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="customRadio2"
                              name="type"
                              className="custom-control-input form-control"
                              value={filters?.type}
                              checked={filters?.type == "bottom"}
                              onChange={() => {
                                setFilters({ ...filters, type: "bottom" });
                              }}
                            />
                            <label className="custom-control-label" htmlFor="customRadio2">
                              Bottom
                            </label>
                          </div>
                        </div>
                      </li>
                      <li>
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            Merchant Limit
                          </Label>
                          <div className="form-control-wrap number-spinner-wrap">
                            {" "}
                            <Button
                              outline={true}
                              disabled={filters?.merchantLimit === 0 ? true : false}
                              className="btn-icon number-spinner-btn number-minus"
                              onClick={() => reduceVal(1)}
                            >
                              <Icon name="minus"></Icon>
                            </Button>{" "}
                            <input
                              type="number"
                              className="form-control number-spinner"
                              value={filters?.merchantLimit}
                              //
                              onChange={(e) => setValue(e.target.value)}
                              min={1}
                            />{" "}
                            <Button
                              outline={true}
                              //disabled={value === max ? true : false}
                              className="btn-icon number-spinner-btn number-plus"
                              onClick={() => addVal(1)}
                            >
                              <Icon name="plus"></Icon>
                            </Button>{" "}
                          </div>
                        </FormGroup>
                      </li>
                      <li>
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            Start Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="startDate"
                              type="date"
                              id="default-0"
                              placeholder="Start Date"
                              value={filters?.startDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            End Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="endDate"
                              type="date"
                              id="default-0"
                              placeholder="End Date"
                              value={filters?.endDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Button color="primary" size="lg" onClick={applyFilter}>
                            Submit
                          </Button>
                        </FormGroup>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className="card-inner">
              <Row>
                <Col md="6">
                  <PreviewCard>
                    <div className="card-head text-center">
                      <h6 className="title">Transaction Count</h6>
                    </div>
                    <div className="nk-ck-sm">
                      <BarChartExample data={countChartData} />
                    </div>
                  </PreviewCard>
                </Col>
                <Col md={6}>
                  <PreviewCard>
                    <div className="card-head">
                      <h6 className="title text-center">Transaction Volume</h6>
                    </div>
                    <div className="nk-ck-sm">
                      <BarChartExample data={amountChartData} />
                    </div>
                  </PreviewCard>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Card>
    </Block>
  );
};

const MerchantTrend = ({ sm }) => {
  const token = useSelector(getAuthToken);
  const [filters, setFilters] = useState({
    startDate: today,
    endDate: today,
    walletId: [],
  });
  const [merchants, setMerchants] = useState([]);
  const [xSeries, setXSeries] = useState([]);
  const [yCount, setYCount] = useState([]);
  const [yAmount, setYAmount] = useState([]);
  const [trendsAmountData, setTrendsAmountData] = useState([]);
  const [merchantMap, setMerchantMap] = useState({});

  const handleChange = (event, type) => {
    if (type == "multi") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        walletId: event,
      }));
      return;
    }
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const payload_data = {};
  const merchantsInfo = useQuery(
    [
      "get-merchants",
      {
        url: GET_MERCHANTS_USERS,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let { data: responseData } = response;
        let { data, count } = responseData;
        let p_merchantMap = {};
        let p_merchants = data.map((p_merchant, index) => {
          p_merchantMap[p_merchant?.wallet_id] = p_merchant?.merchant_name;
          return {
            value: p_merchant?.wallet_id,
            label: p_merchant?.merchant_name,
          };
        });
        setMerchantMap(p_merchantMap);
        setMerchants(orderMerchantsByLabel(p_merchants));
      },
      onError: (error) => {
        handleApiError(error);
      },
    },
  );
  const trendsInfo = useQuery(
    [
      "get-merchants-trends",
      {
        url: `${GET_MERCHANT_TREND_FOR_LINE_CHART}?walletId=${filters?.walletId
          ?.map((obj) => obj.value)
          .join(",")}&startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let { data } = response;
        let p_xSeries = [];
        if (data?.length > 0) {
          p_xSeries = data[0]?.dates || [];
        }
        let p_yCount = data.map((d) => {
          let wallet_id = d?.wallet_id;
          return {
            name: merchantMap[wallet_id],
            data: d?.counts || [],
          };
        });
        let p_yAmount = data.map((d) => {
          let wallet_id = d?.wallet_id;
          return {
            name: merchantMap[wallet_id],
            data: d?.amounts || [],
          };
        });
        setXSeries(p_xSeries);
        setYCount(p_yCount);
        setYAmount(p_yAmount);

        let trendsAmountData = generateTrendData(p_xSeries, p_yAmount);
        setTrendsAmountData(trendsAmountData);
      },
      onError: (error) => {
        handleApiError(error);
      },
      enabled: false,
    },
  );

  const applyFilter = () => {
    trendsInfo.refetch();
  };

  if (trendsInfo?.isLoading) {
    return (
      <Block>
        <Card className="card-bordered card-stretch">
          <div className="card-inner-group">
            <div className="card-inner">
              <LoadingSpinner />
            </div>
          </div>
        </Card>
      </Block>
    );
  }

  return (
    <Block>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner">
            <div className="card-title-group">
              <div className="card-title">
                <h5 className="title">Merchant Trend</h5>
              </div>
              <div className="card-tools mr-n1">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            Start Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="startDate"
                              type="date"
                              id="default-0"
                              placeholder="Start Date"
                              value={filters?.startDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            End Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="endDate"
                              type="date"
                              id="default-0"
                              placeholder="End Date"
                              value={filters?.endDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Button color="primary" size="lg" onClick={applyFilter}>
                            Submit
                          </Button>
                        </FormGroup>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className="card-inner">
              <Row>
                <Col className="mb-2" md="12">
                  <FormGroup>
                    <label className="form-label">Select Merchant(s)</label>
                    <RSelect
                      options={merchants}
                      isMulti
                      onChange={(e) => {
                        setFilters({ ...filters, walletId: e });
                      }}
                    />
                  </FormGroup>
                </Col>

                <Col md="12">
                  <PreviewCard>
                    <div className="card-head text-center">
                      <h6 className="title">Transaction Volume</h6>
                    </div>
                    <div className="nk-ck-sm">
                      <LineChartExample legend={true} data={trendsAmountData} />
                    </div>
                  </PreviewCard>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Card>
    </Block>
  );
};

const MerchantActivity = ({ sm }) => {
  const token = useSelector(getAuthToken);
  const [merchants, setMerchants] = useState([]);
  const [merchantMap, setMerchantMap] = useState({});
  const [doughnutVolumeData, setDoughnutVolumeData] = useState([]);
  const [doughnutCountData, setDoughnutCountData] = useState([]);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const lastSevenDays = sevenDaysAgo.toISOString().split("T")[0];
  const [filters, setFilters] = useState({
    startDate: lastSevenDays,
    endDate: today,
    type: "top",
    merchantLimit: 5,
  });
  const [urlWithFilters, setUrlWithFilters] = useState(buildQueryString(GET_MERCHANT_ACTIVITY_FOR_PIE_CHART, filters));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilter = () => {
    setUrlWithFilters(buildQueryString(GET_MERCHANT_ACTIVITY_FOR_PIE_CHART, filters));
  };

  const payload_data = {};
  const merchantsInfo = useQuery(
    [
      "get-merchants",
      {
        url: GET_MERCHANTS_USERS,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let { data: responseData } = response;
        let { data, count } = responseData;
        let p_merchantMap = {};
        let p_merchants = data.map((p_merchant, index) => {
          p_merchantMap[p_merchant?.wallet_id] = p_merchant?.merchant_name;
          return {
            value: p_merchant?.wallet_id,
            label: p_merchant?.merchant_name,
          };
        });
        setMerchantMap(p_merchantMap);
        setMerchants(orderMerchantsByLabel(p_merchants));
      },
      onError: (error) => {
        handleApiError(error);
      },
    },
  );
  const fetchInfo = useQuery(
    [
      "get-merchant-activity",
      {
        url: urlWithFilters,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let { data } = response;
        let { data: responseData } = data;

        const { activity_by_count, activity_by_amount } = responseData;
        // this is not optimal
        activity_by_count.sort((a, b) => {
          if (filters?.type === "top") {
            return b.count - a.count; // Descending order
          } else if (filters?.type === "bottom") {
            return a.count - b.count; // Ascending order
          }
          return 0;
        });

        activity_by_amount.sort((a, b) => {
          if (filters?.type === "top") {
            return b.amount - a.amount; // Descending order
          } else if (filters?.type === "bottom") {
            return a.amount - b.amount; // Ascending order
          }
          return 0;
        });

        let cLabels = activity_by_count.map((d) => {
          if (merchantMap[d.wallet_id]) {
            return merchantMap[d.wallet_id];
          }
          return "N/A";
        });
        let cSeries = activity_by_count.map((d) => d.count);
        let aLabels = activity_by_amount.map((d) => {
          if (merchantMap[d.wallet_id]) {
            return merchantMap[d.wallet_id];
          }
          return "N/A";
        });
        let aSeries = activity_by_amount.map((d) => d.amount);

        let filteredCountData = cSeries.slice(0, filters?.merchantLimit);
        let filteredCountLabels = cLabels.slice(0, filters?.merchantLimit);
        let filteredAmountData = aSeries.slice(0, filters?.merchantLimit);
        let filteredAmountLabels = aLabels.slice(0, filters?.merchantLimit);

        // Calculate the sum of the remaining items
        const remainingCount = cSeries.slice(filters.merchantLimit).reduce((sum, count) => sum + count, 0);
        const remainingAmount = aSeries.slice(filters.merchantLimit).reduce((sum, amount) => sum + amount, 0);

        // Add the remaining items as 'Others' to the filtered data
        if (remainingCount > 0) {
          filteredCountData.push(remainingCount);
          filteredCountLabels.push("Others");
        }

        if (remainingAmount > 0) {
          filteredAmountData.push(remainingAmount);
          filteredAmountLabels.push("Others");
        }

        // Render the pie chart using filteredCountData, filteredCountLabels, filteredAmountData, filteredAmountLabels
        // ...

        let doughnutVolume = generateDoughnutData(filteredAmountLabels, "N", filteredAmountData);
        let doughnutData = generateDoughnutData(filteredCountLabels, "N", filteredCountData);

        setDoughnutVolumeData(doughnutVolume);
        setDoughnutCountData(doughnutData);
      },
      onError: (error) => {
        handleApiError(error);
      },
    },
  );
  const addVal = (n) => {
    setFilters({ ...filters, merchantLimit: filters?.merchantLimit + n });
  };
  const reduceVal = (n) => {
    if (filters?.merchantLimit > 0 && filters?.merchantLimit !== 0) {
      setFilters({ ...filters, merchantLimit: filters?.merchantLimit - n });
    }
  };

  const { isLoading } = fetchInfo;

  if (isLoading) {
    return (
      <>
        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <LoadingSpinner />
              </div>
            </div>
          </Card>
        </Block>
      </>
    );
  }

  return (
    <Block>
      <Card className="card-bordered card-stretch">
        <div className="card-inner-group">
          <div className="card-inner">
            <div className="card-title-group">
              <div className="card-title">
                <h5 className="title">Merchant Activity</h5>
              </div>
              <div className="card-tools mr-n1">
                <div className="toggle-wrap nk-block-tools-toggle">
                  <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="merchantActivity1"
                              name="merchant_activity_type"
                              className="custom-control-input form-control"
                              value={filters?.type}
                              checked={filters?.type == "top"}
                              onChange={() => {
                                setFilters({ ...filters, type: "top" });
                              }}
                            />
                            <label className="custom-control-label" htmlFor="merchantActivity1">
                              Top
                            </label>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="form-group">
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="merchantActivity2"
                              name="merchant_activity_type"
                              className="custom-control-input form-control"
                              value={filters?.type}
                              checked={filters?.type == "bottom"}
                              onChange={() => {
                                setFilters({ ...filters, type: "bottom" });
                              }}
                            />
                            <label className="custom-control-label" htmlFor="merchantActivity2">
                              Bottom
                            </label>
                          </div>
                        </div>
                      </li>
                      <li>
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            Merchant Limit
                          </Label>
                          <div className="form-control-wrap number-spinner-wrap">
                            {" "}
                            <Button
                              outline={true}
                              disabled={filters?.merchantLimit === 0 ? true : false}
                              className="btn-icon number-spinner-btn number-minus"
                              onClick={() => reduceVal(1)}
                            >
                              <Icon name="minus"></Icon>
                            </Button>{" "}
                            <input
                              type="number"
                              className="form-control number-spinner"
                              value={filters?.merchantLimit}
                              //
                              onChange={(e) => setValue(e.target.value)}
                              min={1}
                            />{" "}
                            <Button
                              outline={true}
                              //disabled={value === max ? true : false}
                              className="btn-icon number-spinner-btn number-plus"
                              onClick={() => addVal(1)}
                            >
                              <Icon name="plus"></Icon>
                            </Button>{" "}
                          </div>
                        </FormGroup>
                      </li>
                      <li>
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            Start Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="startDate"
                              type="date"
                              id="default-0"
                              placeholder="Start Date"
                              value={filters?.startDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Label htmlFor="default-0" className="form-label">
                            End Date
                          </Label>
                          <div className="form-control-wrap">
                            <input
                              className="form-control"
                              name="endDate"
                              type="date"
                              id="default-0"
                              placeholder="End Date"
                              value={filters?.endDate}
                              onChange={handleChange}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Button color="primary" size="lg" onClick={applyFilter}>
                            Submit
                          </Button>
                        </FormGroup>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form>
            <div className="card-inner">
              <Row>
                <Col md="6">
                  <PreviewCard>
                    <div className="card-head text-center">
                      <h6 className="title">Transaction Count</h6>
                    </div>
                    <div className="nk-ck-sm">
                      <PieChartExample data={doughnutCountData} />
                    </div>
                  </PreviewCard>
                </Col>
                <Col md={6}>
                  <PreviewCard>
                    <div className="card-head">
                      <h6 className="title text-center">Transaction Volume</h6>
                    </div>
                    <div className="nk-ck-sm">
                      <PieChartExample data={doughnutVolumeData} />
                    </div>
                  </PreviewCard>
                </Col>
              </Row>
            </div>
          </form>
        </div>
      </Card>
    </Block>
  );
};

const MerchantMonitoring = (props) => {
  const [sm, updateSm] = useState(false);
  return (
    <>
      <Head title="Transaction Category Monitoring" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Merchant Monitoring
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>

        <MerchantRankings sm={sm} />
        <MerchantTrend sm={sm} />
        <MerchantActivity sm={sm} />
      </Content>
    </>
  );
};

export default MerchantMonitoring;
