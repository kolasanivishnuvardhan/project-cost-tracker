import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, loginWithGoogleThunk } from '../../store/thunks/authThunks';
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
  Divider,
  useColorModeValue,
  HStack,
  Flex,
  Image,
} from '@chakra-ui/react';
import { FaGoogle, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
const MotionInput = motion(Input);

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const gradientBg = useColorModeValue(
    'linear(to-r, blue.400, purple.500)', 
    'linear(to-r, blue.600, purple.700)'
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
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
      await dispatch(loginUserThunk(email, password));
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error is handled in the thunk and displayed from the state
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogleThunk());
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
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
            Sign In
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
          
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
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
              
              <MotionButton
                type="submit"
                colorScheme="purple"
                width="full"
                mt={4}
                isLoading={loading}
                loadingText="Logging in"
                size="lg"
                rightIcon={<FaSignInAlt />}
                fontWeight="bold"
                boxShadow="md"
                whileHover={{ scale: 1.03, boxShadow: "0px 6px 12px rgba(160, 96, 206, 0.3)" }} 
                whileTap={{ scale: 0.97 }}
              >
                Login
              </MotionButton>
            </VStack>
          </form>
          
          <Flex align="center" my={4}>
            <Divider flex="1" />
            <Text mx={3} color="gray.500" fontSize="sm" fontWeight="medium">OR</Text>
            <Divider flex="1" />
          </Flex>
          
          <MotionButton
            leftIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
            width="full"
            colorScheme="red"
            variant="outline"
            isLoading={loading}
            whileHover={{ scale: 1.03, boxShadow: "md" }}
            whileTap={{ scale: 0.97 }}
            size="lg"
            boxShadow="sm"
          >
            Login with Google
          </MotionButton>
          
          <HStack justify="center" mt={4}>
            <Text fontSize="md">Don't have an account?</Text>
            <MotionButton
              variant="link"
              colorScheme="purple"
              onClick={onSwitchToRegister}
              whileHover={{ scale: 1.05 }}
              fontWeight="semibold"
            >
              Register
            </MotionButton>
          </HStack>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Login; 