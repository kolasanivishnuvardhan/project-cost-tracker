import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../store/thunks/authThunks';
import {
  Box,
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useColorMode,
  useColorModeValue,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };
  
  // Get first letter of the user's first name
  const getFirstNameInitial = () => {
    if (!user || !user.displayName) return '?';
    // Get the first letter of the first name
    return user.displayName.trim().charAt(0).toUpperCase();
  };
  
  return (
    <MotionBox
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Box 
        px={4} 
        py={2} 
        position="sticky"
        top={0}
        zIndex={100}
        bg={bgColor}
        boxShadow="sm"
        borderBottomWidth={1}
        borderColor={borderColor}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              bgGradient="linear(to-r, purple.400, pink.400)"
              bgClip="text"
            >
              Project Cost Tracker
            </Text>
          </HStack>
          <Flex alignItems={'center'}>
            <IconButton
              size={'sm'}
              mr={4}
              aria-label={'Toggle Color Mode'}
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <HStack>
                  <Avatar
                    size={'sm'}
                    name={user?.displayName}
                    bg="purple.500"
                  >
                    {getFirstNameInitial()}
                  </Avatar>
                  <Text display={{ base: 'none', md: 'flex' }}>
                    {user?.displayName}
                  </Text>
                  <FaChevronDown size={12} />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem fontWeight="medium">{user?.email}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} color="red.500">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </MotionBox>
  );
};

export default Navbar; 