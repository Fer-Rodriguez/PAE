import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

//Store
import { useStore } from "../../state/store";

export const DetailsContent = ({
  editAppointment,
}: {
  editAppointment: boolean;
}) => {
  const detailsData = useStore((state) => state.selectedAppointment);
  const [date, setDate] = useState(new Date(detailsData.appointment.date));
  return (
    <Flex
      flexDir={"column"}
      p={8}
      alignItems={editAppointment ? "center" : "start"}
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
        Materia
      </Text>
      <Text fontSize={"lg"} mb={editAppointment ? "6vh" : "0"}>
        {detailsData.subject.name}
      </Text>
      {!editAppointment && (
        <>
          <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
            Ubicación
          </Text>
          <Text fontSize={"lg"}>
            {detailsData.appointment.location !== ""
              ? detailsData.appointment.location
              : "Por definir"}
          </Text>
        </>
      )}

      <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
        Fecha
      </Text>
      <Text fontSize={"lg"}>{date.toLocaleString()}</Text>
    </Flex>
  );
};
