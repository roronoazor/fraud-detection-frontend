import React, { useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
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
} from "../../../components/Component";
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
import { GET_CREATE_TERMINAL_HANDLER, DEACTIVATE_TERMINAL_HANDLER } from "../../../config/urls";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { fetchData, postData } from "../../../modules/utilities/util_query";
import LoadingSpinner from "../../components/common/ui-view/SpinnerUI";
import ToastUI from "../../components/common/ui-view/ToastUI";
import { handleApiError, handleApiSuccess } from "../../../modules/utilities/responseHandlers";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../../modules/auth/redux/authSelector";
import { convertDateStringtoLocalDateString } from "../../../modules/utilities";

const AllHandlers = () => {
  let payload_data = {};
  const [dataTableData, setDataTableData] = useState([]);
  const token = useSelector(getAuthToken);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState({
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
  const { errors, register, handleSubmit } = useForm();

  // function to reset the form
  const resetForm = () => {
    setFormData({
      name: "",
    });
    setEditId(null);
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.created_by,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => convertDateStringtoLocalDateString(row.created_at),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.active ? "ACTIVE" : "INACTIVE"),
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
            <DropdownItem onClick={() => handleDeactivate(row)}>Deactivate</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
      button: true,
    },
  ];

  const deactivateRow = () => {
    mutation.mutate({
      url: DEACTIVATE_TERMINAL_HANDLER,
      payload_data: {
        id: editId,
      },
      token: token,
      authenticate: true,
    });
    onFormCancel();
  };

  const handleDeactivate = (row) => {
    setModal({ ...modal, delete: true });
    setEditId(row.id);
  };

  const queryClient = useQueryClient();

  const addHandler = () => {
    mutation.mutate({
      url: GET_CREATE_TERMINAL_HANDLER,
      payload_data: {
        name: formData.name,
      },
      token: token,
      authenticate: true,
    });
    return;
  };

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      handleApiSuccess(response, <ToastUI success={true} message="Success" />);
      queryClient.invalidateQueries(GET_CREATE_TERMINAL_HANDLER);
      onFormCancel();
    },
    onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      handleApiError(error, <ToastUI error={true} message={message} />);
    },
  });

  const result = useQuery(
    [
      GET_CREATE_TERMINAL_HANDLER,
      {
        url: GET_CREATE_TERMINAL_HANDLER,
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

  return (
    <>
      <Head title="Basic Tables" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/terminals" icon="arrow-left">
              Back to Terminals
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Handlers
              </BlockTitle>
              <Block>
                <Button
                  className="toggle d-none d-md-inline-flex"
                  color="primary"
                  onClick={() => {
                    setModal({ ...modal, add: true });
                  }}
                >
                  <Icon name="plus"></Icon>
                  <span>Add Handler</span>
                </Button>
              </Block>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <ReactDataTable data={dataTableData} columns={dataTableColumns} showSearch={false} pagination />
          </PreviewCard>
        </Block>
        <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="lg">
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
              <h5 className="title">Add Handler</h5>
              <div className="mt-4">
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={() => {
                    addHandler();
                  }}
                >
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter name of handler"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
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
        <Modal
          isOpen={modal.delete}
          toggle={() => setModal({ edit: false })}
          className="modal-dialog-centered"
          size="lg"
        >
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm"></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Delete</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={() => deactivateRow()}>
                  <Col md="6">
                    <FormGroup>
                      <p>Are you sure want to delete ?</p>
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Delete
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

export default AllHandlers;
