import {
  Button,
  Flex,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

//Store
import { useStore } from "../../state/store";

export const DetailsContent = ({
  editAppointment,
}: {
  editAppointment: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detailsData = useStore((state) => state.selectedAppointment);
  const [infoType, setInfoType] = useState("description");
  const [date, setDate] = useState(new Date(detailsData.appointment.date));

  const MyModal = () => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {infoType === "description" ? "Descripción" : "Imagen"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {infoType === "description" ? (
            <Text>{detailsData.appointment.problem_description}</Text>
          ) : (
            <Image src={detailsData.appointment.photo_url} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Flex
      flexDir={"column"}
      p={8}
      alignItems={editAppointment ? "center" : "start"}
    >
      <MyModal />
      <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
        Información
      </Text>
      <Flex flexDirection={"row"} gap="6">
        <Button
          backgroundColor={"blue"}
          color="white"
          size={"sm"}
          onClick={() => {
            setInfoType("description");
            onOpen();
          }}
        >
          Descripción
        </Button>
        <Button
          backgroundColor={"pink"}
          color="white"
          size={"sm"}
          onClick={() => {
            setInfoType("image");
            onOpen();
          }}
        >
          Imagen
        </Button>
      </Flex>
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
