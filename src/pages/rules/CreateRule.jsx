import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
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
  ReactDualList
} from "../../components/Component";
import {
  FormGroup,
  Label,
  Input,
  Row,
  Spinner
} from "reactstrap";
import { GET_SPROUTPAY_ADMINS } from "../../config/urls";
import { useQuery, useMutation } from "react-query";
import { getAuthToken } from "../../modules/auth/redux/authSelector";
import { useSelector } from "react-redux";
import ToastUI from "../components/common/ui-view/ToastUI";
import { fetchData, postData } from "../../modules/utilities/util_query";
import toast from "react-hot-toast";
import { GET_CREATE_RULES } from "../../config/urls";
import { useHistory } from "react-router";
import { handleApiSuccess } from "../../modules/utilities/responseHandlers";

const CreateRule = () => {
  
  const [formData, setFormData] = useState({});
  const [staffManageable, setStaffManageable] = useState([]);
  const [staffWarning, setStaffWarning] = useState([]);
  const [staffDanger, setStaffDanger] = useState([]);
  const history = useHistory();
  

  const handleChange = (evt) => {
     const { name, value } = evt.target;
     setFormData({...formData, [name]: value});
  }


  const setDangerValues = (values) => {
    setStaffDanger(values);
  }

  const setManageableValues = (values) => {
    setStaffManageable(values);
  }

  const setWarningValues = (values) => {
    setStaffWarning(values);
  }

  let payload_data = {};
  const token = useSelector(getAuthToken);
  const [adminOptions, setAdminOptions] = useState([]);
  const result = useQuery(
    [
      `${GET_SPROUTPAY_ADMINS}`,
      {
        url: GET_SPROUTPAY_ADMINS,
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
        const admins = data.map((item) => {
          return { value: item?.info?.email, label: item?.info.email }
        })
        setAdminOptions(admins);
      },
      onError: (error) => {
        handleApiError(error, <ToastUI error />);
      },
    },
  );

  // create the mutation object
  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      handleApiSuccess(response, <ToastUI success={true} message="Successfully Created" />)
      history.push('/rules');
    },
    onError: (error) => {
        let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
        handleApiError(error, <ToastUI error={true} message={message} />);
    }
  });     

  const handleSubmit = () => {
    
    if (!formData?.rule_description || !formData?.rule_condition || !formData?.product || !formData?.rule_value || !formData?.manageable_level || !formData?.warning_level || !formData?.danger_level) {
      toast.custom(<ToastUI error={true} message="Please fill all required fields" />)
      return;
    }

    if (staffWarning?.length <= 0 || staffManageable?.length <= 0 || staffDanger?.length <= 0) {
      toast.custom(<ToastUI error={true} message="Each Threshold needs to have at least one email to notify." />)
      return;
    }

    const data = {...formData, selectedManageable: staffManageable, selectedWarning: staffWarning, selectedDanger: staffDanger};

    mutation.mutate({
      url: GET_CREATE_RULES,
      payload_data: data,
      token: token,
      authenticate: true
    });
    return;
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
                Create Rule
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
                  Rule Description
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="rule_description"
                    type="text"
                    id="default-0"
                    placeholder="Rule Description"
                    onChange={handleChange}
                    
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" className="form-label">
                  Rule Condition
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="rule_condition" id="default-4" onChange={handleChange}>
                      <option value="">Rule Condition</option>
                      <option value="exceeded daily limit">Exceeded Daily Limit</option>
                      <option value="exceeded account daily limit">Exceeded Daily Transfer Limit on Account</option>
                      <option value="exceeded card daily limit">Exceeded Daily Withdrwal Limit on Card</option>
                      <option value="flag duplicate transaction">Flag Duplicate Transaction</option>
                      <option value="exceeded limit">Exceeded Limit</option>
                      <option value="exceeded balance">Exceeded Balance</option>
                      <option value="exceeded single transaction limit">Exceeded Single Transaction Limit</option>
                      <option value="exceeded number of daily transaction on card">
                        Exceeded Number of Daily Transactions on Card
                      </option>
                      <option value="exceeded number of daily transaction on account">
                        Exceeded Number of Daily Transactions on Account
                      </option>
                      <option value="exceeded number of daily transaction">
                        Exceeded Number of Daily Transactions
                      </option>
                      <option value="transaction time">Transaction Time</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="product" className="form-label">
                  Product
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="product" id="default-4" onChange={handleChange}>
                      <option value="">Rule Product</option>
                      <option value="AIRTIME_VTU">Airtime V.T.U</option>
                      <option value="CABLE_RECHARGE">Cable Recharge</option>
                      <option value="DATA_RECHARGE">Data Recharge</option>
                      <option value="ELECTRICITY_RECHARGE">Electricity</option>
                      <option value="TRANSFER">Transfer</option>
                      <option value="WITHDRAWAL">Withdrawal</option>
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  
                  { formData?.rule_condition == 'transaction time' ? 'Start Time' : 'Rule Value' }
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="rule_value"
                    type={ formData?.rule_condition == 'transaction time' ? 'time' : 'text' }
                    id="default-0"
                    placeholder="Rule Value"
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
            </Col>
            {
              (formData?.rule_condition == "transaction time") && (
                <>      
                  <Col sm="6">
                    <FormGroup>
                      <Label htmlFor="default-0" className="form-label">
                        End Time
                      </Label>
                      <div className="form-control-wrap">
                        <input className="form-control" name="rule_value2" type="time" id="default-0" placeholder="End Time" onChange={handleChange} />
                      </div>
                    </FormGroup>
                  </Col>   
                </>
              )
            }
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Manageable Setup{" "}
          </OverlineTitle>
          <Row className="gy-4">
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Manageable Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input
                    className="form-control"
                    name="manageable_level"
                    type="text"
                    id="default-0"
                    placeholder="Value"
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-4" name="manageable_action" className="form-label">
                  Action to take (This field is Optional)
                </Label>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input type="select" name="manageable_action" id="default-4" onChange={handleChange}>
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
                  <ReactDualList options={adminOptions} canFilter={false} preSelected={staffManageable} setValues={setManageableValues} />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Warning Setup{" "}
          </OverlineTitle>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Warning Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input className="form-control" name="warning_level" type="text" id="default-0" placeholder="Value" onChange={handleChange}  />
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
                    <Input type="select" name="warning_action" id="default-4" onChange={handleChange}>
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
                  <ReactDualList options={adminOptions} canFilter={false} preSelected={staffWarning} setValues={setWarningValues} />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <hr className="preview-hr"></hr>
          <OverlineTitle tag="span" className="preview-title-lg">
            {" "}
            Danger Setup{" "}
          </OverlineTitle>
          <Row className="gy-4">
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Danger Level
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input className="form-control" name="danger_level" type="text" id="default-0" placeholder="Value" onChange={handleChange}  />
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
                    <Input type="select" name="danger_action" id="default-4" onChange={handleChange}>
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
                  <ReactDualList options={adminOptions} canFilter={false} preSelected={staffDanger} setValues={setDangerValues} />
                </div>
              </FormGroup>
            </Col>
            <Col md="12">
            <FormGroup>
              {mutation?.isLoading ? (
                <Spinner color="primary" size="lg" /> 
              ) : (
                <Button color="primary" size="lg" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </FormGroup>
            </Col>
          </Row>
        </PreviewCard>
      </Content>
    </>
  );
};

export default CreateRule;
