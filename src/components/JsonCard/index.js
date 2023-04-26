import React from 'react';
import { 
Wrap,
Heading,
WrapItem,
Stack,
Divider,
Text
} from '@chakra-ui/react';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { camelCaseToWords, formatCurrencyNumber } from "modules/utilities";

const JsonCard = (props) => {

    const { response, title } = props;
    let responseKeys;

    if ( response == null || response == undefined ) {
        responseKeys = [];
    }else{
        responseKeys = Object.keys(response);
    }

    if (responseKeys.length <= 0) {
        return (
            <></>
        );
    }

    responseKeys = responseKeys.filter(key => !(typeof response[key] === "object" && response[key] !== null) ); 

    return (
        <Card sx={{ border: '1px', borderColor: 'gray.200' }}>
            <CardHeader>
                <Heading size='xs'>{title}</Heading>
            </CardHeader>
            <Divider orientation='horizontal' m={1} />
            <Wrap spacing='30px'>
                {responseKeys.map((item, index)=>{
                    let itemLabel = item;
                    if (item == 'rrn'){
                        itemLabel = 'RRN';
                    }else if(item == 'STAN' || item == 'PAN' || item == 'MTI'){
                        itemLabel = item;
                    }else{
                        itemLabel = camelCaseToWords(item);
                    }

                   

                    return (
                        <WrapItem key={index}>
                            <Stack direction="column">
                                <Text as="b">{itemLabel}</Text>
                                {
                                    itemLabel.toUpperCase().includes('AMOUNT') ? (
                                        <Text as="samp"><span>&#8358;</span>{formatCurrencyNumber(response[item])}</Text>
                                    ) : (
                                        <Text as="samp">{response[item] || '-'}</Text>
                                    )
                                }
                                
                            </Stack>
                        </WrapItem>
    
                    )
                })}
            </Wrap>
        </Card>
    );

};


export default JsonCard;