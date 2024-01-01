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
  OverlineTitle,
  ReactDualList,
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


const options = [
  { value: "Staff A", label: "Staff A" },
  { value: "Staff B", label: "Staff B" },
];

const CreateRule = () => {
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
  const [sort, setSortState] = useState("");
  const { errors, register, handleSubmit } = useForm();
  const [passState, setPassState] = useState(false);

 

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
                Create Rule
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
                  Rule Description
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="rule_description"
                    type="text"
                    id="default-0"
                    placeholder="Rule Description"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Rule Condition
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="select" id="default-4">
                      <option value="">Rule Condition</option>
                      <option value="exceeded daily limit">Exceeded Daily Limit</option>
                      <option value="exceeded account daily limit">Exceeded Daily Transfer Limit on Account</option>
                      <option value="exceeded card daily limit">Exceeded Daily Withdrwal Limit on Card</option>
                      <option value="flag duplicate transaction">Flag Duplicate Transaction</option>
                      <option value="exceeded limit">Exceeded Limit</option>
                      <option value="exceeded balance">Exceeded Balance</option>
                      <option value="exceeded single transaction limit">Exceeded Single Transaction Limit</option>
                      <option value="exceeded number of daily transaction on card">
                        Exceeded Number of Daily Transactions on Card
                      </option>
                      <option value="exceeded number of daily transaction on account">
                        Exceeded Number of Daily Transactions on Account
                      </option>
                      <option value="exceeded number of daily transaction">
                        Exceeded Number of Daily Transactions
                      </option>
                      <option value="transaction time">Transaction Time</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Product
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="product" id="default-4">
                      <option value="">Rule Product</option>
                      <option value="AIRTIME_VTU">Airtime V.T.U</option>
                      <option value="CABLE_RECHARGE">Cable Recharge</option>
                      <option value="DATA_RECHARGE">Data Recharge</option>
                      <option value="ELECTRICITY_RECHARGE">Electricity</option>
                      <option value="TRANSFER">Transfer</option>
                      <option value="WITHDRAWAL">Withdrawal</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Rule Value
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="rule_value"
                    type="text"
                    id="default-0"
                    placeholder="Rule Value"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Start Time
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="start_time"
                    type="time"
                    id="default-0"
                    placeholder="Start Time"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  End Time
                </Label>
                <div className="form-control-wrap">
                  <input className="form-control" name="end_time" type="time" id="default-0" placeholder="End Time" />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Manageable Setup{" "}
          </OverlineTitle>
          <Row className="gy-4">
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Manageable Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input
                    className="form-control"
                    name="manageable_level"
                    type="text"
                    id="default-0"
                    placeholder="Value"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Action to take (This field is Optional)
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="manageable_action" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="block_agent">Block Agent</option>
                      <option value="block_transaction">Block Transaction</option>
                      <option value="disable_terminal">Disable Terminal</option>
                      <option value="send_email">Send Email</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Select Staff Below:
                </Label>
                <div className="form-control-wrap">
                  <ReactDualList options={options} canFilter={false} />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Warning Setup{" "}
          </OverlineTitle>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Warning Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input className="form-control" name="warning_level" type="text" id="default-0" placeholder="Value" />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Action to take (This field is Optional)
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="warning_action" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="block_agent">Block Agent</option>
                      <option value="block_transaction">Block Transaction</option>
                      <option value="disable_terminal">Disable Terminal</option>
                      <option value="send_email">Send Email</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Select Staff Below:
                </Label>
                <div className="form-control-wrap">
                  <ReactDualList options={options} canFilter={false} />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Danger Setup{" "}
          </OverlineTitle>
          <Row className="gy-4">
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Danger Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input className="form-control" name="danger_level" type="text" id="default-0" placeholder="Value" />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Action to take (This field is Optional)
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="danger_action" id="default-4">
                      <option value="">Choose Option</option>
                      <option value="block_agent">Block Agent</option>
                      <option value="block_transaction">Block Transaction</option>
                      <option value="disable_terminal">Disable Terminal</option>
                      <option value="send_email">Send Email</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Select Staff Below:
                </Label>
                <div className="form-control-wrap">
                  <ReactDualList options={options} canFilter={false} />
                </div>
              </FormGroup>
            </Col>
            <Col md="12">
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

export default CreateRule;
