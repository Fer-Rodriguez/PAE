import { Box, Heading, Text, HStack, Flex, Image } from "@chakra-ui/react";

//Components

import { ButtonGeneric } from "../../../components/Button";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Assets
import FlagMan from "../Icons/FlagMan";
import theme from "../../../theme";
import rocket from "../Icons/cohete.png";

import "../style.css";

export const MainCard = ({ type }: { type: EUserType }) => {
  return (
    <Flex
      className="MainCard"
      p={6}
      flexDirection="row"
      rounded={theme.radii.general}
    >
      <Flex flexDirection={"column"}>
        <Text color={"white"}>
          {type === EUserType.admin
            ? "Tienes una nueva solicitud"
            : "Tu próxima asesoria"}
        </Text>
        <Heading color={"white"}>Lunes, 25 de Marzo</Heading>
        <HStack gap={6} mt={2}>
          <Text color={"white"}>19:30 - 20:30</Text>
          <ButtonGeneric
            text="Detalles"
            color={theme.colors.pink}
            fontColor="white"
          />
        </HStack>
      </Flex>
      {type === EUserType.student ? (
        <Box position={"absolute"} top="7%" left={"46%"}>
          <FlagMan />
        </Box>
      ) : (
        <Box position={"absolute"} top="15%" left={"40%"}>
          <Image boxSize={"20vw"} src={rocket} />
        </Box>
      )}
    </Flex>
  );
};
