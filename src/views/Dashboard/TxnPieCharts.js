// Chakra imports
import {
    Box,
    Button,
    Flex,
    Grid,
    Icon,
    Image,
    Portal,
    Progress,
    SimpleGrid,
    Heading,
    Stat,
    StatLabel,
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
    useColorModeValue
  } from "@chakra-ui/react";

  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { useSelector } from 'react-redux';
  import { useQuery } from "react-query";
  import { getAuthToken } from "modules/auth/redux/authSelector";
  import CardFooter from "components/Card/CardFooter";
  import BarChart from "components/Charts/BarChart";
  import LineChart from "components/Charts/LineChart";
  import IconBox from "components/Icons/IconBox";
  import { PersonIcon } from "components/Icons/Icons";
  
  // Custom icons
  import {
    CartIcon,
    DocumentIcon,
    GlobeIcon,
    RocketIcon,
    StatsIcon,
    WalletIcon,
  } from "components/Icons/Icons.js";
  import DashboardTableRow from "components/Tables/DashboardTableRow";
  import TimelineRow from "components/Tables/TimelineRow";
  import React, { useState } from "react";
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  import { timelineData } from "variables/general";
import { suspectedData } from "variables/general";
import { useHistory } from "react-router-dom";
import { pieChartData, pieChartOptions } from "variables/charts";
import PieCard from "components/PieCard";
import { 
  getCurrentDateInput,
  calculateSuspectedTransactionValuePercentage
} from "modules/utilities";
import { GET_TRANSACTION_TYPE_BREAKDOWN } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { firstLetterUpper, replaceUnderscores } from "modules/utilities";

const today = getCurrentDateInput();

const TxnPieCharts = (props) => {

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
              const { data } = response?.data;
              
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
          <Flex minWidth='max-content' bg="#fff" borderRadius="12px" p="20px 10px"  alignItems='center' gap='2'>
            <Box p='2'>
              <HStack spacing={8}>
                <HStack>
                  <Text as="b" sx={{ minWidth: '90px' }}>Start Date: </Text>
                  <Input 
                    type='date'
                    value={filters?.startDate}
                    name='startDate'
                    onChange={onChange}
                  />
                </HStack>

                <HStack>
                  <Text as="b" sx={{ minWidth: '90px' }}>End Date: </Text>
                  <Input
                   type='date'
                   value={filters?.endDate}
                   name='endDate'
                   onChange={onChange}
                  />
                </HStack>
              </HStack>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
              <Button colorScheme='teal' onClick={applyFetchData}>Apply</Button>
            </ButtonGroup>
          </Flex>
          <Box p='12px 0px'>
            <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
             <CardHeader mb="2px" pl="22px">
                <Flex direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                    Transfer & Withdrawal
                  </Text>
                </Flex>
              </CardHeader>
              <Divider />
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                <PieCard
                 title={'Transfers'}
                 suspectedPercentage={calculateSuspectedTransactionValuePercentage(transferTxn?.suspected_transactions, transferTxn?.total_transactions)}
                 clearedPercentage={100 - (calculateSuspectedTransactionValuePercentage(transferTxn?.suspected_transactions, transferTxn?.total_transactions))}
                />
                <PieCard 
                  title={'Withdrawals'} 
                  suspectedPercentage={calculateSuspectedTransactionValuePercentage(withdrawTxn?.suspected_transactions, withdrawTxn?.total_transactions)}
                  clearedPercentage={100 - (calculateSuspectedTransactionValuePercentage(withdrawTxn?.suspected_transactions, withdrawTxn?.total_transactions))}
                />
              </SimpleGrid>
            </Card>
          </Box>
          <Box p='6px 0px'>
            <Card w='100%' p="28px 2px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
              <CardHeader mb="20px" pl="22px">
                <Flex direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                    Value Added Services(V.A.S)
                  </Text>
                </Flex>
              </CardHeader>
              <Divider />
            <CardBody>
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px">
                {vasTxn.map(vas => {

                  return (
                    <>
                      <PieCard 
                        title={replaceUnderscores(firstLetterUpper(vas?.transaction_type || ''))}
                        suspectedPercentage={calculateSuspectedTransactionValuePercentage(vas?.suspected_transactions, vas?.total_transactions)}
                        clearedPercentage={100 - (calculateSuspectedTransactionValuePercentage(vas?.suspected_transactions, vas?.total_transactions))}
                      />
                    </>
                  )
                })}
              </SimpleGrid>
            </CardBody>
            </Card>
          </Box>
      </Flex>
    );
}


export default TxnPieCharts;