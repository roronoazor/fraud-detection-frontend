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
  


const UserMgt = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    

    return (
        <>
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                    <CardHeader p="6px 0px 22px 0px">
                    <Stack>
                        <Text fontSize="xl" color={textColor} fontWeight="bold">
                            {`Range`}
                        </Text>
                    </Stack>  
                    </CardHeader>
                    <CardBody>
                    </CardBody>
                </Card>
            </Flex>
        </>
    )
};


export default UserMgt;