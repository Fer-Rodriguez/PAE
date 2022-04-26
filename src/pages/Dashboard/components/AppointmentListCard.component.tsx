import { Heading, Text, Flex, Button, Divider } from "@chakra-ui/react";

import { DividedCard } from "../../../components/DividedCard";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Assets
import theme from "../../../theme";
import "../style.css";

export const AppointmentListCard = ({ type }: { type: EUserType }) => {
  const appointments = [
    { subject: "Matemáticas", date: "25 de Feb" },
    { subject: "Derecho Inter...", date: "10 de Ene" },
    { subject: "Metodologías...", date: "2 de Dic" },
    { subject: "Metodologías..", date: "2 de Dic" },
  ];

  const List = () => (
    <Flex direction={"column"} w={"100%"} gap={3} m={6}>
      <Heading size={EUserType.admin ? "md" : "lg"} mt={2} color="white">
        {type === EUserType.admin ? "Asesorías Administradas" : "Asesorías"}
      </Heading>
      {appointments.map((appointment) => (
        <Flex flexDirection={"column"} gap={1} justifyContent="center">
          <Flex flexDirection={"row"}>
            <Text color={"white"} mr={1}>
              {appointment.subject}
            </Text>
            -
            <Text color={"white"} ml={1} fontWeight={"bold"}>
              {appointment.date}
            </Text>
          </Flex>
          <Button
            borderRadius={theme.radii.general}
            backgroundColor={theme.colors.purple}
            color="white"
            size="xs"
            w={"40%"}
          >
            Detalles
          </Button>
          <Divider />
        </Flex>
      ))}
    </Flex>
  );

  return (
    <DividedCard
      colorFirst={
        type === EUserType.admin ? theme.colors.blue : theme.colors.purple
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
        >
          Ver más...
        </Button>
      }
    />
  );
};
