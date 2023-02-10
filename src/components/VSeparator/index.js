import { Flex } from "@chakra-ui/react";
import React from "react";


const VSeparator = (props) => {
    const { variant, children, ...rest } = props;
    return <Flex w='1px' bg='rgba(135, 140, 189, 0.3)' {...rest}></Flex>;
  };
  
export { VSeparator };