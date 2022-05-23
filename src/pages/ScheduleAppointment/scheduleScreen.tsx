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
} from "@chakra-ui/react";
import Calendar from "react-calendar";

import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";
import { MyCalendar } from "../../components/Calendar";

import "react-calendar/dist/Calendar.css";

//Assets
import theme from "../../theme/index";
import { addDays, getDayName, isSameDayByName } from "../../services/Functions";
import PopOver, { ETypeSize } from "../../components/popOver";

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
];

export const ScheduleScreen = ({
  mobile,
  subjectName,
  onNextScreenButtonClick,
  onFullDateSelected,
}: {
  mobile?: boolean;
  subjectName?: string;
  onNextScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onFullDateSelected?: (newValue: string) => void;
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: infoOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    //console.log(selectedDay);
  }, [selectedDay]);
  useEffect(() => {
    //console.log(selectedHour);
    // Le damos formato al espacio seleccionado por el usuario como lo necesitamos para hacer la requesta
    const constructedString = `${selectedDay.getFullYear()}-${
      selectedDay.getMonth() < 10
        ? "0" + selectedDay.getMonth()
        : selectedDay.getMonth()
    }-${
      selectedDay.getDate() < 10
        ? "0" + selectedDay.getDate()
        : selectedDay.getDate()
    }T${selectedHour}:00.000`;
    onFullDateSelected?.(constructedString);
  }, [selectedHour]);

  const disableDates = ({ date, view }: { date: Date; view: string }) => {
    const disabledDayNames = ["sábado", "domingo"];

    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return disabledDayNames.some((dDate) => isSameDayByName(date, dDate));
  };

  if (mobile) {
    return (
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
          onScheduleButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setSelectedHour(e.currentTarget.innerText);
          }}
          scheduleSelected={selectedHour}
          schedules={myOptions}
          width="80%"
        ></ScheduleList>
        <ButtonGeneric
          text="Agendar"
          color={theme.colors.pink}
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
              text="Confirmar"
              color={theme.colors.pink}
              fontColor="white"
              onClick={onNextScreenButtonClick}
            />
          </Center>
        </PopOver>
        <Spacer />
      </VStack>
    );
  } else {
    return (
      <VStack alignItems="start">
        <Info_Button
          title="Seleccionar fecha y hora"
          customOpen={infoOpen}
          customOnOpen={infoOnOpen}
          customClose={infoOnClose}
          customCancelRef={cancelRef}
          content={
            <Box w="100%">
              Selecciona un día dentro del calendario en donde quieras solicitar
              tu asesoría. Posteriormente se desplegará a la derecha una lista
              de horarios en la cual podrás seleccionar alguno.
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
            onScheduleButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setSelectedHour(e.currentTarget.innerText);
            }}
            scheduleSelected={selectedHour}
            schedules={myOptions}
            width="30%"
          ></ScheduleList>
        </HStack>
        <Spacer />
        <Center w="100%">
          <ButtonGeneric
            text="Agendar"
            color={theme.colors.pink}
            fontColor="white"
            onClick={() => onOpen()}
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
                color={theme.colors.pink}
                fontColor="white"
                onClick={onNextScreenButtonClick}
              />
            </VStack>
          </PopOver>
        </Center>
      </VStack>
    );
  }
};
