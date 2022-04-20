//Chakra
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";

//Interfaces
import { IUserComponents } from "../../interfaces";

export const MobileComponents = ({ userComponent }: IUserComponents) => (
  <Flex flexDirection={"column"} minH={"100vh"}>
    <Spacer />
    <Flex justifyContent={"space-around"}>
      <Image
        maxWidth={"30vw"}
        src="https://orienta-me.com/assets/globals/img/orienta-me/login/t_queremos.png"
        alt="Logo del Programa de Acompañamiento Estudiantil"
        justifyContent="space-around"
      />
      <Flex alignItems="center" pr="6" gap={"6"}>
        <CloseIcon boxSize={6} />
        <BellIcon boxSize={8} />
      </Flex>
    </Flex>

    {/** Here is going to be render the corresponding child component */}
    {userComponent}
    {/* TODO: Add responsive menu instead of Spacer**/}
    <Spacer />
    <Spacer />
  </Flex>
);
