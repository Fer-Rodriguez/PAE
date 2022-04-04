import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
//import { IconName } from "react-icons/bi";
/* Instalar libreria de iconos de react???*/
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

function Bell() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="white"
        mt="25px"
        position="absolute"
        right={30}
      >
        {/* Icono temporal */}
        <Avatar
          size="sm"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-1024.png"
          bg="white"
        >
          <AvatarBadge borderColor="papayawhip" boxSize="1.25em" bg="tomato" />
        </Avatar>
      </MenuButton>
      <MenuList>
        <MenuItem>:3</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Bell;
