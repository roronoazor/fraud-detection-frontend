// Chakra imports
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  HStack,
  Input,
  Divider,
  ButtonGroup,
  Spacer,
  Center,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import PieCard from "components/PieCard";
import { GET_TRANSACTIONS_STATS, GET_TRANSACTION_RULE_BREAKDOWN } from '../../config/serverUrls';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { useQuery } from "react-query";
import { fetchData } from '../../modules/utilities/util_query';
import { 
  calculateSuspectedTransactionPercentage,
  getCurrentDateInput,
  firstLetterUpper
} from "modules/utilities";
import { handleApiError } from "modules/utilities/responseHandlers";
import StackedBarChart from "components/StackedBarChart";
import { Select } from "chakra-react-select";
import { useHistory } from "react-router-dom";


const today = getCurrentDateInput();


const TxnRulesBreakdownPage = (props) => {

    const textColor = useColorModeValue("gray.700", "white");
    // call the api that loads this data only once
    let payload_data = {};
    const token = useSelector(getAuthToken);
    const [rules, setRules] = useState([]);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
      startDate: today,
      endDate: today,
      selectedRules: [],
    });    
    const [endpoint, setEndpoint] = useState('');
    const history = useHistory();
    const transactionStat = useQuery(['transactions-stat',
          { 
            url: GET_TRANSACTIONS_STATS,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              const data = response?.data;
              let mRules = data?.rules_data || [];
              mRules = mRules.map((rule, index) => {
                return {value: rule.id, label: firstLetterUpper(`${rule?.description}(${(firstLetterUpper(rule?.product)).replaceAll("_", " ")})`)}
              })
              setRules(mRules);
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
    const fetchInfo = useQuery(['get-transaction-breakdown',
          { 
            url: endpoint,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              const { data } = response;
              setData(data?.data || []);
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
    const { isLoading } = fetchInfo;
    const onChange = (evt, option) => {

      if (option){
        const evtIds = evt.map(evt => evt?.value);
        setFilters({...filters, selectedRules: evtIds});
        return;
      }
      const { name, value  } = evt.target;
        if (name){
          setFilters({...filters, [name]: value});
          return;
        }
    }
    const applyFetchData = () => {
      const ids = filters?.selectedRules.join(',');
      setEndpoint(
        `${GET_TRANSACTION_RULE_BREAKDOWN}?startDate=${filters?.startDate}&endDate=${filters?.endDate}&selectedRules=${ids}`
      );
    } 

    const handleViewSuspectedTransactionsClick = (item) => {
      const { id: ruleId } = item?.rule;
      history.push(`/admin/transaction?ruleId=${ruleId}&start_date=${filters?.startDate}&end_date=${filters?.endDate}`);
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
              <Box>
                <HStack>
                  <Text as="b" sx={{ minWidth: '100px', maxWidth: '150px' }}>
                    Select Rule: 
                  </Text>
                  <div style={{minWidth: '600px'}}>
                    <Select
                      isMulti
                      onChange={(e) => onChange(e, 'multi')}
                      size="md"
                      useBasicStyles
                      name="rules"
                      options={rules}
                      placeholder="Select rules..."
                      closeMenuOnSelect={false}
                    />
                  </div>
                </HStack>
                </Box>
                <Box m="2">
                  <HStack>
                    <HStack>
                      <Text as="b" sx={{ minWidth: '90px' }}>Start Date: </Text>
                      <Input 
                        type='date'
                        name="startDate"
                        value={filters?.startDate}
                        onChange={onChange}
                      />
                    </HStack>

                    <HStack>
                      <Text as="b" sx={{ minWidth: '80px' }}>End Date: </Text>
                      <Input 
                        type='date' 
                        name='endDate'
                        onChange={onChange}
                        value={filters?.endDate}
                      />
                    </HStack>
                    
                    <ButtonGroup gap='2'>
                      <Button colorScheme='teal' onClick={applyFetchData}>Apply</Button>
                    </ButtonGroup>
                  </HStack>
                </Box>
            </Box>
          </Flex>
          <Box p='12px 0px'>
              {
                data.map((item, index)=>{

                  let suspectTransactions = item?.suspected_transaction || [];
                  let totalTransactions = item?.total_transaction || [];

                  let suspectedPercentage = calculateSuspectedTransactionPercentage(suspectTransactions, totalTransactions);
                  let clearedPercentage = (100 - suspectedPercentage);


                  let transactionSeries = [];
                  let suspectedTransactionSeries = [];
                  let totalTransactionSeries = [];

                  // create the series 
                  Object.keys(totalTransactions).map((txn_date, index) => {
                    transactionSeries.push(txn_date);
                    suspectedTransactionSeries.push((suspectTransactions.hasOwnProperty(txn_date) ? suspectTransactions[txn_date] : null));
                    totalTransactionSeries.push((totalTransactions.hasOwnProperty(txn_date) ? totalTransactions[txn_date] : 0));
                  });
                   
                  return (
                    <Card key={index} w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
                      <CardHeader mb="2px" pl="22px">
                          <Flex sx={{ width: '100%' }}>
                            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                            {`${item?.rule?.description}(${(firstLetterUpper(item?.rule?.product)).replaceAll("_", " ")})`}
                            </Text>
                            <Spacer />
                            {
                              (suspectedPercentage > 0) && (
                                <Button variant='outline' colorScheme="red" onClick={() => handleViewSuspectedTransactionsClick(item)}>View Suspected</Button>
                              )
                            }
                          </Flex>
                        </CardHeader>
                        <Divider />
                        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                          <PieCard 
                            title={'Overview'}
                            suspectedPercentage={suspectedPercentage}
                            clearedPercentage={clearedPercentage}
                           />
                          <StackedBarChart 
                            title={'Breakdown'}
                            suspectedTransactionSeries={suspectedTransactionSeries}
                            totalTransactionSeries={totalTransactionSeries}
                            transactionSeries={transactionSeries}
                          />
                        </SimpleGrid>
                    </Card>
                  )
                })  
              }
          </Box>
      </Flex>
    );
}


export default TxnRulesBreakdownPage;