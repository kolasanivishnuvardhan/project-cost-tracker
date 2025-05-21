import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const CostSummary = () => {
  const { items } = useSelector((state) => state.items);
  const { otherCosts } = useSelector((state) => state.otherCosts);
  
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.400, pink.400)',
    'linear(to-r, purple.500, pink.500)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.800');
  
  // Calculate totals
  const calculations = useMemo(() => {
    const itemsTotal = items.reduce((sum, item) => sum + Number(item.cost), 0);
    const otherCostsTotal = otherCosts.reduce((sum, cost) => sum + Number(cost.amount), 0);
    const total = itemsTotal + otherCostsTotal;
    
    return {
      itemsTotal,
      otherCostsTotal,
      total
    };
  }, [items, otherCosts]);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      mb={8}
    >
      <Box 
        borderRadius="xl" 
        boxShadow="lg" 
        p={6}
        bgGradient={bgGradient}
        color="white"
        overflow="hidden"
        position="relative"
      >
        <Stat>
          <StatLabel fontSize="lg" fontWeight="medium">
            Total Project Cost
          </StatLabel>
          <StatNumber fontSize="4xl" fontWeight="bold">
            {formatCurrency(calculations.total)}
          </StatNumber>
          <StatHelpText color="whiteAlpha.800" fontWeight="medium">
            A breakdown of your project expenses
          </StatHelpText>
        </Stat>
      </Box>
      
      <Flex 
        mt={4} 
        gap={4} 
        direction={{ base: 'column', md: 'row' }}
      >
        <MotionBox
          flex="1"
          p={4}
          borderRadius="lg"
          bg={cardBg}
          boxShadow="md"
          borderWidth={1}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Stat>
            <StatLabel color="blue.500" fontWeight="medium">Items Total</StatLabel>
            <StatNumber fontSize="2xl">{formatCurrency(calculations.itemsTotal)}</StatNumber>
            <StatHelpText>{items.length} items</StatHelpText>
          </Stat>
        </MotionBox>
        
        <MotionBox
          flex="1"
          p={4}
          borderRadius="lg"
          bg={cardBg}
          boxShadow="md"
          borderWidth={1}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Stat>
            <StatLabel color="teal.500" fontWeight="medium">Other Costs Total</StatLabel>
            <StatNumber fontSize="2xl">{formatCurrency(calculations.otherCostsTotal)}</StatNumber>
            <StatHelpText>{otherCosts.length} other costs</StatHelpText>
          </Stat>
        </MotionBox>
      </Flex>
    </MotionBox>
  );
};

export default CostSummary; 