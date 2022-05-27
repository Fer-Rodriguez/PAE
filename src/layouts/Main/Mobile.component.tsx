//Chakra
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";
//Components
import { Menu } from "../../components/Menu";
//Interfaces
import { IUserComponents } from "../../interfaces";

//Assets
import { Logo } from "../../assets/Logo";

export const MobileComponents = ({ userComponent }: IUserComponents) => (
  <Flex flexDirection={"column"} minH={"100vh"} mt="3vh" gap={12}>
    <Spacer />
    <Flex position={"absolute"}>
      <Box position={"relative"} left="40%">
        <Logo maxWidth="20vw" />
      </Box>
      <Flex
        position={"absolute"}
        left="75vw"
        alignItems="center"
        pr="6"
        gap={"6"}
      >
        <CloseIcon boxSize={6} />
        <BellIcon boxSize={8} />
      </Flex>
    </Flex>

    {/** Here is going to be render the corresponding child component */}
    {userComponent}
    {/* TODO: Add responsive menu instead of Spacer**/}

    <Menu userType="user" mobile={true} />
  </Flex>
);
