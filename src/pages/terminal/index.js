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
  Button,
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
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const generateRandomTerminalData = () => {
  const terminalData = [];
  const numberOfTerminals = 10; // You can change this to the desired number of terminals.

  for (let id = 1; id <= numberOfTerminals; id++) {
    const terminal = {
      id: id,
      terminal_id: `TID-${id}`,
      serial_number: `SN-${id}`,
      merchant_name: `Merchant ${id}`,
      profile: `Profile ${id}`,
      blocked: Math.random() < 0.5 ? "Yes" : "No", // Randomly assign "Yes" or "No" for blocked
    };

    terminalData.push(terminal);
  }

  return terminalData;
};

const changeMerchantPinOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const handlerRouteOptions = [
  { value: "3LINE", label: "3LINE" },
  { value: "ISW", label: "ISW" },
];

function generateAmountRouteList(handlers, amounts) {
  const amountRouteList = [];

  for (const handler of handlers) {
    for (const amount of amounts) {
      const value = `${amount}:${handler}`;
      amountRouteList.push({ value, label: value });
    }
  }

  return amountRouteList;
}

function generateBankRouteList(handlers, bank) {
  const bankRouteList = [];

  for (const bank of banks) {
    for (const handler of handlers) {
      const value = `${bank}:${handler}`;
      bankRouteList.push({ value, label: value });
    }
  }

  return bankRouteList;
}

function generateCardRouteList(handlers, cardTypes) {
  const cardRouteList = [];

  handlers.forEach((handler) => {
    cardTypes.forEach((cardType) => {
      const value = `${cardType}:${handler}`;
      cardRouteList.push({ value, label: value });
    });
  });

  return cardRouteList;
}

const banks = [
  "ACCESS",
  "ECO",
  "FIDELITY",
  "FIRST",
  "FCMB",
  "HERITAGE",
  "KEYSTONE",
  "SKYE",
  "STANBIC",
  "UNION",
  "UBA",
  "WEMA",
  "ZENITH",
  "STERLING",
];

const handlers = ["3LINE", "ISW"];
const amounts = [
  "100",
  "500",
  "1000",
  "5000",
  "10000",
  "15000",
  "20000",
  "25000",
  "50000",
  "100000",
  "500000",
  "1000000",
];
const cardTypes = ["VERVE", "MASTERCARD", "VISA", "AMERICAN-EXPRESS", "JCB", "CARD"];

function SwitchHandlersInput({ handlersObject }) {
  const [switchHandlers, setSwitchHandlers] = useState({}); // State to store switch handlers

  // Function to handle adding or updating a handler with an ID
  const handleSwitchHandlerChange = (handler, id) => {
    setSwitchHandlers((prevHandlers) => ({
      ...prevHandlers,
      [handler]: id,
    }));
  };

  return (
    <div>
      <div className="row">
        <Col md="3">
          <FormGroup>
            <label>
              3LINE ID:
              <input
                type="text"
                className="form-control"
                value={switchHandlers["3LINE"] || ""}
                onChange={(e) => handleSwitchHandlerChange("3LINE", e.target.value)}
              />
            </label>
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup>
            <label>
              ISW ID:
              <input
                type="text"
                className="form-control"
                value={switchHandlers["ISW"] || ""}
                onChange={(e) => handleSwitchHandlerChange("ISW", e.target.value)}
              />
            </label>
          </FormGroup>
        </Col>
      </div>
    </div>
  );
}

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
    name: "",
    created_by: "",
    created_on: "",
    status: "ACTIVE",
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const { errors, register, handleSubmit } = useForm();
  const [dataTableData, setDataTableData] = useState([]);
  const [passState, setPassState] = useState(false);
  const [handlersList, _] = useState(generateAmountRouteList(handlers, amounts));
  const [bankRouteList, __] = useState(generateBankRouteList(handlers, banks));
  const [cardRouteList, ___] = useState(generateCardRouteList(handlers, cardTypes));

  const onEditSubmit = () => {};

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

  const handleEdit = () => {
    setModal({ ...modal, edit: true });
  };
  const handleDelete = () => {
    setModal({ ...modal, delete: true });
  };

  const dataTableColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
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
      name: "Profile",
      selector: (row) => row.profile,
      sortable: true,
    },
    {
      name: "Blocked",
      selector: (row) => row.blocked,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown isOpen={dropdownOpen && editId == row?.id} toggle={(e) => toggleDropdown(e, row)}>
          <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
            <Icon name="plus" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => handleEdit()}>Terminal Metrics</DropdownItem>
            <DropdownItem onClick={() => handleEdit(row)}>Terminal Details</DropdownItem>
            <DropdownItem onClick={() => handleEdit(row)}>Delete Terminal</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  useEffect(() => {
    const terminalData = generateRandomTerminalData();
    const mappedData = terminalData.map((terminal) => ({
      id: terminal.id,
      terminal_id: terminal.terminal_id,
      serial_number: terminal.serial_number,
      merchant_name: terminal.merchant_name,
      profile: terminal.profile,
      blocked: terminal.blocked,
    }));
    setDataTableData(mappedData);
  }, []);

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
            <ReactDataTable data={dataTableData} columns={dataTableColumns} pagination />
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
                <Form className="row gy-4" noValidate onSubmit={() => {}}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Terminal ID</label>
                      <input
                        className="form-control"
                        type="text"
                        name="terminal_id"
                        defaultValue={formData.terminal_id}
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
                          ref={register({ required: "This field is required" })}
                        />
                        {errors.merchant_pin && <span className="invalid">{errors.merchant_pin.message}</span>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Merchant Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="merchant_name"
                        required
                        defaultValue={formData.merchant_name}
                        placeholder="Merchant Name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.merchant_name && <span className="invalid">{errors.merchant_name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <label className="form-label">Merchant Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="merchant_email"
                        required
                        defaultValue={formData.merchant_email}
                        placeholder="Merchant Email"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.merchant_email && <span className="invalid">{errors.merchant_email.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Merchant Address</label>
                      <textarea
                        name="merchant_address"
                        defaultValue={formData.merchant_address}
                        placeholder="Merchant Address"
                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        className="form-control-xl form-control no-resize"
                        ref={register({
                          required: "This field is required",
                        })}
                      />
                      {errors.merchant_address && <span className="invalid">{errors.merchant_address.message}</span>}
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
                        defaultValue={formData.appliation_version}
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
                        name="superagent"
                        required
                        defaultValue={formData.superagent}
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
                        options={handlerRouteOptions}
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
                        options={handlerRouteOptions}
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
                        options={handlersList}
                        isMulti
                        defaultValue={formData.amount_route}
                        onChange={(e) => setFormData({ ...formData, amount_route: e })}
                      />
                      {errors.amount_route && <span className="invalid">{errors.amount_route.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Switch Handler</label>
                      <SwitchHandlersInput />
                      {errors.switch_handler && <span className="invalid">{errors.switch_handler.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Amount Limit</label>
                      <RSelect
                        options={handlersList}
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
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Add Handler
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
      </Content>
    </>
  );
};

export default AllTerminals;
