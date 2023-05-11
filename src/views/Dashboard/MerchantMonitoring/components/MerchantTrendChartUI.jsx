import {
    Box,
    Button,
    Flex,
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
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";
import { Select } from "chakra-react-select";
import StackedLineChart from "components/StackedLineChart";

const MerchantTrendChartUI = (props) => {

    const { 
      isLoading,
      startDate,
      endDate,
      handleChange=()=>{},
      applyFilter=()=>{},
      merchants=[],
      countSeries=[],
      amountSeries=[],
      xSeries=[],
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
                  {`Merchant Trends`}
                </Text>
                <Spacer />
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
              </Flex>
              <Flex direction="row" alignItems="flex-end" mb={6} sx={{ width: '100%'}}>
                <div style={{width: '100%', marginRight: '1%'}}>
                  <Select
                    isMulti
                    onChange={(e) => {handleChange(e, 'multi')}}
                    size="md"
                    useBasicStyles
                    name="merchants"
                    options={merchants}
                    placeholder="Select merchants..."
                    closeMenuOnSelect={false}
                  />
                </div>
                <Spacer />
                <ButtonGroup gap='2'>
                  <Button colorScheme='teal' onClick={applyFilter}>Apply</Button>
                </ButtonGroup>
              </Flex>
            </VStack>
            </CardHeader>
            <Divider />
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
              <StackedLineChart 
                ySeriesName="Transaction Count"
                title="Transaction Count"
                ySeries={countSeries}
                xSeries={xSeries}
              />
              <StackedLineChart
                ySeriesName="Transaction Volume"
                title="Transaction Volume"
                ySeries={amountSeries}
                xSeries={xSeries}
              />
            </SimpleGrid>
            </>
        )
       }
      </Card>
    </Box>
    );
  }
  

export default MerchantTrendChartUI;