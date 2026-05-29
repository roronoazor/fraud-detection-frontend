import React from 'react';
import JsonCard from '../../components/json-card';
// import { GiElectric, GiTakeMyMoney } from 'react-icons/gi';
// import { FcMoneyTransfer, FcCallTransfer } from 'react-icons/fc';
// import { CgData, CgScreen } from 'react-icons/cg';
// import { CheckCircleIcon, WarningTwoIcon, QuestionIcon } from '@chakra-ui/icons'; // Replace with equivalent icons from your icon library
import { formatCurrencyNumber } from '../../modules/utilities';
import { checkObject } from '../../modules/utilities';
import MonitoringComments from '../../components/monitoring-comments';
import { Icon } from '../../components/Component';
import { Badge } from "reactstrap";

export const TransactionDetailContent = (props) => {
    const { transaction } = props;
    let name = transaction?.wallet_details?.businessName || `${transaction?.wallet_details?.lastName} ${transaction?.wallet_details?.firstName}`;

    // Define icon size constants
    const BIG_ICON_SIZE = 28;
    const SMALL_ICON_SIZE = 6;

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Transaction Type</p>
                    { 'ELECTRICITY_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon name="bulb" style={{ fontSize: "40px" }} /><br />
                                    <samp>Electricity</samp>
                                    </>
                                    
                                )}
                    { 'WITHDRAWAL' == transaction.transaction_type && (
                                    <>
                                    <Icon name="propert-blank" style={{ fontSize: "40px" }} /><br />
                                    <samp>Withdrawal</samp>
                                    </>
                                )}
                    { 'TRANSFER' == transaction.transaction_type && (
                                    <>
                                    <Icon name="report-profit" style={{ fontSize: "40px" }} /> 
                                    <samp>Transfer</samp> 
                                    </>
                                )}
                                { 'AIRTIME_VTU' == transaction.transaction_type && (
                                    <>
                                    <Icon name="soundcloud" style={{ fontSize: "40px" }} /> 
                                    <samp>Airtime</samp> 
                                    </>
                                )}
                                { 'DATA_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon name="rss" style={{ fontSize: "40px" }} /> Data
                                    <samp>Data</samp> 
                                    </>
                                )}
                                { 'CABLE_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon name="network" style={{ fontSize: "40px" }} />
                                    <samp>Cable</samp> 
                                    </>
                                )}   
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Description</p>
                    <samp>{transaction?.description || '-'}</samp>
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Amount</p>
                    <samp>&#8358;{formatCurrencyNumber(transaction.amount)}</samp>
                </div>
            </div>



            <div className="row">
            <div className="col-md-3 text-center">
                    <p className="text-muted mb-1">Transaction Status</p>
                    {transaction?.transaction_status == 'successful' && 
                                            (
                                                <>
                                                <Badge pill color="success">
                Successful
              </Badge>
                                                </>
                                                
                                            )
                                            }
                                            {transaction?.transaction_status == 'pending' && 
                                            (
                                                <>
                                                <Badge pill color="warning">
                Pending
              </Badge>
                                                </>
                                            )
                                            }
                                            {transaction?.transaction_status == 'failed' && 
                                                (
                                                    <>
                                                    <Badge pill color="danger">
                                                    Failed
                                                  </Badge>
                                                  </>
                                                )
                                            }
                                            {transaction?.transaction_status == 'validation' && 
                                                (
                                                <>
                                                    <Badge pill color="secondary">
                Failed
              </Badge>
                                                </>
                                                )
                                            }

                </div>
                <div className="col-md-3 text-center">
                    <p className="text-muted mb-1">Payment Method</p>
                    {
                                            transaction?.payment_method == 'card' && (
                                                <>    
                                                    {/* <BsCreditCard2Front w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color="green.500" /> */}
                                                    <Icon name="cc" style={{ fontSize: "20px" }} /><br />
                                                    <samp>{transaction?.payment_method || '-'}</samp> 
                                                </>
                                            )
                                        }
                                        {
                                            transaction?.payment_method == 'cash' && (
                                                <>
                                                    <Icon name={"money"} style={{ fontSize: "20px" }}  /><br />
                                                    <samp>{transaction?.payment_method || '-'}</samp> 
                                                </>    
                                            )
                                        }
                </div>
                <div className="col-md-3 text-center">
                    <p className="text-muted mb-1">Account</p>
                    <samp> { transaction?.account || ' - ' }</samp>
                    
                </div>
                <div className="col-md-3 text-center">
                    <p className="text-muted mb-1">Account Type</p>
                    <samp>{ transaction?.account_type || '-' }</samp>

                </div>
            </div>

            <div className="row">
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Product</p>
                    <samp> { transaction?.product || ' - ' }</samp>
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Provider</p>
                    <samp> { transaction?.provider || ' - ' }</samp>
                    
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Provider Reference</p>
                    <samp>{ transaction?.provider_reference || '-' }</samp>

                </div>
            </div>

            <div className="row">
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Reference</p>
                    <samp> { transaction?.reference || ' - ' }</samp>
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Channel</p>
                    <samp> { transaction?.channel || ' - ' }</samp>
                    
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Wallet ID</p>
                    <samp>{transaction?.wallet_id ? `${transaction.wallet_id} - ${name}` : ' - '}</samp>

                </div>
            </div>

            <div className="row">
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Credit Status</p>
                    <samp>{ transaction?.credit_status != null ? transaction?.credit_status.toString() : ' - ' } </samp>
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Reversal</p>
                    <samp> { transaction?.reversal != null ? transaction?.reversal.toString() : ' - ' }</samp>
                </div>
                <div className="col-md-4 text-center">
                    <p className="text-muted mb-1">Monitoring Status</p>
                    <samp>{ transaction?.monitoring_status || ' - ' }</samp>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <MonitoringComments title={'MONITORING COMMENTS'} transaction={transaction} />
                </div>
            </div>

            {
                (!checkObject(transaction?.response || {})) && (
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <JsonCard title='API RESPONSE' response={transaction?.response} />
                        </div>
                    </div>
                )
            }

            {
                (!checkObject(transaction?.debit_response || {})) && (
                    <div className="row mt-4">
                        <div className="col-md-12 text-center">
                            <JsonCard title='DEBIT RESPONSE' response={transaction?.debit_response} />
                        </div>    
                    </div>  
                )
            }
            
        </div>
    );
};
