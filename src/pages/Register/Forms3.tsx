import { Box, Text } from "@chakra-ui/react";
import { MyCalendar } from "../../components/Calendar";
import { EMyCalendarView } from "../../interfaces/enums";

export const Forms3 = ({ id }: { id: string }) => {
  return (
    <Box width={"100%"}>
      <Text> Ingresa tus horas disponibles en cada uno de los periodos </Text>
      <MyCalendar
        view={EMyCalendarView.week}
        mobile={false}
        idUser={id}
        register
      />
    </Box>
  );
};
