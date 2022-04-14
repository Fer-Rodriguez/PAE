//Chakra Components
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

//Assets
import notifications from "../../assets/Bell.png";
import theme from "../../theme/index";

export const Bell = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        bg={theme.colors.white}
        mt="2em"
        position="absolute"
        right={30}
        rounded={theme.radii.menu}
        icon={<img src={notifications} height="40em" width="40em" />}
      ></MenuButton>
      <MenuList>
        {/* Parte donde se muestra las notificaciones? innecesario por la parte del DropDown? O.o */}
        <MenuItem>:3</MenuItem>
      </MenuList>
    </Menu>
  );
};
