import React, { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  BackTo,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { FormGroup, Label, Row } from "reactstrap";
import { PieChartExample } from "../../components/charts/Chart";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";
import { GET_PRODUCT_OVERVIEW_BREAKDOWN, GET_TRANSACTIONS_STATS } from "../../config/urls";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { fetchData } from "../../modules/utilities/util_query";
import { handleApiError } from "../../modules/utilities/responseHandlers";

const SELECTED_TRANSACTION_TYPES_KEY = "transactionCategoryMonitoring.selectedTypes";

const emptyOverview = {
  total_transactions: 0,
  suspected_transactions: 0,
};

const getDefaultStartDate = () => {
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);
  return defaultStartDate.toISOString().split("T")[0];
};

const getDefaultEndDate = () => new Date().toISOString().split("T")[0];

const formatTransactionType = (type = "") => {
  return type
    .split("_")
    .filter(Boolean)
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    .join(" ");
};

const getStoredTransactionTypes = () => {
  try {
    const storedTypes = localStorage.getItem(SELECTED_TRANSACTION_TYPES_KEY);
    return storedTypes ? JSON.parse(storedTypes) : null;
  } catch (error) {
    return null;
  }
};

const setStoredTransactionTypes = (types) => {
  localStorage.setItem(SELECTED_TRANSACTION_TYPES_KEY, JSON.stringify(types));
};

const setChartData = (data) => {
  return {
    labels: ["Total Transactions", "Suspected Transactions"],
    dataUnit: "N",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["rgba(143, 234, 197, 0.8)", "rgba(244, 170, 164, 0.8)"],
        data: [data?.total_transactions || 0, data?.suspected_transactions || 0],
      },
    ],
  };
};

const TransactionTypeCard = ({ overview, onDetailClick, onHide, onOnly }) => {
  const totalTransactions = overview.total_transactions || 0;
  const suspectedTransactions = overview.suspected_transactions || 0;
  const suspectedPercentage = totalTransactions ? (suspectedTransactions / totalTransactions) * 100 : 0;

  return (
    <PreviewCard>
      <div className="card-head">
        <div>
          <h6 className="title mb-1">{formatTransactionType(overview.transaction_type)}</h6>
          <span className="sub-text">{overview.transaction_type}</span>
        </div>
        <div className="card-tools">
          <Button color="light" size="sm" outline className="mr-1" onClick={onOnly}>
            <Icon name="filter-alt" className="mr-1" />
            Only
          </Button>
          <Button color="light" size="sm" outline onClick={onHide}>
            <Icon name="eye-off" className="mr-1" />
            Hide
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap mt-3 mb-2">
        <div className="mr-3 mb-2">
          <span className="sub-text">Total</span>
          <h5 className="mb-0">{totalTransactions.toLocaleString()}</h5>
        </div>
        <div className="mr-3 mb-2">
          <span className="sub-text">Suspected</span>
          <h5 className="mb-0">{suspectedTransactions.toLocaleString()}</h5>
        </div>
        <div className="mb-2">
          <span className="sub-text">Flag Rate</span>
          <h5 className="mb-0">{suspectedPercentage.toFixed(1)}%</h5>
        </div>
      </div>
      <div className="nk-ck-sm">
        <PieChartExample data={setChartData(overview)} />
      </div>
      {suspectedTransactions > 0 && (
        <Button color="danger" size="sm" className="mt-3" onClick={onDetailClick}>
          <Icon name="eye" className="mr-1" />
          View Details
        </Button>
      )}
    </PreviewCard>
  );
};

const TransactionCategoryMonitoring = () => {
  const history = useHistory();
  const token = useSelector(getAuthToken);
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());
  const [queryDates, setQueryDates] = useState({
    startDate: getDefaultStartDate(),
    endDate: getDefaultEndDate(),
  });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [manageTypesOpen, setManageTypesOpen] = useState(false);
  const [hasLoadedStoredTypes, setHasLoadedStoredTypes] = useState(false);

  const transactionTypesQuery = useQuery(
    [
      "transaction-category-types",
      {
        url: GET_TRANSACTIONS_STATS,
        payload_data: {},
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const transactionTypes = useMemo(() => {
    const types = transactionTypesQuery.data?.data?.transaction_types || [];
    return [...types]
      .filter((item) => item.transaction_type)
      .sort((first, second) => (second.count || 0) - (first.count || 0));
  }, [transactionTypesQuery.data]);

  React.useEffect(() => {
    if (!transactionTypes.length || hasLoadedStoredTypes) {
      return;
    }

    const availableTypes = transactionTypes.map((item) => item.transaction_type);
    const storedTypes = getStoredTransactionTypes();
    const initialTypes = Array.isArray(storedTypes)
      ? storedTypes.filter((type) => availableTypes.includes(type))
      : availableTypes;

    setSelectedTypes(initialTypes);
    setStoredTransactionTypes(initialTypes);
    setHasLoadedStoredTypes(true);
  }, [hasLoadedStoredTypes, transactionTypes]);

  const updateSelectedTypes = (types) => {
    setSelectedTypes(types);
    setStoredTransactionTypes(types);
  };

  const selectedTypeSet = useMemo(() => new Set(selectedTypes), [selectedTypes]);
  const selectedTypesParam = selectedTypes.join(",");

  const overviewQuery = useQuery(
    [
      "transaction-category-overview",
      {
        url: `${GET_PRODUCT_OVERVIEW_BREAKDOWN}?types=${encodeURIComponent(
          selectedTypesParam,
        )}&startDate=${queryDates.startDate}&endDate=${queryDates.endDate}`,
        payload_data: {},
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      enabled: hasLoadedStoredTypes && selectedTypes.length > 0,
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const overviewByType = useMemo(() => {
    const rows = overviewQuery.data?.data?.data?.transaction_types || [];
    return rows.reduce((result, item) => {
      result[item.transaction_type] = item;
      return result;
    }, {});
  }, [overviewQuery.data]);

  const visibleOverviews = useMemo(() => {
    return transactionTypes
      .filter((item) => selectedTypeSet.has(item.transaction_type))
      .map((item) => ({
        ...emptyOverview,
        transaction_type: item.transaction_type,
        all_time_count: item.count || 0,
        ...(overviewByType[item.transaction_type] || {}),
      }))
      .sort((first, second) => {
        if (second.total_transactions !== first.total_transactions) {
          return second.total_transactions - first.total_transactions;
        }
        return second.all_time_count - first.all_time_count;
      });
  }, [overviewByType, selectedTypeSet, transactionTypes]);

  const summary = useMemo(() => {
    return visibleOverviews.reduce(
      (result, item) => ({
        totalTransactions: result.totalTransactions + (item.total_transactions || 0),
        suspectedTransactions: result.suspectedTransactions + (item.suspected_transactions || 0),
      }),
      { totalTransactions: 0, suspectedTransactions: 0 },
    );
  }, [visibleOverviews]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQueryDates({ startDate, endDate });
  };

  const toggleTransactionType = (type) => {
    if (selectedTypeSet.has(type)) {
      updateSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
      return;
    }
    updateSelectedTypes([...selectedTypes, type]);
  };

  const selectAllTypes = () => {
    updateSelectedTypes(transactionTypes.map((item) => item.transaction_type));
  };

  const clearSelectedTypes = () => {
    updateSelectedTypes([]);
  };

  const selectOnlyType = (type) => {
    updateSelectedTypes([type]);
  };

  const hideType = (type) => {
    updateSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
  };

  const viewDetails = (type) => {
    history.push(
      `/monitoring/rule/suspected?productType=${type}&startDate=${queryDates.startDate}&endDate=${queryDates.endDate}`,
    );
  };

  const isLoading = transactionTypesQuery.isLoading || (overviewQuery.isLoading && selectedTypes.length > 0);

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
                Transaction Category Monitoring
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <form onSubmit={handleSubmit}>
              <BlockBetween>
                <ul className="nk-block-tools g-3">
                  <li>
                    <FormGroup>
                      <Label htmlFor="transaction-category-start-date" className="form-label">
                        Start Date
                      </Label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          name="start_date"
                          type="date"
                          id="transaction-category-start-date"
                          onChange={(event) => setStartDate(event.target.value)}
                          value={startDate}
                        />
                      </div>
                    </FormGroup>
                  </li>
                  <li>
                    <FormGroup>
                      <Label htmlFor="transaction-category-end-date" className="form-label">
                        End Date
                      </Label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          name="end_date"
                          type="date"
                          id="transaction-category-end-date"
                          onChange={(event) => setEndDate(event.target.value)}
                          value={endDate}
                        />
                      </div>
                    </FormGroup>
                  </li>
                  <li>
                    <FormGroup>
                      <Button color="primary" size="lg" type="submit">
                        <Icon name="check-thick" className="mr-1" />
                        Apply
                      </Button>
                    </FormGroup>
                  </li>
                </ul>
                <div className="nk-block-tools">
                  <Button color="light" outline onClick={() => setManageTypesOpen(!manageTypesOpen)}>
                    <Icon name="filter-alt" className="mr-1" />
                    Manage Types ({selectedTypes.length}/{transactionTypes.length})
                  </Button>
                </div>
              </BlockBetween>
            </form>
            <hr className="preview-hr" />
            <Row className="gy-3">
              <Col md="4">
                <span className="sub-text">Visible Types</span>
                <h4 className="mb-0">
                  {selectedTypes.length.toLocaleString()} of {transactionTypes.length.toLocaleString()}
                </h4>
              </Col>
              <Col md="4">
                <span className="sub-text">Transactions In Range</span>
                <h4 className="mb-0">{summary.totalTransactions.toLocaleString()}</h4>
              </Col>
              <Col md="4">
                <span className="sub-text">Suspected In Range</span>
                <h4 className="mb-0">{summary.suspectedTransactions.toLocaleString()}</h4>
              </Col>
            </Row>
            {manageTypesOpen && (
              <>
                <hr className="preview-hr" />
                <BlockBetween className="mb-3">
                  <h6 className="title mb-0">Transaction Types</h6>
                  <div>
                    <Button color="light" size="sm" outline className="mr-1" onClick={selectAllTypes}>
                      Select All
                    </Button>
                    <Button color="light" size="sm" outline onClick={clearSelectedTypes}>
                      Clear
                    </Button>
                  </div>
                </BlockBetween>
                <div
                  style={{
                    display: "grid",
                    gap: "10px",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  }}
                >
                  {transactionTypes.map((item) => {
                    const isSelected = selectedTypeSet.has(item.transaction_type);
                    return (
                      <div
                        key={item.transaction_type}
                        className="border rounded p-2 d-flex justify-content-between align-items-center"
                      >
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={isSelected}
                            onChange={() => toggleTransactionType(item.transaction_type)}
                          />
                          {formatTransactionType(item.transaction_type)}
                          <span className="sub-text d-block">{(item.count || 0).toLocaleString()} all time</span>
                        </label>
                        <Button color="light" size="sm" outline onClick={() => selectOnlyType(item.transaction_type)}>
                          Only
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </PreviewCard>
        </Block>
        <Block>
          {isLoading && <LoadingSpinner />}
          {!isLoading && selectedTypes.length === 0 && (
            <PreviewCard>
              <div className="text-center py-4">
                <h5 className="title">No transaction types selected</h5>
                <p className="text-muted mb-3">Choose at least one transaction type to load the analysis.</p>
                <Button color="primary" onClick={selectAllTypes}>
                  Select All Types
                </Button>
              </div>
            </PreviewCard>
          )}
          {!isLoading && selectedTypes.length > 0 && (
            <Row className="gy-4">
              {visibleOverviews.map((overview) => (
                <Col className="my-1" md="6" xl="4" key={overview.transaction_type}>
                  <TransactionTypeCard
                    overview={overview}
                    onDetailClick={() => viewDetails(overview.transaction_type)}
                    onHide={() => hideType(overview.transaction_type)}
                    onOnly={() => selectOnlyType(overview.transaction_type)}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Block>
      </Content>
    </>
  );
};

export default TransactionCategoryMonitoring;
