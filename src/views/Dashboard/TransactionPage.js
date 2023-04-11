import React, { useState } from "react";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Select,
  Box,
  Button,
  Stack
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Pagination";
import Filter from "components/Filter";
import { useQuery } from "react-query";
import {  GET_TRANSACTIONS, GET_TRANSACTIONS_STATS } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";
import { 
  CheckCircleIcon,
  WarningTwoIcon,
  QuestionIcon
 } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { CgData, CgScreen } from 'react-icons/cg';
import { GiElectric, GiTakeMyMoney } from 'react-icons/gi';
import { FcMoneyTransfer, FcCallTransfer } from 'react-icons/fc';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { TransactionDetailContent } from "./TransactionDetailContent";
import { useLocation } from "react-router-dom";


export const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const fields = [
    {
        id: 1,
        fieldName: 'merchant name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'merchant_name',
        fieldValue: '',
     },
     {
        id: 2,
        fieldName: 'merchant id',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'merchant_id',
        fieldValue: '',
     },
     {
      id: 3,
      fieldName: 'range', 
      fieldType: 'select',
      isSelected: false,
      fieldQueryName: 'range',
      children:[
        {
          id: 1,
          name: 'today',
          value: 'today'
        },
        {
          id: 2,
          name: 'last 30 days',
          value: 'l30'
        },
        {
          id: 3,
          name: 'all time',
          value: 'all_time'
        },
        {
          id: 4,
          name: 'all',
          value: 'all'
        },
      ],
      fieldValue: '',
   },
   {
    id: 4,
    fieldName: 'created at', 
    fieldType: 'date',
    isSelected: false,
    fieldQueryName: 'created',
    fieldValue: '',
 },
 {
  id: 5,
  fieldName: 'monitoring status', 
  fieldType: 'select',
  isSelected: false,
  fieldQueryName: 'monitoring_status',
  children: [
    {
      id: 1,
      name: 'Suspected',
      value: 'Suspected'
    },
    {
      id: 2,
      name: 'Cleared',
      value: 'Cleared'
    },
  ],
  fieldValue: '',
},
{
  id: 6,
  fieldName: 'PAN', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'pan',
  fieldValue: '',
},
{
  id: 7,
  fieldName: 'Provider', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'provider',
  fieldValue: '',
},
{
  id: 8,
  fieldName: 'Merchant Name', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'merchant_name',
  fieldValue: '',
},
{
  id: 9,
  fieldName: 'Merchant ID', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'merchant_id',
  fieldValue: '',
},
{
  id: 10,
  fieldName: 'Terminal ID', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'terminal_id',
  fieldValue: '',
},
{
  id: 11,
  fieldName: 'RRN', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'rrn_transaction',
  fieldValue: '',
},
{
  id: 11,
  fieldName: 'Transaction Reference', 
  fieldType: 'text',
  isSelected: false,
  fieldQueryName: 'transaction_reference',
  fieldValue: '',
},
]


const tableHeaders = [
    {
        id : 1,
        value: 'Transaction Type',
        range: 'all',
    },
    {
        id: 2,
        value: 'Transaction Amount',
    },
    {
        id: 3,
        value: 'Transaction Status'
    },
    {
        id: 4,
        value: 'Transaction Date'
    },
    {
        id: 4,
        value: 'View Details'
    },
    // {
    //     id: 5,
    //     value: 'today Withdrawal success value',
    //     range: 'today'
    // },
    // {
    //     id: 6,
    //     value: 'today Withdrawal failed volume',
    //     range: 'today'
    // },
    // {
    //     id: 7,
    //     value: 'today Withdrawal failed value',
    //     range: 'today'
    // },
    // {
    //     id: 8,
    //     value: 'last 30 days Withdrawal volume',
    //     range: 'l30'
    // },
    // {
    //     id: 9,
    //     value: 'last 30 days Withdrawal value (Naira)',
    //     range: 'l30'
    // },
    // {
    //     id: 10,
    //     value: 'last 30 days Withdrawal success volume',
    //     range: 'l30'
    // },
    // {
    //     id: 11,
    //     value: 'last 30 days Withdrawal success value (Naira)',
    //     range: 'l30'
    // },
    // {
    //     id: 12,
    //     value: 'last 30 days Withdrawal failed volume',
    //     range: 'l30'
    // },
    // {
    //     id: 13,
    //     value: 'last 30 days Withdrawal failed value (Naira)',
    //     range: 'l30'
    // },
    // {
    //     id: 14,
    //     value: 'all time Withdrawal volume',
    //     range: 'allTime'
    // },
    // {
    //     id: 15,
    //     value: 'all time Withdrawal value (Naira)',
    //     range: 'allTime',
    // },
    // {
    //     id: 16,
    //     value: 'all time Withdrawal success volume',
    //     range: 'allTime',
    // },
    // {
    //     id: 17,
    //     value: 'all time Withdrawal success value (Naira)',
    //     range: 'allTime',
    // },
    // {
    //     id: 18,
    //     value: 'all time Withdrawal failed volume',
    //     range: 'allTime',
    // },
    // {
    //     id: 19,
    //     value: 'all time Withdrawal failed value (Naira)',
    //     range: 'allTime',
    // },
    // {
    //     id : 20,
    //     value: 'Merchant Id',
    //     range: 'all',
    //   },
];


function TransactionRow(props) {

    const {  transaction, display, showDetails } = props;
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Tr>
        <Td minWidth={{ sm: "150px" }} pl="0px">
          <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
            <Flex direction="column">
            <Center>
                <Text
                    fontSize="md"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                    align='center'
                    // noOfLines={3}
                >
                  { 'ELECTRICITY_RECHARGE' == transaction.transaction_type && (
                    <>
                      <Icon as={GiElectric} w={6} h={6} color='orange.500' />
                      <Text>Electricity</Text>
                    </>
                  )}
                  { 'WITHDRAWAL' == transaction.transaction_type && (
                    <>
                      <Icon as={GiTakeMyMoney} w={6} h={6} color='green.500' />
                      <Text>Withdrawal</Text> 
                    </>
                  )}
                  { 'TRANSFER' == transaction.transaction_type && (
                    <>
                      <Icon as={FcMoneyTransfer} w={6} h={6} color='green.500' />
                      <Text>Transfer</Text> 
                    </>
                  )}
                  { 'AIRTIME_VTU' == transaction.transaction_type && (
                    <>
                      <Icon as={FcCallTransfer} w={6} h={6} color='green.500' />
                      <Text>Airtime</Text> 
                    </>
                  )}
                  { 'DATA_RECHARGE' == transaction.transaction_type && (
                    <>
                      <Icon as={CgData} w={6} h={6} color='green.500' />
                      <Text>Data</Text> 
                    </>
                  )}
                  { 'CABLE_RECHARGE' == transaction.transaction_type && (
                    <>
                      <Icon as={CgScreen} w={6} h={6} color='green.500' />
                      <Text>Cable</Text> 
                    </>
                  )}
                </Text>
              </Center>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
            <Flex direction="column">
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
                // noOfLines={3}
              >
                <span>&#8358;</span>{formatCurrencyNumber(transaction.amount)}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
            <Flex direction="column">
                <Center>
                    <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        minWidth="100%"
                        align='center'
                        // noOfLines={3}
                    >
                      {transaction?.transaction_status == 'successful' && 
                       (
                        <>
                          <CheckCircleIcon w={6} h={6} color="green.500" />
                          <Text>Successful</Text> 
                        </>
                        
                       )
                      }
                      {transaction?.transaction_status == 'pending' && 
                       (
                        <>
                          <QuestionIcon  w={6} h={6} color="orange.500" />
                          <Text>Pending</Text> 
                        </>
                       )
                      }
                      {transaction?.transaction_status == 'failed' && 
                        (
                          <>
                            <WarningTwoIcon w={6} h={6} color="red.500" />
                            <Text>Failed</Text> 
                          </>
                        )
                      }
                    </Text>
                </Center>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
            <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
                align='center'
                // noOfLines={3}
            >
                {new Date(transaction?.transaction_created_at).toLocaleDateString("en-US", dateOptions)}
            </Text>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
            <Button
            colorScheme='teal'
            onClick={()=>{showDetails(transaction)}}
            >
              View Details
            </Button>
          </Flex>
        </Td>
      </Tr>
    )

}

function Tables() {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const [transactionCount, setTransactionCount] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [transactionDetail, setTransactionDetail] = useState({});
    const location = useLocation();

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['transactions',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_TRANSACTIONS + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setTransactionCount(data?.count || 0);
                                setTransactions(data?.results || []);
                                setPageCount(data?.last_page || 1);
                                setPage(data?.page || 1);
                              },
                              onError: (error) => {
                                handleApiError(error);
                              }
                            }
                            );
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

              // build out the filter for comments
              const rulesChildren = (data?.rules_data || []).map((child, index) => {
                return ({
                  id: index, 
                  name: child.description, 
                  value: child.id
                })
              });
              const rulesFilter = {
                id: 99,
                fieldName: 'Rules', 
                fieldType: 'select',
                isSelected: false,
                fieldQueryName: 'monitoring_comments',
                children: rulesChildren,
                fieldValue: '',
              }

              setFilters([...filters, rulesFilter]);

            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  
  const {  isLoading } = result;

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_TRANSACTIONS + `?page=${page}`, filters);
      // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
  }

  const closeFilterBox = () => {
    setUrlWithFilters('');
    const closedFilters = filters.map(filter => {
      return {...filter, isSelected: false, fieldValue: ''}
    })
    setFilters(closedFilters);
  }

  const onItemSelected = (selectedField) => {
  
    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return {...field, isSelected: !field.isSelected};
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const handleChange = (event, selectedField) => {
    
    const { name, value } = event.target;
    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return { ...field, fieldValue: value };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const handlePageChange = (evt) => {
    
    const { selected } = evt;
    setPage(selected + 1);
    window.scrollTo(0, 0); // moves the compoent to the top of the page
  }

  const onClose = (evt) => {
    setIsOpen(false);
  };

  const showDetails = (transaction) => {
    setTransactionDetail(transaction);
    setIsOpen(true);
  }

  React.useEffect(() => {

    const params = new URLSearchParams(location.search);
    
    if (params.get("ruleId")){
      setUrlWithFilters(`${GET_TRANSACTIONS}?page=${page}&rule_id=${params.get('ruleId')}&start_date=${params.get('start_date')}&end_date=${params.get('end_date')}`);
    }
  }, []);


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
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Filter 
        fields={filters}
        onItemSelected={onItemSelected}
        fireOnSearch={fireOnSearch}
        handleChange={handleChange}
        closeFilterBox={closeFilterBox}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="85%">
          <ModalHeader>Transaction Details!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <p>Miss Thier Way!!!</p> */}
            <TransactionDetailContent transaction={transactionDetail} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
        <Stack>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
                {`Transactions Overview (${formatCurrencyNumber(transactionCount)})`}
            </Text>

        </Stack>  
        </CardHeader>
        <CardBody>
        <Box overflowX="scroll">  
          <Table size="sm" variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {
                    tableHeaders.map((header, index) => {

                        if (index == 0) {
                          return (
                            <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400">
                                {header.value}
                            </Th>
                          )
                        }else{
                          return (
                            <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400"  sx={{ textAlign: 'center' }}>
                             {header.value} { header.value == 'Transaction Amount' && (<><span>(</span><span>&#8358;</span><span>)</span></>) }
                            </Th>
                          ) 
                        }   
                    })
                }
              </Tr>
            </Thead>
            <Tbody>
                {transactions.map((transaction, index) => {
                    return (
                      <TransactionRow
                        key={index}
                        transaction={transaction}
                        showDetails={showDetails}
                        display
                        />
                    );
                })}
            </Tbody>
          </Table>
        </Box>
        </CardBody>
        <Center m={5}>
          <Pagination
              pageCount={pageCount}
              onPageChange={(e)=>{handlePageChange(e)}}
              forcePage={pageCount > 1 ? page - 1 : 1}
              renderOnZeroPageCount={null}
              activeClassName={'active'}
            />
          </Center>
      </Card>
      
    </Flex>
  );
}

export default Tables;
