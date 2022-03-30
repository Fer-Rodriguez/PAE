import React from "react";
import { Box, Image, Stack, HStack, VStack } from "@chakra-ui/react";
import menuImg1 from "../../assets/menu_dash.png";
import menuImg2 from "../../assets/menu_agenda.png";
import menuImg3 from "../../assets/menu_cita.png";
import menuImg4 from "../../assets/menu_user.png";
import { isPropertyAccessChain } from "typescript";

function Menu() {
  return (
    <div>
      <VStack
        maxW="100px"
        spacing="24px"
        bgGradient="linear(to-r, #8482FF , #A462FF)"
        borderRadius="25px"
      >
        <Box w="80%">
          <Image boxSize="100%" objectFit="cover" src={menuImg1} />
        </Box>
        <Box w="80%">
          <Image boxSize="100%" objectFit="cover" src={menuImg2} />
        </Box>
        <Box w="80%">
          <Image boxSize="100%" objectFit="cover" src={menuImg3} />
        </Box>
        <Box w="80%">
          <Image boxSize="100%" objectFit="cover" src={menuImg4} />
        </Box>
      </VStack>
    </div>
  );
}

export default Menu;
