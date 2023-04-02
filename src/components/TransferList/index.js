import { useState } from "react";
import { Box, Button, Text, Stack, VStack, HStack, Flex } from "@chakra-ui/react";

const TransferList = ({ items, onChange }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [unselectedItems, setUnselectedItems] = useState(items);

  const handleSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setUnselectedItems(unselectedItems.filter((i) => i !== item));
  };

  const handleUnselect = (item) => {
    setUnselectedItems([...unselectedItems, item]);
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  const handleSelectAll = () => {
    setSelectedItems([...selectedItems, ...unselectedItems]);
    setUnselectedItems([]);
  };

  const handleUnselectAll = () => {
    setUnselectedItems([...unselectedItems, ...selectedItems]);
    setSelectedItems([]);
  };

  const handleSubmit = () => {
    onChange(selectedItems);
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
                key={item}
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
                key={item}
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
