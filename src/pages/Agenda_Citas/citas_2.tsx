import { ETypeDropdown } from "../../interfaces/enums";

import { Box, Center, Spacer, VStack, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useStore } from "../../state/store";

import { ButtonGeneric } from "../../components/Button";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";

//Assets
import theme from "../../theme/index";
import { INewAppointment } from "../../interfaces/types";
import shallow from "zustand/shallow";

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
  //const { addNewAppointment } = useStore();
  const userData: INewAppointment = useStore(
    (state) => ({
      date: state.newAppointment.date,
      description: state.newAppointment.description,
      photo_url: state.newAppointment.photo_url,
      id_subject: state.newAppointment.id_subject,
      id_petitioner: state.newAppointment.id_petitioner,
    }),
    shallow
  );

  const apiCall = () => {
    const data = JSON.stringify({
      idPetitioner: userData.id_petitioner,
      date: userData.date,
      idSubject: userData.id_subject,
      problemDescription: userData.description,
      image: userData.photo_url,
    });

    const config = {
      method: "post",
      url: "localhost:6060/appointment",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
          />
        </Center>
      </VStack>
    );
  }
};
