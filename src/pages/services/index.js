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
  BlockBetween,
} from "../../components/Component";
import { DropdownMenu, DropdownToggle, Dropdown, DropdownItem } from "reactstrap";
import { useQuery } from "react-query";
import ToastUI from "../components/common/ui-view/ToastUI";
import { fetchData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import { GET_SERVICES } from "../../config/urls";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { useHistory } from "react-router-dom";

const AllServices = () => {
  const [smOption, setSmOption] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataTableData, setDataTableData] = useState([]);
  const [editName, setEditName] = useState();
  const token = useSelector(getAuthToken);
  const history = useHistory();

  const toggleDropdown = (e, row) => {
    setEditName(row?.name);
    setDropdownOpen(!dropdownOpen);
  };

  // call the api that loads this data only once
  let payload_data = {};
  const result = useQuery(
    [
      "services",
      {
        url: GET_SERVICES,
        payload_data,
        authenticate: true,
        token,
      },
    ],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data?.products || [];
        setDataTableData(
          data.map((item) => ({
            name: item,
          })),
        );
      },
      onError: (error) => {
        handleApiError(error);
      },
    },
  );

  const dataTableColumns = [
    {
      name: "Service Name",
      selector: (row) => row.name,
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
    setEditName(row.name);
    history.push(`/services/${row?.name}/metrics/`);
  };

  if (result?.isLoading) {
    return <LoadingSpinner />;
  }

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
                Services
              </BlockTitle>
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

export default AllServices;
