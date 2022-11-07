import React from 'react';
import { Input } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Select
  } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import {
    Button
  } from "@chakra-ui/react";
import { BsFileLockFill } from 'react-icons/bs';

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
    fireOnSearch=()=>{},
    handleChange=()=>{},
    closeFilterBox=()=>{},
}) => {

        const showFilterCard = (fields) => {
            return fields.filter(filter => filter.isSelected == true).length > 0 ? true : false;
        }

        const isItemChecked = (field) => {
            const queriedItem = fields.filter(filter => filter.id == field.id);
            if (queriedItem.length > 0) {
                return queriedItem[0].isSelected;
            }
            return false;
        }

        return (
            <div>
                <div>
                    <Menu closeOnSelect={false}>
                        <MenuButton as={Button} colorScheme='teal'>
                            Select Filter    
                        </MenuButton>
                        <MenuList minWidth='240px'>
                        <MenuOptionGroup title='Choose Filters' type='checkbox'>
                            {  fields.map((field, index) => {
                                    return (
                                        <MenuItemOption 
                                            onClick={() => {onItemSelected(field)}}
                                            value={field.id}
                                            isChecked={isItemChecked(field)}
                                            key={index}
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
                {
                    showFilterCard(fields) && (
                        <Wrap spacing='24px' p={4} bg="#fff" m={2} borderRadius={4}> 
                            { fields.filter(field=>field.isSelected==true).map((field, index={key})=>{
                                switch (field.fieldType) {
                                    case 'text':
                                        return (
                                            <>
                                            <WrapItem>
                                                <Input
                                                    key={index}
                                                    placeholder={field.fieldName}
                                                    width='auto' 
                                                    name={field.fieldName}
                                                    value={field.fieldValue}
                                                    onChange={(event) => handleChange(event, field)}
                                                />
                                            </WrapItem>
                                            </>
                                        )
                                    case 'date':
                                        return (
                                            <>
                                                <WrapItem>
                                                <Input 
                                                    key={index}
                                                    placeholder={field.fieldName}
                                                    width='auto' 
                                                    type='date' 
                                                    name={field.fieldName}
                                                    value={field.fieldValue}
                                                    onChange={(event) => handleChange(event, field)}
                                                />
                                                </WrapItem>
                                            </>
                                        )
                                    case 'select':
                                        return (
                                            <>
                                                <WrapItem>
                                                    <Select 
                                                        key={index}
                                                        placeholder={`Select ${field.fieldName}`}
                                                        onChange={(event) => { handleChange(event, field) }}
                                                        >
                                                        <>
                                                            {field.children.map((childOption, index)=>{
                                                                return (
                                                                    <option
                                                                    key={childOption?.id}
                                                                    value={`${childOption?.value}`}>
                                                                        {childOption?.name}
                                                                    </option>       
                                                                );
                                                            }
                                                            )}
                                                        </>    
                                                    </Select>
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
                            <Button
                            colorScheme='teal'
                            onClick={closeFilterBox}
                            >
                                Close
                            </Button>
                            </Wrap>
                )

                }
                
            </div>
        )
}

export default Filter;