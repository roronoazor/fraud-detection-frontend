import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
  PreviewCard,
  Icon,
  ReactDataTable,
  Button,
  Col,
  BlockBetween,
  RSelect,
} from "../../components/Component";
import { DropdownMenu, DropdownToggle, Dropdown, DropdownItem, Badge } from "reactstrap";
import { FormGroup, Label, Card, Modal, ModalBody } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { handleApiError } from "../../modules/utilities/responseHandlers";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { useQueryClient, useQuery } from "react-query";
import { fetchData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";
import { TransactionDetailContent } from "./TransactionDetailContent";
import { useLocation } from "react-router-dom";
import { convertDateStringtoLocalDateString, formatCurrencyNumber } from "../../modules/utilities";
import { GET_TRANSACTIONS, GET_TRANSACTIONS_STATS } from "../../config/urls";

const tableHeaders = [
  {
    id: 1,
    value: "S/N",
  },
  {
    id: 11,
    value: "Merchant Name",
  },
  {
    id: 12,
    value: "Transaction Type",
    range: "all",
  },

  {
    id: 2,
    value: "Transaction Amount",
  },
  {
    id: 3,
    value: "Transaction Status",
  },
  {
    id: 4,
    value: "Transaction Date",
  },
  {
    id: 5,
    value: "View Details",
  },
];

const dataTableColumns = [
  {
    name: "Merchant Name",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Transaction Type",
    selector: (row) => row.product,
    sortable: true,
  },
  {
    name: "Transaction Amount",
    selector: (row) => (row.action ? row.action : "N/A"),
    sortable: true,
  },
  {
    name: "Transaction Status",
    selector: (row) =>
      row.active ? (
        <Badge pill color="success">
          Active
        </Badge>
      ) : (
        <Badge pill color="gray">
          In-Active
        </Badge>
      ),
    sortable: true,
  },
  {
    name: "Transaction Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={() => {
          handleEdit(row);
        }}
        style={{ height: "25px", width: "70px" }}
      >
        View
      </button>
    ),
    button: true,
  },
];

const dateOptions = {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const SuspectedTxnDetailPage = () => {
  const [sm, updateSm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataTableData, setDataTableData] = useState([]);
  const [selectedRule, setSelectedRule] = useState({});
  const [queryStartDate, setQueryStartDate] = useState("");
  const [queryEndDate, setQueryEndDate] = useState("");
  const [urlWithFilters, setUrlWithFilters] = useState("");
  const [rules, setRules] = useState([]);
  const [selectedParam, setSelectedParam] = useState("");

  const [editId, setEditId] = useState();
  const history = useHistory();
  const token = useSelector(getAuthToken);
  const queryClient = useQueryClient();
  const location = useLocation();
  const [transactionDetail, setTransactionDetail] = useState({});

  const toggleDropdown = (e, row) => {
    setEditId(row?.id);
    setDropdownOpen(!dropdownOpen);
  };

  // call the api that loads this data only once
  let payload_data = {};
  const result = useQuery(
    [
      "transactions",
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
        const data = response?.data?.data;
        setDataTableData(data);
      },
      onError: (error) => {
        handleApiError(error);
      },
      enabled: false,
    },
  );

  const transactionStat = useQuery(
    [
      "transactions-stat",
      {
        url: GET_TRANSACTIONS_STATS,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let rules_data = response?.data?.rules_data || [];
        setRules(
          rules_data.map((rec) => {
            return { label: rec.description, value: rec.id };
          }),
        );
        const params = new URLSearchParams(location.search);
        let selected = rules_data.filter((rule) => rule.id == params.get("ruleId"));
        if (selected.length > 0) {
          setSelectedRule(selected[0]);
        }
      },
      onError: (error) => {
        handleApiError(error);
      },
    },
  );

  const dataTableColumns = [
    {
      name: "Merchant Name",
      selector: (row) =>
        row?.wallet_details?.businessName || `${row?.wallet_details?.lastName} ${row?.wallet_details?.firstName}`,
      sortable: true,
    },
    {
      name: "Transaction Type",
      selector: (row) => {
        switch (row.transaction_type) {
          case "ELECTRICITY_RECHARGE":
            return (
              <div>
                <Icon name="bulb" style={{ fontSize: "20px" }} /> Electricity Recharge
              </div>
            );
          case "WITHDRAWAL":
            return (
              <div>
                <Icon name="propert-blank" style={{ fontSize: "20px" }} /> Withdrawal
              </div>
            );
          case "TRANSFER":
            return (
              <div>
                <Icon name="report-profit" style={{ fontSize: "20px" }} /> Transfer
              </div>
            );
          case "AIRTIME_VTU":
            return (
              <div>
                <Icon name="soundcloud" style={{ fontSize: "20px" }} /> Airtime
              </div>
            );
          case "DATA_RECHARGE":
            return (
              <div>
                <Icon name="rss" style={{ fontSize: "20px" }} /> Data
              </div>
            );
          case "CABLE_RECHARGE":
            return (
              <div>
                <Icon name="network" style={{ fontSize: "20px" }} /> Cable
              </div>
            );
          default:
            return <div>Unknown Type</div>;
        }
      },
      sortable: true,
    },
    {
      name: "Transaction Amount",
      selector: (row) => `N ${formatCurrencyNumber(row.amount)}`,
      sortable: true,
    },
    {
      name: "Transaction Status",
      selector: (row) => {
        switch (row.transaction_status) {
          case "successful":
            return (
              <Badge pill color="success">
                Successful
              </Badge>
            );
          case "pending":
            return (
              <Badge pill color="warning">
                Pending
              </Badge>
            );
          case "failed":
            return (
              <Badge pill color="danger">
                Failed
              </Badge>
            );
          default:
            return (
              <Badge pill color="secondary">
                Unknown
              </Badge>
            );
        }
      },
      sortable: true,
    },
    {
      name: "Transaction Date",
      selector: (row) => {
        const transactionCreatedAt = new Date(row?.transaction_created_at);
        const formattedDateTime = transactionCreatedAt.toLocaleDateString("en-US", dateOptions);
        return formattedDateTime;
      },
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            setTransactionDetail(row);
            setModalOpen(true);
          }}
          style={{ height: "25px", width: "70px" }}
        >
          View
        </button>
      ),
      button: true,
    },
  ];

  const handleApplyFilterChange = () => {
    let filters = {
      start_date: queryStartDate,
      end_date: queryEndDate,
      rule: selectedRule,
    };
    let urlAndFilter = initializeUrlWithFilters(GET_TRANSACTIONS, filters);
    // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("ruleId")) {
      setUrlWithFilters(
        `${GET_TRANSACTIONS}?rule_id=${params.get("ruleId")}&start_date=${params.get(
          "startDate",
        )}&end_date=${params.get("endDate")}`,
      );
      setSelectedParam("rule");
      setTimeout(() => {
        result.refetch();
      }, 250);
    }

    if (params.get("productType")) {
      setUrlWithFilters(
        `${GET_TRANSACTIONS}?product_type=${params.get("productType")}&start_date=${params.get(
          "startDate",
        )}&end_date=${params.get("endDate")}`,
      );
      setSelectedParam(params.get("productType"));
      setTimeout(() => {
        result.refetch();
      }, 250);
    }

    if (params.get("startDate")) {
      setQueryStartDate(params.get("startDate"));
    }
    if (params.get("endDate")) {
      setQueryEndDate(params.get("endDate"));
    }
  }, []);

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Head title="Rules" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal"></BlockTitle>
              <Block></Block>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">{selectedParam == "rule" ? "Selected Rule" : "Selected Product"}</h5>
                  </div>
                  <div className="card-tools mr-n1"></div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="card-inner">
                  <Col xs="12">
                    <FormGroup>
                      <label className="form-label">{selectedParam == "rule" ? "Rule" : "Product"}</label>
                      {/* <RSelect
                        options={rules}
                        value={selectedRule}
                        onChange={(e) => {
                          setSelectedRule(e);
                        }}
                        disabled={true}
                      /> */}
                      <input
                        className="form-control"
                        name="rule_selected"
                        type="text"
                        id="default-0"
                        value={selectedParam == "rule" ? selectedRule?.description : selectedParam}
                        onChange={(e) => {}}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <div className="toggle-wrap nk-block-tools-toggle">
                    <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                      <ul className="nk-block-tools g-3">
                        <li>
                          <FormGroup>
                            <Label htmlFor="default-0" className="form-label my-1">
                              Start Date
                            </Label>
                            <div className="form-control-wrap">
                              <input
                                className="form-control"
                                name="start_date"
                                type="date"
                                id="default-0"
                                placeholder="Start Date"
                                value={queryStartDate}
                                onChange={(e) => setQueryStartDate(e.target.value)}
                                disabled
                              />
                            </div>
                          </FormGroup>
                        </li>
                        <li className="nk-block-tools-opt">
                          <FormGroup>
                            <Label htmlFor="default-0" className="form-label my-1">
                              End Date
                            </Label>
                            <div className="form-control-wrap">
                              <input
                                className="form-control"
                                name="end_date"
                                type="date"
                                id="default-0"
                                placeholder="End Date"
                                value={queryEndDate}
                                onChange={(e) => setQueryEndDate(e.target.value)}
                                disabled
                              />
                            </div>
                          </FormGroup>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* <button type="submit" className="btn btn-primary my-1" onClick={handleApplyFilterChange}>
                    Apply
                  </button> */}
                </div>
              </form>
            </div>
          </Card>
        </Block>
        <Block size="lg">
          <PreviewCard>
            <ReactDataTable data={dataTableData} columns={dataTableColumns} showSearch={false} pagination />
          </PreviewCard>
        </Block>
      </Content>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} className="modal-dialog-centered" size="xl">
        <ModalBody>
          <a
            href="#close"
            onClick={(ev) => {
              ev.preventDefault();
              setModalOpen(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Transaction Details</h5>
            <TransactionDetailContent transaction={transactionDetail} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SuspectedTxnDetailPage;
