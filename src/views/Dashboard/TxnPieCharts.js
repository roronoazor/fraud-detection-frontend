// Chakra imports
import {
    Box,
    Button,
    Flex,
    Grid,
    Icon,
    Image,
    Portal,
    Progress,
    SimpleGrid,
    Heading,
    Stat,
    StatLabel,
    FormControl,
    FormLabel,
    Text,
    HStack,
    Input,
    Divider,
    ButtonGroup,
    Spacer,
    useColorModeValue
  } from "@chakra-ui/react";

  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";
  import CardFooter from "components/Card/CardFooter";
  import BarChart from "components/Charts/BarChart";
  import LineChart from "components/Charts/LineChart";
  import IconBox from "components/Icons/IconBox";
  import { PersonIcon } from "components/Icons/Icons";
  
  // Custom icons
  import {
    CartIcon,
    DocumentIcon,
    GlobeIcon,
    RocketIcon,
    StatsIcon,
    WalletIcon,
  } from "components/Icons/Icons.js";
  import DashboardTableRow from "components/Tables/DashboardTableRow";
  import TimelineRow from "components/Tables/TimelineRow";
  import React, { useState } from "react";
  import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
  import { timelineData } from "variables/general";
import { suspectedData } from "variables/general";
import { useHistory } from "react-router-dom";
import { pieChartData, pieChartOptions } from "variables/charts";
import PieCard from "components/PieCard";



const TxnPieCharts = (props) => {

    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
          <Flex minWidth='max-content' bg="#fff" borderRadius="12px" p="20px 10px"  alignItems='center' gap='2'>
            {/* <Box p='2'>
              <Text>Filter by Date: </Text>
            </Box> */}
            <Box p='2'>
              <HStack spacing={8}>
                <HStack>
                  <Text as="b" sx={{ minWidth: '90px' }}>Start Date: </Text>
                  <Input type='date' />
                </HStack>

                <HStack>
                  <Text as="b" sx={{ minWidth: '90px' }}>End Date: </Text>
                  <Input type='date' />
                </HStack>
              </HStack>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
              <Button colorScheme='teal'>Apply</Button>
            </ButtonGroup>
          </Flex>
          <Box p='12px 0px'>
            <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
             <CardHeader mb="2px" pl="22px">
                <Flex direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                    Transfer & Withdrawal
                  </Text>
                </Flex>
              </CardHeader>
              <Divider />
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                <PieCard title={'Transfers'} />
                <PieCard title={'Withdrawals'} />
              </SimpleGrid>
            </Card>
          </Box>
          <Box p='6px 0px'>
            <Card w='100%' p="28px 2px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
              <CardHeader mb="20px" pl="22px">
                <Flex direction="column" alignSelf="flex-start">
                  <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                    Value Added Services(V.A.S)
                  </Text>
                </Flex>
              </CardHeader>
              <Divider />
            <CardBody>
              <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="24px">
                <PieCard />
                <PieCard />
                <PieCard />
                <PieCard />
                <PieCard />
                <PieCard />
              </SimpleGrid>
            </CardBody>
            </Card>
          </Box>
      </Flex>
    );
}


export default TxnPieCharts;