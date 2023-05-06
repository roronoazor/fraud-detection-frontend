// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import ApexBarChart from "components/Charts/ApexBarChart";
import React from "react";

export default function StackedBarChart(props) {
  const { 
    title,
    totalTransactionSeries,
    suspectedTransactionSeries,
    transactionSeries,
    ...rest
  } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");


  return (
    <Card p='20px' align='center' direction='column' w='100%' {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          { title || '' }
        </Text>
      </Flex>
      <ApexBarChart
        totalTransactionSeries={totalTransactionSeries}
        suspectedTransactionSeries={suspectedTransactionSeries}
        transactionSeries={transactionSeries}
      />
      
    </Card>
  );
}