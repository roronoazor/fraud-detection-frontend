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
  RSelect,
  BlockBetween,
} from "../../components/Component";
import { DEACTIVATE_TERMINAL, GET_EDIT_TERMINAL, CREATE_TERMINAL_CONFIG, GET_CREATE_TERMINAL } from "../../config/urls";
import { useParams, Link, useHistory } from "react-router-dom";
import { Row, Col, Modal, ModalBody, Form, FormGroup, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { fetchData, postData } from "../../modules/utilities/util_query";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";

const changeMerchantPinOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const EditTerminals = () => {
  const [smOption, setSmOption] = useState(false);
  const [terminalId, setTerminalId] = useState("");
  const [modal, setModal] = useState({ delete: false });
  const { errors, register, handleSubmit } = useForm();
  const [passState, setPassState] = useState(false);
  const [handlersList, setHandlersList] = useState([]);
  const [bankRouteList, setBankRouteList] = useState([]);
  const [cardRouteList, setCardRouteList] = useState([]);
  const [amountRouteList, setAmountRouteList] = useState([]);
  const [handlers, setHandlers] = useState([]);
  const [switchHandlersList, setSwitchHandlersList] = useState([]);
  const token = useSelector(getAuthToken);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    terminal_id: "",
    profile: "",
    admin_pin: "",
    merchant_pin: "",
    merchant_wallet_id: "",
    change_merchant_pin: "",
    block_terminal: "",
    block_pin: "",
    serial_number: "",
    application_version: "",
    terminal_model: "",
    super_agent: "",
    primary_route: "",
    secondary_route: "",
    amount_route: [],
    amount_limit: [],
    card_route: "",
    bank_route: "",
    switch_handlers: [],
  });

  const params = useParams();
  const history = useHistory();

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

  React.useEffect(() => {
    if (params?.id) {
      setTerminalId(params.id);
    }
  }, []);

  const onFormCancel = () => {
    setModal({ delete: false });
  };

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast.success("Success");
      queryClient.invalidateQueries(`${GET_EDIT_TERMINAL}${terminalId}/`);
      queryClient.invalidateQueries(GET_CREATE_TERMINAL);
      onFormCancel();
    },
    onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      toast.error(message);
    },
  });

  const editTerminal = (event) => {
    // validate switch handler
    event.preventDefault();

    if (!formData.terminal_id) {
      toast.error("Terminal ID is required", {
        position: "top-center",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        // closeButton: <CloseButton />,
      });
      return;
    }

    mutation.mutate({
      url: `${GET_EDIT_TERMINAL}${terminalId}/`,
      payload_data: {
        terminal_id: formData.terminal_id,
        profile: formData.profile,
        admin_pin: formData.admin_pin,
        merchant_pin: formData.merchant_pin,
        merchant_wallet_id: formData.merchant_wallet_id,
        change_merchant_pin: formData.change_merchant_pin ? formData.change_merchant_pin.value : null,
        block_terminal: formData.block_terminal ? formData.block_terminal.value : null,
        block_pin: formData.block_pin,
        serial_number: formData.serial_number,
        application_version: formData.application_version,
        terminal_model: formData.terminal_model,
        super_agent: formData.super_agent,
        primary_route: formData.primary_route ? formData.primary_route.value : null,
        secondary_route: formData.secondary_route ? formData.secondary_route.value : null,
        amount_route: formData.amount_route,
        amount_limit: formData.amount_list,
        card_route: formData.card_route,
        bank_route: formData.bank_route,
        switch_handlers: formData.switch_handler,
      },
      token: token,
      authenticate: true,
    });
    return;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const result = useQuery(
    [
      `${GET_EDIT_TERMINAL}${terminalId}/`,
      {
        url: `${GET_EDIT_TERMINAL}${terminalId}/`,
        payload_data: {},
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let data = response.data.data;
        setFormData({
          ...formData,
          ...data,
          block_terminal: data?.block_terminal ? { value: "Yes", label: "Yes" } : { value: "No", label: "No" },
          change_merchant_pin: data?.change_merchant_pin
            ? { value: "Yes", label: "Yes" }
            : { value: "No", label: "No" },
          primary_route: data?.primary_route ? { value: data?.primary_route, label: data?.primary_route } : null,
          secondary_route: data?.secondary_route
            ? { value: data?.secondary_route, label: data?.secondary_route }
            : null,
          switch_handler: data?.switch_handlers,
          amount_list: data?.amount_limit,
        });
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const config = useQuery(
    [
      CREATE_TERMINAL_CONFIG,
      {
        url: CREATE_TERMINAL_CONFIG,
        payload_data: {},
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        let data = response?.data?.data;

        let handlers = data?.handlers || [];
        setHandlers(handlers.map((handler) => handler.name));

        // Set card routes
        let cardRoutes = data?.card_routes || [];
        setCardRouteList(
          cardRoutes.map((route) => {
            return { value: route, label: route };
          }),
        );

        // set bank routes
        let bankRoutes = data?.bank_routes || [];
        setBankRouteList(
          bankRoutes.map((route) => {
            return { value: route, label: route };
          }),
        );

        // set amount routes
        let amountRoutes = data?.amount_routes || [];
        setAmountRouteList(
          amountRoutes.map((route) => {
            return { value: route, label: route };
          }),
        );

        // set handler list
        setHandlersList(
          handlers.map((handler) => {
            return { value: handler.name, label: handler.name };
          }),
        );
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

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
                {`Edit Terminal (${terminalId})`}
              </BlockTitle>
              <Block>
                <Button className="toggle d-none d-md-inline-flex mr-2" color="white">
                  <Icon name="clipboard"></Icon>
                  <Link className="link-secondary" to={process.env.PUBLIC_URL + `/terminals/metric/${params.id}`}>
                    <span>View Metrics</span>
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
            <div className="p-2">
              <h5 className="title">Edit Terminal</h5>
              {result?.isLoading ? (
                <LoadingSpinner />
              ) : (
                <div className="mt-4">
                  <Form className="row gy-4" noValidate onSubmit={editTerminal}>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Terminal ID</label>
                        <input
                          className="form-control"
                          type="text"
                          name="terminal_id"
                          value={params?.id}
                          disabled
                          onChange={(e) => {
                            onChangeTerminalId(e);
                          }}
                          placeholder="Enter Terminal ID"
                          required
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.terminal_id && <span className="invalid">{errors.terminal_id.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label className="form-label">Profile</label>
                        <input
                          className="form-control"
                          type="text"
                          name="profile"
                          required
                          value={formData.profile}
                          onChange={onChange}
                          placeholder="Enter Profile"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.profile && <span className="invalid">{errors.profile.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="password">
                            Admin Pin
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <a
                            href="#password"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setPassState(!passState);
                            }}
                            className={`form-icon lg form-icon-right passcode-switch ${
                              passState ? "is-hidden" : "is-shown"
                            }`}
                          >
                            <Icon name="eye" className="passcode-icon icon-show"></Icon>

                            <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                          </a>
                          <input
                            className={`form-control ${passState ? "is-hidden" : "is-shown"}`}
                            type={passState ? "text" : "password"}
                            name="admin_pin"
                            value={formData.admin_pin}
                            required
                            maxlength="4"
                            onChange={onChange}
                            placeholder="Enter Admin Pin"
                            ref={register({ required: "This field is required" })}
                          />
                          {errors.admin_pin && <span className="invalid">{errors.admin_pin.message}</span>}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Change Merchant Pin</label>
                        <RSelect
                          options={changeMerchantPinOptions}
                          //isMulti
                          value={formData.change_merchant_pin}
                          onChange={(e) => setFormData({ ...formData, change_merchant_pin: e })}
                        />
                        {errors.change_merchant_pin && (
                          <span className="invalid">{errors.change_merchant_pin.message}</span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="password">
                            Merchant Pin
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <a
                            href="#password"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setPassState(!passState);
                            }}
                            className={`form-icon lg form-icon-right passcode-switch ${
                              passState ? "is-hidden" : "is-shown"
                            }`}
                          >
                            <Icon name="eye" className="passcode-icon icon-show"></Icon>

                            <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                          </a>
                          <input
                            className={`form-control ${passState ? "is-hidden" : "is-shown"}`}
                            type={passState ? "text" : "password"}
                            name="merchant_pin"
                            required
                            value={formData.merchant_pin}
                            placeholder="Merchant PIN"
                            maxlength="4"
                            onChange={onChange}
                            ref={register({ required: "This field is required" })}
                          />
                          {errors.merchant_pin && <span className="invalid">{errors.merchant_pin.message}</span>}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label className="form-label">Merchant Wallet ID</label>
                        <input
                          className="form-control"
                          type="text"
                          name="merchant_wallet_id"
                          required
                          onChange={onChange}
                          value={formData.merchant_wallet_id}
                          placeholder="Merchant Wallet ID"
                          ref={register({ required: "This field is required" })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Block Terminal</label>
                        <RSelect
                          options={changeMerchantPinOptions}
                          //isMulti
                          value={formData.block_terminal}
                          onChange={(e) => setFormData({ ...formData, block_terminal: e })}
                        />
                        {errors.block_terminal && <span className="invalid">{errors.block_terminal.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <div className="form-label-group">
                          <label className="form-label" htmlFor="password">
                            Block Pin
                          </label>
                        </div>
                        <div className="form-control-wrap">
                          <a
                            href="#password"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setPassState(!passState);
                            }}
                            className={`form-icon lg form-icon-right passcode-switch ${
                              passState ? "is-hidden" : "is-shown"
                            }`}
                          >
                            <Icon name="eye" className="passcode-icon icon-show"></Icon>

                            <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                          </a>
                          <input
                            className={`form-control ${passState ? "is-hidden" : "is-shown"}`}
                            type={passState ? "text" : "password"}
                            name="block_pin"
                            required
                            value={formData.block_pin}
                            onChange={onChange}
                            maxlength="4"
                            placeholder="Block PIN"
                            ref={register({ required: "This field is required" })}
                          />
                          {errors.block_pin && <span className="invalid">{errors.block_pin.message}</span>}
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Serial Number</label>
                        <input
                          className="form-control"
                          type="text"
                          name="serial_number"
                          required
                          value={formData.serial_number}
                          onChange={onChange}
                          placeholder="Serial Number"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.serial_number && <span className="invalid">{errors.serial_number.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Application Version</label>
                        <input
                          className="form-control"
                          type="text"
                          name="application_version"
                          required
                          onChange={onChange}
                          value={formData.application_version}
                          placeholder="Application Version"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.application_version && (
                          <span className="invalid">{errors.application_version.message}</span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Terminal Model</label>
                        <input
                          className="form-control"
                          type="text"
                          name="terminal_model"
                          required
                          onChange={onChange}
                          value={formData.terminal_model}
                          placeholder="Terminal Model"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.terminal_model && <span className="invalid">{errors.terminal_model.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">SuperAgent</label>
                        <input
                          className="form-control"
                          type="text"
                          name="super_agent"
                          required
                          onChange={onChange}
                          value={formData.super_agent}
                          placeholder="Super Agent"
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.superagent && <span className="invalid">{errors.superagent.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Primary Route</label>
                        <RSelect
                          options={handlersList}
                          //isMulti
                          value={formData.primary_route}
                          onChange={(e) => setFormData({ ...formData, primary_route: e })}
                        />
                        {errors.primary_route && <span className="invalid">{errors.primary_route.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Secondary Route</label>
                        <RSelect
                          options={handlersList}
                          //isMulti
                          value={formData.secondary_route}
                          onChange={(e) => setFormData({ ...formData, secondary_route: e })}
                        />
                        {errors.secondary_route && <span className="invalid">{errors.secondary_route.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Amount Route</label>
                        <RSelect
                          options={amountRouteList}
                          isMulti
                          value={formData.amount_route}
                          onChange={(e) => setFormData({ ...formData, amount_route: e })}
                        />
                        {errors.amount_route && <span className="invalid">{errors.amount_route.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Switch Handler</label>
                        <RSelect
                          options={switchHandlersList}
                          isMulti
                          value={formData.switch_handler}
                          onChange={(e) => setFormData({ ...formData, switch_handler: e })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Amount Limit</label>
                        <RSelect
                          options={amountRouteList}
                          isMulti
                          value={formData.amount_list}
                          onChange={(e) => setFormData({ ...formData, amount_list: e })}
                        />
                        {errors.amount_list && <span className="invalid">{errors.amount_list.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <label className="form-label">Card Route</label>
                        <RSelect
                          options={cardRouteList}
                          isMulti
                          value={formData.card_route}
                          onChange={(e) => setFormData({ ...formData, card_route: e })}
                        />
                        {errors.card_route && <span className="invalid">{errors.card_route.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col md="8">
                      <FormGroup>
                        <label className="form-label">Bank Route</label>
                        <RSelect
                          options={bankRouteList}
                          isMulti
                          value={formData.bank_route}
                          onChange={(e) => setFormData({ ...formData, bank_route: e })}
                        />
                        {errors.bank_route && <span className="invalid">{errors.bank_route.message}</span>}
                      </FormGroup>
                    </Col>
                    <Col size="12">
                      <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                        <li class="m-2">
                          {mutation?.isLoading ? (
                            <Spinner size="sm" color="primary" />
                          ) : (
                            <Button color="primary" size="md" type="submit">
                              Edit Terminal
                            </Button>
                          )}
                        </li>
                      </ul>
                    </Col>
                  </Form>
                </div>
              )}
            </div>
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
                      {mutation?.isLoading ? (
                        <Spinner size="sm" color="primary" />
                      ) : (
                        <Button color="primary" size="md" type="submit">
                          Delete
                        </Button>
                      )}
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

export default EditTerminals;
