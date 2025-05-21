import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherCostsThunk, deleteOtherCostThunk } from '../../store/thunks/otherCostsThunks';
import OtherCostForm from './OtherCostForm';
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

const OtherCostsList = () => {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedCost, setSelectedCost] = useState(null);
  const [costToDelete, setCostToDelete] = useState(null);
  const cancelRef = React.useRef();
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { otherCosts, loading, error } = useSelector((state) => state.otherCosts);
  
  const tableBackground = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.600');
  
  useEffect(() => {
    if (user) {
      dispatch(fetchOtherCostsThunk(user.uid));
    }
  }, [dispatch, user]);
  
  const handleEditCost = (cost) => {
    setSelectedCost(cost);
    onFormOpen();
  };
  
  const handleAddCost = () => {
    setSelectedCost(null);
    onFormOpen();
  };
  
  const handleDeleteClick = (cost) => {
    setCostToDelete(cost);
    onDeleteOpen();
  };
  
  const handleDeleteConfirm = async () => {
    if (costToDelete && user) {
      await dispatch(deleteOtherCostThunk(user.uid, costToDelete.id));
      onDeleteClose();
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  if (loading && otherCosts.length === 0) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }
  
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      mb={8}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md" display="flex" alignItems="center">
          Other Costs
          {otherCosts.length > 0 && (
            <Badge ml={2} colorScheme="teal" borderRadius="full" px={2}>
              {otherCosts.length}
            </Badge>
          )}
        </Heading>
        <Button 
          leftIcon={<FaPlus />} 
          colorScheme="teal" 
          onClick={handleAddCost}
          size="sm"
        >
          Add Other Cost
        </Button>
      </Flex>
      
      {error && (
        <Text color="red.500" mb={4}>
          Error: {error}
        </Text>
      )}
      
      {otherCosts.length === 0 ? (
        <Box 
          p={4} 
          borderWidth={1} 
          borderRadius="md" 
          borderStyle="dashed"
          borderColor={borderColor}
          textAlign="center"
        >
          <Text color="gray.500">No other costs added yet. Click "Add Other Cost" to get started.</Text>
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
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th width="100px">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {otherCosts.map((cost) => (
                <MotionTr 
                  key={cost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  _hover={{ bg: hoverBg }}
                >
                  <Td>{cost.description}</Td>
                  <Td isNumeric>{formatCurrency(cost.amount)}</Td>
                  <Td>
                    <HStack spacing={2} justifyContent="flex-end">
                      <IconButton
                        aria-label="Edit cost"
                        icon={<FaEdit />}
                        size="sm"
                        colorScheme="teal"
                        variant="ghost"
                        onClick={() => handleEditCost(cost)}
                      />
                      <IconButton
                        aria-label="Delete cost"
                        icon={<FaTrash />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteClick(cost)}
                      />
                    </HStack>
                  </Td>
                </MotionTr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
      
      {/* Other Cost Form Modal */}
      <OtherCostForm 
        isOpen={isFormOpen} 
        onClose={onFormClose} 
        cost={selectedCost} 
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
              Delete Other Cost
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this cost? This action cannot be undone.
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

export default OtherCostsList; 