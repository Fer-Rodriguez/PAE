import { Box, Heading, Image, Spacer, VStack, HStack } from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/Button";

import imgAgendaCitaConf from "../../assets/agenda_cita_ok.png";
import theme from "../../theme/index";

export const SuccessScreen = ({ mobile }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <VStack w="100%" spacing="50px" alignItems="center">
        <Image boxSize="60%" objectFit="contain" src={imgAgendaCitaConf} />
        <Box>
          <Heading as="h2" size="lg" textAlign="center">
            Tu solicitud está siendo evaluada por un/a administrador/a
          </Heading>
          <Heading as="h3" size="mg" textAlign="center">
            Se te notificará cuando se acepte o deniegue la solicitud.
          </Heading>
        </Box>
        <ButtonGeneric
          text="Regresar"
          color={theme.colors.pink}
          fontColor="white"
        />
        <Spacer />
      </VStack>
    );
  } else {
    return (
      <HStack w="100%" spacing="50px" alignItems="center">
        <Image boxSize="40%" objectFit="contain" src={imgAgendaCitaConf} />
        <VStack maxW="55%" spacing="40px" alignItems="center">
          <Box>
            <Heading as="h2" size="lg" textAlign="center">
              Tu solicitud está siendo evaluada por un/a administrador/a
            </Heading>
            <Heading as="h3" size="mg" textAlign="center">
              Se te notificará cuando se acepte o deniegue la solicitud.
            </Heading>
          </Box>
          <ButtonGeneric
            text="Regresar"
            color={theme.colors.pink}
            fontColor="white"
          />
        </VStack>
      </HStack>
    );
  }
};
