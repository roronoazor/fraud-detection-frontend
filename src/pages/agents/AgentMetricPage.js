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
  BlockBetween,
} from "../../components/Component";
import DoublePercentageContainer from "./components/DoublePercentageContainer";
import TimeBreakdown from "./components/TimeBreakdown";
import PercentageContainer from "./components/PercentageContainer";
import AgentUsage from "./components/AgentUsage";
import {
  GET_AGENTS_RISK_PROFILE,
  GET_AGENTS_SUCCESS_RATE,
  GET_AGENTS_PEAK_HOURS,
  GET_AGENT_USAGE,
  GET_AGENTS_TRANSACTION_GROUPED_BY_AMOUNT,
  GET_AGENT_SUCCESS_FAILED,
} from "../../config/urls";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import AmountBreakdown from "./components/AmountBreakdown";
import AgentSuccessFailed from "./components/AgentSuccessFailed";

const AgentMetricPage = () => {
  const [smOption, setSmOption] = useState(false);
  const [agentId, setAgentId] = useState("");

  const params = useParams();
  React.useEffect(() => {
    if (params?.agentId) {
      setAgentId(params.agentId);
    }
  }, []);

  return (
    <>
      <Head title="Agent Metrics" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                {`Agent Performance Metric`}
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <Row>
              <Col className={"my-1"} md="6">
                <DoublePercentageContainer
                  captionText={"Risk Profile"}
                  agentId={agentId}
                  url={`${GET_AGENTS_RISK_PROFILE}`}
                  title1={"By Amount"}
                  title2={"By Count"}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PercentageContainer
                  title={"Agent Success Rate"}
                  agentId={agentId}
                  url={`${GET_AGENTS_SUCCESS_RATE}`}
                  invert={true}
                />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <TimeBreakdown agentId={agentId} url={GET_AGENTS_PEAK_HOURS} />
              </Col>
              <Col className={"my-1"} md="6">
                <AgentUsage agentId={agentId} url={GET_AGENT_USAGE} />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <AmountBreakdown agentId={agentId} url={GET_AGENTS_TRANSACTION_GROUPED_BY_AMOUNT} />
              </Col>
              <Col className={"my-1"} md="6">
                <AgentSuccessFailed agentId={agentId} url={GET_AGENT_SUCCESS_FAILED} />
              </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default AgentMetricPage;
