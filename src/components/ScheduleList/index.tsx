import { Center, VStack } from "@chakra-ui/react";

import { ICitasDaySchedules } from "../../interfaces";
import { ButtonGeneric } from "../../components/Button";

import theme from "../../theme/index";
import "./estilo.css";

interface IScheduleList {
  schedules: Array<ICitasDaySchedules>;
  width: string;
}
export const ScheduleList = ({ schedules, width }: IScheduleList) => {
  return (
    <Center
      w={width}
      h="300px"
      bg={theme.colors.pink}
      borderRadius={theme.radii.general}
    >
      <VStack
        id="scheduleBox"
        w="90%"
        h="90%"
        bg="white"
        spacing="15px"
        borderRadius={theme.radii.general}
        overflow="auto"
      >
        {schedules.map((schedules) => (
          <ButtonGeneric
            text={schedules.horario}
            color={theme.colors.purpleLight}
            fontColor="white"
            width="80%"
          ></ButtonGeneric>
        ))}
      </VStack>
    </Center>
  );
};
