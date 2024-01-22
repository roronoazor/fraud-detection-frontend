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
} from "../../components/Component";
import { FormGroup, Label, Row, Card } from "reactstrap";
import { doughnutChartData, barChartStacked } from "../../pages/components/charts/ChartData";
import { PieChartExample, BarChartExample } from "../../components/charts/Chart";
import { useSelector } from "react-redux";
import ToastUI from "../components/common/ui-view/ToastUI";
import { useQuery } from "react-query";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { fetchData } from "../../modules/utilities/util_query";
import { GET_CREATE_RULES, GET_TRANSACTION_RULE_BREAKDOWN } from "../../config/urls";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import { handleApiError } from "../../modules/utilities/responseHandlers";
import { firstLetterUpper } from "../../modules/utilities";

const options = {
  scales: {
    y: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        callback: function (value) {
          return value.toLocaleString("en-US");
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = context.parsed || 0;
          const formattedValue = value.toLocaleString("en-US");
          return `${label}: ${formattedValue}`;
        },
      },
    },
  },
};

const TransactionRuleMonitoring = (props) => {
  const [sm, updateSm] = useState(false);
  // Default startDate to 7 days before today
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);
  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split("T")[0]);

  // Default endDate to today
  const defaultEndDate = new Date().toISOString().split("T")[0];
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [queryStartDate, setQueryStartDate] = useState("");
  const [queryEndDate, setQueryEndDate] = useState("");
  const [endpoint, setEndpoint] = useState("");

  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [ruleData, setRuleData] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [ids, setIds] = useState([]);
  const rulesQuery = useQuery(
    [
      `${GET_CREATE_RULES}`,
      {
        url: `${GET_CREATE_RULES}`,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let data = response?.data?.data || [];
        setRules(
          data.map((item) => ({
            label: firstLetterUpper(`${item?.description}(${firstLetterUpper(item?.product).replaceAll("_", " ")})`),
            value: item.id,
          })),
        );
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );
  const result = useQuery(
    [
      `${GET_TRANSACTION_RULE_BREAKDOWN}?startDate=${queryStartDate}&endDate=${queryEndDate}&selectedRules=${ids}`,
      {
        url: `${GET_TRANSACTION_RULE_BREAKDOWN}?startDate=${queryStartDate}&endDate=${queryEndDate}&selectedRules=${ids}`,
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
        setRuleData(data);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
      enabled: false,
    },
  );

  const handleChange = () => {
    let selectedRuleIds = selectedRules.map((rule) => rule.value);
    selectedRuleIds = selectedRuleIds.join(", ");
    setIds(selectedRuleIds);
    setTimeout(() => {
      result.refetch();
    }, 500);
  };

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
                Transaction Rule Monitoring
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Select Rule(s) Below:</h5>
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
                      <label className="form-label">Rule</label>
                      <RSelect
                        options={rules}
                        isMulti
                        onChange={(e) => {
                          console.log(e);
                          setSelectedRules(e);
                        }}
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
                                onChange={(e) => setQueryStartDate(e.target.value)}
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
                                onChange={(e) => setQueryEndDate(e.target.value)}
                              />
                            </div>
                          </FormGroup>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary my-1" onClick={handleChange}>
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </Block>

        {result?.isLoading ? (
          <LoadingSpinner />
        ) : (
          ruleData.map((record) => {
            return (
              <Block>
                <Card className="card-bordered card-stretch">
                  <div className="card-inner-group">
                    <div className="card-inner">
                      <div className="card-title-group">
                        <div className="card-title">
                          <h5 className="title">
                            {" "}
                            {`${record?.rule?.description}(${firstLetterUpper(record?.rule?.product).replaceAll(
                              "_",
                              " ",
                            )})`}
                          </h5>
                        </div>
                        <div className="card-tools mr-n1"></div>
                      </div>
                    </div>
                    <form>
                      <div className="card-inner">
                        <Row>
                          <Col md="6">
                            <PreviewCard>
                              <div className="card-head text-center">
                                <h6 className="title">Overview</h6>
                              </div>
                              <div className="nk-ck-sm">
                                <PieChartExample data={doughnutChartData} />
                              </div>
                            </PreviewCard>
                          </Col>
                          <Col md={6}>
                            <PreviewCard>
                              <div className="card-head">
                                <h6 className="title text-center">Breakdown</h6>
                              </div>
                              <div className="nk-ck-sm">
                                <BarChartExample stacked data={barChartStacked} />
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
          })
        )}
      </Content>
    </>
  );
};

export default TransactionRuleMonitoring;
