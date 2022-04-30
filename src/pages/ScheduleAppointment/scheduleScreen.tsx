import { Box, Center, Spacer, VStack, HStack } from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";

//Assets
import theme from "../../theme/index";
import { INewAppointment } from "../../interfaces/types";

const myOptions = [
  {
    horario: "10:15",
  },
  {
    horario: "12:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
  {
    horario: "15:15",
  },
];
export const ScheduleScreen = ({
  mobile,
  onClick,
}: {
  mobile?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  if (mobile) {
    return (
      <VStack w="100%" spacing="25px" alignItems="center">
        <Box w="80%" bg={theme.colors.purpleLight}>
          Espacio reservado para el calendario
        </Box>
        <ScheduleList schedules={myOptions} width="80%"></ScheduleList>

        <ButtonGeneric
          text="Agendar"
          color={theme.colors.pink}
          fontColor="white"
        />
        <Spacer />
      </VStack>
    );
  } else {
    return (
      <VStack alignItems="start">
        <Info_Button />
        <HStack w="100%" spacing="50px">
          <Box w="55%" bg={theme.colors.purpleLight}>
            Espacio reservado para el calendario
          </Box>
          <ScheduleList schedules={myOptions} width="30%"></ScheduleList>
        </HStack>
        <Spacer />
        <Center w="100%">
          <ButtonGeneric
            text="Siguiente"
            color={theme.colors.pink}
            fontColor="white"
            onClick={onClick}
          />
        </Center>
      </VStack>
    );
  }
};
