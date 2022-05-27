import { useState, useEffect } from "react";
import { EMyCalendarView } from "../../interfaces/enums";
import { Box, Center, Spacer, VStack, HStack } from "@chakra-ui/react";
import Calendar from "react-calendar";
import { getDay, startOfWeek } from "date-fns";

import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";
import { MyCalendar } from "../../components/Calendar";

import "react-calendar/dist/Calendar.css";

//Assets
import theme from "../../theme/index";
import { addDays, getDayName, isSameDayByName } from "../../services/Functions";
import { getPossibleDates } from "../../api/appointments/get";

export const ScheduleScreen = ({
  mobile,
  onNextScreenButtonClick,
  onFullDateSelected,
  idSubject,
}: {
  mobile?: boolean;
  onNextScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFullDateSelected?: (newValue: string) => void;
  idSubject: string;
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedDayString, setSelectedDayString] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [possibleDates, setPossibleDates] = useState([]);

  const obtainPossibleDates = async () => {
    const posibleDatesApi = await getPossibleDates(idSubject);
    setPossibleDates(posibleDatesApi);
  };

  useEffect(() => {
    obtainPossibleDates();
  }, []);

  useEffect(() => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
    ];
    const dayIndex = getDay(selectedDay);
    const dayName = days[dayIndex];
    setSelectedDayString(dayName);
  }, [selectedDay]);
  useEffect(() => {
    console.log("CAMBIANDO: ", selectedDay);
    if (onFullDateSelected) {
      onFullDateSelected(selectedDay.toString());
    }
    // Le damos formato al espacio seleccionado por el usuario como lo necesitamos para hacer la requesta
  }, [selectedHour]);

  const disableDates = ({ date, view }: { date: Date; view: string }) => {
    const disabledDayNames = ["sábado", "domingo"];

    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return disabledDayNames.some((dDate) => isSameDayByName(date, dDate));
  };

  if (mobile) {
    return (
      <VStack w="100%" spacing="25px" alignItems="center">
        <Calendar onChange={setSelectedDay} value={selectedDay} />

        <ScheduleList
          schedules={possibleDates}
          daySelected={selectedDayString}
          width="80%"
        ></ScheduleList>

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
        <HStack w={"100%"} spacing={"120"}>
          <Box w={"40vw"}>
            <Calendar
              onChange={setSelectedDay}
              value={selectedDay}
              maxDetail={"month"}
              maxDate={addDays(new Date(), 14)}
              minDate={new Date()}
              tileDisabled={disableDates}
            />
          </Box>
          <ScheduleList
            daySelected={selectedDayString}
            onScheduleButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const dateSelected = new Date(Date.parse(e.currentTarget.value));
              const finalDate = selectedDay;
              finalDate.setHours(dateSelected.getHours());

              setSelectedDay(finalDate);

              setSelectedHour(e.currentTarget.value);
            }}
            scheduleSelected={selectedHour}
            schedules={possibleDates}
            width="30%"
          ></ScheduleList>
        </HStack>
        <Spacer />
        <Center w="100%">
          <ButtonGeneric
            text="Siguiente"
            color={theme.colors.pink}
            fontColor="white"
            onClick={onNextScreenButtonClick}
          />
        </Center>
      </VStack>
    );
  }
};
