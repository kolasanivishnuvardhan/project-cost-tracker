import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  VStack,
  NumberInput,
  NumberInputField,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addOtherCostThunk, updateOtherCostThunk } from '../../store/thunks/otherCostsThunks';
import { motion } from 'framer-motion';

const MotionModalContent = motion(ModalContent);

const OtherCostForm = ({ isOpen, onClose, cost = null }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.otherCosts);
  const toast = useToast();
  
  // Set initial values if editing an existing cost
  useEffect(() => {
    if (cost) {
      setDescription(cost.description);
      setAmount(cost.amount.toString());
    } else {
      // Reset form if adding a new cost
      setDescription('');
      setAmount('');
    }
  }, [cost, isOpen]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description || !amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      if (cost) {
        // Update existing cost
        await dispatch(updateOtherCostThunk(user.uid, cost.id, description, amount));
        toast({
          title: 'Success',
          description: 'Cost updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new cost
        await dispatch(addOtherCostThunk(user.uid, description, amount));
        toast({
          title: 'Success',
          description: 'Cost added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <MotionModalContent
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <ModalHeader>{cost ? 'Edit Other Cost' : 'Add Other Cost'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter cost description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  resize="vertical"
                  rows={3}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Amount</FormLabel>
                <NumberInput min={0} precision={2}>
                  <NumberInputField
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="teal" 
              type="submit"
              isLoading={loading}
            >
              {cost ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </form>
      </MotionModalContent>
    </Modal>
  );
};

export default OtherCostForm; 