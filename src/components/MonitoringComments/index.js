import React from "react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {
    List,
    ListItem,
    ListIcon,
    Divider,
    Heading,
    Text, 
    Center
  } from '@chakra-ui/react';
  import { WarningIcon } from '@chakra-ui/icons';
  import { firstLetterUpper } from "modules/utilities";


  const MonitoringComments = (props) => {

    const  { title, transaction } = props;
    const comments = (transaction?.monitoring_comments || '').split('&');
      
    return (
        <Card sx={{ border: '1px', borderColor: 'gray.200' }}>
        <CardHeader>
            <Heading size='xs'>{title}</Heading>
        </CardHeader>
        <Divider orientation='horizontal' m={1} />
        <CardBody>
            {(comments.length > 0 && comments[0] != '') && (
                 <List spacing={3}>
                    {comments.map((comment, index) => {
                        return (
                            <ListItem>
                                <ListIcon key={index} as={WarningIcon} color='red.500' />
                                <Text as="samp">{firstLetterUpper(comment)}</Text>
                            </ListItem>
                        )
                    })}
                 </List>
            )}
           {((comments.length <= 1 && comments[0] == '')) && (
            <Center>
                <Text as="samp">
                    No Comments.
                </Text>
            </Center>
           )}
        </CardBody>
    </Card>
    );
};


export default MonitoringComments;
