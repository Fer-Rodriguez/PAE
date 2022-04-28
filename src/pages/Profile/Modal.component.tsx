import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";

import { LockIcon } from "@chakra-ui/icons";

import theme from "../../theme";

import { ButtonGeneric } from "../../components/Button";

interface IPasswordProfileModal {
  onClose: () => void;
  isOpen: boolean;
  size?: string;
}

export const PasswordProfileModal = ({
  onClose,
  isOpen,
  size = "md",
}: IPasswordProfileModal) => {
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const handleClickOne = () => setShow(!show);
  const handleClickTwo = () => setShowSecond(!showSecond);

  const toast = useToast();

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={30}>
          <Center>
            <Heading color={theme.colors.purple}>Cambiar Contraseña</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input
              type={show ? "text" : "password"}
              placeholder="Nueva Contraseña"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickOne}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup mt={6}>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input
              type={showSecond ? "text" : "password"}
              placeholder="Nueva Contraseña"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickTwo}>
                {showSecond ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <ButtonGeneric
            fontColor="white"
            onClick={() => {
              onClose();
              toast({
                title: "¡Listo!",
                description: "La contraseña se ha guardado con éxito.",
                position: "top",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            }}
            text="Guardar"
            color={theme.colors.purple}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};