import { useRef, useState } from "react";

import { ETypeDropdown } from "../../interfaces/enums";
import {
  Box,
  Center,
  Spacer,
  VStack,
  HStack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

import { MyAlert } from "../../components/MyAlert";
import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";

//Assets
import theme from "../../theme/index";
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
export const CitasPage2 = ({ mobile = false }: { mobile?: boolean }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          onClick={() => {
            console.log("mandando el resumen");
          }}
        />
        <PopOver
          size={ETypeSize.s}
          title={{
            text: "Resumen de la solicitud",
            alignment: "center",
          }}
          closeButton={true}
        >
          <ButtonGeneric
            text="Confirmar"
            color={theme.colors.pink}
            fontColor="white"
            onClick={() => {
              console.log("hola mundo");
            }}
          />
        </PopOver>
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
            text="Agendar"
            color={theme.colors.pink}
            fontColor="white"
            onClick={() => {
              onOpen();
            }}
          />
          <PopOver
            size={ETypeSize.s}
            title={{
              text: "Resumen de la solicitud",
              alignment: "center",
            }}
            closeButton={true}
            customOpen={isOpen}
            customClose={onClose}
            customCancelRef={cancelRef}
          >
            <VStack alignItems="center">
              <Text fontSize="md" textAlign="left">
                Materia:{" "}
              </Text>
              <Text fontSize="md" textAlign="left">
                Día:{" "}
              </Text>
              <Text fontSize="md" textAlign="left">
                Hora:{" "}
              </Text>
              <Spacer />
              <ButtonGeneric
                text="Confirmar"
                color={theme.colors.pink}
                fontColor="white"
                onClick={() => {
                  //TODO: set routing to CitasPage 3
                  console.log("hola mundo");
                }}
              />
            </VStack>
          </PopOver>
        </Center>
      </VStack>
    );
  }
};
