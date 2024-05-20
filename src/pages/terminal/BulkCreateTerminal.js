import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Card, DropdownItem } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
} from "../../components/Component";
import { useForm } from "react-hook-form";
import { TERMINAL_BULK_UPLOAD_TEMPLATE, TERMINAL_BULK_UPLOAD } from "../../config/urls";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { postData } from "../../modules/utilities/util_query";
import axios from "axios";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { Spinner } from "reactstrap";

const BulkCreateHandler = () => {
  const [onSearch, setonSearch] = useState(true);
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const token = useSelector(getAuthToken);
  const history = useHistory();

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast.success("Success");
    },
    onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      toast.error(message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.warn("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsLoading(true);
      const response = await axios.post(`${TERMINAL_BULK_UPLOAD}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("File uploaded successfully");
    } catch (error) {
      let message = error.response?.data?.detail || error.toString();
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Head title="Terminal Bulk Upload"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Terminal Bulk Upload</BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Select a File for Bulk Upload</h5>
                  </div>
                  <div className="card-tools mr-n1"></div>
                </div>
              </div>
              <form onSubmit={onSubmit}>
                <div className="card-inner">
                  <div className="form-group">
                    <label htmlFor="excelFile">Select Excel File:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="excelFile"
                      name="excelFile"
                      accept=".xls, .xlsx"
                      onChange={handleFileChange}
                      ref={register}
                    />
                  </div>

                  {isLoading ? (
                    <Spinner size="sm" color="primary" />
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Upload Excel File
                    </button>
                  )}
                  <a href={`${TERMINAL_BULK_UPLOAD_TEMPLATE}`} target="_blank" className="btn btn-secondary ml-2">
                    Download Template
                  </a>
                </div>
              </form>
            </div>
          </Card>
        </Block>

        <Block>
          <Card className="card-bordered card-stretch">
            <div className="card-inner-group">
              <div className="card-inner">
                <div className="card-title-group">
                  <div className="card-title">
                    <h5 className="title">Records to Upload</h5>
                  </div>
                  <div className="card-tools mr-n1"></div>
                </div>
              </div>
              <div className="card-inner p-0">
                <table className="table table-tranx">
                  <thead>
                    <tr className="tb-tnx-head">
                      <th className="tb-tnx-id">
                        <span className="">#</span>
                      </th>
                      <th className="tb-tnx-info">
                        <span className="tb-tnx-desc d-none d-sm-inline-block">
                          <span>Bill For</span>
                        </span>
                        <span className="tb-tnx-date d-md-inline-block d-none">
                          <span className="d-md-none">Date</span>
                          <span className="d-none d-md-block">
                            <span>Issue Date</span>
                            <span>Due Date</span>
                          </span>
                        </span>
                      </th>
                      <th className="tb-tnx-amount is-alt">
                        <span className="tb-tnx-total">Total</span>
                        <span className="tb-tnx-status d-none d-md-inline-block">Status</span>
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
                          <span>{"2312"}</span>
                        </a>
                      </td>
                      <td className="tb-tnx-info">
                        <div className="tb-tnx-desc">
                          <span className="title">{"43434"}</span>
                        </div>
                        <div className="tb-tnx-date">
                          <span className="date">{"3434"}</span>
                          <span className="date">{"23121"}</span>
                        </div>
                      </td>
                      <td className="tb-tnx-amount is-alt">
                        <div className="tb-tnx-total">
                          <span className="amount">${"42323"}</span>
                        </div>
                        <div className="tb-tnx-status">
                          <span className={`badge badge-dot badge-danger`}>{"Due"}</span>
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
                                  View
                                </DropdownItem>
                              </li>
                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#print"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  Print
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
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default BulkCreateHandler;
