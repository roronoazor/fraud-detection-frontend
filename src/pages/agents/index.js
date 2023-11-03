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

const agentData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234567890",
    address: "123 Main St, New York",
    supervisor: "Sarah Johnson",
    hire_date: "2020-08-15",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+9876543210",
    address: "456 Elm St, Los Angeles",
    supervisor: "Michael Brown",
    hire_date: "2021-03-22",
    status: "INACTIVE",
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+3456789012",
    address: "789 Oak St, Chicago",
    supervisor: "Emily Davis",
    hire_date: "2019-12-10",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+2345678901",
    address: "567 Pine St, San Francisco",
    supervisor: "David Wilson",
    hire_date: "2022-01-30",
    status: "INACTIVE",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+6789012345",
    address: "890 Cedar St, Miami",
    supervisor: "Alice Johnson",
    hire_date: "2020-05-05",
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+4567890123",
    address: "234 Birch St, Houston",
    supervisor: "John Smith",
    hire_date: "2021-08-20",
    status: "INACTIVE",
  },
  {
    id: 7,
    name: "Ella Martinez",
    email: "ella.martinez@example.com",
    phone: "+8901234567",
    address: "678 Maple St, Phoenix",
    supervisor: "Ethan Garcia",
    hire_date: "2018-11-12",
    status: "ACTIVE",
  },
  {
    id: 8,
    name: "Liam Johnson",
    email: "liam.johnson@example.com",
    phone: "+5678901234",
    address: "345 Walnut St, Dallas",
    supervisor: "Olivia Wilson",
    hire_date: "2023-02-25",
    status: "INACTIVE",
  },
  {
    id: 9,
    name: "Ava Williams",
    email: "ava.williams@example.com",
    phone: "+1234567890",
    address: "123 Main St, New York",
    supervisor: "Elijah Martinez",
    hire_date: "2017-07-07",
    status: "ACTIVE",
  },
  {
    id: 10,
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    phone: "+6789012345",
    address: "890 Cedar St, Miami",
    supervisor: "Liam Johnson",
    hire_date: "2022-04-18",
    status: "INACTIVE",
  },
];

const DataTableData = agentData.map((agent) => ({
  id: agent.id,
  name: agent.name,
  email: agent.email,
  phone: agent.phone,
  address: agent.address,
  supervisor: agent.supervisor,
  hire_date: agent.hire_date,
  status: agent.status,
}));

const AllAgents = () => {
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

  const onEditSubmit = () => {};

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
      status: "Active",
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

  const dataTableColumns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Supervisor",
      selector: (row) => row.supervisor,
      sortable: true,
    },
    {
      name: "Hire Date",
      selector: (row) => row.hire_date,
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
            <DropdownItem onClick={() => handleEdit(row)}>View Agent Metrics</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  const handleEdit = () => {
    setModal({ ...modal, edit: true });
  };
  const handleDelete = () => {
    setModal({ ...modal, delete: true });
  };

  return (
    <>
      <Head title="Basic Tables" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/" icon="arrow-left">
              Back to Dashboard
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Agents
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <ReactDataTable data={DataTableData} columns={dataTableColumns} pagination />
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default AllAgents;
