import React from 'react';
import { Input } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
  } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import {
    Button
  } from "@chakra-ui/react";

/**
 * 
 * {
 *   fieldName: '',
 *   fieldType: '',
 *   isSelected: false,
 *   fieldQueryName: '',
 *   fieldValue: '',
 * }
 * 
 */

const defaultFields = []

const Filter = ({
    fields=defaultFields,
    onItemSelected=()=>{},
    fireOnSearch=()=>{}
}) => {
        return (
            <div>
                <div>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} colorScheme='teal'>
                            Select Filter    
                        </MenuButton>
                        <MenuList minWidth='240px'>
                        <MenuOptionGroup title='Choose Filters' type='checkbox'>
                            {  fields.map(field => {
                                    return (
                                        <MenuItemOption 
                                            onClick={(field) => {onItemSelected(field)}}
                                            value={field.id}
                                        >
                                            {field.fieldName}
                                        </MenuItemOption>
                                    )
                                }) 
                            }
                        </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </div>
                {/** build out the field to filter with */}
                <Wrap spacing='24px' p={4} bg="#fff" m={2} borderRadius={4}> 
                { fields.map((field)=>{
                    switch (field.fieldType) {
                        case 'text':
                            return (
                                <>
                                  <WrapItem>
                                    <Input
                                        placeholder={field.fieldName}
                                        width='auto' 
                                    />
                                  </WrapItem>
                                </>
                            )
                        case 'date':
                            return (
                                <>
                                    <WrapItem>
                                    <Input 
                                        placeholder={field.fieldName}
                                        width='auto' 
                                        type='date' 
                                    />
                                    </WrapItem>
                                </>
                            )
                    }
                }) 
                }
                 <Button
                   colorScheme='teal'
                   onClick={fireOnSearch}
                >
                    Apply
                </Button>
                </Wrap>
            </div>
        )
}

export default Filter;