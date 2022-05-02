import { Center, VStack } from "@chakra-ui/react";

import { ICitasDaySchedules } from "../../interfaces";
import { ButtonGeneric } from "../../components/ButtonGeneric";

import theme from "../../theme/index";
import "./estilo.css";

interface IScheduleList {
  schedules: Array<ICitasDaySchedules>;
  onScheduleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  scheduleSelected?: string;
  width: string;
}
export const ScheduleList = ({
  schedules,
  width,
  onScheduleButtonClick,
  scheduleSelected,
}: IScheduleList) => {
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
            bgColor="purpleLight"
            sizePX="80%"
            text={schedules.horario}
            onClick={onScheduleButtonClick}
            baseProps={{
              opacity: schedules.horario === scheduleSelected ? "100%" : "40%",
            }}
          ></ButtonGeneric>
        ))}
      </VStack>
    </Center>
  );
};
