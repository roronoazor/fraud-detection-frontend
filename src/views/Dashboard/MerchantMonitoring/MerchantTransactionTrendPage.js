import {
    Box,
    Button,
    Flex,
    Stack,
    RadioGroup,
    Radio,
    Grid,
    Icon,
    Image,
    Portal,
    Progress,
    SimpleGrid,
    Heading,
    Stat,
    Select,
    FormControl,
    FormLabel,
    Spinner, 
    Center,
    Text,
    HStack,
    Input,
    Divider,
    ButtonGroup,
    Spacer,
    useColorModeValue,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack,
  } from "@chakra-ui/react";
  import { useSelector } from 'react-redux';
  import { useQuery } from "react-query";
  import { getAuthToken } from "modules/auth/redux/authSelector";

  import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
  getCurrentDateInput
} from "modules/utilities";
import { 
  GET_TRANSACTION_TYPE_BREAKDOWN,
  GET_MERCHANT_VOLUMES_FOR_BAR_CHART,
  GET_MERCHANT_ACTIVITY_FOR_PIE_CHART,
  GET_MERCHANT_TREND_FOR_LINE_CHART,
  GET_MERCHANTS_USERS
} from '../../../config/serverUrls';
import { fetchData } from '../../../modules/utilities/util_query';
import { handleApiError } from "modules/utilities/responseHandlers";
import MerchantVolumeUI from "./components/MerchantVolumeUI";
import MerchantTrendChartUI from "./components/MerchantTrendChartUI";
import MerchantActivityPieChartUI from "./components/MerchantActivityUI";
import { buildQueryString } from "modules/utilities";

const today = getCurrentDateInput();

const getMerchantName = (merchant) => {

  if (merchant?.businessName) {
    return merchant?.businessName;
  }

  if (merchant?.username) {
    return merchant?.username;
  }

  if (merchant?.firstName) {
    return `${merchant?.firstName} ${merchant?.lastName}`
  }


  return 'N/A'
}

const orderMerchantsByLabel = (p_merchants) => {
  const sortedMerchants = [...p_merchants]; // Create a shallow copy of the original array

  sortedMerchants.sort((a, b) => {
    const labelA = a.label.toUpperCase(); // Convert labels to uppercase for case-insensitive sorting
    const labelB = b.label.toUpperCase();

    if (labelA < labelB) {
      return -1; // a should come before b
    }
    if (labelA > labelB) {
      return 1; // a should come after b
    }
    return 0; // a and b are equal in terms of sorting
  });

  return sortedMerchants;
};


const MerchantVolume = (props) => {

  const token = useSelector(getAuthToken);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const lastSevenDays = sevenDaysAgo.toISOString().split('T')[0];
  const [filters, setFilters] = useState({
    type: 'top',
    merchantLimit: 5,
    startDate: lastSevenDays,
    endDate: today,
  });
  const [urlWithFilters, setUrlWithFilters] = useState(buildQueryString(
    GET_MERCHANT_VOLUMES_FOR_BAR_CHART, filters
  ));
  const [count, setCount] = useState([]);
  const [countLabel, setCountLabel] = useState([]);
  const [amount, setAmount] = useState([]);
  const [amountLabel, setAmountLabel] = useState([]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
    ...prevFilters,
    [name]: value,
    }));
  };

  const applyFilter = () => {
    setUrlWithFilters(buildQueryString(
      GET_MERCHANT_VOLUMES_FOR_BAR_CHART,
      filters
    ));
  }

  const payload_data = {};
  const fetchInfo = useQuery(['get-merchant-volume',
          { 
            url: urlWithFilters,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data } = response;
              let { series_count, series_amount } = data;
              series_count = series_count || [];
              series_amount = series_amount || [];
              let seriesCount = series_count.length > 0 ? series_count[0] : {};
              let seriesAmount = series_amount.length > 0 ? series_amount[0] : {};

              let seriesCountData = seriesCount?.data;
              let seriesAmountData = seriesAmount?.data;

              let transactionCount = seriesCountData.map((d) => d?.transaction_count);
              let transactionAmount = seriesAmountData.map((d) => d?.transaction_amount);
              let transactionCountLabel = seriesCountData.map((d) => getMerchantName(d?.merchant));
              let transactionAmountLabel = seriesAmountData.map((d) => getMerchantName(d?.merchant));

              setCountLabel(transactionCountLabel);
              setCount(transactionCount);
              setAmountLabel(transactionAmountLabel);
              setAmount(transactionAmount);

            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  const { isLoading } = fetchInfo;


  return (<MerchantVolumeUI
      startDate={filters?.startDate}
      endDate={filters?.endDate}
      type={filters?.type}
      handleChange={handleChange}
      merchantLimit={filters?.merchantLimit}
      isLoading={isLoading}
      count={count}
      countLabel={countLabel}
      amount={amount}
      amountLabel={amountLabel}
      applyFilter={applyFilter}
    />
  )
}


const MerchantTrend = (props) => {

  const token = useSelector(getAuthToken);
  const [filters, setFilters] = useState({
    startDate: today,
    endDate: today,
    walletId: []
  });
  const [merchants, setMerchants] = useState([]);
  const [xSeries, setXSeries] = useState([]);
  const [yCount, setYCount] = useState([]);
  const [yAmount, setYAmount] = useState([]);
  const [merchantMap, setMerchantMap] = useState({});

  const handleChange = (event, type) => {
    if (type == 'multi') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        walletId: event,
        }));
      return;
    }
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
    ...prevFilters,
    [name]: value,
    }));
  };
  const payload_data = {};
  const merchantsInfo = useQuery(['get-merchants',
          { 
            url: GET_MERCHANTS_USERS,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data: responseData } = response;
              let { data, count} = responseData;
              let p_merchantMap = {};
              let p_merchants = data.map((p_merchant, index) => {
                p_merchantMap[p_merchant?.wallet_id] = p_merchant?.merchant_name;
                return {
                  value: p_merchant?.wallet_id,
                  label: p_merchant?.merchant_name,
                }
              });
              setMerchantMap(p_merchantMap);
              setMerchants(orderMerchantsByLabel(p_merchants));
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  const trendsInfo = useQuery(['get-merchants-trends',
          { 
            url: `${GET_MERCHANT_TREND_FOR_LINE_CHART}?walletId=${filters?.walletId?.map(obj => obj.value).join(',')}&startDate=${filters?.startDate}&endDate=${filters?.endDate}`,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data } = response;
              let p_xSeries = [];
              if (data?.length > 0) {
                p_xSeries = data[0]?.dates || [];
              }
              let p_yCount = data.map((d) => {
                
                let wallet_id = d?.wallet_id;
                return {
                  name: merchantMap[wallet_id],
                  data: d?.counts || []
                }
              })
              let p_yAmount = data.map((d) => {
                
                let wallet_id = d?.wallet_id;
                return {
                  name: merchantMap[wallet_id],
                  data: d?.amounts || []
                }
              })
              setXSeries(p_xSeries);
              setYCount(p_yCount);
              setYAmount(p_yAmount);
              
            },
            onError: (error) => {
              handleApiError(error);
            }, 
            enabled: false
          }
          );

  const applyFilter = () => {
    trendsInfo.refetch();
  }

  return (
    <MerchantTrendChartUI 
      isLoading={merchantsInfo?.isLoading || trendsInfo?.isLoading}
      startDate={filters?.startDate}
      endDate={filters?.endDate}
      handleChange={handleChange}
      applyFilter={applyFilter}
      merchants={merchants}
      xSeries={xSeries}
      countSeries={yCount}
      amountSeries={yAmount}
    />
  );
}


const MerchantActivity = (props) => {

  const token = useSelector(getAuthToken);
  const [merchants, setMerchants] = useState([]);
  const [merchantMap, setMerchantMap] = useState({});
  const [amountSeries, setAmountSeries] = useState([]);
  const [countSeries, setCountSeries] = useState([]);
  const [amountLabel, setAmountLabel] = useState([]);
  const [countLabel, setCountLabel] = useState([]);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const lastSevenDays = sevenDaysAgo.toISOString().split('T')[0];
  const [filters, setFilters] = useState({
    startDate: lastSevenDays,
    endDate: today,
    type: 'top', 
    merchantLimit: 5,
  });
  const [urlWithFilters, setUrlWithFilters] = useState(buildQueryString(
    GET_MERCHANT_ACTIVITY_FOR_PIE_CHART, filters
  ));
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
    ...prevFilters,
    [name]: value,
    }));
  };

  const applyFilter = () => {
    setUrlWithFilters(buildQueryString(
      GET_MERCHANT_ACTIVITY_FOR_PIE_CHART,
      filters
    ));
  }

  const payload_data = {};
  const merchantsInfo = useQuery(['get-merchants',
          { 
            url: GET_MERCHANTS_USERS,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data: responseData } = response;
              let { data, count} = responseData;
              let p_merchantMap = {};
              let p_merchants = data.map((p_merchant, index) => {
                p_merchantMap[p_merchant?.wallet_id] = p_merchant?.merchant_name;
                return {
                  value: p_merchant?.wallet_id,
                  label: p_merchant?.merchant_name,
                }
              });
              setMerchantMap(p_merchantMap);
              setMerchants(orderMerchantsByLabel(p_merchants));
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  const fetchInfo = useQuery(['get-merchant-activity',
          { 
            url: urlWithFilters,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data } = response;
              let { data: responseData } = data;

              const { activity_by_count, activity_by_amount } = responseData;
              // this is not optimal 
              activity_by_count.sort((a, b) => {
                if (filters?.type === 'top') {
                  return b.count - a.count; // Descending order
                } else if (filters?.type === 'bottom') {
                  return a.count - b.count; // Ascending order
                }
                return 0;
              });

              activity_by_amount.sort((a, b) => {
                if (filters?.type === 'top') {
                  return b.amount - a.amount; // Descending order
                } else if (filters?.type === 'bottom') {
                  return a.amount - b.amount; // Ascending order
                }
                return 0;
              });

              let cLabels = activity_by_count.map((d) => {
                if (merchantMap[d.wallet_id]) {
                  return merchantMap[d.wallet_id]
                }
                return 'N/A';
              });
              let cSeries = activity_by_count.map((d) => d.count);
              let aLabels = (activity_by_amount.map((d) => {
                if (merchantMap[d.wallet_id]) {
                  return merchantMap[d.wallet_id]
                }
                return 'N/A';
              }));
              let aSeries =activity_by_amount.map((d) => d.amount);

             
              let filteredCountData = cSeries.slice(0, filters?.merchantLimit);
              let filteredCountLabels = cLabels.slice(0, filters?.merchantLimit);
              let filteredAmountData = aSeries.slice(0, filters?.merchantLimit);
              let filteredAmountLabels = aLabels.slice(0, filters?.merchantLimit);
            
              console.log('xxy: ', filteredCountData, filteredCountLabels, filteredAmountData, filteredAmountLabels)

              // Calculate the sum of the remaining items
              const remainingCount = cSeries.slice(filters.merchantLimit).reduce((sum, count) => sum + count, 0);
              const remainingAmount = aSeries.slice(filters.merchantLimit).reduce((sum, amount) => sum + amount, 0);

              // Add the remaining items as 'Others' to the filtered data
              if (remainingCount > 0) {
                filteredCountData.push(remainingCount);
                filteredCountLabels.push('Others');
              }

              if (remainingAmount > 0) {
                filteredAmountData.push(remainingAmount);
                filteredAmountLabels.push('Others');
              }

              // Render the pie chart using filteredCountData, filteredCountLabels, filteredAmountData, filteredAmountLabels
              // ...
              setCountSeries(filteredCountData);
              setCountLabel(filteredCountLabels);
              setAmountSeries(filteredAmountData);
              setAmountLabel(filteredAmountLabels);

            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  const { isLoading } = fetchInfo;

  
  console.log('countSeries', countSeries);
  console.log('amountSeries', amountSeries);
  console.log('countLabel', countLabel);
  console.log('amountLabel', amountLabel);

  return (
    <MerchantActivityPieChartUI 
      isLoading={isLoading}
      handleChange={handleChange}
      applyFilter={applyFilter}
      startDate={filters?.startDate}
      endDate={filters?.endDate}
      amountSeries={amountSeries}
      amountLabel={amountLabel}
      countSeries={countSeries}
      countLabel={countLabel}
      type={filters?.type}
      merchantLimit={filters?.merchantLimit}
    />
  )
}




const MerchantTransactionTrendPage = (props) => {

    const textColor = useColorModeValue("gray.700", "white");

    const token = useSelector(getAuthToken);
    const [transferTxn, setTransferTxn] = useState({
      suspected_transactions: 0,
      total_transactions: 0
    });
    const [withdrawTxn, setWithdrawTxn] = useState({
      suspected_transactions: 0,
      total_transactions: 0
    });
    const [filters, setFilters] = useState({
      startDate: today,
      endDate: today,
    });    
    const [vasTxn, setVasTxn] = useState([]);
    const history = useHistory();
    let payload_data = {};
    const [urlWithFilters, setUrlWithFilters] = useState(GET_TRANSACTION_TYPE_BREAKDOWN);
    const fetchInfo = useQuery(['get-transaction-type-breakdown',
          { 
            url: urlWithFilters,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              let { data } = response?.data;
              

              let transferData = data.find(txn=>(txn?.transaction_type).toLowerCase()=='transfer');
              let withdrawData = data.find(txn=>(txn?.transaction_type).toLowerCase()=='withdrawal');
              setTransferTxn(transferData);
              setWithdrawTxn(withdrawData);
              let vasData = data.filter(txn => !['transfer', 'withdrawal'].includes(txn?.transaction_type?.toLowerCase()));
              
              setVasTxn(vasData);
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
    const { isLoading } = fetchInfo;
    const onChange = (evt) => {
      const { name, value  } = evt.target;
        if (name){
          setFilters({...filters, [name]: value});
          return;
        }
    }
    const applyFetchData = () => {
      setUrlWithFilters(
        `${GET_TRANSACTION_TYPE_BREAKDOWN}?startDate=${filters?.startDate}&endDate=${filters?.endDate}`
      );
    }
    
    const handleViewSuspectedTransactionsClick = (type) => {
        history.push(`/admin/transaction?productType=${type}&start_date=${filters?.startDate}&end_date=${filters?.endDate}`);
    };
    

   
    if (isLoading) {
      return (
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Center>
            <Spinner size='xl' />
          </Center>
        </Flex>
      )
    }

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
          <MerchantVolume />
          <MerchantTrend />
          <MerchantActivity />
      </Flex>
    );
}


export default MerchantTransactionTrendPage;