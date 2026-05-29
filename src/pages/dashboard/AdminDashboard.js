import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Icon,
  PreviewCard,
  Row,
} from "../../components/Component";
import StatCardContainer from "../components/common/container/StatCardContainer";
import {
  GET_FLAGGED_TXN_STATS,
  GET_RULES_STATS,
  GET_TXN_STATS,
  GET_PERCENTAGE_FLAGGED_STATS,
  GET_TRANSACTION_TYPE_BREAKDOWN,
  GET_PRODUCT_OVERVIEW_BREAKDOWN,
  GET_TRANSACTIONS_STATS,
} from "../../config/urls";
import StackedLineChartContainer from "../components/common/container/StackedLineChartContainer";
import ToastUI from "../components/common/ui-view/ToastUI";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { handleApiError } from "../../modules/utilities/responseHandlers";
import { fetchData } from "../../modules/utilities/util_query";

const SELECTED_DASHBOARD_TRANSACTION_TYPES_KEY = "adminDashboard.selectedTransactionTypes";
const DEFAULT_DASHBOARD_CHART_COUNT = 6;

const getDateString = (date) => date.toISOString().split("T")[0];

const getLast30DayRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  return {
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
  };
};

const formatTransactionType = (type = "") => {
  return type
    .split("_")
    .filter(Boolean)
    .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
    .join(" ");
};

const getStoredDashboardTransactionTypes = () => {
  try {
    const storedTypes = localStorage.getItem(SELECTED_DASHBOARD_TRANSACTION_TYPES_KEY);
    return storedTypes ? JSON.parse(storedTypes) : null;
  } catch (error) {
    return null;
  }
};

const setStoredDashboardTransactionTypes = (types) => {
  localStorage.setItem(SELECTED_DASHBOARD_TRANSACTION_TYPES_KEY, JSON.stringify(types));
};

const AdminDashboard = () => {
  const token = useSelector(getAuthToken);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [manageTypesOpen, setManageTypesOpen] = useState(false);
  const [hasLoadedInitialTypes, setHasLoadedInitialTypes] = useState(false);
  const { startDate, endDate } = useMemo(getLast30DayRange, []);

  const transactionTypesQuery = useQuery(
    [
      "admin-dashboard-transaction-types",
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

  const allTypesParam = useMemo(() => {
    return transactionTypes.map((item) => item.transaction_type).join(",");
  }, [transactionTypes]);

  const overviewQuery = useQuery(
    [
      "admin-dashboard-transaction-type-overview",
      {
        url: `${GET_PRODUCT_OVERVIEW_BREAKDOWN}?types=${encodeURIComponent(
          allTypesParam,
        )}&startDate=${startDate}&endDate=${endDate}`,
        payload_data: {},
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      enabled: transactionTypes.length > 0,
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

  const rankedTransactionTypes = useMemo(() => {
    return transactionTypes
      .map((item) => {
        const overview = overviewByType[item.transaction_type] || {};
        return {
          transaction_type: item.transaction_type,
          all_time_count: item.count || 0,
          total_transactions: overview.total_transactions || 0,
          suspected_transactions: overview.suspected_transactions || 0,
        };
      })
      .sort((first, second) => {
        if (second.suspected_transactions !== first.suspected_transactions) {
          return second.suspected_transactions - first.suspected_transactions;
        }

        if (second.total_transactions !== first.total_transactions) {
          return second.total_transactions - first.total_transactions;
        }

        if (second.all_time_count !== first.all_time_count) {
          return second.all_time_count - first.all_time_count;
        }

        return first.transaction_type.localeCompare(second.transaction_type);
      });
  }, [overviewByType, transactionTypes]);

  const topRiskTypes = useMemo(() => {
    return rankedTransactionTypes
      .slice(0, DEFAULT_DASHBOARD_CHART_COUNT)
      .map((item) => item.transaction_type);
  }, [rankedTransactionTypes]);

  useEffect(() => {
    if (!transactionTypes.length || hasLoadedInitialTypes) {
      return;
    }

    const availableTypes = new Set(transactionTypes.map((item) => item.transaction_type));
    const storedTypes = getStoredDashboardTransactionTypes();

    if (Array.isArray(storedTypes)) {
      const availableStoredTypes = storedTypes.filter((type) => availableTypes.has(type));

      if (storedTypes.length === 0 || availableStoredTypes.length > 0) {
        setSelectedTypes(availableStoredTypes);
        setStoredDashboardTransactionTypes(availableStoredTypes);
        setHasLoadedInitialTypes(true);
        return;
      }
    }

    if (overviewQuery.isLoading || overviewQuery.isFetching) {
      return;
    }

    setSelectedTypes(topRiskTypes);
    setStoredDashboardTransactionTypes(topRiskTypes);
    setHasLoadedInitialTypes(true);
  }, [
    hasLoadedInitialTypes,
    overviewQuery.isFetching,
    overviewQuery.isLoading,
    topRiskTypes,
    transactionTypes,
  ]);

  const updateSelectedTypes = (types) => {
    setSelectedTypes(types);
    setStoredDashboardTransactionTypes(types);
  };

  const selectedTypeSet = useMemo(() => new Set(selectedTypes), [selectedTypes]);

  const visibleTypes = useMemo(() => {
    return rankedTransactionTypes.filter((item) => selectedTypeSet.has(item.transaction_type));
  }, [rankedTransactionTypes, selectedTypeSet]);

  const summary = useMemo(() => {
    return visibleTypes.reduce(
      (result, item) => ({
        totalTransactions: result.totalTransactions + (item.total_transactions || 0),
        suspectedTransactions: result.suspectedTransactions + (item.suspected_transactions || 0),
      }),
      { totalTransactions: 0, suspectedTransactions: 0 },
    );
  }, [visibleTypes]);

  const toggleTransactionType = (type) => {
    if (selectedTypeSet.has(type)) {
      updateSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
      return;
    }

    updateSelectedTypes([...selectedTypes, type]);
  };

  const selectOnlyType = (type) => {
    updateSelectedTypes([type]);
  };

  const selectAllTypes = () => {
    updateSelectedTypes(transactionTypes.map((item) => item.transaction_type));
  };

  const clearSelectedTypes = () => {
    updateSelectedTypes([]);
  };

  const selectTopRiskTypes = () => {
    updateSelectedTypes(topRiskTypes);
  };

  const isTransactionTypesUnavailable = transactionTypesQuery.isError && transactionTypes.length === 0;
  const isTypeRankingLoading =
    transactionTypesQuery.isLoading || (!hasLoadedInitialTypes && transactionTypes.length > 0);

  return (
    <React.Fragment>
      <Head title="Admin Dashboard" />
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Admin Dashboard</BlockTitle>
              <BlockDes className="text-soft">
                <p>Welcome to Spout Pay Admin Dashboard</p>
              </BlockDes>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col md="3">
              <StatCardContainer
                url={`${GET_RULES_STATS}`}
                titleLabel="Rules Defined"
                subValueLabel={"ACTIVE RULES"}
                subValueLabel2={"INACTIVE RULES"}
              />
            </Col>

            <Col md="3">
              <StatCardContainer
                url={`${GET_FLAGGED_TXN_STATS}`}
                titleLabel="Flagged Transactions Today"
                subValueLabel={"THIS MONTH"}
                subValueLabel2={"THIS WEEK"}
              />
            </Col>

            <Col md="3">
              <StatCardContainer
                url={`${GET_TXN_STATS}`}
                titleLabel="Total Transactions Today"
                subValueLabel={"THIS MONTH"}
                subValueLabel2={"THIS WEEK"}
              />
            </Col>

            <Col md="3">
              <StatCardContainer
                url={`${GET_PERCENTAGE_FLAGGED_STATS}`}
                titleLabel="Percentage Flagged (%)"
                subValueLabel={"THIS MONTH (%)"}
                subValueLabel2={"THIS WEEK (%)"}
              />
            </Col>

            <Col md="12">
              <PreviewCard>
                <BlockBetween>
                  <div>
                    <h5 className="title mb-1">Transaction Risk Trends</h5>
                    <span className="sub-text">
                      Showing transaction types selected for the dashboard. Default selection uses the top{" "}
                      {DEFAULT_DASHBOARD_CHART_COUNT} types by suspected transactions in the last 30 days.
                    </span>
                  </div>
                  <div className="nk-block-tools">
                    <Button color="light" outline className="mr-1" onClick={selectTopRiskTypes} disabled={!topRiskTypes.length}>
                      <Icon name="trend-up" className="mr-1" />
                      Top {DEFAULT_DASHBOARD_CHART_COUNT} By Risk
                    </Button>
                    <Button color="light" outline onClick={() => setManageTypesOpen(!manageTypesOpen)}>
                      <Icon name="filter-alt" className="mr-1" />
                      Manage Types ({selectedTypes.length}/{transactionTypes.length})
                    </Button>
                  </div>
                </BlockBetween>
                <hr className="preview-hr" />
                <Row className="gy-3">
                  <Col md="4">
                    <span className="sub-text">Visible Charts</span>
                    <h4 className="mb-0">
                      {selectedTypes.length.toLocaleString()} of {transactionTypes.length.toLocaleString()}
                    </h4>
                  </Col>
                  <Col md="4">
                    <span className="sub-text">Transactions In Last 30 Days</span>
                    <h4 className="mb-0">{summary.totalTransactions.toLocaleString()}</h4>
                  </Col>
                  <Col md="4">
                    <span className="sub-text">Suspected In Last 30 Days</span>
                    <h4 className="mb-0">{summary.suspectedTransactions.toLocaleString()}</h4>
                  </Col>
                </Row>
                {manageTypesOpen && (
                  <>
                    <hr className="preview-hr" />
                    <BlockBetween className="mb-3">
                      <h6 className="title mb-0">Dashboard Transaction Types</h6>
                      <div>
                        <Button color="light" size="sm" outline className="mr-1" onClick={selectTopRiskTypes}>
                          Top {DEFAULT_DASHBOARD_CHART_COUNT}
                        </Button>
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
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      }}
                    >
                      {rankedTransactionTypes.map((item) => {
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
                              <span className="sub-text d-block">
                                {(item.suspected_transactions || 0).toLocaleString()} suspected,{" "}
                                {(item.total_transactions || 0).toLocaleString()} total
                              </span>
                            </label>
                            <Button
                              color="light"
                              size="sm"
                              outline
                              onClick={() => selectOnlyType(item.transaction_type)}
                            >
                              Only
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </PreviewCard>
            </Col>

            {isTransactionTypesUnavailable && (
              <Col md="12">
                <PreviewCard>
                  <div className="text-center text-muted py-4">
                    Transaction type trends are unavailable because the backend could not be reached.
                  </div>
                </PreviewCard>
              </Col>
            )}

            {isTypeRankingLoading && !isTransactionTypesUnavailable && (
              <Col md="12">
                <PreviewCard>
                  <div className="text-center text-muted py-4">Loading transaction type trends...</div>
                </PreviewCard>
              </Col>
            )}

            {!isTypeRankingLoading && !isTransactionTypesUnavailable && selectedTypes.length === 0 && (
              <Col md="12">
                <PreviewCard>
                  <div className="text-center py-4">
                    <h5 className="title">No transaction types selected</h5>
                    <p className="text-muted mb-3">Choose at least one transaction type to load dashboard charts.</p>
                    <Button color="primary" onClick={selectTopRiskTypes} disabled={!topRiskTypes.length}>
                      Top {DEFAULT_DASHBOARD_CHART_COUNT} By Risk
                    </Button>
                  </div>
                </PreviewCard>
              </Col>
            )}

            {!isTypeRankingLoading &&
              !isTransactionTypesUnavailable &&
              visibleTypes.map((item) => (
                <Col md="6" key={item.transaction_type}>
                  <StackedLineChartContainer
                    title={formatTransactionType(item.transaction_type)}
                    url={GET_TRANSACTION_TYPE_BREAKDOWN}
                    type={item.transaction_type}
                  />
                </Col>
              ))}
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AdminDashboard;
