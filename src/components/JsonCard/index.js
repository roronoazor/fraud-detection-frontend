import React from 'react';
import { 
Wrap,
Heading,
WrapItem,
Center, 
Divider
} from '@chakra-ui/react';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


const JsonCard = (props) => {

    const { response, title } = props;

    return (
        <Card sx={{ border: '1px', borderColor: 'gray.200' }}>
            <CardHeader>
                <Heading size='xs'>{title}</Heading>
            </CardHeader>
            <Divider orientation='horizontal' />
            <Wrap>
                <WrapItem>
                    <Center w='180px' h='50px'>
                    Box 1
                    </Center>
                </WrapItem>
                <WrapItem>
                    <Center w='180px' h='50px'>
                    Box 2
                    </Center>
                </WrapItem>
                <WrapItem>
                    <Center w='180px' h='50px'>
                    Box 3
                    </Center>
                </WrapItem>
                <WrapItem>
                    <Center w='180px' h='50px'>
                    Box 4
                    </Center>
                </WrapItem>
            </Wrap>
        </Card>
    );

};


export default JsonCard;