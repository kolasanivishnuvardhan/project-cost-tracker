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
  Icon,
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaPlus, FaReceipt, FaDollarSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTr = motion(Tr);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);

const OtherCostsList = () => {
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [selectedCost, setSelectedCost] = useState(null);
  const [costToDelete, setCostToDelete] = useState(null);
  const cancelRef = React.useRef();
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { otherCosts, loading, error } = useSelector((state) => state.otherCosts);
  
  // Move all color mode values to the top level to avoid conditional Hook calls
  const tableBackground = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('teal.50', 'teal.800');
  const emptyBoxBg = useColorModeValue('teal.50', 'teal.900');
  const thBg = useColorModeValue('gray.50', 'gray.800');
  const thColor = useColorModeValue('gray.600', 'gray.300');
  const alertDialogBorderColor = useColorModeValue('gray.200', 'gray.600');
  const cancelButtonHoverBg = useColorModeValue('gray.100', 'gray.700');
  // Add these color mode values that were previously inside conditionals
  const emptyStateTextColor = useColorModeValue('gray.500', 'gray.400');
  const dollarSignColor = useColorModeValue('green.500', 'green.300');
  const costTextColor = useColorModeValue('green.500', 'green.300');
  const editButtonHoverBg = useColorModeValue('teal.100', 'teal.700');
  const deleteButtonHoverBg = useColorModeValue('red.100', 'red.700');
  
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
      <MotionFlex 
        justify="center" 
        align="center" 
        minH="200px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Spinner 
          size="xl" 
          color="teal.500" 
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
      transition={{ duration: 0.5, delay: 0.1 }}
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
            <Icon as={FaReceipt} color="teal.500" />
          </MotionBox>
          Other Costs
          {otherCosts.length > 0 && (
            <Badge 
              ml={2} 
              colorScheme="teal" 
              borderRadius="full" 
              px={2}
              variant="solid"
            >
              {otherCosts.length}
            </Badge>
          )}
        </MotionHeading>
        <MotionButton 
          leftIcon={<FaPlus />} 
          colorScheme="teal" 
          onClick={handleAddCost}
          size="sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          fontWeight="medium"
          boxShadow="sm"
        >
          Add Other Cost
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
        {otherCosts.length === 0 ? (
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
              <Icon as={FaReceipt} boxSize={12} color="teal.300" />
            </MotionBox>
            <Text color={emptyStateTextColor} fontSize="lg">No other costs added yet. Click "Add Other Cost" to get started.</Text>
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
                    Description
                  </Th>
                  <Th 
                    isNumeric 
                    py={4} 
                    fontWeight="bold" 
                    color={thColor}
                  >
                    Amount
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
                  {otherCosts.map((cost, index) => (
                    <MotionTr 
                      key={cost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                      exit={{ opacity: 0, x: -100 }}
                      _hover={{ bg: hoverBg }}
                      borderBottom="1px solid"
                      borderColor={borderColor}
                    >
                      <Td py={4} fontWeight="medium">{cost.description}</Td>
                      <Td py={4} isNumeric>
                        <MotionFlex 
                          justifyContent="flex-end" 
                          alignItems="center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon as={FaDollarSign} color={dollarSignColor} mr={1} />
                          <Text color={costTextColor} fontWeight="bold">
                            {formatCurrency(cost.amount).replace('$', '')}
                          </Text>
                        </MotionFlex>
                      </Td>
                      <Td py={4}>
                        <HStack spacing={2} justifyContent="flex-end">
                          <IconButton
                            aria-label="Edit cost"
                            icon={<FaEdit />}
                            size="sm"
                            colorScheme="teal"
                            variant="ghost"
                            onClick={() => handleEditCost(cost)}
                            _hover={{ bg: editButtonHoverBg, transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                          />
                          <IconButton
                            aria-label="Delete cost"
                            icon={<FaTrash />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDeleteClick(cost)}
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
              Delete Other Cost
            </AlertDialogHeader>

            <AlertDialogBody py={6}>
              Are you sure you want to delete this cost? This action cannot be undone.
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

export default OtherCostsList; 