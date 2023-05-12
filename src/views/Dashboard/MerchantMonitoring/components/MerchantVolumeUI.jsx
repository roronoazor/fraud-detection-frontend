import {
    Box,
    Button,
    Flex,
    Stack,
    RadioGroup,
    Radio,
    SimpleGrid,
    FormControl,
    FormLabel,
    Spinner, 
    Center,
    Text,
    Input,
    Divider,
    ButtonGroup,
    Spacer,
    useColorModeValue,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import SingleBarChart from "components/SingleBarChart";


const MerchantVolumeUI = (props) => {

    const { 
      isLoading,
      merchantLimit=5,
      startDate,
      endDate,
      type='top',
      handleChange=()=>{}, 
      applyFilter=()=>{},
      count,
      amount,
      countLabel,
      amountLabel
    } = props;
    const textColor = useColorModeValue("gray.700", "white");
    
  
    return (
      <Box p='12px 0px'>
      <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
       {
        (isLoading) ? (
          <Center>
            <Spinner size='xl' />
          </Center>
        ) : (
          <>
            <CardHeader mb="2px" pl="22px">
            <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mr={6}>
                {`${ type.charAt(0).toUpperCase() + type.slice(1)} Merchants (From ${startDate} to ${endDate} )`}
              </Text>
              <Spacer />
              
              <RadioGroup name='type' onChange={(fValue) => { handleChange({target: { name: 'type', value: fValue }}) }} value={type}>
                <Stack direction='row'>
                  <Radio value='top'>Top</Radio>
                  <Radio value='bottom'>Bottom</Radio>
                </Stack>
              </RadioGroup>
              <FormControl  maxW="150px" marginX={2}>
                  <FormLabel textAlign="right">Merchant Limit</FormLabel>
                  <NumberInput name={'merchantLimit'} min={1} ml={2} value={merchantLimit} onChange={(fValue) => { handleChange({target: { name: 'merchantLimit', value: fValue }}) }}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl maxW="150px" marginX={2}>
                  <FormLabel>Start Date</FormLabel>
                  <Input 
                    type='date'
                    value={startDate}
                    name='startDate'
                    onChange={handleChange}
                  />
                </FormControl>
  
                <FormControl maxW="150px" mt={4} marginX={2}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                  type='date'
                  value={endDate}
                  name='endDate'
                  onChange={handleChange}
                  />
                </FormControl>
  
              <ButtonGroup gap='2'>
                <Button colorScheme='teal' onClick={applyFilter}>Apply</Button>
              </ButtonGroup>
            </Flex>
            </CardHeader>
            <Divider />
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
            <SingleBarChart 
              title={'Transaction Count'}
              totalTransactionSeries={count}
              transactionSeries={countLabel}
              ySeriesName={'Transaction Count'}
              />
            <SingleBarChart 
              title={'Transaction Volume'}
              totalTransactionSeries={amount}
              transactionSeries={amountLabel}
              ySeriesName={'Transaction Volume'}
            />
            </SimpleGrid>
            </>
        )
       }
      </Card>
    </Box>
    );
  }


export default MerchantVolumeUI;