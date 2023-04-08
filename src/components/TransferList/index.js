import { useState } from "react";
import { Box, Button, Text, Stack, VStack, HStack, Flex } from "@chakra-ui/react";

const TransferList = ({ items, onChange, selectedUsers, setSelectedUsers }) => {
  const [selectedItems, setSelectedItems] = useState(selectedUsers);
  const [unselectedItems, setUnselectedItems] = useState(items);

  const handleSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setSelectedUsers([...selectedItems, item]);
    setUnselectedItems(unselectedItems.filter((i) => i !== item));
  };

  const handleUnselect = (item) => {
    setUnselectedItems([...unselectedItems, item]);
    setSelectedUsers(selectedItems.filter((i) => i !== item));
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const handleSelectAll = () => {
    setSelectedItems([...selectedItems, ...unselectedItems]);
    setSelectedUsers([...selectedItems, ...unselectedItems]);
    setUnselectedItems([]);
  };

  const handleUnselectAll = () => {
    setUnselectedItems([...unselectedItems, ...selectedItems]);
    setSelectedUsers([]);
    setSelectedItems([]);
  };



  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between">
        <Box w="48%">
          <HStack justify="space-between">
            <Text fontWeight="bold">Selected Items</Text>
            <Button size="sm" onClick={handleUnselectAll}>
              Remove All
            </Button>
          </HStack>
          <Box borderWidth="1px" borderRadius="md" p={2}>
            {selectedItems.map((item) => (
              <Stack
                key={item?.id}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Text>{item?.email}</Text>
                <Button size="sm" onClick={() => handleUnselect(item)}>
                  Remove
                </Button>
              </Stack>
            ))}
          </Box>
        </Box>
        <Box w="48%">
          <HStack justify="space-between">
            <Text fontWeight="bold">Unselected Items</Text>
            <Button size="sm" onClick={handleSelectAll}>
              Add All
            </Button>
          </HStack>
          <Box borderWidth="1px" borderRadius="md" p={2}>
            {unselectedItems.map((item) => (
              <Stack
                key={item?.id}
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Text>{item?.email}</Text>
                <Button size="sm" onClick={() => handleSelect(item)}>
                  Add
                </Button>
              </Stack>
            ))}
          </Box>
        </Box>
      </Flex>
    </VStack>
  );
};

export default TransferList;
