import { Center, VStack, Text } from "@chakra-ui/react";

import { ICitasDaySchedules } from "../../interfaces";
import { ButtonGeneric } from "../../components/ButtonGeneric";

import theme from "../../theme/index";
import "./estilo.css";
import { useEffect, useState } from "react";

import { getHours } from "date-fns";

interface IScheduleList {
  schedules: Array<ICitasDaySchedules>;
  onScheduleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  scheduleSelected?: string;
  width: string;
  daySelected: string;
}
export const ScheduleList = ({
  schedules,
  width,
  onScheduleButtonClick,
  scheduleSelected,
  daySelected,
}: IScheduleList) => {
  const [possibleDates, setPossibleDates] = useState<ICitasDaySchedules[]>([]);

  useEffect(() => {
    const datesAccordingToDay = schedules.filter(
      (schedule) => schedule.day === daySelected
    );

    setPossibleDates(datesAccordingToDay);
  }, [daySelected]);

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
        {possibleDates.length === 0 ? (
          <Text m={7}>No hay asesores disponibles en este día.</Text>
        ) : (
          possibleDates.map((myDate) => (
            <>
              <ButtonGeneric
                bgColor="purpleLight"
                value={myDate.start}
                sizePX="80%"
                text={new Date(Date.parse(myDate.start)).toLocaleTimeString(
                  "mx",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                onClick={onScheduleButtonClick}
                baseProps={{
                  opacity: myDate.start === scheduleSelected ? "100%" : "40%",
                }}
              ></ButtonGeneric>
            </>
          ))
        )}
      </VStack>
    </Center>
  );
};
