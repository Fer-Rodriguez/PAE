//Chakra Components
import { IconButton, Menu, MenuButton } from "@chakra-ui/react";

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
    </Menu>
  );
};
