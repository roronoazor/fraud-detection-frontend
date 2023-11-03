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
import { PieChartExample, BarChartExample, LineChartExample } from "../../components/charts/Chart";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, DropdownItem } from "reactstrap";

const trendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  dataUnit: "BTC",
  lineTension: 0.4,
  legend: true,
  categoryPercentage: 0.9,
  barPercentage: 0.6,
  datasets: [
    {
      label: "Company A",
      lineTension: 0.4,
      pointBorderWidth: 2,
      pointBackgroundColor: "white",
      pointRadius: 4,
      fill: true,
      data: [1, 8, 5, 5, 5, 5, 0, 10, 0, 15, 7, 9],
    },
    {
      label: "Company B",
      lineTension: 0.4,
      pointBorderWidth: 2,
      pointBackgroundColor: "white",
      pointRadius: 4,
      fill: true,
      data: [11, 18, 15, 15, 2, 2, 0, 10, 0, 15, 7, 9],
    },
  ],
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
                                  name="merchant_rankings_type"
                                  className="custom-control-input form-control"
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
                                  name="merchant_rankings_type"
                                  className="custom-control-input form-control"
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
                          <PieChartExample data={doughnutChartData} />
                        </div>
                      </PreviewCard>
                    </Col>
                    <Col md={6}>
                      <PreviewCard>
                        <div className="card-head">
                          <h6 className="title text-center">Transaction Volume</h6>
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
                          options={[
                            { label: "Merchant 1", value: "Merchant 1" },
                            { label: "Merchant 2", value: "Merchant 2" },
                          ]}
                          isMulti
                          onChange={(e) => {}}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <PreviewCard>
                        <div className="card-head text-center">
                          <h6 className="title">Transaction Count</h6>
                        </div>
                        <div className="nk-ck-sm">
                          <LineChartExample legend={true} data={trendData} />
                        </div>
                      </PreviewCard>
                    </Col>
                  </Row>
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
                                  id="customRadio1"
                                  name="merchant_rankings_type"
                                  className="custom-control-input form-control"
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
                                  name="merchant_rankings_type"
                                  className="custom-control-input form-control"
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
                          <PieChartExample data={doughnutChartData} />
                        </div>
                      </PreviewCard>
                    </Col>
                    <Col md={6}>
                      <PreviewCard>
                        <div className="card-head">
                          <h6 className="title text-center">Transaction Volume</h6>
                        </div>
                        <div className="nk-ck-sm">
                          <PieChartExample data={doughnutChartData} />
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

export default MerchantMonitoring;
