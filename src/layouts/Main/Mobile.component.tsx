//Chakra
import { Box, Flex, Spacer } from "@chakra-ui/react";

//Interfaces
import { IUserComponents } from "../../interfaces";

export const MobileComponents = ({ userComponent }: IUserComponents) => (
  <Flex
    alignContent={"center"}
    m={10}
    h="100vh"
    w={"100vw"}
    flexDirection={"column"}
  >
    <Box bg={"green"} w="90vw" h={"85vh"}>
      {/** Here is going to be render the corresponding child component */}
      {userComponent}
    </Box>
  </Flex>
);
