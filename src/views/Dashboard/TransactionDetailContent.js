import React from 'react';
import {
    Image, 
    Heading, 
    Text,
    Button,
    Flex,
    Center,
    Stack,
    Grid,
    useColorModeValue,
    GridItem
} from "@chakra-ui/react";
import { 
    CheckCircleIcon,
    WarningTwoIcon,
    QuestionIcon
   } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { CgData, CgScreen } from 'react-icons/cg';
import { GiElectric, GiTakeMyMoney } from 'react-icons/gi';
import { FcMoneyTransfer, FcCallTransfer } from 'react-icons/fc';
import { BsCashStack, BsCreditCard } from 'react-icons/bs';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { GrCreditCard } from 'react-icons/gr';
import { MdOutlineAccountBox } from 'react-icons/md';
import { formatCurrencyNumber, checkObject } from "modules/utilities";
import { dateOptions } from './TransactionPage';
import JsonCard from 'components/JsonCard';
import MonitoringComments from 'components/MonitoringComments';

const BIG_ICON_SIZE = 28
const SMALL_ICON_SIZE = 6


export const TransactionDetailContent = (props) => {
  
    const { transaction } = props;
    const textColor = useColorModeValue("gray.700", "white");
    let keys = Object.keys(transaction);
    let privateKeys = ['mongo_id', 'id', 'user_id', 'unique_id', 'created_at', 'updated_at']

    const publicKeys = keys.filter(key => !privateKeys.includes(key));
    
    return (
        <>
            <Grid
                // h='40vw'
                templateRows='repeat(5, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={1} colSpan={1} bg=''>
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                    <Flex direction="column">
                        <Center>
                            <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                                align='center'
                            >
                                <Text fontSize="md">TRANSACTION TYPE</Text>
                                { 'ELECTRICITY_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon as={GiElectric} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='orange.500' /><br />
                                    <Text  as='samp' fontSize="md">Electricity</Text>
                                    </>
                                    
                                )}
                                { 'WITHDRAWAL' == transaction.transaction_type && (
                                    <>
                                    <Icon as={GiTakeMyMoney} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='green.500' /><br />
                                    <Text  as='samp'>Withdrawal</Text> 
                                    </>
                                )}
                                { 'TRANSFER' == transaction.transaction_type && (
                                    <>
                                    <Icon as={FcMoneyTransfer} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='green.500' /><br />
                                    <Text  as='samp'>Transfer</Text> 
                                    </>
                                )}
                                { 'AIRTIME_VTU' == transaction.transaction_type && (
                                    <>
                                    <Icon as={FcCallTransfer} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='green.500' /><br />
                                    <Text  as='samp'>Airtime</Text> 
                                    </>
                                )}
                                { 'DATA_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon as={CgData} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='green.500' /><br />
                                    <Text  as='samp'>Data</Text> 
                                    </>
                                )}
                                { 'CABLE_RECHARGE' == transaction.transaction_type && (
                                    <>
                                    <Icon as={CgScreen} w={BIG_ICON_SIZE} h={BIG_ICON_SIZE} color='green.500' /><br />
                                    <Text  as='samp'>Cable</Text> 
                                    </>
                                )}                            
                            </Text>
                        </Center>
                    </Flex>
                </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">DESCRIPTION</Text>
                                        <Text as='samp'> { transaction?.description || '-' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">AMOUNT</Text>
                                        <Text as='samp'><span>&#8358;</span>{formatCurrencyNumber(transaction.amount)}</Text>
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">TRANSACTION STATUS</Text>
                                        {transaction?.transaction_status == 'successful' && 
                                            (
                                                <>
                                                <CheckCircleIcon w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color="green.500" /><br />
                                                <Text as="samp">Successful</Text> 
                                                </>
                                                
                                            )
                                            }
                                            {transaction?.transaction_status == 'pending' && 
                                            (
                                                <>
                                                <QuestionIcon  w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color="orange.500" /><br />
                                                <Text as="samp">Pending</Text> 
                                                </>
                                            )
                                            }
                                            {transaction?.transaction_status == 'failed' && 
                                                (
                                                <>
                                                    <WarningTwoIcon w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color="red.500" /><br />
                                                    <Text as="samp">Failed</Text> 
                                                </>
                                                )
                                            }
                                            {transaction?.transaction_status == 'validation' && 
                                                (
                                                <>
                                                    <Icon as={AiOutlineExclamationCircle} w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color='grey.500' /><br />
                                                    <Text as="samp">Validation</Text> 
                                                </>
                                                )
                                            }
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">PAYMENT METHOD</Text>
                                        {
                                            transaction?.payment_method == 'card' && (
                                                <>    
                                                    {/* <BsCreditCard2Front w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color="green.500" /> */}
                                                    <Icon as={BsCreditCard} w={8} h={8} color='orange.500' /><br />
                                                    <Text as="samp">{transaction?.payment_method || '-'}</Text> 
                                                </>
                                            )
                                        }
                                        {
                                            transaction?.payment_method == 'cash' && (
                                                <>
                                                    <Icon as={BsCashStack} w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color='green.500' /><br />
                                                    <Text as="samp">{transaction?.payment_method || '-'}</Text> 
                                                </>    
                                            )
                                        }
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">ACCOUNT</Text>
                                        {  
                                            transaction?.account && (
                                                <>         
                                                    <Icon as={MdOutlineAccountBox} w={SMALL_ICON_SIZE} h={SMALL_ICON_SIZE} color='grey.500' /><br />
                                                    <Text as="samp"> { transaction?.account || '-' } </Text> 
                                                </>
                                            )
                                        }
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">ACCOUNT TYPE</Text>
                                        <Text as="samp"> { transaction?.account_type || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">PRODUCT</Text>
                                        <Text as="samp"> { transaction?.product || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem  rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">PROVIDER</Text>
                                        <Text as="samp" color="grey.300"> { transaction?.provider || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">PROVIDER REFERENCE</Text>
                                        <Text as="samp"> { transaction?.provider_reference || '-' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">REFERENCE</Text>
                                        <Text as="samp"> { transaction?.reference || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">TRANSACTION DATE</Text>
                                        <Text as="samp"> {new Date(transaction?.transaction_created_at).toLocaleDateString("en-US", dateOptions)} </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">CHANNEL</Text>
                                        <Text as="samp"> { transaction?.channel || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">WALLET ID</Text>
                                        <Text as="samp"> { transaction?.wallet_id || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem rowSpan={1} h='10' colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">CREDIT STATUS</Text>
                                        <Text as="samp"> { transaction?.credit_status != null ? transaction?.credit_status.toString() : ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">REVERSAL</Text>
                                        <Text as="samp"> { transaction?.reversal != null ? transaction?.reversal.toString() : ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} bg=''>
                    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
                        <Flex direction="column">
                            <Center>
                                <Text
                                    fontSize="md"
                                    color={textColor}
                                    fontWeight="bold"
                                    minWidth="100%"
                                    align='center'
                                >
                                    <>
                                        <Text fontSize="md">MONITORING STATUS</Text>
                                        <Text as="samp"> { transaction?.monitoring_status || ' - ' } </Text> 
                                    </>                            
                                </Text>
                            </Center>
                        </Flex>
                    </Flex>
                </GridItem>
                <GridItem colSpan={3} bg=''>
                    <MonitoringComments title={'MONITORING COMMENTS'} transaction={transaction} />
                </GridItem>
                
                {
                    (!checkObject(transaction?.response || {})) && (
                        <GridItem colSpan={5} bg=''>
                            <JsonCard title='API RESPONSE' response={transaction?.response} />
                        </GridItem>
                    )
                }
                {
                    (!checkObject(transaction?.debit_response || {})) && (
                        <GridItem colSpan={5} bg=''>
                            <JsonCard title='DEBIT RESPONSE' response={transaction?.debit_response} />
                        </GridItem>
                    )
                }
            </Grid>
        </>
    );

}