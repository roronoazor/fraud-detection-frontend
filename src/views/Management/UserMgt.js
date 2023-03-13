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
    GET_CREATE_USERS,
    ACTIVATE_USERS,
    DEACTIVATE_USERS,
    DELETE_USERS,
    RESET_PASSWORD_URL,
    UPDATE_USER
  } from '../../config/serverUrls';
  import { fetchData, postData } from '../../modules/utilities/util_query';
  import { useSelector } from 'react-redux';
  import { getAuthToken } from "modules/auth/redux/authSelector";
  import { handleApiError } from "modules/utilities/responseHandlers";
  import { Spinner, Center } from '@chakra-ui/react'
  import { initializeUrlWithFilters, formatCurrencyNumber } from "modules/utilities";
  import { FiUserPlus } from 'react-icons/fi';
  import { SiActigraph, SiAdblock } from 'react-icons/si';
  import { BsFillCheckCircleFill  } from 'react-icons/bs';
  import { RiErrorWarningFill } from 'react-icons/ri';
  import { MdDeleteForever, MdOutlinePassword } from 'react-icons/md';
  import  ModalUserForm  from 'views/Dashboard/Forms/ModalUserForm';
  import ModalResetPasswordForm from 'views/Dashboard/Forms/ModalResetPasswordForm';
  import { useQueryClient } from 'react-query';
  import toast from 'react-hot-toast';
  import { FaEdit } from 'react-icons/fa';


const fields = [
    {
        id: 1,
        fieldName: 'first name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'first_name',
        fieldValue: '',
     },
     {
        id: 2,
        fieldName: 'last name',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'last_name',
        fieldValue: '',
     },
     {
        id: 3,
        fieldName: 'email',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'email',
        fieldValue: '',
     },
     {
        id: 4,
        fieldName: 'department',
        fieldType: 'text',
        isSelected: false,
        fieldQueryName: 'dept',
        fieldValue: '',
     }
]


const tableHeaders = [
    {
        id: 1,
        value: 'last name'
    },
    {
        id: 2,
        value: 'first name'
    },
    {
        id: 3,
        value: 'email'
    },
    {
        id: 4,
        value: 'department'
    },
    {
        id: 5,
        value: 'status'
    },
    {
        id: 6,
        value: 'actions'
    }
]

const users = [
    {
        id: 1,
        first_name: 'ugo',
        last_name: 'pascal',
        email: 'ugoodumegwu@gmail.com',
        dept: 'tech',
    },
    {
        id: 2,
        first_name: 'beyond',
        last_name: 'discomfort',
        email: 'discomfort@gmail.com',
        dept: 'tech',
    }
]



const UserRow = (props) => {

    const { 
      user,
      onSelectCheckbox,
      selected,
      openPasswordReset,
      closePasswordReset,
      openEditUser
    } = props;
    const textColor = useColorModeValue("gray.700", "white");

    return (
        <Tr>
          <Td minWidth={{ sm: "150px" }} pl="0px">
            <Flex align="center"  minWidth="100%" flexWrap="nowrap">
              <Flex direction="column">
                <Checkbox
                  isChecked={selected.includes(user?.id)}
                  onChange={(e) =>{ onSelectCheckbox(user); }}
                >
                    <Text
                        fontSize="md"
                        color={textColor}
                        //fontWeight="bold"
                        minWidth="100%"
                    >
                        {user.last_name}
                    </Text>
                </Checkbox>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "150px" }} pl="0px">
            <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.first_name}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.email}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center"  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
              <Flex direction="column">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {user.department_name}
                </Text>
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
              <Flex direction="column">
                  { user.is_active 
                  ? 
                    (
                      <>
                         <Center>
                            <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                                align='center'
                            >
                            <Icon 
                              as={BsFillCheckCircleFill}
                              w={25}
                              h={25}
                              color="green.500"
                            />
                            <br />
                            <Text as="samp">Active</Text>
                          </Text>
                        </Center>
                        
                      </>
                    ) 
                    : 
                    (
                      <>
                        
                        <Center>
                            <Text
                                fontSize="md"
                                color={textColor}
                                fontWeight="bold"
                                minWidth="100%"
                                align='center'
                            >
                              <Icon 
                                as={RiErrorWarningFill}
                                w={25}
                                h={25}
                                color="red.500"
                                />
                              <br />
                              <Text as="samp">Disabled</Text>
                            </Text>
                        </Center>
                      </>
                    ) 
                  }               
              </Flex>
            </Flex>
          </Td>
          <Td minWidth={{ sm: "250px" }} pl="0px">
          <Flex  minWidth="100%" flexWrap="nowrap" sx={{ justifyContent: 'center' }}>
              <HStack>
                <Center>
                    <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        minWidth="100%"
                        align='center'
                    >
                      <Icon 
                        as={MdOutlinePassword}
                        w={25}
                        h={25}
                        color="orange.500"
                        onClick={()=>openPasswordReset(user)}
                        />
                      <br />
                      <Text as="samp">Reset Password</Text>
                    </Text>
                </Center>
                <Center>
                    <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="bold"
                        minWidth="100%"
                        align='center'
                    >
                      <Icon 
                        as={FaEdit}
                        w={25}
                        h={25}
                        color="teal.500"
                        onClick={()=>{ openEditUser(user) }}
                        />
                      <br />
                      <Text as="samp">Edit User</Text>
                    </Text>
                </Center>
              </HStack>       
            </Flex>
          </Td>
        </Tr>
      );  
}


const UserMgt = (props) => {
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const [userCount, setUserCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState(fields);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [urlWithFilters, setUrlWithFilters] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openPasswordResetForm, setOpenPasswordResetForm] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const queryClient = useQueryClient();
    const toastAlert = useToast();

    // call the api that loads this data only once
    let payload_data = {
    };
    const result = useQuery(['users',
                            { 
                              url: urlWithFilters ? urlWithFilters : GET_CREATE_USERS + `?page=${page}`,
                              payload_data,
                              authenticate:true,
                              token
                             }],
                            fetchData, 
                            {
                              retry:false,
                              onSuccess: (response) => {
                                const data = response?.data;
                                setUserCount(data?.count || 0);
                                setUsers(data?.results || []);
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
          queryClient.invalidateQueries('users');
          setOpenForm(false);
          setSelected([]);
          setSelectedUser({});
          setOpenPasswordResetForm(false);

      },
      onError: (error) => {
          handleApiError(error);
      }
  });                  
  const {  isLoading } = result;
  

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_USERS + `?page=${page}`, filters);
      // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
  }

  const closeFilterBox = () => {
    setUrlWithFilters('');
    const closedFilters = filters.map(filter => {
      return {...filter, isSelected: false, fieldValue: ''}
    })
    setFilters(closedFilters);
  }

  const onItemSelected = (selectedField) => {
  
    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return {...field, isSelected: !field.isSelected};
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

  const onSelectCheckbox = (user) => {
    if (selected.includes(user?.id)){
      setSelected(selected.filter((item)=>{return item !== user?.id}));
    }else{
      setSelected([...selected, user?.id]);
    }
  }

  const handleSubmit = (actionType, data={}) => {

    if (actionType == 'create') {

      if (!data?.first_name || !data?.last_name || !data?.email || !data?.password || !data?.dept) {
        toastAlert({
          title: 'Please fill all required fields',
          status: 'warning',
          isClosable: true
        })
        return;
      }
      mutation.mutate({
        url: GET_CREATE_USERS,
        payload_data: data,
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'edit') {
      console.log('edit', data);
      if (!data?.first_name || !data?.last_name || !data?.email || !data?.dept) {
        toastAlert({
          title: 'Please fill all required fields',
          status: 'warning',
          isClosable: true
        })
        return;
      }
      mutation.mutate({
        url: UPDATE_USER,
        payload_data: {
          id: selectedUser.id,
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          dept: data?.dept
        },
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'activate') {
      if ( selected?.length <= 0 ) {
        toastAlert({
          title: 'You havent selected any users',
          status: 'warning',
          isClosable: true
        })
        return;
      }
      mutation.mutate({
        url: ACTIVATE_USERS,
        payload_data: { ids: selected },
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'deactivate') {
      if ( selected?.length <= 0 ) {
        toastAlert({
          title: 'You havent selected any users',
          status: 'warning',
          isClosable: true
        })
        return;
      }
      mutation.mutate({
        url: DEACTIVATE_USERS,
        payload_data: { ids: selected },
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'delete') {
      if ( selected?.length <= 0 ) {
        toastAlert({
          title: 'You havent selected any users',
          status: 'warning',
          isClosable: true
        })
        return;
      }
      mutation.mutate({
        url: DELETE_USERS,
        payload_data: { ids: selected },
        token: token,
        authenticate: true
      });
      return;
    }

    if (actionType == 'reset_password') { 

      if (data?.password != data?.confirm_password){
        toastAlert({
          title: 'Passwords do not match',
          status: 'warning',
          isClosable: true
        })
        return;
      }

      mutation.mutate({
        url: RESET_PASSWORD_URL,
        payload_data: { 
          id: selectedUser.id,
          password: data?.password, 
          confirm_password: data?.confirm_password },
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

  const openPasswordReset = (user) => {
    setSelectedUser(user);
    setOpenPasswordResetForm(true);
  }

  const closePasswordReset = () => {
    setSelectedUser({});
    setOpenPasswordResetForm(false);
  }

  const openEditUser = (user) => {
    console.log('xxx: ', user);
    setSelectedUser(user);
    setOpenForm(true);
  };

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
        <HStack sx={{float: 'right'}} direction={['column', 'row']} spacing='24px' m={2}>
        <Button 
          colorScheme="teal"
          variant="outline"
          isLoading={mutation?.isLoading}
          onClick={() => {setOpenForm(true)}}
          leftIcon={<FiUserPlus />}
        >
              New User
          </Button>
          <Button 
            colorScheme="teal"
            isLoading={mutation?.isLoading}
            onClick={() => handleSubmit('activate', )}
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
          <Button
          colorScheme={"red"}
          isLoading={mutation?.isLoading}
          onClick={() => handleSubmit('delete')}
          leftIcon={<MdDeleteForever />}
          variant="outline"
          >
              Delete
          </Button>
        </HStack>
      </Box>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <ModalUserForm 
          isOpen={openForm}
          onClose={()=>{setSelectedUser({}); setOpenForm(false)}}
          handleSubmit={handleSubmit} 
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isLoading={mutation?.isLoading} 
        />
        <ModalResetPasswordForm
          isOpen={openPasswordResetForm}
          onClose={closePasswordReset}
          handleSubmit={handleSubmit} 
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isLoading={mutation?.isLoading}
        />
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
             {`Users (${formatCurrencyNumber(userCount)})`}
          </Text>
        </CardHeader>
        <CardBody>
        <Box overflowX="scroll">
          <Table size="sm" variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {
                    tableHeaders.map((header, index) => {
                      if (index == 0) {
                        return (
                          <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400">
                              {header.value}
                          </Th>
                        )
                      }else { 
                        return (
                          <Th key={header.id} pl= { index==0 ? '0px' : ''} color="gray.400" sx={{ textAlign: 'center' }}>
                              {header.value}
                          </Th>
                        )
                       }
                        
                    })
                }
              </Tr>
            </Thead>
            <Tbody>
                {users.map((user, index) => {
                    return (
                      <UserRow
                        key={index}
                        user={user}
                        onSelectCheckbox={onSelectCheckbox}
                        selected={selected}
                        openPasswordReset={openPasswordReset}
                        onClose={closePasswordReset}
                        openEditUser={openEditUser}
                        />
                    );
                })}
            </Tbody>
          </Table>
        </Box>
        </CardBody>
        <Center m={5}>
          <Pagination
              pageCount={pageCount}
              onPageChange={(e)=>{handlePageChange(e)}}
              forcePage={pageCount > 1 ? page - 1 : 1}
              renderOnZeroPageCount={null}
              activeClassName={'active'}
            />
          </Center>
      </Card>
      
    </Flex>
  )
};


export default UserMgt;