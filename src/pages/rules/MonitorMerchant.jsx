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

const MonitorMerchant = () => {
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

  const dataTableColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
            <DropdownItem onClick={() => handleEdit(row)}>View Details</DropdownItem>
            <DropdownItem onClick={() => handleEdit(row)}>Delete Rule</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
      button: true,
    },
  ];

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
                Merchant Monitoring Rule
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
                  Number of Days
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="number_of_days"
                    type="number"
                    id="default-0"
                    placeholder="Number of Days"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Percentage Violation
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input
                    className="form-control"
                    name="percentage_violation"
                    min="0"
                    max="100"
                    type="number"
                    id="default-0"
                    placeholder="Percentage Violation"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Minimum Amount
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="minimum_amount"
                    type="number"
                    id="default-0"
                    placeholder="Minimum Amount"
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Sending Intervals in Hours
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="sending_intervals"
                    type="number"
                    id="default-0"
                    placeholder="Sending Intervals"
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
                    <Input type="select" name="monitoring_action" id="default-4">
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

export default MonitorMerchant;
