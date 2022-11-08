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
  Stack
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Pagination";
import Filter from "components/Filter";
import { useQuery } from "react-query";
import {  GET_BANK_SUMMARIES } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";



const fields = [
    {
        id: 1,
        fieldName: 'bank',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'bank',
        fieldValue: '',
     },
     {
      id: 2,
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
    id: 3,
    fieldName: 'created_at', 
    fieldType: 'date',
    isSelected: false,
    fieldQueryName: 'created',
    fieldValue: '',
 }
]


const tableHeaders = [
    {
        id : 1,
        value: 'Bank',
        range: 'all',
    },
    {
        id: 2,
        value: 'today transaction volume',
        range: 'today'
    },
    {
        id: 3,
        value: 'today transaction value (Naira)',
        range: 'today'
    },
    {
        id: 4,
        value: 'today transaction success volume',
        range: 'today'
    },
    {
        id: 5,
        value: 'today transaction success value',
        range: 'today'
    },
    {
        id: 6,
        value: 'today transaction failed volume',
        range: 'today'
    },
    {
        id: 7,
        value: 'today transaction failed value',
        range: 'today'
    },
    {
        id: 8,
        value: 'last 30 days transaction volume',
        range: 'l30'
    },
    {
        id: 9,
        value: 'last 30 days transaction value (Naira)',
        range: 'l30'
    },
    {
        id: 10,
        value: 'last 30 days transaction success volume',
        range: 'l30'
    },
    {
        id: 11,
        value: 'last 30 days transaction success value (Naira)',
        range: 'l30'
    },
    {
        id: 12,
        value: 'last 30 days transaction failed volume',
        range: 'l30'
    },
    {
        id: 13,
        value: 'last 30 days transaction failed value (Naira)',
        range: 'l30'
    },
    {
        id: 14,
        value: 'all time transaction volume',
        range: 'allTime'
    },
    {
        id: 15,
        value: 'all time transaction value (Naira)',
        range: 'allTime',
    },
    {
        id: 16,
        value: 'all time transaction success volume',
        range: 'allTime',
    },
    {
        id: 17,
        value: 'all time transaction success value (Naira)',
        range: 'allTime',
    },
    {
        id: 18,
        value: 'all time transaction failed volume',
        range: 'allTime',
    },
    {
        id: 19,
        value: 'all time transaction failed value (Naira)',
        range: 'allTime',
    },
];

function BankSummaryRow(props) {
    const { bankSummary, range } = props;
    const textColor = useColorModeValue("gray.700", "white");
    return (
      <Tr>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
                // noOfLines={3}
              >
                {bankSummary.bank}
              </Text>
            </Flex>
          </Flex>
        </Td>
        {/** Today  */}
        {
            (range == 'today' || range == 'all') && (
                <>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.today_vol)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {formatCurrencyNumber(bankSummary?.today_val)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.today_vol_success)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {formatCurrencyNumber(bankSummary?.today_val_success)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {formatCurrencyNumber(bankSummary?.today_val_failed)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                        <Flex direction="column">
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        {formatCurrencyNumber(bankSummary?.today_val_failed)}
                        </Text>
                        </Flex>
                    </Flex>
                    </Td>        
                </>
            )
        }

        
        {/** Last 30 days  */}
        {
            (range == 'l30' || range == 'all') && (
                <>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {formatCurrencyNumber(bankSummary?.txn_vol_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_val_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {formatCurrencyNumber(bankSummary?.txn_vol_success_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_val_success_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_vol_failed_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_vol_failed_l30)}
                            </Text>
                            </Flex>
                        </Flex>
                    </Td>
                </>
            )
        }
      
        {/** All time columns  */}
        {
             (range == 'allTime' || range == 'all') && (
                <>
                    <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {formatCurrencyNumber(bankSummary?.txn_vol_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_val_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                {formatCurrencyNumber(bankSummary?.txn_vol_success_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_val_success_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_vol_failed_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                        </Td>
                        <Td minWidth={{ sm: "250px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {formatCurrencyNumber(bankSummary?.txn_val_failed_alltime)}
                            </Text>
                            </Flex>
                        </Flex>
                    </Td>
                </>
             )
        }
     
      </Tr>
    );
  }


function Tables() {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const [bankSummaryCount, setBankSummaryCount] = useState(0);
    const [bankSummaries, setBankSummaries] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");
    const [range, setRange] = useState('today');

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['bankSummary',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_BANK_SUMMARIES + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setBankSummaryCount(data?.count || 0);
                                setBankSummaries(data?.results || []);
                                setPageCount(data?.last_page || 1);
                                setPage(data?.page || 1);
                              },
                              onError: (error) => {
                                handleApiError(error);
                              }
                            }
                            );
  const {  isLoading } = result;

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_BANK_SUMMARIES + `?page=${page}`, filters);
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
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
        <Stack>
            <Text fontSize="xl" color={textColor} fontWeight="bold">
                {`Bank Summary (${formatCurrencyNumber(bankSummaryCount)})`}
            </Text>
            <Text fontSize="md" color={textColor} fontWeight="bold">
                {`Range`}
            </Text>
            <Box>
                <Select 
                    placeholder='Select Range' 
                    onChange={(e) => { setRange(e.target.value || 'all') }}
                    >
                    <option value='today'>Today</option>
                    <option value='l30'>Last 30 days</option>
                    <option value='allTime'>All time</option>
                    <option value='all'>All</option>
                </Select>
            </Box>
        </Stack>  
        </CardHeader>
        <CardBody>
        <Box overflowX="scroll">  
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {
                    tableHeaders.map((header, index) => {

                        if (header.range == 'all' || header.range == range || range == 'all'){
                          return (
                              <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400">
                                  {header.value}
                              </Th>
                          )
                        }
                        
                    })
                }
              </Tr>
            </Thead>
            <Tbody>
                {bankSummaries.map((bankSummary, index) => {
                    return (
                      <BankSummaryRow
                        key={index}
                        bankSummary={bankSummary}
                        range={range}
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
