//Chakra
import {
  Box,
  Flex,
  Spacer,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";

//Components
import { Menu } from "../../components/Menu";

//Interfaces
import { IUserComponents } from "../../interfaces";

export const DesktopComponents = ({ userComponent }: IUserComponents) => (
  <Grid
    templateRows="repeat(9, 1fr)"
    templateColumns="repeat(16, 1fr)"
    h={"100vh"}
    mx={4}
    gap={4}
  >
    <GridItem rowStart={1} rowSpan={2} colSpan={2}>
      <Flex justifyContent={"center"} alignContent={"flex-end "}>
        <Image
          maxWidth={"9vw"}
          src="https://orienta-me.com/assets/globals/img/orienta-me/login/t_queremos.png"
          alt="Logo del Programa de Acompañamiento Estudiantil"
          justifyContent="space-around"
        />
      </Flex>
    </GridItem>

    <GridItem rowStart={2} rowSpan={1} colStart={14}>
      <Flex
        w={"100%"}
        h={"100%"}
        alignItems="center"
        justifyContent={"space-around"}
      >
        <CloseIcon boxSize={4} />
        <BellIcon boxSize={6} />
      </Flex>
    </GridItem>
    <GridItem rowStart={5} colSpan={2} colStart={1}>
      <Center>
        <Menu />
      </Center>
    </GridItem>

    <GridItem rowStart={3} rowSpan={6} colStart={3} colSpan={12}>
      <Box bg={"red"} w="100%" h={"100%"}>
        {/** Here is going to be render the corresponding child component */}
        {userComponent}
      </Box>
    </GridItem>
  </Grid>
);
