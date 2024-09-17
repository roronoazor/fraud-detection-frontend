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
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import { GET_SPROUTPAY_AGENTS } from "../../config/urls";
import ToastUI from "../components/common/ui-view/ToastUI";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { fetchData } from "../../modules/utilities/util_query";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AllAgents = () => {
  const [smOption, setSmOption] = useState(false);

  const token = useSelector(getAuthToken);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataTableData, setDataTableData] = useState([]);
  const history = useHistory();

  // call the api that loads this data only once
  let payload_data = {};
  const result = useQuery(
    [
      "sprout_agents",
      {
        url: GET_SPROUTPAY_AGENTS,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data?.data;
        const users = data?.users?.docs || [];

        setDataTableData(users);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  const dataTableColumns = [
    {
      name: "Username",
      // capitalize the first letter of the username
      selector: (row) => {
        const username = row.username || "";
        return username.charAt(0).toUpperCase() + username.slice(1);
      },
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => (row.firstName ? row.firstName.charAt(0).toUpperCase() + row.firstName.slice(1) : ""),
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => (row.lastName ? row.lastName.charAt(0).toUpperCase() + row.lastName.slice(1) : ""),
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => {
            handleEdit(row);
          }}
          style={{ height: "25px", width: "70px" }}
        >
          View
        </button>
      ),
      button: true,
    },
  ];

  const handleEdit = (row) => {
    history.push(`/agents/${row?.walletId}/metrics/`);
  };

  const { isLoading } = result;

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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <ReactDataTable data={dataTableData} columns={dataTableColumns} pagination />
            )}
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default AllAgents;
