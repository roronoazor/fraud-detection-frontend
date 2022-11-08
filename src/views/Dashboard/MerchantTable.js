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
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Pagination";
import Filter from "components/Filter";
import { useQuery } from "react-query";
import {  GET_MERCHANTS } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";
import ReactPaginate from 'react-paginate';



const fields = [
    {
        id: 1,
        fieldName: 'name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'name',
        fieldValue: '',
     },
     {
       id: 2,
       fieldName: 'mid',
       fieldType: 'text',
       isSelected: false,
       fieldQueryName: 'mid',
       fieldValue: '',
     },
     {
        id: 3,
        fieldName: 'band',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'band',
        fieldValue: '',
      }, 
      {
        id: 4,
        fieldName: 'terminal count',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'terminal_count',
        fieldValue: '',
      }, 
      {
        id: 5,
        fieldName: 'top customer',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'top_customer',
        fieldValue: '',
      }, 
]


const tableHeaders = [
    {
        id : 1,
        value: 'Name'
    },
    {
        id: 2,
        value: 'Mid'
    },
    {
        id: 3,
        value: 'Band'
    },
    {
        id: 4,
        value: 'Terminal Count'
    },
    {
        id: 5,
        value: 'Top Customer'
    }
];


function MerchantRow(props) {
    const { merchant } = props;
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
                {merchant.name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {merchant.mid}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {merchant.band}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {merchant.terminal_count}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {merchant.top_customer}
              </Text>
            </Flex>
          </Flex>
        </Td>
      </Tr>
    );
  }


function Tables() {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const [merchantCount, setMerchantCount] = useState(0);
    const [merchants, setMerchants] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['merchants',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_MERCHANTS + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setMerchantCount(data?.count || 0);
                                setMerchants(data?.results || []);
                                setPageCount(data?.last_page || 1);
                                setPage(data?.page || 1);
                              },
                              onError: (error) => {
                                handleApiError(error);
                              }
                            }
                            );
  const {  isLoading, isError, data, error, isFetching } = result;

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_MERCHANTS + `?page=${page}`, filters);
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
          <Text fontSize="xl" color={textColor} fontWeight="bold">
             {`Merchants (${formatCurrencyNumber(merchantCount)})`}
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {
                    tableHeaders.map((header, index) => {
                        return (
                            <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400">
                                {header.value}
                            </Th>
                        )
                    })
                }
              </Tr>
            </Thead>
            <Tbody>
                {merchants.map((merchant, index) => {
                    return (
                      <MerchantRow
                        key={index}
                        merchant={merchant}
                        />
                    );
                })}
            </Tbody>
          </Table>
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
