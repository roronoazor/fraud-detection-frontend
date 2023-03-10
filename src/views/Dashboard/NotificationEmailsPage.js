import React from 'react';
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
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Pagination";
import Filter from "components/Filter";
import { useQuery } from "react-query";
import { GET_BANKS } from '../../config/serverUrls';
import { fetchData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";
import ReactPaginate from 'react-paginate';
import { useHistory } from "react-router-dom";



const tableHeaders = [
    {
        id : 1,
        value: 'Name'
    },
    {
        id: 2,
        value: 'Email'
    },
    {
      id: 3,
      value: 'Action'
  }
];

function NotificationEmailRow(props) {
    const { user } = props;
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
                {user?.name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {user?.email}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Button colorScheme='teal' variant='outline' onClick={() => {alert('Oga show face!!!')}}>
                Click Here
              </Button>
            </Flex>
          </Flex>
        </Td>
      </Tr>
    );
  }

const NotificationEmailsPage = () => {


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
      <br />
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
             {`Emails (${formatCurrencyNumber(userCount)})`}
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
                      <NotificationEmailRow
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
    );
}


export default NotificationEmailsPage;