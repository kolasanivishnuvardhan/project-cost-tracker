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
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

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

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

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
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h1" textAlign="center" size="xl">
            Register
          </Heading>
          
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          
          <form onSubmit={handleRegister}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>
              
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
              
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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
                loadingText="Registering"
              >
                Register
              </Button>
            </VStack>
          </form>
          
          <Text textAlign="center">
            Already have an account?{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={onSwitchToLogin}
            >
              Login
            </Button>
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default Register; 