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
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import { useSelector } from 'react-redux';
  import { useQuery } from "react-query";
  import { getAuthToken } from "modules/auth/redux/authSelector";

  import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PieCard from "components/PieCard";
import { 
  getCurrentDateInput,
  calculateSuspectedTransactionValuePercentage
} from "modules/utilities";
import { GET_TRANSACTION_TYPE_BREAKDOWN } from '../../../config/serverUrls';
import { fetchData } from '../../../modules/utilities/util_query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { firstLetterUpper, replaceUnderscores } from "modules/utilities";
import SingleBarChart from "components/SingleBarChart";
import StackedLineChart from "components/StackedLineChart";

const today = getCurrentDateInput();


const MerchantMonitoringChart = (props) => {

  const { 
    isLoading,
    merchantLimit=5,
    noOfDays=7,
    type='top',
    handleChange=()=>{}
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const seriesState = [{
    name: 'Total Txn',
    data: []
  }
]

  return (
    <Box p='12px 0px'>
    <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
     {
      (isLoading) ? (
        <Center>
          <Spinner size='xl' />
        </Center>
      ) : (
        <>
          <CardHeader mb="2px" pl="22px">
          <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
            <Text fontSize="lg" color={textColor} fontWeight="bold" mr={6}>
              {`${ type.charAt(0).toUpperCase() + type.slice(1)} Merchants (Last ${noOfDays} days)`}
            </Text>
            <Spacer />
            
            <RadioGroup name='type' onChange={handleChange} value={type}>
              <Stack direction='row'>
                <Radio value='top'>Top</Radio>
                <Radio value='bottom'>Bottom</Radio>
              </Stack>
            </RadioGroup>
            <FormControl  maxW="150px" marginX={2}>
                <FormLabel textAlign="right">Merchant Limit</FormLabel>
                <NumberInput name={'merchantLimit'} min={1} ml={2} value={merchantLimit} onChange={handleChange}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl maxW="150px" marginX={2}>
                <FormLabel>Start Date</FormLabel>
                <Input 
                  type='date'
                  //value={filters?.startDate}
                  name='startDate'
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl maxW="150px" mt={4} marginX={2}>
                <FormLabel>End Date</FormLabel>
                <Input
                type='date'
                //value={filters?.endDate}
                name='endDate'
                onChange={handleChange}
                />
              </FormControl>

            <ButtonGroup gap='2'>
              <Button colorScheme='teal' onClick={()=>{}}>Apply</Button>
            </ButtonGroup>
          </Flex>
          </CardHeader>
          <Divider />
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
          <SingleBarChart 
            title={'Transaction Volume'}
            totalTransactionSeries={[15, 25, 30]}
            transactionSeries={['A', 'B', 'C']}
            ySeriesName={'Transaction Count'}
            />
          <SingleBarChart 
            title={'Transaction Volume'}
            totalTransactionSeries={[15, 25, 30]}
            transactionSeries={['A', 'B', 'C']}
            ySeriesName={'Transaction Volume'}
          />
          </SimpleGrid>
          </>
      )
     }
    </Card>
  </Box>
  );
}


const MerchantTrendChart = (props) => {

  const { 
    isLoading,
    merchantLimit=5,
    noOfDays=7,
    type='top',
    handleChange=()=>{}
  } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const seriesState = [{
    name: 'Total Txn',
    data: []
  }
]

  return (
    <Box p='12px 0px'>
    <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
     {
      (isLoading) ? (
        <Center>
          <Spinner size='xl' />
        </Center>
      ) : (
        <>
          <CardHeader mb="2px" pl="22px">
          <VStack alignItems={'flex-start'} sx={{ width: '100%'}}>
            <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mr={6}>
                {`Merchant Trends`}
              </Text>
              <Spacer />
                <FormControl maxW="150px" marginX={2}>
                  <FormLabel>Start Date</FormLabel>
                  <Input 
                    type='date'
                    //value={filters?.startDate}
                    name='startDate'
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt={4} maxW="150px" marginX={2}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                  type='date'
                  //value={filters?.endDate}
                  name='endDate'
                  onChange={handleChange}
                  />
                </FormControl>
            </Flex>
            <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
              <div style={{width: '100%', marginRight: '1%'}}>
                <Select
                  isMulti
                  onChange={(e) => {}}
                  size="md"
                  useBasicStyles
                  name="merchants"
                  options={[]}
                  placeholder="Select merchants..."
                  closeMenuOnSelect={false}
                />
              </div>
              <Spacer />
              <ButtonGroup gap='2'>
                <Button colorScheme='teal' onClick={()=>{}}>Apply</Button>
              </ButtonGroup>
            </Flex>
          </VStack>
          </CardHeader>
          <Divider />
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
            <StackedLineChart 
              ySeriesName="Tranaction Count"
            />
            <StackedLineChart
              ySeriesName="Transaction Volume"
            />
          </SimpleGrid>
          </>
      )
     }
    </Card>
  </Box>
  );
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
          <MerchantMonitoringChart />
          <MerchantTrendChart />
          <Box p='12px 0px'>
            <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
             <CardHeader mb="2px" pl="22px">
                <Flex direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                    Agency Banking
                  </Text>
                </Flex>
              </CardHeader>
              <Divider />
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                <PieCard
                 title={'Transfers'}
                 suspectedPercentage={calculateSuspectedTransactionValuePercentage(transferTxn?.suspected_transactions, transferTxn?.total_transactions)}
                 clearedPercentage={100 - (calculateSuspectedTransactionValuePercentage(transferTxn?.suspected_transactions, transferTxn?.total_transactions))}
                 handleViewSuspectedTransactionsClick={() => handleViewSuspectedTransactionsClick('transfer')}
                />
                <PieCard 
                  title={'Withdrawals'} 
                  suspectedPercentage={calculateSuspectedTransactionValuePercentage(withdrawTxn?.suspected_transactions, withdrawTxn?.total_transactions)}
                  clearedPercentage={100 - (calculateSuspectedTransactionValuePercentage(withdrawTxn?.suspected_transactions, withdrawTxn?.total_transactions))}
                  handleViewSuspectedTransactionsClick={() => handleViewSuspectedTransactionsClick('withdrawal')}
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
                        handleViewSuspectedTransactionsClick={() => handleViewSuspectedTransactionsClick((vas?.transaction_type || ''))}
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


export default MerchantTransactionTrendPage;