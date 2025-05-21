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
} from '@chakra-ui/react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" textAlign="center" size="xl">
            Login
          </Heading>
          
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          
          <form onSubmit={handleLogin}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </FormControl>
              
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                mt={4}
                isLoading={loading}
                loadingText="Logging in"
              >
                Login
              </Button>
            </VStack>
          </form>
          
          <Divider />
          
          <Button
            leftIcon={<FaGoogle />}
            onClick={handleGoogleLogin}
            width="full"
            colorScheme="red"
            variant="outline"
            isLoading={loading}
          >
            Login with Google
          </Button>
          
          <Text textAlign="center">
            Don't have an account?{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={onSwitchToRegister}
            >
              Register
            </Button>
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Login; 