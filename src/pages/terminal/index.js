import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BackTo,
  PreviewCard,
  Icon,
  ReactDataTable,
  Col,
  BlockBetween,
  RSelect,
} from "../../components/Component";
import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Dropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
  Button,
  Tooltip,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { CREATE_TERMINAL_CONFIG, GET_CREATE_TERMINAL, DEACTIVATE_TERMINAL } from "../../config/urls";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { fetchData, postData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";
import { handleApiError, handleApiSuccess } from "../../modules/utilities/responseHandlers";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { toast } from "react-toastify";

const changeMerchantPinOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const AllTerminals = () => {
  const [smOption, setSmOption] = useState(false);

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
    delete: false,
  });
  const [editId, setEditId] = useState();
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
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  let payload_data = {};
  const token = useSelector(getAuthToken);

  const { errors, register, handleSubmit } = useForm();
  const [dataTableData, setDataTableData] = useState([]);
  const [passState, setPassState] = useState(false);
  const [handlersList, setHandlersList] = useState([]);
  const [bankRouteList, setBankRouteList] = useState([]);
  const [cardRouteList, setCardRouteList] = useState([]);
  const [amountRouteList, setAmountRouteList] = useState([]);
  const [handlers, setHandlers] = useState([]);
  const [switchHandlersList, setSwitchHandlersList] = useState([]);
  const history = useHistory();

  // function to reset the form
  const resetForm = () => {
    setFormData({
      terminal_id: "",
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false, delete: false });
    resetForm();
  };

  const toggleDropdown = (e, row) => {
    setEditId(row?.id);
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = (row) => {
    // setModal({ ...modal, edit: true });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangeTerminalId = (e) => {
    setFormData({ ...formData, terminal_id: e.target.value, switch_handler: "" });
    setSwitchHandlersList(
      handlers.map((handler) => {
        let concat = `${handler}:${e.target.value}`;
        return { value: concat, label: concat };
      }),
    );
  };

  const viewRow = (row) => {
    history.push(`/terminals/metric/${row.terminal_id}`);
  };

  const dataTableColumns = [
    // {
    //   name: "ID",
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: "Terminal ID",
      selector: (row) => row.terminal_id,
      sortable: true,
    },
    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
    },
    {
      name: "Merchant Name",
      selector: (row) => row.merchant_name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button outline color="light mr-1" onClick={() => viewRow(row)}>
            <span>View Terminal</span>
            <Icon name="eye" />
          </Button>
          {/* <Button outline color="primary mr-1">
            <span>Edit</span>
            <Icon name="edit" />
          </Button>
          <Button outline color="danger" onClick={}>
            <span>Deactivate</span>
            <Icon name="trash" />
          </Button> */}
        </>
      ),
      grow: 1.1,
    },
  ];

  const queryClient = useQueryClient();

  const addTerminal = (event) => {
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
      url: GET_CREATE_TERMINAL,
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

  const result = useQuery(
    [
      GET_CREATE_TERMINAL,
      {
        url: GET_CREATE_TERMINAL,
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
        setDataTableData(data);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      handleApiSuccess(response, <ToastUI success={true} message="Success" />);
      queryClient.invalidateQueries(GET_CREATE_TERMINAL);
      onFormCancel();
    },
    onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      handleApiError(error, <ToastUI error={true} message={message} />);
    },
  });

  const config = useQuery(
    [
      CREATE_TERMINAL_CONFIG,
      {
        url: CREATE_TERMINAL_CONFIG,
        payload_data,
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
      <Head title="Terminals" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Terminals
              </BlockTitle>
              <Block>
                <Button className="toggle d-none d-md-inline-flex mr-2" color="white">
                  <Icon name="clipboard"></Icon>
                  <Link className="link-secondary" to={process.env.PUBLIC_URL + "terminals/bulk"}>
                    <span>Bulk Upload</span>
                  </Link>
                </Button>
                <Button
                  className="toggle d-none d-md-inline-flex"
                  color="primary"
                  onClick={() => {
                    setModal({ ...modal, add: true });
                  }}
                >
                  <Icon name="plus"></Icon>
                  <span>Add Terminal</span>
                </Button>
              </Block>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            {result?.isLoading ? (
              <LoadingSpinner />
            ) : (
              <ReactDataTable data={dataTableData} columns={dataTableColumns} pagination />
            )}
          </PreviewCard>
        </Block>

        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="xl">
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
              <h5 className="title">Add Terminal</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={addTerminal}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Terminal ID</label>
                      <input
                        className="form-control"
                        type="text"
                        name="terminal_id"
                        value={formData.terminal_id}
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
                        defaultValue={formData.profile}
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
                          defaultValue={formData.admin_pin}
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
                        defaultValue={formData.change_merchant_pin}
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
                          defaultValue={formData.merchant_pin}
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
                        defaultValue={formData.merchant_wallet_id}
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
                        defaultValue={formData.block_terminal}
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
                          defaultValue={formData.block_pin}
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
                        defaultValue={formData.serial_number}
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
                        defaultValue={formData.application_version}
                        placeholder="Application Version"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.appliation_version && (
                        <span className="invalid">{errors.appliation_version.message}</span>
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
                        defaultValue={formData.terminal_model}
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
                        defaultValue={formData.super_agent}
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
                        defaultValue={formData.primary_route}
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
                        defaultValue={formData.secondary_route}
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
                        defaultValue={formData.amount_route}
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
                        defaultValue={formData.switch_handler}
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
                        defaultValue={formData.amount_list}
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
                        defaultValue={formData.card_route}
                        onChange={(e) => setFormData({ ...formData, card_route: e })}
                      />
                      {errors.card_route && <span className="invalid">{errors.card_route.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Bank Route</label>
                      <RSelect
                        options={bankRouteList}
                        isMulti
                        defaultValue={formData.bank_route}
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
                            Add Handler
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
      </Content>
    </>
  );
};

export default AllTerminals;
