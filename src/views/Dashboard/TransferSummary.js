import {
    Grid,
    Box,
    Flex,
    Text,
    Icon,
    Button, 
    GridItem,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import LineChart from "components/Charts/LineChart";

export default function TransferSummary() {
    return (
        <Grid
  h='200px'
  templateRows='repeat(2, 1fr)'
  templateColumns='repeat(5, 1fr)'
  pt={{ base: "120px", md: "75px" }}
  gap={4}
>
  <GridItem rowSpan={2} colSpan={5}>
  <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <TableCaption>Top Violating transfers in the last month (Ranked by date) <Button colorScheme='blue'>Add Filter</Button></TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Customer ID</Th>
                        <Th isNumeric>Total Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>25th January </Td>
                        <Td>8954545DE </Td>
                        <Td isNumeric>25000</Td>
                    </Tr>
                    <Tr>
                        <Td>16th January</Td>
                        <Td>3487777FE </Td>
                        <Td isNumeric>3000</Td>
                    </Tr>
                    <Tr>
                        <Td>10th January</Td>
                        <Td>3872788GT</Td>
                        <Td isNumeric>9030</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
  </GridItem>
  <GridItem rowSpan={2} colSpan={5}>
  <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
          <CardHeader mb="20px" pl="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                Sales Overview
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                <Text as="span" color="green.400" fontWeight="bold">
                  (+5%) more
                </Text>{" "}
                in 2021
              </Text>
            </Flex>
          </CardHeader>
          <Box w="100%" h={{ sm: "300px" }} ps="8px">
            <LineChart />
          </Box>
        </Card>

  </GridItem>
  <GridItem colSpan={2} bg='papayawhip' />
  <GridItem colSpan={2} bg='papayawhip' />
  <GridItem colSpan={4} bg='tomato' />
</Grid>



    )

}


