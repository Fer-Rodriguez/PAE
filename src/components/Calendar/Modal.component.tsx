import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

import { ButtonGeneric } from "../Button";

//Assets
import theme from "../../theme";

interface MyModal {
  event: any | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  accept: () => void;
}

export const MyModal = ({ event, isOpen, onClose, accept }: MyModal) => {
  const acceptClick = () => {
    onClose();
    accept();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disponibilidad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Comienza: {event?.start._date.toString()}</Text>
            <Text>Finaliza: {event?.end._date.toString()}</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGeneric
              text="Cancelar"
              color={theme.colors.pink}
              onClick={onClose}
            />
            <ButtonGeneric
              onClick={(e) => acceptClick()}
              text="Aceptar"
              color={theme.colors.purple}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
