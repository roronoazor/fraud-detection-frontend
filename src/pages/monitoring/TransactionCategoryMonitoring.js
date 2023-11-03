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

const TransactionCategoryMonitoring = (props) => {
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
                            />
                          </div>
                        </FormGroup>
                      </li>
                      <li className="nk-block-tools-opt">
                        <FormGroup>
                          <Button color="primary" size="lg">
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
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Withdrawals</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
              <Col className={"my-1"} md="6">
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Transfers</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
              <Col className={"my-1"} md="6">
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Airtime V.T.U</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
              <Col className={"my-1"} md="6">
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Cable Recharge</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
              <Col className={"my-1"} md="6">
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Data Recharge</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
              <Col className={"my-1"} md="6">
                <PreviewCard>
                  <div className="card-head text-center">
                    <h6 className="title">Electricity Recharge</h6>
                  </div>
                  <div className="nk-ck-sm">
                    <PieChartExample data={doughnutChartData} />
                  </div>
                </PreviewCard>
              </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default TransactionCategoryMonitoring;
