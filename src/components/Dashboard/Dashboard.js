import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Container, 
  Box, 
  VStack, 
  useColorModeValue, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription,
  Button
} from '@chakra-ui/react';
import Navbar from '../Layout/Navbar';
import CostSummary from './CostSummary';
import ItemsList from '../Items/ItemsList';
import OtherCostsList from '../OtherCosts/OtherCostsList';
import { fetchItemsThunk } from '../../store/thunks/itemsThunks';
import { fetchOtherCostsThunk } from '../../store/thunks/otherCostsThunks';
import { setupFirestore } from '../../firebase';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { error: itemsError } = useSelector((state) => state.items);
  const { error: otherCostsError } = useSelector((state) => state.otherCosts);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const [firebaseError, setFirebaseError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        console.log("Dashboard loaded, user authenticated:", user.uid);
        
        try {
          // Try to set up Firestore collections again, just to be sure
          const result = await setupFirestore(user.uid);
          if (!result.success) {
            console.error("Failed to setup Firestore from Dashboard:", result.error);
            setFirebaseError("Failed to initialize database. Please try refreshing the page.");
          }
          
          // Fetch data when dashboard loads
          console.log("Dispatching fetch thunks for user:", user.uid);
          await dispatch(fetchItemsThunk(user.uid));
          await dispatch(fetchOtherCostsThunk(user.uid));
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          setFirebaseError(`Error: ${error.message}`);
        }
      } else {
        console.warn("Dashboard loaded but no user is authenticated");
        setFirebaseError("Not authenticated. Please sign in again.");
      }
    };
    
    fetchData();
  }, [dispatch, user]);
  
  const handleRetry = async () => {
    setFirebaseError(null);
    if (user) {
      try {
        // Try to set up Firestore collections again
        await setupFirestore(user.uid);
        
        // Fetch data
        await dispatch(fetchItemsThunk(user.uid));
        await dispatch(fetchOtherCostsThunk(user.uid));
      } catch (error) {
        console.error("Retry error:", error);
        setFirebaseError(`Retry failed: ${error.message}`);
      }
    }
  };
  
  const showError = firebaseError || itemsError || otherCostsError;
  
  return (
    <Box minH="100vh" bg={bgColor}>
      <Navbar />
      <MotionContainer 
        maxW="container.lg" 
        py={8}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {showError && (
          <Alert status="error" mb={4} borderRadius="md">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{firebaseError || itemsError || otherCostsError}</AlertDescription>
            <Button ml="auto" size="sm" onClick={handleRetry}>Retry</Button>
          </Alert>
        )}
        
        <VStack spacing={8} align="stretch">
          <CostSummary />
          <ItemsList />
          <OtherCostsList />
        </VStack>
      </MotionContainer>
    </Box>
  );
};

export default Dashboard; 