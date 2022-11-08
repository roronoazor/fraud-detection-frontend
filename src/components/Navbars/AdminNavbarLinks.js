// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "modules/auth/redux/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, authUser, ...rest } = props;
  const history = useHistory();


  // Chakra Color Mode
  let mainTeal = useColorModeValue("teal.300", "teal.300");
  let inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  let searchIcon = useColorModeValue("gray.700", "gray.200");
  const dispatch = useDispatch();

  const moveToSettings = () => {
    history.push('/admin/settings');
  }

  const moveToUserMgt = () => {
    history.push('/admin/userMgt');
  }

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      {/* <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup> */}
      <NavLink to="/admin/profile">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          leftIcon={<ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
        >
          <Text display={{ sm: "none", md: "flex" }}>{ `Hi, ${authUser?.user?.email}` }</Text>
        </Button>
      </NavLink>
      <Menu>
        <MenuButton>
          <SettingsIcon
            cursor="pointer"
            ms={{ base: "16px", xl: "0px" }}
            me="16px"
            ref={settingsRef}
            onClick={props.onOpen}
            color={navbarIcon}
            w="18px"
            h="18px"
          />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px" onClick={moveToSettings}>
              Settings
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px" onClick={moveToUserMgt}>
              User Management
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px" onClick={()=>{dispatch(logout())}}>
              Logout
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
