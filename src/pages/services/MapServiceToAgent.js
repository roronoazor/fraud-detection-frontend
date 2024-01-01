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
  Card,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const DataTableData = [
  {
    id: 0,
    name: "3LINE",
    created_by: "Jack Grimoire",
    created_on: "2017-02-17",
    status: "ACTIVE",
  },
  {
    id: 1,
    name: "ISW",
    created_by: "Jack Grimoire",
    created_on: "2017-02-17",
    status: "ACTIVE",
  },
];

const TerminalMap = () => {
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

  return (
    <>
      <Head title="Terminal Mapping" />
      <Content>
        <BlockHead>
          <BlockHeadContent>
            <BackTo link="/terminals" icon="arrow-left">
              Back to Terminals
            </BackTo>
            <BlockBetween>
              <BlockTitle tag="h2" className="fw-normal">
                Map Agent to Service
              </BlockTitle>
            </BlockBetween>
          </BlockHeadContent>
        </BlockHead>
        <Block size="lg">
          <PreviewCard>
            <div className="p-2">
              <h5 className="title">Map Service</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={() => {}}>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Select Agent</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        disabled
                        placeholder="Agent X"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="form-label">Select Service</label>
                      <RSelect
                        options={[{ label: "Service A", value: "Service A" }]}
                        isMulti
                        defaultValue={formData.terminals}
                        onChange={(e) => setFormData({ ...formData, terminals: e })}
                      />
                    </FormGroup>
                  </Col>
                  <Col className={"my-2"} size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Map
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light m-2"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </PreviewCard>
          <PreviewCard>
            <div className="p-2">
              <h5 className="title">Services currently mapped to Agent X</h5>
              <div className="mt-4">
                <Card className="card-bordered card-stretch">
                  <div className="card-inner-group">
                    <div className="card-inner p-0">
                      <table className="table table-tranx">
                        <thead>
                          <tr className="tb-tnx-head">
                            <th className="tb-tnx-id">
                              <span className="">#</span>
                            </th>
                            <th className="tb-tnx-info">
                              <span className="tb-tnx-desc d-none d-sm-inline-block">
                                <span>Service Name</span>
                              </span>
                            </th>
                            <th className="tb-tnx-action">
                              <span>&nbsp;</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={"2"} className="tb-tnx-item">
                            <td className="tb-tnx-id">
                              <a
                                href="#ref"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                              >
                                <span>{"1."}</span>
                              </a>
                            </td>
                            <td className="tb-tnx-info">
                              <div className="tb-tnx-desc">
                                <span className="title">{"Service A"}</span>
                              </div>
                            </td>
                            <td className="tb-tnx-action">
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="text-soft dropdown-toggle btn btn-icon btn-trigger">
                                  <Icon name="more-h"></Icon>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <ul className="link-list-plain">
                                    <li onClick={() => {}}>
                                      <DropdownItem
                                        tag="a"
                                        href="#view"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        Unmap
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default TerminalMap;
