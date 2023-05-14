

import {
    Box,
    Button,
    Flex,
    Stack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Spinner, 
    Center,
    RadioGroup,
    Radio,
    Text,
    Input,
    Divider,
    ButtonGroup,
    Spacer,
    VStack,
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
import StackedPieChart from "components/StackedPieChart";


const MerchantActivityPieChartUI = (props) => {
    const { 
      isLoading,
      handleChange=()=>{},
      startDate,
      endDate,
      applyFilter, 
      amountSeries, 
      amountLabel,
      countSeries,
      countLabel,
      type='top',
      merchantLimit=5,
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
            <VStack alignItems={'flex-start'} sx={{ width: '100%'}}>
              <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
                <Text fontSize="lg" color={textColor} fontWeight="bold" mr={6}>
                  {`Merchant Activity (From ${startDate} to ${endDate})`}
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
                  <FormControl mt={4} maxW="150px" marginX={2}>
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
            </VStack>
            </CardHeader>
            <Divider />
            <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} spacing="24px">
              <StackedPieChart 
                title={'Transaction Count'}
                series={countSeries}
                labels={countLabel}
              />
              <StackedPieChart
                title={'Transaction Amount'}
                series={amountSeries}
                labels={amountLabel}
              />
            </SimpleGrid>
            </>
        )
       }
      </Card>
    </Box>
    );
  }

export default MerchantActivityPieChartUI ;