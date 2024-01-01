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
  Dropdown,
  DropdownItem,
  Badge,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { handleApiError } from "../../modules/utilities/responseHandlers";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { useQuery } from "react-query";
import { fetchData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";
import { GET_CREATE_RULES } from "../../config/urls";


const AllRules = () => {
  const [smOption, setSmOption] = useState(false);

  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [dataTableData, setDataTableData] = useState([]);
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

 

  const toggleDropdown = (e, row) => {
    setEditId(row?.id);
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = () => {
    setModal({ ...modal, edit: true });
  };
  let payload_data = {};
  
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
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
      name: "Product",
      selector: (row) => row.product,
      sortable: true,
    },
    {
      name: "Action If Rule is Violated",
      selector: (row) => row.action ? row.action : "N/A",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.active ? <Badge pill color="success">Active</Badge> : <Badge pill color="gray">In-Active</Badge>,
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

  const result = useQuery(
    [
      GET_CREATE_RULES,
      {
        url: GET_CREATE_RULES,
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
        setDataTableData(data);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

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

      </Content>
    </>
  );
};

export default AllRules;
