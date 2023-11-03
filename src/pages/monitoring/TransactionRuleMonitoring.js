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
import { FormGroup, Label, Row } from "reactstrap";
import { doughnutChartData, barChartStacked } from "../../pages/components/charts/ChartData";
import { PieChartExample, BarChartExample } from "../../components/charts/Chart";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, DropdownItem } from "reactstrap";

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
              <form>
                <div className="card-inner">
                  <Col xs="12">
                    <FormGroup>
                      <label className="form-label">Rule</label>
                      <RSelect
                        options={[
                          { label: "Rule 1", value: "Rule 1" },
                          { label: "Rule 2", value: "Rule2" },
                        ]}
                        isMulti
                        onChange={(e) => {}}
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
                              />
                            </div>
                          </FormGroup>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary my-1">
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </Block>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Transaction Violation</h5>
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
      </Content>
    </>
  );
};

export default TransactionRuleMonitoring;
