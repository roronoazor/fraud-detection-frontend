import React from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Select,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Link,
  } from '@chakra-ui/react';
  import { MdArrowDropDown } from 'react-icons/md';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const DEPARTMENTS = [
    {
        name: 'Technology',
        value: 'tech'
    },
    {
        name: 'Customer Experience User',
        value: 'cust_exp'
    },
    {
        name: 'Risk Management User',
        value: 'risk_man'
    }
]

const ModalUserForm = (props) => {

    const { 
        isOpen,
        onClose,
        handleSubmit,
        selectedUser,
        isLoading
    } = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [user, setUser] = React.useState(selectedUser);

    const handleChange = (event) => {

        const { name, value } = event.target;
        setUser({...user, [name]: value});

    };

    return (
        
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Create A User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                p={18}>
                <Stack spacing={4}>
                <HStack>
                    <Box>
                    <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input 
                            type="text"
                            value={user?.first_name} 
                            name="first_name"  
                            onChange={handleChange}
                        />
                    </FormControl>
                    </Box>
                    <Box>
                    <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input 
                            type="text"
                            value={user?.last_name}
                            name="last_name" 
                            onChange={handleChange}
                            />
                    </FormControl>
                    </Box>
                </HStack>
                <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                     type="email"
                     name="email"
                     value={user?.email} 
                     onChange={handleChange}
                    />
                </FormControl>
                <FormControl id="department" isRequired>
                    <FormLabel>Department</FormLabel>
                    <InputGroup>
                      <Select
                        placeholder='Choose an option'
                        size='md'
                        icon={<MdArrowDropDown />}
                        value={user?.department}
                        name="department"
                        onChange={handleChange}
                     >
                        { 
                            DEPARTMENTS.map((department, index) => {
                                return (
                                    <option value={department?.value}>{department?.name}</option>
                                )
                            })
                        }
                    </Select>
                    </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <Input
                     type={showPassword ? 'text' : 'password'}
                     value={user?.password}
                     name="password"
                     onChange={handleChange}
                    />
                    <InputRightElement h={'full'}>
                        <Button
                        variant={'ghost'}
                        onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                    <Button
                    onClick={()=>{ handleSubmit('create', user) }}
                    loadingText="Submitting"
                    isLoading={isLoading}
                    size="lg"
                    bg={'teal.500'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                        Save
                    </Button>
                </Stack>
                </Stack>
            </Box>
            </ModalBody>
        </ModalContent>
      </Modal>
    )
}


export default ModalUserForm;