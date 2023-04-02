import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputRightAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';
import TransferList from 'components/TransferList';
import { useQuery } from 'react-query';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { fetchData } from 'modules/utilities/util_query';
import { GET_RULE_PREREQUISITE, CREATE_RULE } from 'config/serverUrls';
import { handleApiError } from "modules/utilities/responseHandlers";
import { useSelector } from 'react-redux';

import { useToast } from '@chakra-ui/react';

const Form1 = ({ onChange, values, products=[] }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Rule Setup
      </Heading>
      <FormControl>
        <FormLabel htmlFor="description" fontWeight="normal">
          Rule Description
        </FormLabel>
        <Input 
          id="description"
          placeholder="Description"
          name="description"
          onChange={onChange}
          values={values?.description}
        />
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="condition" fontWeight="normal">
          Rule Condition
        </FormLabel>
        <Select
          id="condition"
          placeholder="Select a condition"
          value={values?.condition}
          onChange={onChange}
          name="condition"
        >
          <option value="exceeded daily limit">Exceeded Daily Limit</option>
          <option value="flag duplicate transaction">Flag Duplicate Transaction</option>
          <option value="exceeded limit">Exceeded Limit</option>
          <option value="exceeded balance">Exceeded Balance</option>
          <option value="exceeded single transaction limit">Exceeded Single Transaction Limit</option>
          <option value="exceeded number of daily transaction">Exceeded Number of Daily Transactions</option>
        </Select>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="product" fontWeight="normal">
          Product
        </FormLabel>
        <Select
          id="product"
          placeholder="Select a product"
          value={values?.product}
          onChange={onChange}
          name="product"
        >
          {
            products.map( (product, index) => {
              const productType = product?.product_type?.replace(/_/g, ' ').replace(/\b\w/g, (word) => word.toUpperCase()[0] + word.slice(1).toLowerCase());
              return (<option key={index} value={product?.product_type}>{productType}</option>)
            })
          }
        </Select>
      </FormControl>

      <FormControl mt="2%">
        <FormLabel htmlFor="value" fontWeight="normal">
          Rule Value
        </FormLabel>
        <Input
          id="value"
          type="number"
          name="rule_value"
          placeholder="Rule Value"
          value={values?.rule_value}
          onChange={onChange}
        />
      </FormControl>

    </>
  );
};

const Form2 = ({ onChange, values, users=[] }) => {
  return (
    <>
    <Heading w="100%" textAlign={'center'} fontWeight="normal">
      Manageable Setup
    </Heading>
    <SimpleGrid columns={1} spacing={6}>
      <FormControl as={GridItem} colSpan={[3, 2]}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Manageable level
        </FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            placeholder="Enter a value"
            focusBorderColor="brand.400"
            rounded="md"
            name="manageable_value"
            value={values?.manageable_value}
            onChange={onChange}
          />
          <InputRightAddon
            bg="gray.50"
            _dark={{
              bg: 'gray.800',
            }}
            color="gray.500"
            rounded="md">
            %
          </InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl id="email" mt={1}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Choose Users
        </FormLabel>
        <TransferList items={users} />
        <FormHelperText>
          Select users to be notified when this threshold is exceeded.
        </FormHelperText>
      </FormControl>
    </SimpleGrid>
  </>
  );
};

const Form3 = ({ onChange, values, users=[] }) => {
  return (
    <>
    <Heading w="100%" textAlign={'center'} fontWeight="normal">
      Warning Setup
    </Heading>
    <SimpleGrid columns={1} spacing={6}>
      <FormControl as={GridItem} colSpan={[3, 2]}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Warning Level
        </FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            placeholder="Enter a value"
            focusBorderColor="brand.400"
            rounded="md"
          />
          <InputRightAddon
            bg="gray.50"
            _dark={{
              bg: 'gray.800',
            }}
            color="gray.500"
            rounded="md">
            %
          </InputRightAddon>
        </InputGroup>
      </FormControl>

      <FormControl id="email" mt={1}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}>
          Choose Users
        </FormLabel>
        <TransferList items={users} />
        <FormHelperText>
          Select users to be notified when this threshold is exceeded.
        </FormHelperText>
      </FormControl>
    </SimpleGrid>
  </>
  );
};

const Form4 = ({ onChange, values, users=[] }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Danger Setup
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Danger Level
          </FormLabel>
          <InputGroup size="sm">
            <Input
              type="number"
              placeholder="Enter a value"
              focusBorderColor="brand.400"
              rounded="md"
            />
            <InputRightAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              %
            </InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Choose Users
          </FormLabel>
          <TransferList items={users} />
          <FormHelperText>
            Select users to be notified when this threshold is exceeded.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const token = useSelector(getAuthToken);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({});
  let payload_data = {};

  const onChange = (e) => {
    
    const { name, value } = e.target;
    setValues({...values, [name]: value});

  }

  const fetchInfo = useQuery(['get_rule_prerequisites',
          { 
            url: GET_RULE_PREREQUISITE,
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              const { data } = response;
              const { products, users } = data;
              setProducts(products);
              setUsers(users);
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
    const { isLoading } = fetchInfo;
  console.log('v ->', values);

  return (
    <>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={6}
        sx={{ width: '100%' }}
        m="10px auto"
        as="form">
        <Progress
          hasStripe
          colorScheme='teal'
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated></Progress>
          { step === 1 ? 
            <Form1 onChange={onChange} values={values} products={products} /> : step === 2 ? 
            <Form2 onChange={onChange} values={values} users={users} /> : step === 3 ?
            <Form3 onChange={onChange} values={values} users={users} /> :
            <Form4 onChange={onChange} values={values} users={users} /> 
          }
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 25);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 4}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 4) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 25);
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 4 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </Flex>
    </>
  );
}