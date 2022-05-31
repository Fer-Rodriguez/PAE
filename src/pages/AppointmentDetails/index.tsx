import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

//Store
import { useStore } from "../../state/store";

//Components
import { DetailsContent } from "./Details.component";
import { EditAppointmentContent } from "./EditAppointment.component";
import { CardContent } from "./Card.component";

//Functions
import { updateAppointment } from "../../api/appointments/update";
import { updateAppointmentDetails } from "../../api/appointments-user/update";

//Assets
import theme from "../../theme";
import { EStatus, EStatusAppointment } from "../../interfaces/enums";

export const AppointmentDetails = ({
  editAppointment = false,
  isOpen,
  onClose,
  savedChange,
}: {
  editAppointment?: boolean;
  isOpen: boolean;
  onClose: () => void;
  savedChange: React.Dispatch<boolean>;
}) => {
  const [status, setStatus] = useState<EStatusAppointment>(
    EStatusAppointment.ACCEPTED
  );
  const [location, setLocation] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const detailsData = useStore((state) => state.selectedAppointment);

  const toast = useToast();

  useEffect(() => {
    //TODO: Cada vez que se cambie al advisor, debemos llamar a la api para obtener su info
  }, [selectedAdvisor]);

  const save = () => {
    try {
      updateAppointment(
        detailsData.appointment.id,
        detailsData.student.id,
        {
          status: status,
          location: location,
        },
        {
          id_advisor: selectedAdvisor,
        }
      );
      toast({
        title: "¡Listo!",
        description: "Los cambios se han guardado correctamente.",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "¡Error!",
        description: "No se han podido guardar los cambios. Intente más tarde.",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onMySave = () => {
    savedChange(true);
    savedChange(false);
    if (status !== EStatusAppointment.ACCEPTED) {
      save();
    } else {
      if (location === "")
        toast({
          title: "¡Error!",
          description: "Debes definir una ubicación antes de confirmar la cita",
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (selectedAdvisor === "")
        toast({
          title: "¡Error!",
          description:
            "Debes seleccionar a un asesor antes de confirmar la cita",
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (selectedAdvisor !== "" && location !== "") save();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent shadow={0} borderRadius={"25px"}>
          <Button
            backgroundColor={"pink"}
            w={"10%"}
            position="absolute"
            bottom={"1%"}
            rounded={theme.radii.button}
            right={editAppointment ? "46.5%" : "48%"}
            color="white"
            onClick={() => onClose()}
          >
            Cerrar
          </Button>
          {!editAppointment ? (
            <Button
              backgroundColor={"blue"}
              w={"15%"}
              position="absolute"
              top={"47%"}
              right={"45%"}
              color="white"
            >
              {detailsData.appointment.status}
            </Button>
          ) : (
            <Button
              backgroundColor={"blue"}
              w={"15%"}
              position="absolute"
              bottom={"8%"}
              rounded={theme.radii.button}
              right={"44%"}
              color="white"
              onClick={() => onMySave()}
            >
              Guardar
            </Button>
          )}

          <Flex>
            <Flex
              backgroundColor="gray.50"
              maxH={"100vh"}
              rounded={theme.radii.general}
              flexDir="column"
              overflowY={"auto"}
            >
              <CardContent
                editAppointment={editAppointment}
                setSelectedAdvisor={setSelectedAdvisor}
                selectedAdvisor={selectedAdvisor}
              />
              <DetailsContent editAppointment={editAppointment} />
            </Flex>
            <Flex
              backgroundColor="gray.50"
              h={"100vh"}
              rounded={theme.radii.general}
              flexDir="column"
              overflowY={"auto"}
            >
              <CardContent
                type={1}
                editAppointment={editAppointment}
                setSelectedAdvisor={setSelectedAdvisor}
                selectedAdvisor={selectedAdvisor}
              />
              {editAppointment ? (
                <EditAppointmentContent
                  setStatus={setStatus}
                  setLocation={setLocation}
                />
              ) : (
                <CardContent
                  type={2}
                  editAppointment={editAppointment}
                  setSelectedAdvisor={setSelectedAdvisor}
                  selectedAdvisor={selectedAdvisor}
                />
              )}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
