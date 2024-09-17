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
import StatCardContainer from "../components/common/container/StatCardContainer";
import {
  GET_FLAGGED_TXN_STATS,
  GET_RULES_STATS,
  GET_TXN_STATS,
  GET_PERCENTAGE_FLAGGED_STATS,
  GET_TRANSACTION_TYPE_BREAKDOWN,
} from "../../config/urls";
import StackedLineChartContainer from "../components/common/container/StackedLineChartContainer";

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

            {/** charts */}
            <Col md="6">
              <StackedLineChartContainer title={"Withdrawals"} url={GET_TRANSACTION_TYPE_BREAKDOWN} type="withdrawal" />
            </Col>

            <Col md="6">
              <StackedLineChartContainer title={"Transfers"} url={GET_TRANSACTION_TYPE_BREAKDOWN} type="transfer" />
            </Col>

            <Col md="6">
              <StackedLineChartContainer title={"Cable"} url={GET_TRANSACTION_TYPE_BREAKDOWN} type="cable_recharge" />
            </Col>
            <Col md="6">
              <StackedLineChartContainer title={"Data"} url={GET_TRANSACTION_TYPE_BREAKDOWN} type="data_recharge" />
            </Col>
            <Col md="6">
              <StackedLineChartContainer
                title={"Electricity"}
                url={GET_TRANSACTION_TYPE_BREAKDOWN}
                type="electricity_recharge"
              />
            </Col>
            <Col md="6">
              <StackedLineChartContainer title={"Airtime"} url={GET_TRANSACTION_TYPE_BREAKDOWN} type="airtime_vtu" />
            </Col>
          </Row>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AdminDashboard;
