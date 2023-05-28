
import React, { useState } from 'react';
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useColorModeValue,
  Select,
  Box,
  Checkbox,
  HStack,
  Spacer,
  Button,
  Icon,
  IconButton,
  Link,
  useToast
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Pagination from "components/Pagination";
import Filter from "components/Filter";
import { useQuery, useMutation } from "react-query";
import {
  DEACTIVATE_RULES,
  ACTIVATE_RULES,
  GET_CREATE_RULES
} from '../../config/serverUrls';
import { fetchData, postData } from '../../modules/utilities/util_query';
import { useSelector } from 'react-redux';
import { getAuthToken } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import { Spinner, Center } from '@chakra-ui/react'
import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";
import { EditIcon } from '@chakra-ui/icons';
import { FiUserPlus, FiEdit } from 'react-icons/fi';
import { SiActigraph, SiAdblock } from 'react-icons/si';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';
import { MdDeleteForever, MdOutlinePassword } from 'react-icons/md';
import ModalUserForm from 'views/Dashboard/Forms/ModalUserForm';
import ModalResetPasswordForm from 'views/Dashboard/Forms/ModalResetPasswordForm';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';


const fields = [
  {
    id: 1,
    fieldName: 'Description',
    fieldType: 'text',
    isSelected: false,
    fieldQueryName: 'description',
    fieldValue: '',
  }
]


const tableHeaders = [
  {
    id: 1,
    value: 'Description'
  },
  {
    id: 6,
    value: 'actions'
  }
]

const RulesRow = (props) => {
  const { rule, selected, onSelectCheckbox } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const history = useHistory();

  return (
    <Tr>
      <Td minWidth={{ base: "60%", sm: "150px" }} pl="0px">
        <Flex align="center" flexWrap="nowrap">
          <Flex direction="column">
            <Checkbox
              isChecked={selected.includes(rule?.id)}
              onChange={() => {
                onSelectCheckbox(rule);
              }}
            >
              <Text
                fontSize="md"
                color={textColor}
                //fontWeight="bold"
                minWidth="100%"
              >
                {rule?.description}
              </Text>
            </Checkbox>
          </Flex>
        </Flex>
      </Td>
      <Td minWidth={{ base: "20%", sm: "80px" }} pl="0px">
        <Flex align="center" flexWrap="nowrap">
          <Box as="button">
            <Text as="samp">{rule?.product?.replaceAll("_", " ")}</Text>
          </Box>
        </Flex>
      </Td>
      <Td minWidth={{ base: "20%", sm: "80px" }} pl="0px">
        <Flex align="center" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
          <Box as="button" onClick={() => { history.push(`/admin/rule/${rule?.id}`) }}>
            <IconButton
              colorScheme='purple'
              aria-label='edit rule'
              icon={<EditIcon />}
            />
            <br />
            <Text as="samp">Edit</Text>
          </Box>
        </Flex>
      </Td>
      <Td minWidth={{ base: "20%", sm: "80px" }} pl="0px">
        <Flex align="center" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
          <Flex direction="column">
            {rule.active ? (
              <Center>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                  align="center"
                >
                  <Icon as={BsFillCheckCircleFill} w={25} h={25} color="green.500" />
                  <br />
                  <Text as="samp">Active</Text>
                </Text>
              </Center>
            ) : (
              <Center>
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  minWidth="100%"
                  align="center"
                >
                  <Icon as={RiErrorWarningFill} w={25} h={25} color="red.500" />
                  <br />
                  <Text as="samp">Disabled</Text>
                </Text>
              </Center>
            )}
          </Flex>
        </Flex>
      </Td>
    </Tr>
  );
};


const RulesPage = (props) => {
  const textColor = useColorModeValue("gray.700", "white");
  const token = useSelector(getAuthToken);
  const [ruleCount, setRuleCount] = useState(0);
  const [rules, setRules] = useState([]);
  const [filters, setFilters] = useState(fields);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [urlWithFilters, setUrlWithFilters] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [openPasswordResetForm, setOpenPasswordResetForm] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const queryClient = useQueryClient();
  const history = useHistory();

  // call the api that loads this data only once
  let payload_data = {
  };

  const result = useQuery(['rules',
    {
      url: urlWithFilters ? urlWithFilters : GET_CREATE_RULES + `?page=${page}`,
      payload_data,
      authenticate: true,
      token
    }],
    fetchData,
    {
      retry: false,
      onSuccess: (response) => {
        const data = response?.data;
        setRuleCount(data?.count || 0);
        setRules(data?.results || []);
        setPageCount(data?.last_page || 1);
        setPage(data?.page || 1);
      },
      onError: (error) => {
        handleApiError(error);
      }
    }
  );
  const mutation = useMutation(postData, {
    onSuccess: (response) => {
      toast.success("Success");
      queryClient.invalidateQueries('rules');
      setOpenForm(false);
      setSelected([]);
      setSelectedUser({});
      setOpenPasswordResetForm(false);

    },
    onError: (error) => {
      handleApiError(error);
    }
  });
  const { isLoading } = result;


  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_USERS + `?page=${page}`, filters);
    // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
  }

  const closeFilterBox = () => {
    setUrlWithFilters('');
    const closedFilters = filters.map(filter => {
      return { ...filter, isSelected: false, fieldValue: '' }
    })
    setFilters(closedFilters);
  }

  const onItemSelected = (selectedField) => {

    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return { ...field, isSelected: !field.isSelected };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const handleChange = (event, selectedField) => {

    const { name, value } = event.target;
    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return { ...field, fieldValue: value };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const handlePageChange = (evt) => {

    const { selected } = evt;
    setPage(selected + 1);
    window.scrollTo(0, 0); // moves the compoent to the top of the page
  }

  const onSelectCheckbox = (rule) => {
    if (selected.includes(rule?.id)) {
      setSelected(selected.filter((item) => { return item !== rule?.id }));
    } else {
      setSelected([...selected, rule?.id]);
    }
  }

  const handleSubmit = (actionType, data = {}) => {

    if (actionType == 'activate') {
      mutation.mutate({
        url: ACTIVATE_RULES,
        payload_data: { selected },
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'deactivate') {
      mutation.mutate({
        url: DEACTIVATE_RULES,
        payload_data: { selected },
        token: token,
        authenticate: true
      });
      return;
    }
    return
  }


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
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Filter
        fields={filters}
        onItemSelected={onItemSelected}
        fireOnSearch={fireOnSearch}
        handleChange={handleChange}
        closeFilterBox={closeFilterBox}
      />
      <Box>
        <Spacer />
        <HStack sx={{ float: 'right' }} direction={['column', 'row']} spacing='24px' m={2}>
          <Button
            colorScheme="teal"
            variant="outline"
            isLoading={mutation?.isLoading}
            onClick={() => { history.push('/admin/createRule') }}
            leftIcon={<FiUserPlus />}
          >
            New Rule
          </Button>
          <Button
            colorScheme="teal"
            isLoading={mutation?.isLoading}
            onClick={() => handleSubmit('activate')}
            variant="outline"
            leftIcon={<SiActigraph />}
          >
            Activate
          </Button>
          <Button
            colorScheme="yellow"
            isLoading={mutation?.isLoading}
            onClick={() => handleSubmit('deactivate')}
            variant={"outline"}
            leftIcon={<SiAdblock />}
          >
            Deactivate
          </Button>
        </HStack>
      </Box>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {`Rules (${formatCurrencyNumber(ruleCount)})`}
          </Text>
        </CardHeader>
        <CardBody>
          <Box w="100%">
            <Table size="sm" variant="striped" colorScheme='purple' borderColor="purple" borderWidth="2px" overflowX="scroll">
              <Thead>
                <Tr>
                  <Th fontSize="md">Description</Th>
                  <Th fontSize="md">Product</Th>
                  <Th fontSize="md">Actions</Th>
                  <Th fontSize="md">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rules.map((rule, index) => (
                  <RulesRow
                    key={index}
                    rule={rule}
                    selected={selected}
                    onSelectCheckbox={onSelectCheckbox}
                  />
                ))}
              </Tbody>
            </Table>
          </Box>
        </CardBody>
        <Center m={5}>
          <Pagination
            pageCount={pageCount}
            onPageChange={(e) => { handlePageChange(e) }}
            forcePage={pageCount > 1 ? page - 1 : 1}
            renderOnZeroPageCount={null}
            activeClassName={'active'}
          />
        </Center>
      </Card>

    </Flex>
  )
};


export default RulesPage;