import { IconButton } from "@chakra-ui/react";
import notifications from "../../assets/Bell.png";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function Bell() {
  return (
    <Menu>
      <MenuButton
        /* Propiedades fijas porque siempre va a estar en la misma posición la campanita owo
        verdad? D: */
        as={IconButton}
        bg="white"
        mt="25px"
        position="absolute"
        right={30}
        rounded={50}
        icon={<img src={notifications} height="40" width="40" />}
      ></MenuButton>
      <MenuList>
        {/* Parte donde se muestra las notificaciones? innecesario por la parte del DropDown? O.o */}
        <MenuItem>:3</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Bell;
