import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider, extendTheme, Spinner, Center, Box, Text, useToast } from '@chakra-ui/react';
import { auth, setupFirestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loginSuccess } from './store/slices/authSlice';
import Dashboard from './components/Dashboard/Dashboard';
import AuthContainer from './components/Auth/AuthContainer';

// Extend the theme with custom colors or components
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
});

function App() {
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const toast = useToast();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in, initialize Firestore
          const result = await setupFirestore(user.uid);
          
          if (!result.success) {
            console.error("Failed to setup Firestore:", result.error);
            toast({
              title: "Database access error",
              description: "Please try signing out and in again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          
          // Update Redux with user info
          dispatch(
            loginSuccess({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
        }
      } catch (err) {
        console.error("Auth state change error:", err);
        setError(err.message);
        toast({
          title: "Authentication Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        // Authentication state has been checked
        if (initializing) {
          setInitializing(false);
        }
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch, initializing, toast]);

  if (initializing) {
    return (
      <ChakraProvider theme={theme}>
        <Center h="100vh">
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider theme={theme}>
        <Center h="100vh" flexDirection="column">
          <Box p={8} borderRadius="md" bg="red.100" color="red.800">
            <Text fontWeight="bold">Error initializing app:</Text>
            <Text>{error}</Text>
            <Text mt={4}>Please refresh the page to try again.</Text>
          </Box>
        </Center>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      {isAuthenticated ? <Dashboard /> : <AuthContainer />}
    </ChakraProvider>
  );
}

export default App;
