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
import { Link, useHistory } from "react-router-dom";
import { handleApiError, handleApiSuccess } from "../../modules/utilities/responseHandlers";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { fetchData, postData } from "../../modules/utilities/util_query";
import LoadingSpinner from "../components/common/ui-view/SpinnerUI";
import ToastUI from "../components/common/ui-view/ToastUI";
import { GET_CREATE_RULES, DEACTIVATE_RULE, ACTIVATE_RULE } from "../../config/urls";


const AllRules = () => {

  const [dataTableData, setDataTableData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [editId, setEditId] = useState();
  const history = useHistory();
  const queryClient = useQueryClient();

  const toggleDropdown = (e, row) => {
    setEditId(row?.id);
    setDropdownOpen(!dropdownOpen);
  };

   // create the mutation object
   const mutation = useMutation(postData, {
    onSuccess: (response) => {
      handleApiSuccess(response, <ToastUI success={true} message="Success" />)
      queryClient.invalidateQueries(GET_CREATE_RULES);
    },
    onError: (error) => {
        let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
        handleApiError(error, <ToastUI error={true} message={message} />);
    }
  });  

  let payload_data = {};
  
  const token = useSelector(getAuthToken);
  const [data, setData] = React.useState({});
  const dataTableColumns = [
   
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
            <DropdownItem onClick={() => goToEditPage(row)}>View Details</DropdownItem>
            { row.active && <DropdownItem onClick={() => handleDeactivate(row)}>Deactivate Rule</DropdownItem>}
            { !row.active && <DropdownItem onClick={() => handleActivate(row)}>Activate Rule</DropdownItem>}
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

  if (result?.isLoading || mutation?.isLoading) {
    return <LoadingSpinner />;
  }

  const goToEditPage = (row) => {
    // Navigate to the edit page with the row's ID
    history.push(`/rules/edit/${row.id}`);
  };

  const handleDeactivate = async (row) => {
    mutation.mutate({
      url: DEACTIVATE_RULE,
      payload_data: {
        id: row.id
      },
      token: token,
      authenticate: true
    });
    return;
  };

  const handleActivate = async (row) => {
    mutation.mutate({
      url: ACTIVATE_RULE,
      payload_data: {
        id: row.id
      },
      token: token,
      authenticate: true
    });
    return;
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
