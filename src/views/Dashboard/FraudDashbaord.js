// Chakra imports
import {
    Box,
    Button,
    Flex,
    Grid,
    Center,
    Spinner,
    Progress,
    SimpleGrid,
    Heading,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useColorMode,
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
  import { handleApiError } from "modules/utilities/responseHandlers";
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
  import React, { useState } from "react";
  import { useHistory } from "react-router-dom";
  import { GET_FRAUD_DASHBOARD } from "config/serverUrls";
  import { useQuery } from "react-query";
  import { useSelector } from 'react-redux';
  import { getAuthToken } from "modules/auth/redux/authSelector";
  import { fetchData } from '../../modules/utilities/util_query';
import { formatCurrencyNumber } from "modules/utilities";
  
  export default function FraudDashboard() {
    
    // Chakra Color Mode
    const { colorMode, toggleColorMode } = useColorMode();
    const [dashboardData, setDashboardData] = useState({});
    const token = useSelector(getAuthToken);
    const iconTeal = useColorModeValue("teal.300", "teal.300");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");
    const [series, setSeries] = useState([
      {
        type: "area",
        name: "Within Transaction limit",
        data: [190, 220, 205, 350, 370, 450, 400, 360, 210, 250, 292, 150],
      },
      {
        type: "area",
        name: "Exceeded transaction limit",
        data: [400, 291, 121, 117, 25, 133, 121, 211, 147, 25, 201, 203],
      },
    ]);
    const [withdrawalLineChartData, setWithdrawalLineChartData] = useState([]);
    const [withdrawalLineChartLabels, setWithdrawalLineChartLabels] = useState([]);
    const [transferLineChartData, setTransferLineChartData] = useState([]);
    const [transferLineChartLabels, setTransferLineChartLabels] = useState([]);
    const [vasLineChartData, setVasLineChartData] = useState([]);
    const [vasLineChartLabels, setVasLineChartLabels] = useState([]);
    const history = useHistory();
    let payload_data = {};

    const fetchInfo = useQuery(['get-fraud-dashboard',
          { 
            url: GET_FRAUD_DASHBOARD,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              const { data } = response?.data;
              setDashboardData(data);

              const withdrawal_total_l30 = { name: 'Total Transactions', data: Object.values(data?.withdrawal?.total_l30) };
              const withdrawal_suspected_l30 = { name: 'Suspected Transactions', data: Object.values(data?.withdrawal?.suspected_l30) };
              setWithdrawalLineChartData([withdrawal_total_l30, withdrawal_suspected_l30]);
              setWithdrawalLineChartLabels(Object.keys(data?.withdrawal?.total_l30));


              const transfer_total_l30 = { name: 'Total Transactions', data: Object.values(data?.transfer?.total_l30) };
              const transfer_suspected_l30 = { name: 'Suspected Transactions', data: Object.values(data?.transfer?.suspected_l30) };
              setTransferLineChartData([transfer_total_l30, transfer_suspected_l30]);
              setTransferLineChartLabels(Object.keys(data?.transfer?.total_l30));

              const vas_total_l30 = { name: 'Total Transactions', data: Object.values(data?.vas?.total_l30) };
              const vas_suspected_l30 = { name: 'Suspected Transactions', data: Object.values(data?.vas?.suspected_l30) };
              setVasLineChartData([vas_total_l30, vas_suspected_l30]);
              setVasLineChartLabels(Object.keys(data?.vas?.total_l30));


            },
            onError: (error) => {
              handleApiError(error);
            },
            StaleTime: 10000
          }
          );
    const { isLoading } = fetchInfo;

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
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
          <Card minH="83px">
            <CardBody>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Total Rules Defined
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      {formatCurrencyNumber(dashboardData?.rules_count) || '0'}
                    </StatNumber>
                    <Spacer />
                    <Box sx={{ float: 'right' }}>
                      <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                        <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                      </IconBox>
                    </Box>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                  Flagged Transaction Today
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      {formatCurrencyNumber(dashboardData?.suspected_transactions_today) || '0'}
                    </StatNumber>
                    <Spacer />
                    <Box sx={{ float: 'right' }}>
                      <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                        <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                      </IconBox>
                    </Box>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Total Transaction Today
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      {formatCurrencyNumber(dashboardData?.total_transactions_today) || '0'}
                    </StatNumber>
                    <Spacer />
                    <Box sx={{ float: 'right' }}>
                      <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                        <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                      </IconBox>
                    </Box>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="83px">
            <CardBody>
              <Flex flexDirection="row" align="center" justify="center" w="100%">
                <Stat me="auto">
                  <StatLabel
                    fontSize="sm"
                    color="gray.400"
                    fontWeight="bold"
                    pb=".1rem"
                  >
                    Percentage Flagged
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                      {`${dashboardData?.percentage_suspected ? `${dashboardData?.percentage_suspected}%` : '0%'}`}
                    </StatNumber>
                    <Spacer />
                    <Box sx={{ float: 'right' }}>
                      <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                        <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                      </IconBox>
                    </Box>
                  </Flex>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Box p='12px 0px'>
          {/** EXPERIMENTAL UI COMPONENT FOR SUSPECTED WITHDRAWAL TRANSACTION */}
          <Card w='100%' p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
            <CardHeader p='15'>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Box>
                    <Heading size='sm'>Withdrawal Txn Overview</Heading>
                    <Text fontSize='xs' as='i'>{`${formatCurrencyNumber(dashboardData?.withdrawal?.suspected)} suspected withdrawal transactions recorded in the last 30 days`}</Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
              <CardBody p={2}>
                <Box w="100%" h={{ sm: "300px" }} ps="8px">
                  <LineChart 
                    chartData={withdrawalLineChartData}
                    chartOptions={withdrawalLineChartLabels}
                  />
                </Box>
              </CardBody>
              <Box p="15" align='center'>
                <Text>{`Last 30 days overview`}</Text>
              </Box>
              <Divider />
              <Box p='15'>
                  <Flex
                    direction="column"
                    mt="14px"
                    mb="26px"
                    alignSelf="flex-start"
                  >
                    <Text
                      fontSize="md"
                      color={textColor}
                      mb="6px"
                    >
                      Withdrawal Stats this month
                    </Text>
                  </Flex>
                <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Withdrawals
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={textColor}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.withdrawal?.total) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={20}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Suspected
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.withdrawal?.suspected) ? formatCurrencyNumber(dashboardData?.withdrawal?.suspected) : 0}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={90}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Failed
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.withdrawal?.failed) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={30}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Success
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'green.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.withdrawal?.successful) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={50}
                    />
                  </Flex>
                </SimpleGrid>
              </Box>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/transaction?p=withdrawal')}>
                    View More
                  </Button>
                </ButtonGroup>
              </CardFooter>
          </Card>
        </Box>
        <Grid
          templateColumns={{ sm: "1fr", lg: "1.5fr 1.5fr" }}
          templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
          gap="24px"
          my="26px"
          mb={{ lg: "26px" }}
        > 
          {/** UI COMPONENT FOR SUSPECTED BANK TRANSFER COMPONENT */}
          <Card w="100%" p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
              <CardHeader mb="20px" pl="22px">
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                      <Heading size='sm'>Bank Transfer Txn Overview </Heading>
                      <Text fontSize='xs' as='i'>{`${formatCurrencyNumber(dashboardData?.transfer?.suspected)} suspected transfer transactions recorded in the last 30 days`}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
                <CardBody p={2}>
                <Box w="100%" h={{ sm: "300px" }} ps="8px">
                  <LineChart 
                      chartData={transferLineChartData}
                      chartOptions={transferLineChartLabels}
                    />
                </Box>  
                </CardBody>
                <Box p="5" align='center'>
                  <Text>{`Last 30 days overview`}</Text>
                </Box>
                <Divider />
                <Box p='15'>
                  <Flex
                    direction="column"
                    mt="14px"
                    mb="26px"
                    alignSelf="flex-start"
                  >
                    <Text
                      fontSize="md"
                      color={textColor}
                      mb="6px"
                    >
                      Bank Transfer Stats this month
                    </Text>
                  </Flex>
                <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                       Transfers
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={textColor}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.transfer?.total) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={20}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Suspected
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.transfer?.suspected) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={90}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Failed
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.transfer?.failed) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={30}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Success
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'green.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.transfer?.successful) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={50}
                    />
                  </Flex>
                </SimpleGrid>
                </Box>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/transaction?p=transfer')}>
                    View More
                  </Button>
                </ButtonGroup>
              </CardFooter>
          </Card>

          <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
              <CardHeader mb="20px" pl="22px">
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                      <Heading size='sm'>V.A.S Txn Overview</Heading>
                      <Text fontSize='xs' as='i'>{`${formatCurrencyNumber(dashboardData?.vas?.suspected) || '0'} suspected v.a.s transactions recorded in the last 30 days`}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
                <CardBody p={2}>
                  <Box w="100%" h={{ sm: "300px" }} ps="8px">
                    <LineChart 
                      chartData={vasLineChartData}
                      chartOptions={vasLineChartLabels}
                    />
                  </Box>
                </CardBody>
                <Box p="5" align='center'>
                  <Text>{`Last 30 days overview`}</Text>
                </Box>
                <Divider />
                <Box p='15'>
                  <Flex
                    direction="column"
                    mt="14px"
                    mb="26px"
                    alignSelf="flex-start"
                  >
                    <Text
                      fontSize="md"
                      color={textColor}
                      mb="6px"
                    >
                      Value Added Services Transaction Stats this month
                    </Text>
                  </Flex>
                <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                       V.A.S 
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={textColor}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.vas?.total) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={20}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Suspected
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.vas?.suspected) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={90}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Failed
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'red.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.vas?.failed || '0')}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={30}
                    />
                  </Flex>
                  <Flex direction="column">
                    <Flex alignItems="center">
                      <IconBox
                        as="box"
                        h={"30px"}
                        w={"30px"}
                        bg={iconTeal}
                        me="6px"
                      >
                        <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                      </IconBox>
                      <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                        Success
                      </Text>
                    </Flex>
                    <Text
                      fontSize="lg"
                      color={'green.400'}
                      fontWeight="bold"
                      mb="6px"
                      my="6px"
                    >
                      {formatCurrencyNumber(dashboardData?.vas?.successful) || '0'}
                    </Text>
                    <Progress
                      colorScheme="teal"
                      borderRadius="12px"
                      h="5px"
                      value={50}
                    />
                  </Flex>
                </SimpleGrid>
                </Box>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/transaction?p=vas')}>
                    View More
                  </Button>
                </ButtonGroup>
              </CardFooter>
          </Card>
        </Grid>
      </Flex>
      
    );
  }
  