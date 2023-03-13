import React from 'react';
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Divider,
  } from "@chakra-ui/react";
  
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import PieCard from "components/PieCard";
import StackedBarChart from "components/StackedBarChart";
  

const SingleRuleCard = (props) => {

    const { title } = props;

    return (
        <>
            <Box p='12px 0px'>
                <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
                <CardHeader mb="2px" pl="22px">
                    <Flex direction="column" alignSelf="flex-start">
                    <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                        { title || '' }
                    </Text>
                    </Flex>
                </CardHeader>
                <Divider />
                <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                    <PieCard title={'Transfers'} />
                    <StackedBarChart title={'Breakdown'}  />
                </SimpleGrid>
                </Card>
            </Box>
        </>
    );
}

export default SingleRuleCard;