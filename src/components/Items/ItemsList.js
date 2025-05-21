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
  Icon,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaDollarSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

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
  const hoverBg = useColorModeValue('blue.50', 'blue.800');
  const emptyBoxBg = useColorModeValue('blue.50', 'blue.900');
  const thBg = useColorModeValue('gray.50', 'gray.800');
  const thColor = useColorModeValue('gray.600', 'gray.300');
  const alertDialogBorderColor = useColorModeValue('gray.200', 'gray.600');
  const cancelButtonHoverBg = useColorModeValue('gray.100', 'gray.700');
  const emptyStateTextColor = useColorModeValue('gray.500', 'gray.400');
  const dollarSignColor = useColorModeValue('green.500', 'green.300');
  const costTextColor = useColorModeValue('green.500', 'green.300');
  const editButtonHoverBg = useColorModeValue('blue.100', 'blue.700');
  const deleteButtonHoverBg = useColorModeValue('red.100', 'red.700');
  
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
      <MotionFlex 
        justify="center" 
        align="center" 
        minH="200px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner 
          size="xl" 
          color="blue.500" 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
        />
      </MotionFlex>
    );
  }
  
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      mb={8}
    >
      <MotionFlex 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MotionHeading 
          size="md" 
          display="flex" 
          alignItems="center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <MotionBox
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            display="inline-flex"
            mr={2}
          >
            <Icon as={FaBoxOpen} color="blue.500" />
          </MotionBox>
          Items
          {items.length > 0 && (
            <Badge 
              ml={2} 
              colorScheme="blue" 
              borderRadius="full" 
              px={2}
              variant="solid"
            >
              {items.length}
            </Badge>
          )}
        </MotionHeading>
        <MotionButton 
          leftIcon={<FaPlus />} 
          colorScheme="blue" 
          onClick={handleAddItem}
          size="sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          fontWeight="medium"
          boxShadow="sm"
        >
          Add Item
        </MotionButton>
      </MotionFlex>
      
      {error && (
        <MotionBox
          p={4}
          color="red.500"
          mb={4}
          bg="red.50"
          borderRadius="md"
          borderLeft="4px solid"
          borderColor="red.500"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <Text>Error: {error}</Text>
        </MotionBox>
      )}
      
      <AnimatePresence>
        {items.length === 0 ? (
          <MotionBox 
            p={8} 
            borderWidth={2} 
            borderRadius="lg" 
            borderStyle="dashed"
            borderColor={borderColor}
            textAlign="center"
            bg={emptyBoxBg}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ boxShadow: "md" }}
          >
            <MotionBox
              animate={{ 
                y: [0, -10, 0],
                transition: { repeat: Infinity, duration: 2 }
              }}
              mb={4}
            >
              <Icon as={FaBoxOpen} boxSize={12} color="blue.300" />
            </MotionBox>
            <Text color={emptyStateTextColor} fontSize="lg">No items added yet. Click "Add Item" to get started.</Text>
          </MotionBox>
        ) : (
          <MotionBox 
            borderWidth={1} 
            borderRadius="lg" 
            overflow="hidden"
            boxShadow="md"
            bg={tableBackground}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ boxShadow: "lg" }}
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr bg={thBg}>
                  <Th 
                    py={4} 
                    fontWeight="bold" 
                    color={thColor}
                  >
                    Item Name
                  </Th>
                  <Th 
                    isNumeric 
                    py={4} 
                    fontWeight="bold" 
                    color={thColor}
                  >
                    Cost
                  </Th>
                  <Th 
                    width="100px" 
                    py={4} 
                    fontWeight="bold" 
                    color={thColor}
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <AnimatePresence>
                  {items.map((item, index) => (
                    <MotionTr 
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                      exit={{ opacity: 0, x: -100 }}
                      _hover={{ bg: hoverBg }}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Td py={4} fontWeight="medium">{item.name}</Td>
                      <Td py={4} isNumeric>
                        <MotionFlex 
                          justifyContent="flex-end" 
                          alignItems="center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon as={FaDollarSign} color={dollarSignColor} mr={1} />
                          <Text color={costTextColor} fontWeight="bold">
                            {formatCurrency(item.cost).replace('$', '')}
                          </Text>
                        </MotionFlex>
                      </Td>
                      <Td py={4}>
                        <HStack spacing={2} justifyContent="flex-end">
                          <IconButton
                            aria-label="Edit item"
                            icon={<FaEdit />}
                            size="sm"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => handleEditItem(item)}
                            _hover={{ bg: editButtonHoverBg, transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                          />
                          <IconButton
                            aria-label="Delete item"
                            icon={<FaTrash />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteClick(item)}
                            _hover={{ bg: deleteButtonHoverBg, transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                          />
                        </HStack>
                      </Td>
                    </MotionTr>
                  ))}
                </AnimatePresence>
              </Tbody>
            </Table>
          </MotionBox>
        )}
      </AnimatePresence>
      
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
        motionPreset="slideInBottom"
      >
        <AlertDialogOverlay>
          <MotionBox
            as={AlertDialogContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            borderRadius="lg"
            boxShadow="xl"
          >
            <AlertDialogHeader 
              fontSize="lg" 
              fontWeight="bold" 
              borderBottomWidth="1px"
              borderColor={alertDialogBorderColor}
            >
              Delete Item
            </AlertDialogHeader>

            <AlertDialogBody py={6}>
              Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button 
                ref={cancelRef} 
                onClick={onDeleteClose}
                fontWeight="medium"
                variant="outline"
                _hover={{ bg: cancelButtonHoverBg }}
              >
                Cancel
              </Button>
              <MotionButton 
                colorScheme="red" 
                onClick={handleDeleteConfirm} 
                ml={3}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                fontWeight="medium"
              >
                Delete
              </MotionButton>
            </AlertDialogFooter>
          </MotionBox>
        </AlertDialogOverlay>
      </AlertDialog>
    </MotionBox>
  );
};

export default ItemsList; 