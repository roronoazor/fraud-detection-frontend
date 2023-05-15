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
  Center,
  FormHelperText,
  Spinner,
} from '@chakra-ui/react';
import TransferList from 'components/TransferList';
import { useQuery, useMutation } from 'react-query';
import { getAuthToken } from 'modules/auth/redux/authSelector';
import { fetchData, postData } from 'modules/utilities/util_query';
import { GET_RULE_PREREQUISITE, CREATE_RULE } from 'config/serverUrls';
import { handleApiError } from "modules/utilities/responseHandlers";
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { injectArguments } from 'modules/utilities';
import { EDIT_RULE } from 'config/serverUrls';


function getUnselectedItems(selectedItems, unselectedItems) {
  const selectedUserIds = selectedItems.map(item => item.id);
  return unselectedItems.filter(item => !selectedUserIds.includes(item.id));
}

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
          value={values?.description || ''}
          disabled
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
          disabled
        >
          <option value="exceeded daily limit">Exceeded Daily Limit</option>
          <option value="exceeded account daily limit">Exceeded Daily Transfer Limit on Account</option>
          <option value="exceeded card daily limit">Exceeded Daily Withdrwal Limit on Card</option>
          <option value="flag duplicate transaction">Flag Duplicate Transaction</option>
          <option value="exceeded limit">Exceeded Limit</option>
          <option value="exceeded balance">Exceeded Balance</option>
          <option value="exceeded single transaction limit">Exceeded Single Transaction Limit</option>
          <option value="exceeded number of daily transaction on card">Exceeded Number of Daily Transactions on Card</option>
          <option value="exceeded number of daily transaction on account">Exceeded Number of Daily Transactions on Account</option>
          <option value="exceeded number of daily transaction">Exceeded Number of Daily Transactions</option>
          <option value="transaction time">Transaction Time</option>
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
          disabled
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
          { values?.condition === 'transaction time' ? 'Start Time' : 'Rule Value' }
        </FormLabel>
        <Input
          id="value"
          name="rule_value"
          placeholder="Rule Value"
          value={values?.rule_value || ''}
          onChange={onChange}
          type={values?.condition === 'transaction time' ? 'time' : 'text'} 
          disabled
        />
      </FormControl>
      {
          values?.condition === 'transaction time' && (
            <FormControl mt="2%">
              <FormLabel htmlFor="value" fontWeight="normal">
                End Time
              </FormLabel>
              <Input
                id="value2"
                name="rule_value2"
                placeholder="Rule Value"
                value={values?.rule_value2 || values?.value2}
                onChange={onChange}
                type={'time'} 
                disabled
              />  
            </FormControl>
          )
        }
    </>
  );
};

const Form2 = ({ onChange, values, users=[], selectedUsers, setSelectedUsers }) => {
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
            placeholder="Enter a value"
            focusBorderColor="brand.400"
            rounded="md"
            name="manageable_value"
            value={values?.manageable_value || ''}
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
        <TransferList items={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        <FormHelperText>
          Select users to be notified when this threshold is exceeded.
        </FormHelperText>
      </FormControl>
    </SimpleGrid>
  </>
  );
};

const Form3 = ({ onChange, values, users=[], selectedUsers, setSelectedUsers }) => {
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
            placeholder="Enter a value"
            focusBorderColor="brand.400"
            rounded="md"
            name="warning_value"
            value={values?.warning_value || ''}
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
        <TransferList items={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        <FormHelperText>
          Select users to be notified when this threshold is exceeded.
        </FormHelperText>
      </FormControl>
    </SimpleGrid>
  </>
  );
};

const Form4 = ({ onChange, values, users=[], selectedUsers, setSelectedUsers }) => {
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
              placeholder="Enter a value"
              focusBorderColor="brand.400"
              rounded="md"
              onChange={onChange}
              value={values?.danger_value || ''}
              name="danger_value"
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
          <TransferList items={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}  />
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
  const [selectedManageable, setSelectedManageable] = useState([]);
  const [selectedWarning, setSelectedWarning] = useState([]);
  const [selectedDanger, setSelectedDanger] = useState([]);
  const history = useHistory();
  const { id:ruleId } = useParams();
  
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

   const fetchRuleById = useQuery(['fetch_rule_by_id',
          { 
            url: injectArguments(EDIT_RULE, { id: ruleId }),
            payload_data,
            authenticate:true,
            token
            }],
          fetchData, 
          {
            retry:false,
            onSuccess: (response) => {
              const { data } = response;
              setValues(data?.data);
              setSelectedManageable(data?.data?.manageable_actors);
              setSelectedWarning(data?.data?.warning_actors);
              setSelectedDanger(data?.data?.danger_actors);
              
            },
            onError: (error) => {
              handleApiError(error);
            }
          }
          );
  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast({
        title: 'Success',
        description: "Rule has been edited",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      history.push('/admin/rules');
      return;
    },
    onError: (error) => {
        handleApiError(error);
    }
});     
  
  const handleSubmit = () => {

    if (!values?.description || !values?.condition || !values?.product || !values?.rule_value || !values?.manageable_value || !values?.warning_value || !values?.danger_value) {
      toast({
        title: 'Missing Information.',
        description: "Please fill all required fields.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if ( selectedManageable.length <= 0 || selectedWarning.length <= 0 || selectedDanger.length <= 0 ) {
      toast({
        title: 'Missing Email Address',
        description: "Each Threshold needs to have at least one email to notify.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {...values, selectedManageable, selectedWarning, selectedDanger}

    mutation.mutate({
      url: injectArguments(EDIT_RULE, { id: ruleId }),
      payload_data: data,
      token: token,
      authenticate: true
    });
    return;
  }

  const { isLoading } = fetchInfo;

  
  console.log('v ->', values);
  console.log('x ->', selectedManageable, selectedDanger, selectedWarning);

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
            <Form2 onChange={onChange} values={values} users={getUnselectedItems(selectedManageable, users)} selectedUsers={selectedManageable} setSelectedUsers={setSelectedManageable} /> : step === 3 ?
            <Form3 onChange={onChange} values={values} users={getUnselectedItems(selectedWarning, users)} selectedUsers={selectedWarning} setSelectedUsers={setSelectedWarning} /> :
            <Form4 onChange={onChange} values={values} users={getUnselectedItems(selectedDanger, users)} selectedUsers={selectedDanger} setSelectedUsers={setSelectedDanger} /> 
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
                isLoading={mutation?.isLoading}
                onClick={handleSubmit}>
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