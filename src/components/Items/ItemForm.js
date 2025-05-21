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
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemThunk, updateItemThunk } from '../../store/thunks/itemsThunks';
import { motion } from 'framer-motion';

const MotionModalContent = motion(ModalContent);

const ItemForm = ({ isOpen, onClose, item = null }) => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.items);
  const toast = useToast();
  
  // Set initial values if editing an existing item
  useEffect(() => {
    if (item) {
      setName(item.name);
      setCost(item.cost.toString());
    } else {
      // Reset form if adding a new item
      setName('');
      setCost('');
    }
  }, [item, isOpen]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !cost) {
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
      if (item) {
        // Update existing item
        await dispatch(updateItemThunk(user.uid, item.id, name, cost));
        toast({
          title: 'Success',
          description: 'Item updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Add new item
        await dispatch(addItemThunk(user.uid, name, cost));
        toast({
          title: 'Success',
          description: 'Item added successfully',
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
          <ModalHeader>{item ? 'Edit Item' : 'Add New Item'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Item Name</FormLabel>
                <Input
                  placeholder="Enter item name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Cost</FormLabel>
                <NumberInput min={0} precision={2}>
                  <NumberInputField
                    placeholder="Enter cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
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
              colorScheme="blue" 
              type="submit"
              isLoading={loading}
            >
              {item ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </form>
      </MotionModalContent>
    </Modal>
  );
};

export default ItemForm; 