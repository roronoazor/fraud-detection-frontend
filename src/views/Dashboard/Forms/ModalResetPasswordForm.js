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

const ModalResetPasswordForm = (props) => {

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
        
      <Modal onClose={()=>{onClose(); setUser({});}} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{`Reset ${selectedUser?.first_name} ${selectedUser?.last_name}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                p={18}>
                <Stack spacing={4}>
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
                <FormControl id="confirm_password" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                    <Input
                     type={showPassword ? 'text' : 'password'}
                     value={user?.confirm_password}
                     name="confirm_password"
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
                    onClick={()=>{ handleSubmit('reset_password', user) }}
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


export default ModalResetPasswordForm;