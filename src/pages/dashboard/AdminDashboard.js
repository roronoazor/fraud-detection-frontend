import React, { useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockDes,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
} from "../../components/Component";
import StackedLineTxnChart from "../../components/partials/stackedLineTxnChart.js/index.js";

const AdminDashboard = () => {
  const [sm, updateSm] = useState(false);
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
            {/* <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="primary" outline className="btn-dim btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>Export</span>
                      </Button>
                    </li>
                    <li>
                      <Button color="primary" outline className="btn-dim btn-white">
                        <Icon name="reports"></Icon>
                        <span>Reports</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <UncontrolledDropdown>
                        <DropdownToggle color="transparent" className="dropdown-toggle btn btn-icon btn-primary">
                          <Icon name="plus"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                href="#adduser"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="user-add-fill"></Icon>
                                <span>Add User</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                href="#addorder"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="coin-alt-fill"></Icon>
                                <span>Add Order</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                href="#addpage"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <Icon name="note-add-fill-c"></Icon>
                                <span>Add Page</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent> */}
          </BlockBetween>
        </BlockHead>

        <Block>
          <Row className="g-gs">
            <Col md="3">
              <PreviewAltCard className="card-full card-bordered">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Rules Defined</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-deposit"
                      text="Rules Defined"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">17</span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">Active Rules</div>
                      <div className="amount">15</div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">Inactive Rules</div>
                      <div className="amount">2</div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full card-bordered">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Flagged Transactions Today</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-withdraw"
                      text="Flagged Transactiions Today"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">4,890</span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">This Month</div>
                      <div className="amount">12,940</div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">This Week</div>
                      <div className="amount">4,259</div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full card-bordered">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Total Transactions Today</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-balance"
                      text="Total Transactions Today"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">79,358</span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">This Month</div>
                      <div className="amount">22,940</div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">This Week</div>
                      <div className="amount">7,259</div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full card-bordered">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Percentage Flagged</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      icon="help-fill"
                      direction="left"
                      id="invest-balance"
                      text="Percentage Flagged"
                    ></TooltipComponent>
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount">23%</span>
                </div>
                <div className="invest-data">
                  <div className="invest-data-amount g-2">
                    <div className="invest-data-history">
                      <div className="title">This Month</div>
                      <div className="amount">29%</div>
                    </div>
                    <div className="invest-data-history">
                      <div className="title">This Week</div>
                      <div className="amount">12%</div>
                    </div>
                  </div>
                </div>
              </PreviewAltCard>
            </Col>

            {/** charts */}
            <Col md="6">
              <StackedLineTxnChart title="Withdrawals" />
            </Col>

            <Col md="6">
              <StackedLineTxnChart title="Transfers" />
            </Col>

            <Col md="6">
              <StackedLineTxnChart title="Cable" />
            </Col>
            <Col md="6">
              <StackedLineTxnChart title="Data" />
            </Col>
            <Col md="6">
              <StackedLineTxnChart title="Electricity" />
            </Col>
            <Col md="6">
              <StackedLineTxnChart title="Airtime" />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AdminDashboard;
