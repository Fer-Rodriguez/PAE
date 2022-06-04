import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Flex,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

//Store
import { useStore } from "../../state/store";

//Components
import { DetailsContent } from "./Details.component";
import { EditAppointmentContent } from "./EditAppointment.component";
import { CardContent } from "./Card.component";
import { QuestionAnswer } from "../../components/QuestionAnswer";
import { ButtonGeneric } from "../../components/Button";

//Functions
import { updateAppointment } from "../../api/appointments/update";
import { updateAppointmentDetails } from "../../api/appointments-user/update";

//Interfaces

import { IDetailsAppointmentData } from "../../interfaces";

import { EStatus, EStatusAppointment } from "../../interfaces/enums";

//Assets
import theme from "../../theme";


export const AppointmentDetails = ({
  editAppointment = false,
  isOpen,
  onClose,
  savedChange,
}: {
  editAppointment?: boolean;
  isOpen: boolean;
  onClose: () => void;
  savedChange?: React.Dispatch<boolean>;
}) => {
  const { id } = useParams();

  const [status, setStatus] = useState<EStatusAppointment>(
    EStatusAppointment.ACCEPTED
  );
  const [location, setLocation] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const detailsData = useStore((state) => state.selectedAppointment);
  const setDetailsData = useStore((state) => state.setSelectedAppointment);
  const allAppointmentDetails = useStore((state) => state.allAppointments);

  const toast = useToast();

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
    if (savedChange !== undefined) {
      savedChange(true);
      savedChange(false);
    }

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
  const { isOpen: qOpen, onOpen: qOnOpen, onClose: qClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />

        <ModalContent shadow={0} borderRadius={"25px"} />
        
        <ModalContent shadow={0}>
          <ButtonGeneric
            text="Ver respuestas"
            color="#f72585"
            onClick={qOnOpen}
          />
          <QuestionAnswer
            title="Preguntas y respuestas"
            customOpen={qOpen}
            customClose={qClose}
            customCancelRef={cancelRef}
            questions={[
              { question: "pregunta 1", answer: "respuesta 1" },
              { question: "pregunta 2", answer: "respuesta 2" },
              { question: "pregunta 3", answer: "respuesta 3" },
            ]}
          />
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
              maxH={"90vh"}
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
              h={"90vh"}
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
