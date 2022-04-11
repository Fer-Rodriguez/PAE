import React from "react";
import {
  Flex,
  Text,
  Square,
  Box,
  Center,
  Spacer,
  Grid,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { IDividedCard } from "../../interfaces";

/*
Qué estaría bien mandar como props para customizar esta cosa:

overlap? 

*/

export const DividedCard = (/*props: IDividedCard*/) => {
  return (
    //busca una manera programática de ajustar el tamaño de esta box
    <Box
      //boxShadow="0px 5px 5px 0px rgba(0,0,0,0.30)"
      width="165px"
      height="110px"
    >
      <Center
        zIndex="2"
        position="relative"
        //boxShadow="0px 5px 5px 0px rgba(255,0,0,1)"
        h="50%"
        borderRadius="dividedCardTop"
        bg="pink"
      >
        <Text>Box 1</Text>
      </Center>

      <Center
        //hidden
        position="relative"
        zIndex="1"
        h="50%"
        borderRadius="dividedCardBottom"
        bg="blue"
      >
        <Text>Box 2</Text>
      </Center>
    </Box>
  );
};

export default DividedCard;
