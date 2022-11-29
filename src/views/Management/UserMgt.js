import React, { useState } from 'react';
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
    Checkbox,
    HStack,
    Button
  } from "@chakra-ui/react";
  // Custom components
  import Card from "components/Card/Card.js";
  import CardHeader from "components/Card/CardHeader.js";
  import CardBody from "components/Card/CardBody.js";
  import Pagination from "components/Pagination";
  import Filter from "components/Filter";
  import { useQuery, useMutation } from "react-query";
  import {  GET_USERS } from '../../config/serverUrls';
  import { fetchData, postData } from '../../modules/utilities/util_query';
  import { useSelector } from 'react-redux';
  import { getAuthToken } from "modules/auth/redux/authSelector";
  import { handleApiError } from "modules/utilities/responseHandlers";
  import { Spinner, Center } from '@chakra-ui/react'
  import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";


const fields = [
    {
        id: 1,
        fieldName: 'first name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'first_name',
        fieldValue: '',
     },
     {
        id: 2,
        fieldName: 'last name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'last_name',
        fieldValue: '',
     },
     {
        id: 3,
        fieldName: 'email',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'email',
        fieldValue: '',
     },
     {
        id: 4,
        fieldName: 'department',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'dept',
        fieldValue: '',
     }
]


const tableHeaders = [
    {
        id: 1,
        value: 'last name'
    },
    {
        id: 2,
        value: 'first name'
    },
    {
        id: 3,
        value: 'email'
    },
    {
        id: 4,
        value: 'dept'
    },
    {
        id: 5,
        value: 'status'
    },
    {
        id: 6,
        value: 'action'
    }
]

const users = [
    {
        id: 1,
        first_name: 'ugo',
        last_name: 'pascal',
        email: 'ugoodumegwu@gmail.com',
        dept: 'tech',
    },
    {
        id: 2,
        first_name: 'beyond',
        last_name: 'discomfort',
        email: 'discomfort@gmail.com',
        dept: 'tech',
    }
]


const UserRow = (props) => {

    const { user } = props;
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Tr>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Checkbox>
                    <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        minWidth="100%"
                    >
                        {user.email}
                    </Text>
                </Checkbox>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.first_name}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.last_name}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.dept}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.status}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Button colorScheme={'red'}>
                    Reset Password
                </Button>
              </Flex>
            </Flex>
          </Td>
        </Tr>
      );  
}


const UserMgt = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const [userCount, setUserCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['users',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_USERS + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setUserCount(data?.count || 0);
                                setUsers(data?.results || []);
                                setPageCount(data?.last_page || 1);
                                setPage(data?.page || 1);
                              },
                              onError: (error) => {
                                handleApiError(error);
                              }
                            }
                            );
    const mutation = useMutation(postData, {
      onSuccess: (response) => {
          toast.success("Success");
      },
      onError: (error) => {
          handleApiError(error);
      }
  });                  
  const {  isLoading } = result;

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_USERS + `?page=${page}`, filters);
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

  const handleSubmit = (actionType) => {



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
      <HStack direction={['column', 'row']} spacing='24px' m={2}>
        <Button 
        colorScheme="teal"
        isLoading={mutation?.isLoading}
        onClick={() => handleSubmit('activate')}
        >
            Activate
        </Button>
        <Button 
        colorScheme="yellow"
        isLoading={mutation?.isLoading}
        onClick={() => handleSubmit('deactivate')}
        >
            Deactivate
        </Button>
        <Button
         colorScheme={"red"}
         isLoading={mutation?.isLoading}
         onClick={() => handleSubmit('delete')}
         >
            Delete
        </Button>
      </HStack>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
             {`Users (${formatCurrencyNumber(userCount)})`}
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
                {users.map((user, index) => {
                    return (
                      <UserRow
                        key={index}
                        user={user}
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
  )
};


export default UserMgt;