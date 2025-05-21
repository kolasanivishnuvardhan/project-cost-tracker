import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../../store/thunks/authThunks';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  HStack,
  Image,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
const MotionInput = motion(Input);

const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.400, purple.500)', 
    'linear(to-r, blue.600, purple.700)'
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password should be at least 6 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      await dispatch(registerUserThunk(email, password, name));
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error is handled in the thunk and displayed from the state
    }
  };

  return (
    <Container maxW="md" py={8}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        p={8}
        borderWidth={1}
        borderRadius="xl"
        boxShadow="xl"
        bg={bgColor}
        borderColor={borderColor}
        overflow="hidden"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          top: -5,
          left: 0,
          right: 0,
          height: "8px",
          bgGradient: gradientBg,
        }}
      >
        <VStack spacing={6} align="stretch">
          {/* Logo and app title */}
          <MotionBox
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            textAlign="center"
            mb={2}
          >
            <MotionBox
              display="inline-flex"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                repeatType: "loop"
              }}
              mb={2}
            >
              <Image 
                src="/karkhana-logo.png" 
                alt="Karkhana Logo"
                w={{ base: 24, md: 32 }}
                h={{ base: 24, md: 32 }}
                objectFit="contain"
              />
            </MotionBox>
            <MotionHeading
              as="h1"
              bgGradient={gradientBg}
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
              textAlign="center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Project Cost Tracker
            </MotionHeading>
          </MotionBox>
          
          <Heading as="h2" size="md" textAlign="center" color="gray.500" mb={2}>
            Create an Account
          </Heading>
          
          {error && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              p={3}
              bg="red.50"
              color="red.500"
              borderRadius="md"
              borderLeft="4px solid"
              borderColor="red.500"
            >
              <Text>{error}</Text>
            </MotionBox>
          )}
          
          <form onSubmit={handleRegister}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel fontWeight="medium">Name</FormLabel>
                <MotionInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  variant="filled"
                  size="lg"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  _focus={{ borderColor: "purple.400", bg: "whiteAlpha.900" }}
                />
              </FormControl>
              
              <FormControl id="email" isRequired>
                <FormLabel fontWeight="medium">Email</FormLabel>
                <MotionInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  variant="filled"
                  size="lg"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  _focus={{ borderColor: "purple.400", bg: "whiteAlpha.900" }}
                />
              </FormControl>
              
              <FormControl id="password" isRequired>
                <FormLabel fontWeight="medium">Password</FormLabel>
                <InputGroup size="lg">
                  <MotionInput
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    variant="filled"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    _focus={{ borderColor: "purple.400", bg: "whiteAlpha.900" }}
                  />
                  <InputRightElement width="4rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      colorScheme="purple"
                      _hover={{ bg: 'purple.50' }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <FormControl id="confirmPassword" isRequired>
                <FormLabel fontWeight="medium">Confirm Password</FormLabel>
                <InputGroup size="lg">
                  <MotionInput
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    variant="filled"
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    _focus={{ borderColor: "purple.400", bg: "whiteAlpha.900" }}
                  />
                  <InputRightElement width="4rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      variant="ghost"
                      colorScheme="purple"
                      _hover={{ bg: 'purple.50' }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <MotionButton
                type="submit"
                colorScheme="purple"
                width="full"
                mt={4}
                isLoading={loading}
                loadingText="Registering"
                size="lg"
                rightIcon={<FaUserPlus />}
                fontWeight="bold"
                boxShadow="md"
                whileHover={{ scale: 1.03, boxShadow: "0px 6px 12px rgba(160, 96, 206, 0.3)" }} 
                whileTap={{ scale: 0.97 }}
              >
                Register
              </MotionButton>
            </VStack>
          </form>
          
          <HStack justify="center" mt={4}>
            <Text fontSize="md">Already have an account?</Text>
            <MotionButton
              variant="link"
              colorScheme="purple"
              onClick={onSwitchToLogin}
              whileHover={{ scale: 1.05 }}
              fontWeight="semibold"
            >
              Login
            </MotionButton>
          </HStack>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Register; 