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
    StatNumber,
    Text,
    useColorMode,
    Divider,
    ButtonGroup,
    Spacer,
    useColorModeValue
  } from "@chakra-ui/react";
  
  import withdrawalImage from "assets/img/withdrawalImage2.jpg";
  import transferImage from "assets/img/transferImage.jpg";
  import airtimeImage from "assets/img/airtimeImage.jpg";

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
  
  
  export default function FraudDashboard() {
    const value = "$100.000";
    // Chakra Color Mode
    const { colorMode, toggleColorMode } = useColorMode();
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
    const overlayRef = React.useRef();
    const history = useHistory();
  
    
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
                      11
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
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
                    Total Violating Transactions ( Today )
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      782
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
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
                    Total Transaction value (Today)
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor}>
                      N 13, 020, 450
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
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
                    Total Txn volume ( Today )
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                      173,000
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
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
                    Total Txn Amount (Today)
                  </StatLabel>
                  <Flex>
                    <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                      17, 300, 000
                    </StatNumber>
                  </Flex>
                </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
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
                    <Text fontSize='xs' as='i'>{`178,200 suspected withdrawal transactions recorded this month`}</Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
              <CardBody p={2}>
                <Box w="100%" h={{ sm: "300px" }} ps="8px">
                  <LineChart />
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
                      32,984
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
                      2,420
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
                      2,400
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
                      320
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
              <Divider />
              <CardBody p={2}>
              <Flex direction="column" p='30px 15px'>
                  <Box>
                    <Text
                      fontSize="md"
                      color={textColor}
                      pb=".5rem"
                    >
                      Suspected Withdrawal Txn Breakdown (Today)
                    </Text>
                  </Box>
                  {suspectedData.map((row, index, arr) => {
                    return (
                      <TimelineRow
                        logo={row.logo}
                        title={row.title}
                        date={row.date}
                        color={row.color}
                        index={index}
                        arrLength={arr.length}
                      />
                    );
                  })}
              
              </Flex>
              </CardBody>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/withdrawalSummary')}>
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
          <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
              <CardHeader mb="20px" pl="22px">
                <Flex spacing='4'>
                  <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box>
                      <Heading size='sm'>Bank Transfer Txn Overview </Heading>
                      <Text fontSize='xs' as='i'>{`4,200 suspected transfer transactions recorded today`}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
                <CardBody p={2}>
                  <BarChart />
                </CardBody>
                <Box p="5" align='center'>
                  <Text>{`Last 7 days overview`}</Text>
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
                      32,984
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
                      2,420
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
                      2,400
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
                      320
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
                <Divider />
                <CardBody p={2}>
              <Flex direction="column" p='30px 15px'>
                  <Box>
                    <Text
                      fontSize="md"
                      color={textColor}
                      pb=".5rem"
                    >
                      Suspected Bank Transfer Txn Breakdown (Today)
                    </Text>
                  </Box>
                  {suspectedData.map((row, index, arr) => {
                    return (
                      <TimelineRow
                        logo={row.logo}
                        title={row.title}
                        date={row.date}
                        color={row.color}
                        index={index}
                        arrLength={arr.length}
                      />
                    );
                  })}
              
              </Flex>
              </CardBody>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/transferSummary')}>
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
                      <Heading size='sm'>Airtime Recharge Txn Overview</Heading>
                      <Text fontSize='xs' as='i'>{`5,700 suspected Withdrawal transactions recorded today`}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
                <CardBody p={2}>
                  <BarChart />
                </CardBody>
                <Box p="5" align='center'>
                  <Text>{`Last 7 days overview`}</Text>
                </Box>
                <Divider />
                <CardBody p={2}>
              <Flex direction="column" p='30px 15px'>
                  <Box>
                    <Text
                      fontSize="md"
                      color={textColor}
                      pb=".5rem"
                    >
                      Suspected Bank Transfer Txn Breakdown (Today)
                    </Text>
                  </Box>
                  {suspectedData.map((row, index, arr) => {
                    return (
                      <TimelineRow
                        logo={row.logo}
                        title={row.title}
                        date={row.date}
                        color={row.color}
                        index={index}
                        arrLength={arr.length}
                      />
                    );
                  })}
              
              </Flex>
              </CardBody>
              <CardFooter justify='flex-end'>
                <Spacer />
                <ButtonGroup spacing='2' padding='2'>
                  <Button variant='solid' colorScheme='teal' onClick={() => history.push('/admin/airtimeSummary')}>
                    View More
                  </Button>
                </ButtonGroup>
              </CardFooter>
          </Card>

          <Card  p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
            <CardHeader  mb="20px" pl="22px">
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Box>
                    <Heading size='sm'>Airtime Recharge Txn Overview</Heading>
                    <Text fontSize='xs' as='i'>{`5,700 suspected Withdrawal transactions recorded today`}</Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
                <Image
                  padding={2}
                  objectFit='cover'
                  src={withdrawalImage}
                  height={'360px'}
                  alt='Chakra UI'
                />
              <CardBody p={2}>
                <Text>
                  Suspected Airtime Transactions
                </Text>
              </CardBody>
          </Card>
        </Grid>
      </Flex>
    );
  }
  