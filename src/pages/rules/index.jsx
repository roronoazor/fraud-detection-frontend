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

const AllRules = () => {
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
                Rules
              </BlockTitle>
              <Block>
                <Button className="toggle d-none d-md-inline-flex mr-2" color="white">
                  <Icon name="clipboard"></Icon>
                  <Link className="link-secondary" to={process.env.PUBLIC_URL + "rules/create"}>
                    <span>Create Rule</span>
                  </Link>
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
                <Form className="row gy-4" noValidate onSubmit={() => {}}></Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </>
  );
};

export default AllRules;
