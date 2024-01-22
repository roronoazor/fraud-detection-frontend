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
  Button,
  Col,
  BlockBetween,
  OverlineTitle,
  ReactDualList,
  EditDualList,
} from "../../components/Component";
import {
  FormGroup,
  Label,
  Input,
  Spinner,
  Row,
} from "reactstrap";
import { useHistory, useParams } from "react-router";
import { useMutation, useQuery } from "react-query";
import { postData, fetchData } from "../../modules/utilities/util_query";
import { GET_SPROUTPAY_ADMINS, EDIT_MERCHANT_MONITORING_METRIC } from "../../config/urls";
import ToastUI from "../components/common/ui-view/ToastUI";
import { handleApiError, handleApiSuccess } from "../../modules/utilities/responseHandlers";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAuthToken } from "../../modules/auth/redux/authSelector";


const MonitorMerchant = () => {

  const [formData, setFormData] = useState({});
  const [staffNotify, setStaffNotify] = useState([]);
  const [adminOptions, setAdminOptions] = useState([]);
  const history = useHistory();
  
  
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({...formData, [name]: value});
 }
  
 let payload_data = {};
 const token = useSelector(getAuthToken);
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

 const merchantResult = useQuery(
  [
    `${EDIT_MERCHANT_MONITORING_METRIC}`,
    {
      url: `${EDIT_MERCHANT_MONITORING_METRIC}`,
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
      let notification_emails = data?.notification_emails || [];
      
      // Mapping notification_emails to create staffNotify
      let staffNotify = notification_emails.map((rec) => ({ label: rec.email, value: rec.email }));
      
      setFormData(data);
      setStaffNotify(staffNotify);

      let updatedAdminOptions = adminOptions.filter(admin => 
        !staffNotify.some(notify => notify.value === admin.value));

      // const updatedAdmins = adminOptions.filter(admin => (notification_emails.map(rec => rec.email)).includes(admin.email))

      // setAdminOptions(updatedAdminOptions);
      setStaffNotify(staffNotify)
    },
    onError: (error) => {
      handleApiError(error, <ToastUI error />);
    },
  },
);

console.log("sN: ", staffNotify);
console.log("adminOptions: ", adminOptions);

const mutation = useMutation(postData, {
  onSuccess: (response) => {
    handleApiSuccess(response, <ToastUI success={true} message="Successful" />)
  },
  onError: (error) => {
      let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
      handleApiError(error, <ToastUI error={true} message={message} />);
  }
});   


 const handleSubmit = () => {

  const data = {
    ...formData,
    selectedEmails: staffNotify
  }

  mutation.mutate({
    url: EDIT_MERCHANT_MONITORING_METRIC,
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
                Merchant Monitoring Rule
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
                  Number of Days
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="no_of_days"
                    type="number"
                    id="default-0"
                    placeholder="Number of Days"
                    onChange={handleChange}
                    value={formData?.no_of_days}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Percentage Violation
                </Label>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-right">
                    <Icon name="percent" />
                  </div>
                  <input
                    className="form-control"
                    name="percentage_violation"
                    min="0"
                    max="100"
                    type="number"
                    id="default-0"
                    placeholder="Percentage Violation"
                    onChange={handleChange}
                    value={formData.percentage_violation}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Minimum Amount
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="minimum_amount"
                    type="number"
                    id="default-0"
                    placeholder="Minimum Amount"
                    onChange={handleChange}
                    value={formData.minimum_amount}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="default-0" className="form-label">
                  Sending Intervals in Hours
                </Label>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    name="sending_intervals"
                    type="number"
                    id="default-0"
                    placeholder="Sending Intervals"
                    onChange={handleChange}
                    value={formData?.sending_intervals}
                  />
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
                    <Input type="select" name="action" id="default-4" onChange={handleChange} value={formData?.action}>
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
                   <EditDualList 
                    options={adminOptions} 
                    canFilter={false} 
                    selected={staffNotify} 
                    setValues={setStaffNotify} 
                    />
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

export default MonitorMerchant;
