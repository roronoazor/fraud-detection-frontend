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
  Icon,
  BlockBetween,
} from "../../components/Component";
import DoublePercentageContainer from "../components/common/container/DoublePercentageContainer";
import PercentageContainer from "../components/common/container/PercentageContainer";
import {
  DEACTIVATE_TERMINAL,
  GET_CREATE_TERMINAL,
  GET_TERMINAL_RISK_PROFILE,
  GET_TERMINAL_UPTIME,
  GET_TERMINAL_HOUR_BREAKDOWN,
  GET_TERMINAL_USAGE,
  GET_TERMINAL_PROVIDER_RANKINGS,
  GET_TERMINAL_AGENT_RANKINGS,
} from "../../config/urls";
import ProvidersList from "./components/ProviderList";
import TimeBreakdown from "./components/TimeBreakdown";
import ServiceUsage from "./components/ServiceUsage";
import { useParams, Link, useHistory } from "react-router-dom";
import { Row, Col, Modal, ModalBody, Form, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { fetchData, postData } from "../../modules/utilities/util_query";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";

const TerminalMetric = () => {
  const [smOption, setSmOption] = useState(false);
  const [terminalId, setTerminalId] = useState("");
  const [modal, setModal] = useState({ delete: false });
  const token = useSelector(getAuthToken);
  const queryClient = useQueryClient();

  const params = useParams();
  const history = useHistory();

  React.useEffect(() => {
    if (params?.id) {
      setTerminalId(params.id);
    }
  }, []);

  const handleDeleteTerminal = (event) => {
    event.preventDefault();
    mutation.mutate({
      url: `${DEACTIVATE_TERMINAL}${terminalId}/`,
      payload_data: {},
      token: token,
      authenticate: true,
    });
    history.push(`/terminals`);
  };

  const deleteTerminal = () => {
    setModal({ delete: true });
  };

  const onFormCancel = () => {
    setModal({ delete: false });
  };

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast.success("Success");
      queryClient.invalidateQueries(GET_CREATE_TERMINAL);
      onFormCancel();
    },
    onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      toast.error(message);
    },
  });

  return (
    <>
      <Head title="Terminal Metric" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                {`Terminal Performance Metric for Terminal (${terminalId})`}
              </BlockTitle>
              <Block>
                <Button className="toggle d-none d-md-inline-flex mr-2" color="white">
                  <Icon name="clipboard"></Icon>
                  <Link className="link-secondary" to={process.env.PUBLIC_URL + `/terminals/edit/${params.id}`}>
                    <span>Edit Terminal</span>
                  </Link>
                </Button>
                <Button className="toggle d-none d-md-inline-flex mr-2" color="white" onClick={deleteTerminal}>
                  <Icon name="trash"></Icon>
                  <span>Delete Terminal</span>
                </Button>
              </Block>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <Row>
              <Col className={"my-1"} md="6">
                <DoublePercentageContainer
                  captionText={"Risk Profile"}
                  queryName={"terminalId"}
                  serviceType={terminalId}
                  url={`${GET_TERMINAL_RISK_PROFILE}`}
                  title1={"By Amount"}
                  title2={"By Count"}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <PercentageContainer
                  title={"Terminal Uptime"}
                  serviceType={terminalId}
                  queryName={"terminalId"}
                  url={`${GET_TERMINAL_UPTIME}`}
                  invert={true}
                />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <TimeBreakdown serviceType={terminalId} queryName={"terminalId"} url={GET_TERMINAL_HOUR_BREAKDOWN} />
              </Col>
              <Col className={"my-1"} md="6">
                <ServiceUsage
                  title={"Terminal Usage"}
                  serviceType={terminalId}
                  queryName={"terminalId"}
                  url={GET_TERMINAL_USAGE}
                />
              </Col>
            </Row>
            <Row>
              <Col className={"my-1"} md="6">
                <ProvidersList
                  serviceType={terminalId}
                  title={"Providers"}
                  url={GET_TERMINAL_PROVIDER_RANKINGS}
                  queryName={"terminalId"}
                />
              </Col>
              <Col className={"my-1"} md="6">
                <ProvidersList
                  serviceType={terminalId}
                  title={"Agents"}
                  url={GET_TERMINAL_AGENT_RANKINGS}
                  queryName={"terminalId"}
                />
              </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>

      <Modal
        isOpen={modal.delete}
        toggle={() => setModal({ delete: false })}
        className="modal-dialog-centered"
        size="xl"
      >
        <ModalBody>
          <a
            href="#close"
            onClick={(ev) => {
              ev.preventDefault();
              onFormCancel();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">Delete</h5>
            <div className="mt-4">
              <Form className="row gy-4" onSubmit={handleDeleteTerminal}>
                <Col md="12">
                  <FormGroup>
                    <p>{`Are you sure you want to delete terminal with Id: ${terminalId}`}</p>
                  </FormGroup>
                </Col>
                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li class="m-2">
                      <Button color="primary" size="md" type="submit">
                        Delete
                      </Button>
                    </li>
                    <li>
                      <a
                        href="#cancel"
                        onClick={(ev) => {
                          ev.preventDefault();
                          onFormCancel();
                        }}
                        className="link link-light"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </Col>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TerminalMetric;
