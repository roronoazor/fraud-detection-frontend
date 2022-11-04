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
import Filter from "components/Filter";
import { useQuery } from "react-query";
import { GET_BANKS } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters } from "modules/utilities";

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
       fieldName: 'code',
       fieldType: 'text',
       isSelected: false,
       fieldQueryName: 'code',
       fieldValue: '',
     }, 
]


const tableHeaders = [
    {
        id : 1,
        value: 'name'
    },
    {
        id: 2,
        value: 'code'
    }
];

const tablesTableData = [
    {
        id: 1,
        name: 'United Bank of Africa',
        code : 'UBA'
    },
    {
        id: 2,
        name: 'Access Bank',
        code : 'Access'
    }
]

function BankRow(props) {
    const { bank } = props;
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
              >
                {bank.name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {bank.code}
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
    const [bankCount, setBankCount] = useState(0);
    const [banks, setBanks] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['banks',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_BANKS + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setBankCount(data?.count || 0);
                                setBanks(data?.results || []);
                              },
                              onError: (error) => {
                                handleApiError(error);
                              }
                            }
                            );
  const {  isLoading, isError, data, error, isFetching } = result;

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_BANKS + `?page=${page}`, filters);
      // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
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
        return { ...field, value };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
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
      />
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
             {`Banks (${bankCount})`}
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
                {banks.map((bank, index) => {
                    return (
                      <BankRow
                        key={index}
                        bank={bank}
                        />
                    );
                })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
