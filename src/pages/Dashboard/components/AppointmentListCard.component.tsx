import {
  Heading,
  Text,
  Flex,
  Button,
  Divider,
  Center,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DividedCard } from "../../../components/DividedCard";
import { IDetailsAppointmentData } from "../../../interfaces";

//Interfaces
import { EStatusAppointment, EUserType } from "../../../interfaces/enums";
import { useStore } from "../../../state/store";

//Assets
import theme from "../../../theme";
import "../style.css";

export const AppointmentListCard = ({
  type,
  mobile = false,
}: {
  type: EUserType;
  mobile?: boolean;
}) => {
  const navigate = useNavigate();

  const allAppointments = useStore((state) => state.allAppointments);

  const AppointmentContent = ({
    appointment,
  }: {
    appointment: {
      subject: string;
      date: string;
      myAppointment: IDetailsAppointmentData;
    };
  }) => {
    const setDetailsActivation = useStore(
      (state) => state.setDetailsActivation
    );
    const setEditActivation = useStore((state) => state.setEditActivation);
    const setSelectedAppointment = useStore(
      (state) => state.setSelectedAppointment
    );

    return (
      <>
        <Flex flexDirection={"column"}>
          <Text color={"white"} mr={1}>
            {appointment.subject}
          </Text>

          <Text color={"white"} ml={1} fontWeight={"bold"} fontSize="sm">
            {appointment.date}
          </Text>
        </Flex>
        <Button
          borderRadius={theme.radii.general}
          backgroundColor={theme.colors.purple}
          color="white"
          size="xs"
          w={"40%"}
          onClick={() => {
            setSelectedAppointment(appointment.myAppointment);
            if (
              appointment.myAppointment.appointment.status ===
              EStatusAppointment.PENDING
            ) {
              setEditActivation(true);
            } else setEditActivation(false);

            setDetailsActivation(true);
          }}
        >
          Detalles
        </Button>
        <Divider />
      </>
    );
  };

  const MainContent = () => (
    <>
      {mobile ? (
        <Heading size={"xl"} mt={2} color="white">
          {"Asesorías recientes"}
        </Heading>
      ) : (
        <Heading size={EUserType.admin ? "md" : "lg"} mt={2} color="white">
          {"Asesorías recientes"}
        </Heading>
      )}

      {allAppointments ? (
        allAppointments.slice(0, 5).map((appointment) =>
          mobile ? (
            <Center flexDirection={"column"} gap={1} w={"100%"}>
              {
                <AppointmentContent
                  appointment={{
                    date: new Date(
                      appointment.appointment.date
                    ).toLocaleString(),
                    subject: appointment.subject.name,
                    myAppointment: appointment,
                  }}
                />
              }
            </Center>
          ) : (
            <Flex flexDirection={"column"} gap={1} w={"100%"}>
              {
                <AppointmentContent
                  appointment={{
                    date: new Date(
                      appointment.appointment.date
                    ).toLocaleString(),
                    subject: appointment.subject.name,
                    myAppointment: appointment,
                  }}
                />
              }
            </Flex>
          )
        )
      ) : (
        <></>
      )}
    </>
  );

  const List = () =>
    mobile ? (
      <Center
        flexDirection={"column"}
        w={"100%"}
        gap={3}
        m={6}
        justifyContent={mobile ? "center" : "flex-start"}
      >
        <MainContent />
      </Center>
    ) : (
      <Flex
        direction={"column"}
        w={"100%"}
        gap={3}
        m={6}
        justifyContent={mobile ? "center" : "flex-start"}
      >
        <MainContent />
      </Flex>
    );

  return (
    <Box mt={mobile ? 6 : 0} mb={mobile ? 12 : 0}>
      <DividedCard
        colorFirst={
          type === EUserType.admin ? theme.colors.blue : theme.colors.pink
        }
        colorSecond="white"
        percentageFirst="80%"
        percentageSecond="20%"
        overlap
        vertical
        contentFirst={<List />}
        contentSecond={
          <Button
            borderRadius={theme.radii.general}
            backgroundColor={theme.colors.purple}
            color="white"
            size="sm"
            onClick={() => {
              navigate("asesorias");
            }}
          >
            Ver más...
          </Button>
        }
      />
    </Box>
  );
};
