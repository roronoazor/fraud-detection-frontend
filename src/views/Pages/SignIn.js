import React from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Avatar,
  Link,
  Switch,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import avatar4 from "assets/img/apple-icon.bmp";
// Assets
import signInImage from "assets/img/monitoring.png";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useMutation } from 'react-query';
import { postData } from 'modules/utilities/util_query';
import { checkObject, isError } from 'modules/utilities';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { LOGIN_URL } from 'config/serverUrls';
import toast from 'react-hot-toast';
import { handleApiError, handleApiSuccess } from 'modules/utilities/responseHandlers';
import { login } from 'modules/auth/redux/authSlice';

function SignIn() {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const state = useSelector((state) => state)
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  function validate() {
    let uerrors = {}
    uerrors.email = values?.email ? "" : FIELD_REQUIRED;
    uerrors.password = values?.password ? "" : FIELD_REQUIRED;

    return uerrors;
}

  const handleChange = (evt) => {
    setValues({...values, [evt.target.name]: evt.target.value});
  }

  const mutation = useMutation(postData, {
    onSuccess: (response) => {
        const userObj = response?.data;
        toast.success("You Signed in Successfully");
        dispatch(login(userObj));
        
        // // navigate to the dashboard
        // history.push(APP_HOME_PAGE);
    },
    onError: (error) => {
        handleApiError(error);
    }
});

  function handleSubmit() {
    
    let checkErrors = validate();
    let areAllFieldsFalse = checkObject(checkErrors);

    if (!areAllFieldsFalse) {
        // if there are errors
        // set to state and terminate
        setErrors(checkErrors);
        return;
    }


    const data = {
        email : values?.email,
        password: values?.password
    };

    mutation.mutate({
        url: LOGIN_URL,
        payload_data: data
    })

    return
}


  return (
    <Flex position="relative" mb="40px" bgColor={'#fff'}>
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
          >
            <HStack>
              <Avatar
                me={{ md: "22px" }}
                src={avatar4}
                w="100%"
                h="auto"
                borderRadius="15px"
              />
            </HStack>
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Fraud Monitoring System
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color={textColor}
              fontWeight="bold"
              fontSize="14px"
            >
              Enter your email and password to sign in
            </Text>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Email
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="Your email adress"
                size="lg"
                name="email"
                onChange={handleChange}
                isInvalid={isError(errors?.email)}
                errorBorderColor='red.300'
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Password
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                name="password"
                placeholder="Your password"
                size="lg"
                onChange={handleChange}
                isInvalid={isError(errors?.email)}
                errorBorderColor='red.300'
              />
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                isLoading={mutation?.isLoading}
                onClick={handleSubmit}
                fontSize="10px"
                type="submit"
                bg="teal.300"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                _hover={{
                  bg: "teal.200",
                }}
                _active={{
                  bg: "teal.400",
                }}
              >
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link color={titleColor} as="span" ms="5px" fontWeight="bold">
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
