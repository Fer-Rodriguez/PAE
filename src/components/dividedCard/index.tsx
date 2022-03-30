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
} from "@chakra-ui/react";

function DividedCard() {
  return (
    <SimpleGrid columns={1} spacing={0}>
      <Center w="100px" bg="#F72585">
        <Text>Box 1</Text>
      </Center>
      <Center w="100px" bg="#FFFFFF">
        <Text>Box 1</Text>
      </Center>
    </SimpleGrid>
  );
}

export default DividedCard;
