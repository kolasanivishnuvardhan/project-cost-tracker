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
  Image,
  Tooltip,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionAvatar = motion(Avatar);
const MotionImage = motion(Image);

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const navShadow = useColorModeValue('0 2px 10px rgba(0,0,0,0.05)', '0 2px 10px rgba(0,0,0,0.2)');
  const menuBgColor = useColorModeValue('white', 'gray.700');
  
  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };
  
  // Get first letter of the user's first name or email
  const getFirstNameInitial = () => {
    if (!user) return '?';
    
    if (user.displayName && user.displayName.trim()) {
      // If user has a display name, take the first character and uppercase it
      return user.displayName.trim().charAt(0).toUpperCase();
    } else if (user.email) {
      // If no display name, take the first character of the email and uppercase it
      return user.email.trim().charAt(0).toUpperCase();
    }
    
    return '?'; // Fallback
  };
  
  return (
    <AnimatePresence>
      <MotionBox
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Box 
          px={4} 
          py={3} 
          position="sticky"
          top={0}
          zIndex={100}
          bg={bgColor}
          boxShadow={navShadow}
          borderBottomWidth={1}
          borderColor={borderColor}
          backdropFilter="blur(10px)"
        >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <MotionFlex 
              alignItems={'center'}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <MotionImage
                src="/karkhana-logo.png"
                alt="Karkhana Logo"
                boxSize="40px"
                mr={3}
                animate={{ 
                  rotate: [0, 5, 0, -5, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  repeatType: "loop"
                }}
                whileHover={{ scale: 1.1 }}
              />
              <Text
                fontSize="2xl"
                fontWeight="extrabold"
                bgGradient="linear(to-r, purple.500, pink.500)"
                bgClip="text"
                letterSpacing="tight"
                _hover={{
                  bgGradient: "linear(to-r, purple.600, pink.600)",
                  transform: "scale(1.02)",
                }}
                transition="all 0.3s ease"
              >
                Project Cost Tracker
              </Text>
            </MotionFlex>
            
            <Flex alignItems={'center'}>
              <Tooltip label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                <IconButton
                  size={'md'}
                  mr={4}
                  aria-label={'Toggle Color Mode'}
                  icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  _hover={{
                    bg: colorMode === 'light' ? 'purple.50' : 'purple.900',
                    transform: "rotate(15deg)"
                  }}
                  transition="all 0.3s ease"
                />
              </Tooltip>
              
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                  _hover={{
                    transform: "scale(1.05)"
                  }}
                  transition="all 0.2s ease"
                >
                  <HStack>
                    <MotionAvatar
                      size={'md'}
                      name={getFirstNameInitial()}
                      bg="purple.500"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{ 
                        boxShadow: ["0 0 0 rgba(159, 122, 234, 0)", "0 0 10px rgba(159, 122, 234, 0.5)", "0 0 0 rgba(159, 122, 234, 0)"] 
                      }}
                      transition={{
                        boxShadow: {
                          repeat: Infinity,
                          duration: 2,
                        }
                      }}
                    />
                    <Text 
                      display={{ base: 'none', md: 'flex' }}
                      _hover={{ color: "purple.500" }}
                      transition="color 0.2s ease"
                    >
                      {user?.displayName}
                    </Text>
                    <MotionFlex
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FaChevronDown size={12} />
                    </MotionFlex>
                  </HStack>
                </MenuButton>
                <MenuList
                  boxShadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  p={2}
                  bg={menuBgColor}
                  borderRadius="md"
                >
                  <MenuItem 
                    fontWeight="medium"
                    icon={<FaUser color="#805AD5" />}
                    _hover={{ bg: 'purple.50', color: 'purple.600' }}
                  >
                    {user?.email}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem 
                    onClick={handleLogout} 
                    color="red.500"
                    icon={<FaSignOutAlt />}
                    _hover={{ bg: 'red.50', color: 'red.600' }}
                    transition="all 0.2s ease"
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

export default Navbar; 