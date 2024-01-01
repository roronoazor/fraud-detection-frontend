import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
  PreviewCard,
  Button,
  Col,
  BlockBetween,
} from "../../components/Component";
import { FormGroup, Label, Row } from "reactstrap";
import { doughnutChartData } from "../../pages/components/charts/ChartData";
import { PieChartExample } from "../../components/charts/Chart";
import PieChartContainer from "../components/common/container/PieChartContainer";
import { GET_PRODUCT_OVERVIEW_BREAKDOWN } from "../../config/urls";

const TransactionCategoryMonitoring = (props) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryStartDate(startDate);
    setQueryEndDate(endDate);
  };

  React.useEffect(() => {
    setQueryStartDate(startDate);
    setQueryEndDate(endDate);
  }, []);

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
            <BlockBetween>
              <p></p>
              <BlockHeadContent>
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
                              name="start_date"
                              type="date"
                              id="default-0"
                              placeholder="Start Date"
                              onChange={(e) => setStartDate(e.target.value)}
                              value={startDate}
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
                              name="end_date"
                              type="date"
                              id="default-0"
                              placeholder="End Date"
                              onChange={(e) => setEndDate(e.target.value)}
                              value={endDate}
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Button color="primary" size="lg" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </FormGroup>
                      </li>
                    </ul>
                  </div>
                </div>
              </BlockHeadContent>
            </BlockBetween>
            <hr className="preview-hr"></hr>
            <Row className="gy-4">
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Withdrawals"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"withdrawal"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Transfers"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"transfer"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Airtime V.T.U"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"airtime_vtu"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Cable Recharge"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"cable_recharge"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Data Recharge"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"data_recharge"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PieChartContainer
                  title="Electricity Recharge"
                  url={GET_PRODUCT_OVERVIEW_BREAKDOWN}
                  type={"electricity_recharge"}
                  startDate={queryStartDate}
                  endDate={queryEndDate}
                />
              </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default TransactionCategoryMonitoring;
