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
    Input,
    Td,
    Button,
    useColorModeValue,
    Avatar,
    Stack,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/react";
  
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {  CHANGE_PASSWORD, GET_USERS } from '../../config/serverUrls';
import { useSelector } from 'react-redux';
import { getAuthToken, getAuthUser } from "modules/auth/redux/authSelector";
import { handleApiError } from "modules/utilities/responseHandlers";
import avatar4 from "assets/img/avatars/avatar4.png";
import { postData } from 'modules/utilities/util_query';
import { checkObject, isError } from 'modules/utilities';
import { FIELD_REQUIRED } from 'constants/formErrorMessages';
import { useMutation } from  'react-query';
import toast from 'react-hot-toast';

const Settings = (props) => {
    
    const textColor = useColorModeValue("gray.700", "white");
    const token = useSelector(getAuthToken);
    const user = useSelector(getAuthUser);

    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});

    function validate() {
        let uerrors = {}
        uerrors.oldPassword = values?.oldPassword ? "" : FIELD_REQUIRED;
        uerrors.newPassword = values?.newPassword ? "" : FIELD_REQUIRED;
        uerrors.confirmPassword = values?.confirmPassword ? "" : FIELD_REQUIRED;

        if ( values?.newPassword != values?.confirmPassword ){
            uerrors.newPassword = "Password do not match";
            uerrors.confirmPassword = "Password do not match";
            alert('Passwords do not match');
        }
    
        return uerrors;
    }

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    const mutation = useMutation(postData, {
        onSuccess: (response) => {
           toast.success("Successful");
           // comment: you can choose to logout 
           // the user at this point, and force
           // them to log back in
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
            old_password : values?.oldPassword,
            new_password: values?.newPassword
        };
    
        mutation.mutate({
            url: CHANGE_PASSWORD,
            payload_data: data,
            authenticate: true,
            token,
        })
    
        return
    }
    


    const emailColor = useColorModeValue("gray.400", "gray.300");    


    return (
        <>
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                    <CardHeader p="6px 0px 22px 0px">
                    <Stack>
                        <Text fontSize="xl" color={textColor} fontWeight="bold">
                            {`User Profile`}
                        </Text>
                    </Stack>  
                    </CardHeader>
                    <CardBody>
                    
                        <Flex
                        align="center"
                        mb={{ sm: "10px", md: "0px" }}
                        direction={{ sm: "column", md: "row" }}
                        w={{ sm: "100%" }}
                        textAlign={{ sm: "center", md: "start" }}
                        >
                        <Avatar
                            me={{ md: "22px" }}
                            src={avatar4}
                            w="180px"
                            h="180px"
                            borderRadius="15px"
                        />
                        <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                            <Text
                            fontSize={{ sm: "lg", lg: "xl" }}
                            color={textColor}
                            fontWeight="bold"
                            ms={{ sm: "8px", md: "0px" }}
                            >
                            {`Full Name: ${user?.user?.last_name} ${user?.user?.first_name}`}
                            </Text>
                            <Text
                            fontSize={{ sm: "sm", md: "md" }}
                            color={emailColor}
                            fontWeight="semibold"
                            >
                            {`Email: ${user?.user?.email}`}
                            </Text>
                            <Text
                            fontSize={{ sm: "sm", md: "md" }}
                            color={emailColor}
                            fontWeight="semibold"
                            >
                            {`Department: ${user?.user?.dept}`}
                            </Text>
                        </Flex>
                        </Flex> 
                       
                        
                    </CardBody>
                </Card>
                <Card overflowX={{ sm: "scroll", xl: "hidden" }} my={'1%'}>
                    <CardHeader p="6px 0px 22px 0px">
                    <Stack>
                        <Text fontSize="xl" color={textColor} fontWeight="bold">
                            {`Change Password`}
                        </Text>
                    </Stack>  
                    </CardHeader>
                    <CardBody>
                        <Flex
                        align="center"
                        mb={{ sm: "10px", md: "0px" }}
                        direction={{ sm: "column", md: "row" }}
                        w={{ sm: "100%" }}
                        textAlign={{ sm: "center", md: "start" }}
                        >
                        <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                            <FormControl>
                                <FormLabel>Old Password</FormLabel>
                                <Input 
                                    type='password' 
                                    isInvalid={isError(errors?.oldPassword)}
                                    errorBorderColor='red.300'
                                    placeholder={'old password'}
                                    name={'oldPassword'}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input 
                                 type='password' 
                                 isInvalid={isError(errors?.newPassword)}
                                 errorBorderColor='red.300'
                                 placeholder={'new password'}
                                 name={'newPassword'}
                                 onChange={handleChange}
                                 />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input 
                                    type='password' 
                                    isInvalid={isError(errors?.confirmPassword)}
                                    errorBorderColor='red.300'
                                    placeholder={'confirm password'}
                                    name={'confirmPassword'}
                                    onChange={handleChange}
                                />
                                <FormHelperText>ensure both password match.</FormHelperText>
                            </FormControl>
                            <Flex>
                            <Button
                                colorScheme='teal'
                                size='md'
                                my=""
                                isLoading={mutation?.isLoading}
                                onClick={handleSubmit}
                             >
                                    Submit
                            </Button>
                        </Flex>
                        </Flex>
                        </Flex>        
                    </CardBody>
                </Card>
            </Flex>
        </>
    )
};


export default Settings;