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
  Button,
  Col,
  BlockBetween,
  OverlineTitle,
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
  Label,
  Input,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";

const dataTableData = [
  {
    id: "1",
    description: "Rule 1",
    status: "active",
  },
  {
    id: "2",
    description: "Rule 2",
    status: "active",
  },
  {
    id: "3",
    description: "Rule 3",
    status: "active",
  },
];

const options = [
  { value: "Staff A", label: "Staff A" },
  { value: "Staff B", label: "Staff B" },
];

const CreateAgent = () => {
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
  const [passState, setPassState] = useState(false);

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

  return (
    <>
      <Head title="Rules" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Create Agent
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>

        {/** Rules Form */}
        <PreviewCard>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Please fill the form below{" "}
          </OverlineTitle>
          <Row className="gy-4">
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  First Name
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="first_name"
                    type="text"
                    id="default-0"
                    placeholder="First Name"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Last Name
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="last_name"
                    type="number"
                    id="default-0"
                    placeholder="Last Name"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  User Name
                </Label>
                <div className="form-control-wrap">
                  <input className="form-control" name="username" type="text" id="default-0" placeholder="User Name" />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Email
                </Label>
                <div className="form-control-wrap">
                  <input className="form-control" name="email" type="text" id="default-0" placeholder="Email" />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Password
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    id="default-0"
                    placeholder="Password"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Confirm Password
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="confirm_password"
                    type="password"
                    id="default-0"
                    placeholder="Confirm Password"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Gender
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="monitoring_action" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Phone Number
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="phone_number"
                    type="text"
                    id="default-0"
                    placeholder="Phone Number"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Date of Birth
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    id="default-0"
                    placeholder="Date of Birth"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  placeholder="Address"
                  onChange={(e) => {}}
                  className="form-control-xl form-control no-resize"
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="role" className="form-label">
                  Role
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="role" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="aggregator">Aggregator</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Agent Type
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="agentType" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="settleMerchant">Settle Merchant</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="pin">
                    Pin
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#pin"
                    onClick={(ev) => {}}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    className={`form-control ${passState ? "is-hidden" : "is-shown"}`}
                    type={passState ? "text" : "password"}
                    name="pin"
                    placeholder="PIN"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="pin">
                    Activation Pin
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#pin"
                    onClick={(ev) => {}}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    className={`form-control ${passState ? "is-hidden" : "is-shown"}`}
                    type={passState ? "text" : "password"}
                    name="activation_pin"
                    placeholder="Activation PIN"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Wallet I.D
                </Label>
                <div className="form-control-wrap">
                  <input className="form-control" name="walletId" type="text" id="default-0" placeholder="Wallet I.D" />
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="form-label">Permissions</label>
                <RSelect options={[{ label: "transacting", value: "transacting" }]} isMulti onChange={(e) => {}} />
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Upload Documents{" "}
          </OverlineTitle>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  C.A.C Document
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input
                      type="file"
                      multiple
                      className="custom-file-input form-control"
                      id="cacDocument"
                      onChange={(e) => {}}
                    />
                    <Label className="custom-file-label" htmlFor="cacDocument">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Guarantor I.D
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input form-control"
                      id="guarantorId"
                      onChange={(e) => {}}
                    />
                    <Label className="custom-file-label" htmlFor="guarantorId">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Guarantor Passport
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input form-control"
                      id="guarantorPassport"
                      onChange={(e) => {}}
                    />
                    <Label className="custom-file-label" htmlFor="guarantorPassport">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  I.D Card
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input form-control" id="idCard" onChange={(e) => {}} />
                    <Label className="custom-file-label" htmlFor="idCard">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Passport
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input form-control" id="passport" onChange={(e) => {}} />
                    <Label className="custom-file-label" htmlFor="passport">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Utility Bill
                </Label>
                <div className="form-control-wrap">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input form-control"
                      id="utilityBill"
                      onChange={(e) => {}}
                    />
                    <Label className="custom-file-label" htmlFor="utilityBill">
                      {/* {file === "" ? "Choose file" : file} */}
                      Choose file
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Col>

            <Col className={"my-2"} md="12">
              <FormGroup>
                <Button color="primary" size="lg">
                  Submit
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </PreviewCard>
      </Content>
    </>
  );
};

export default CreateAgent;
