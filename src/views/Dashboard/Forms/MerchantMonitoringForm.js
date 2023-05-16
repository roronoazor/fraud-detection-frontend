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
import { handleApiError } from "modules/utilities/responseHandlers";
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { EDIT_MERCHANT_MONITORING_METRIC } from 'config/serverUrls';


function getUnselectedItems(selectedItems, unselectedItems) {
  const selectedUserIds = selectedItems.map(item => item.id);
  return unselectedItems.filter(item => !selectedUserIds.includes(item.id));
}

const Form1 = ({ onChange, values, users = [], selectedUsers, setSelectedUsers }) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Merchant Monitoring
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
            Number of Days
          </FormLabel>
          <InputGroup size="sm">
            <Input
              placeholder="Enter a value"
              focusBorderColor="brand.400"
              rounded="md"
              name="no_of_days"
              value={values?.no_of_days || ''}
              onChange={onChange}
            />
            <InputRightAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              #
            </InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}>
            Percentage_violation
          </FormLabel>
          <InputGroup size="sm">
            <Input
              placeholder="Enter a value"
              focusBorderColor="brand.400"
              rounded="md"
              name="percentage_violation"
              value={values?.percentage_violation || ''}
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
            Select users to be notified when violation occurs.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function multistep() {
  const toast = useToast();
  const token = useSelector(getAuthToken);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({});
  const [selectedEmails, setSelectedEmails] = useState([]);
  const history = useHistory();




  let payload_data = {};

  const onChange = (e) => {

    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

  }

  const fetchMerchantMetric = useQuery(['fetch_merchant_metric',
    {
      url: EDIT_MERCHANT_MONITORING_METRIC,
      payload_data,
      authenticate: true,
      token
    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const { data } = response;
        setUsers(data?.users);
        setValues(data?.data);
        setSelectedEmails(data?.data?.notification_emails);

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
        description: "Monitoring Metrics has been edited",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      history.push('/admin/merchantMonitoring');
      return;
    },
    onError: (error) => {
      handleApiError(error);
    }
  });

  const handleSubmit = () => {

    if (!values?.no_of_days || !values?.percentage_violation) {
      toast({
        title: 'Missing Information.',
        description: "Please fill all required fields.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (values?.percentage_violation <= 0 || values?.percentage_violation >= 100) {
      toast({
        title: 'Erroneous Value',
        description: "Percentage violation needs to be between 0 and 100",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedEmails.length <= 0) {
      toast({
        title: 'Missing Email Address',
        description: "Select at least one email to notify.",
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = { ...values, selectedEmails }


    mutation.mutate({
      url: EDIT_MERCHANT_MONITORING_METRIC,
      payload_data: data,
      token: token,
      authenticate: true
    });


    return;
  }



  const { isLoading } = fetchMerchantMetric;


  if (isLoading) {
    return (
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Center>
          <Spinner size='xl' />
        </Center>
      </Flex>
    )
  }

  console.log('users', users);
  console.log('selected emails', selectedEmails);


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

          <Form1 onChange={onChange} values={values} users={getUnselectedItems(selectedEmails, users)} selectedUsers={selectedEmails} setSelectedUsers={setSelectedEmails} />

          <ButtonGroup mt="5%" w="100%">
            <Button
              w="7rem"
              colorScheme="red"
              variant="solid"
              isLoading={mutation?.isLoading}
              onClick={handleSubmit}>
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
    </>
  );
}