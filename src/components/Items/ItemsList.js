import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsThunk, deleteItemThunk } from '../../store/thunks/itemsThunks';
import ItemForm from './ItemForm';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  useDisclosure,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  Flex,
  Spinner,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);

const ItemsList = () => {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const cancelRef = React.useRef();
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error } = useSelector((state) => state.items);
  
  const tableBackground = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsThunk(user.uid));
    }
  }, [dispatch, user]);
  
  const handleEditItem = (item) => {
    setSelectedItem(item);
    onFormOpen();
  };
  
  const handleAddItem = () => {
    setSelectedItem(null);
    onFormOpen();
  };
  
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    onDeleteOpen();
  };
  
  const handleDeleteConfirm = async () => {
    if (itemToDelete && user) {
      await dispatch(deleteItemThunk(user.uid, itemToDelete.id));
      onDeleteClose();
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (loading && items.length === 0) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }
  
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      mb={8}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md" display="flex" alignItems="center">
          Items
          {items.length > 0 && (
            <Badge ml={2} colorScheme="blue" borderRadius="full" px={2}>
              {items.length}
            </Badge>
          )}
        </Heading>
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="blue" 
          onClick={handleAddItem}
          size="sm"
        >
          Add Item
        </Button>
      </Flex>
      
      {error && (
        <Text color="red.500" mb={4}>
          Error: {error}
        </Text>
      )}
      
      {items.length === 0 ? (
        <Box 
          p={4} 
          borderWidth={1} 
          borderRadius="md" 
          borderStyle="dashed"
          borderColor={borderColor}
          textAlign="center"
        >
          <Text color="gray.500">No items added yet. Click "Add Item" to get started.</Text>
        </Box>
      ) : (
        <Box 
          borderWidth={1} 
          borderRadius="lg" 
          overflow="hidden"
          boxShadow="sm"
          bg={tableBackground}
        >
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th isNumeric>Cost</Th>
                <Th width="100px">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <MotionTr 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  _hover={{ bg: hoverBg }}
                >
                  <Td>{item.name}</Td>
                  <Td isNumeric>{formatCurrency(item.cost)}</Td>
                  <Td>
                    <HStack spacing={2} justifyContent="flex-end">
                      <IconButton
                        aria-label="Edit item"
                        icon={<FaEdit />}
                        size="sm"
                        colorScheme="blue"
                        variant="ghost"
                        onClick={() => handleEditItem(item)}
                      />
                      <IconButton
                        aria-label="Delete item"
                        icon={<FaTrash />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(item)}
                      />
                    </HStack>
                  </Td>
                </MotionTr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      
      {/* Item Form Modal */}
      <ItemForm 
        isOpen={isFormOpen} 
        onClose={onFormClose} 
        item={selectedItem} 
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </MotionBox>
  );
};

export default ItemsList; 