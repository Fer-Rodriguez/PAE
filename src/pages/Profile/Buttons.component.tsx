//Libraries
import {
  Center,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import React, { useRef } from "react";

//Components
import { ButtonGeneric } from "../../components/Button";

//Assets
import theme from "../../theme";

enum ETypeAlertButton {
  save,
  delete,
}

interface IAlertDelete {
  isOpen: boolean;
  cancelRef: any;
  onClose: () => void;
  onClickAccept: () => void;
  title: string;
  description: string;
  typeButton: ETypeAlertButton;
  mobile?: boolean;
}

const MyAlert = ({
  isOpen,
  cancelRef,
  onClose,
  onClickAccept,
  title,
  description,
  typeButton,
  mobile = false,
}: IAlertDelete) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      size={mobile ? "xs" : "lg"}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              backgroundColor={
                typeButton === ETypeAlertButton.delete
                  ? theme.colors.pink
                  : theme.colors.blue
              }
              onClick={onClickAccept}
              ml={3}
            >
              {typeButton === ETypeAlertButton.delete ? "Eliminar" : "Guardar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const ButtonChangePassword = ({ onOpen }: { onOpen: () => void }) => (
  <Center>
    <ButtonGeneric
      onClick={() => onOpen()}
      color={theme.colors.purple}
      text="Cambiar contraseña"
      fontColor="white"
    />
  </Center>
);

export const ButtonChangeSchedules = ({
  setModeSchedules,
}: {
  setModeSchedules: React.Dispatch<boolean>;
}) => (
  <Center>
    <ButtonGeneric
      color={theme.colors.blue}
      text="Modificar Horarios"
      fontColor="white"
      onClick={() => setModeSchedules(true)}
    />
  </Center>
);

export const ButtonEraseAdmin = ({ mobile = false }: { mobile?: boolean }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onClickAccept = () => {
    toast({
      title: "¡Listo!",
      description: "El administrador ha sido eliminado.",
      position: "top",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <ButtonGeneric
        color={theme.colors.pink}
        text="Eliminar Asesor"
        fontColor="white"
        onClick={() => onOpen()}
      />
      <MyAlert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onClickAccept={onClickAccept}
        title="Eliminar Asesor/a"
        description="¿Estás seguro/a? Esta acción es irreversible."
        typeButton={ETypeAlertButton.delete}
        mobile={mobile}
      />
    </>
  );
};

export const ButtonSaveChanges = ({
  setMyData,
  mobile = false,
}: {
  setMyData: () => void;
  mobile?: boolean;
}) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onClickAccept = () => {
    toast({
      title: "¡Listo!",
      description: "Los cambios se han guardado",
      position: mobile ? "bottom" : "top",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    setMyData();
    onClose();
  };

  return (
    <>
      <ButtonGeneric
        color={theme.colors.blue}
        text="Guardar Cambios"
        fontColor="white"
        onClick={() => onOpen()}
      />
      <MyAlert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        onClickAccept={onClickAccept}
        title="Confirmar cambios"
        description="¿Estás seguro/a? Los cambios se aplicarán inmediatamente."
        typeButton={ETypeAlertButton.save}
        mobile={mobile}
      />
    </>
  );
};