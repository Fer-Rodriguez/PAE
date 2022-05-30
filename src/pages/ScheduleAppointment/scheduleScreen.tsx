import { useState, useEffect, useRef } from "react";
import { EMyCalendarView } from "../../interfaces/enums";
import {
  Box,
  Center,
  Spacer,
  VStack,
  HStack,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { getDay, startOfWeek } from "date-fns";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";
import { MyCalendar } from "../../components/Calendar";

import "react-calendar/dist/Calendar.css";

//Assets
import theme from "../../theme/index";
import { addDays, getDayName, isSameDayByName } from "../../services/Functions";
import { getPossibleDates } from "../../api/appointments/get";
import PopOver, { ETypeSize } from "../../components/popOver";

export const ScheduleScreen = ({
  mobile,
  subjectName,
  onNextScreenButtonClick,
  onFullDateSelected,
  idSubject,
  onPreviousScreenButtonClick,
}: {
  mobile?: boolean;
  subjectName?: string;
  onPreviousScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: infoOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();
  const cancelRef = useRef();

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
      <>
        <Text color="grey" as="i">
          Escoge el horario que más se te acomode
        </Text>
        <br></br>
        <br></br>
        <VStack w="100%" spacing="25px" alignItems="center">
          <Calendar
            onChange={setSelectedDay}
            value={selectedDay}
            maxDetail={"month"}
            maxDate={addDays(new Date(), 14)}
            minDate={new Date()}
            tileDisabled={disableDates}
          />

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
          <ButtonGeneric
            text="Agendar"
            sizePX=""
            bgColor={theme.colors.pink}
            fontColor="white"
            onClick={() => console.log(subjectName)}
          />
          <PopOver
            size={ETypeSize.s}
            title={{ text: "Resumen de la solicitud", alignment: "center" }}
            closeButton={true}
            customOpen={isOpen}
            customClose={onClose}
            customCancelRef={cancelRef}
          >
            {/*TODO: Show subject, day and hour in popup*/}
            <Center>
              <Text>Materia: {subjectName}</Text>
              <Spacer />
              <Text>Día: {selectedDay}</Text>
              <Spacer />
              <Text>Hora: {selectedHour}</Text>
              <Spacer />
              <ButtonGeneric
                text="Volver"
                sizePX=""
                bgColor={theme.colors.pink}
                fontColor="white"
                onClick={onPreviousScreenButtonClick}
              />
              <ButtonGeneric
                text="Confirmar"
                sizePX=""
                bgColor={theme.colors.pink}
                fontColor="white"
                onClick={() => onOpen()}
              />
            </Center>
          </PopOver>
          <Spacer />
        </VStack>
      </>
    );
  } else {
    return (
      <>
        <Text color="grey" as="i">
          Escoge el horario que más se te acomode
        </Text>
        <br></br>
        <br></br>
        <VStack alignItems="start">
          <Info_Button
            title="Seleccionar fecha y hora"
            customOpen={infoOpen}
            customOnOpen={infoOnOpen}
            customClose={infoOnClose}
            customCancelRef={cancelRef}
            content={
              <Box w="100%">
                Selecciona uno de los días disponibles dentro del calendario en
                el que quieras tener tu asesoría. Posteriormente se desplegará a
                la derecha una lista de horarios en la cual podrás seleccionar
                alguno.
              </Box>
            }
          />
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
              onScheduleButtonClick={(
                e: React.MouseEvent<HTMLButtonElement>
              ) => {
                setSelectedHour(e.currentTarget.innerText);
              }}
              scheduleSelected={selectedHour}
              schedules={possibleDates}
              width="30%"
              daySelected={selectedDayString}
            ></ScheduleList>
          </HStack>
          <Spacer />
          <br></br>
          <Flex direction={"row"} justifyContent="center" gap={"5vw"} w="100%">
            <ButtonGeneric
              text="Volver"
              sizePX=""
              bgColor={theme.colors.pink}
              fontColor="white"
              onClick={onPreviousScreenButtonClick}
            />
            <ButtonGeneric
              text="Agendar"
              isDisabled={selectedHour === ""}
              sizePX=""
              bgColor={theme.colors.pink}
              fontColor="white"
              onClick={() => onOpen()}
            />
          </Flex>
          <Center w="100%">
            <PopOver
              size={ETypeSize.s}
              title={{ text: "Resumen de la solicitud", alignment: "center" }}
              closeButton={true}
              customOpen={isOpen}
              customClose={onClose}
              customCancelRef={cancelRef}
            >
              {/*TODO: Show subject, day and hour in popup*/}
              <VStack alignContent="center">
                <Text>Materia: {subjectName}</Text>
                <Spacer />
                <Text>
                  Día:{" "}
                  {selectedDay.getDay().toString() +
                    "/" +
                    selectedDay.getMonth().toString() +
                    "/" +
                    selectedDay.getFullYear().toString()}
                </Text>
                <Spacer />
                <Text>Hora: {selectedHour}</Text>
                <Spacer />
                <ButtonGeneric
                  text="Confirmar"
                  sizePX=""
                  bgColor={theme.colors.pink}
                  fontColor="white"
                  onClick={onNextScreenButtonClick}
                />
              </VStack>
            </PopOver>
          </Center>
        </VStack>
      </>
    );
  }
};
