import { EMyCalendarView, ETypeDropdown } from "../../interfaces/enums";
import { Box, Center, Spacer, VStack, HStack } from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";
import { MyCalendar } from "../../components/Calendar";

//Assets
import theme from "../../theme/index";
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
export const CitasPage2 = ({ mobile }: { mobile?: boolean }) => {
  if (mobile) {
    return (
      <VStack w="100%" spacing="25px" alignItems="center">
        <MyCalendar view={EMyCalendarView.month} />
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
          />
        </Center>
      </VStack>
    );
  }
};
