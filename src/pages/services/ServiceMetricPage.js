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
import DoublePercentageContainer from "../components/common/container/DoublePercentageContainer";
import PercentageContainer from "../components/common/container/PercentageContainer";
import {
  GET_SERVICE_PROVIDER_RANKINGS,
  GET_SERVICE_RISK_PROFILE,
  GET_SERVICE_UPTIME,
  GET_SERVICE_AGENT_RANKINGS,
  GET_SERVICE_HOUR_BREAKDOWN,
  GET_SERVICE_USAGE,
} from "../../config/urls";
import ProvidersList from "./components/ProviderList";
import TimeBreakdown from "./components/TimeBreakdown";
import ServiceUsage from "./components/ServiceUsage";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { getProductName } from "../../modules/utilities";

const ServiceMetricPage = () => {
  const [smOption, setSmOption] = useState(false);
  const [serviceType, setServiceType] = useState("");

  const params = useParams();

  React.useEffect(() => {
    if (params?.service) {
      setServiceType(params.service);
    }
  }, []);

  return (
    <>
      <Head title="Service Metric" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                {`Service Performance Metric (${getProductName(serviceType)})`}
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
                  serviceType={serviceType}
                  url={`${GET_SERVICE_RISK_PROFILE}`}
                  title1={"By Amount"}
                  title2={"By Count"}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PercentageContainer
                  title={"Service Uptime"}
                  serviceType={serviceType}
                  url={`${GET_SERVICE_UPTIME}`}
                  invert={true}
                />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <TimeBreakdown serviceType={serviceType} url={GET_SERVICE_HOUR_BREAKDOWN} />
              </Col>
              <Col className={"my-1"} md="6">
                <ServiceUsage serviceType={serviceType} url={GET_SERVICE_USAGE} />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <ProvidersList serviceType={serviceType} title={"Providers"} url={GET_SERVICE_PROVIDER_RANKINGS} />
              </Col>
              <Col className={"my-1"} md="6">
                <ProvidersList serviceType={serviceType} title={"Agents"} url={GET_SERVICE_AGENT_RANKINGS} />
              </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default ServiceMetricPage;
