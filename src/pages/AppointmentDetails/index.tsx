import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

//Assets
import theme from "../../theme";
import robot from "../../assets/robot.png";
import persona from "../../assets/persona.png";
import adminRobot from "../../assets/adminRobot.png";

const DetailsContent = () => (
  <Flex flexDir={"column"} p={8}>
    <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
      Materia
    </Text>
    <Text fontSize={"lg"}>Electromagnetismo</Text>
    <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
      Ubicación
    </Text>
    <Text fontSize={"lg"}>Electromagnetismo</Text>
    <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
      Fecha
    </Text>
    <Text fontSize={"lg"}>21 de Febrero - 19:30</Text>
  </Flex>
);

const InfoContent = ({ type = 0 }) => (
  <Flex flexDirection={"column"}>
    <Box gap={10} textAlign="center">
      <Text fontSize="2xl" textColor={"white"}>
        {type === 0
          ? "Asesor/a"
          : type === 1
          ? "Asesorado/a"
          : "Administrador/a"}
      </Text>
      <Heading textColor={"white"}>Rebeca Martinez</Heading>
    </Box>
    <Flex flexDir={"column"} padding={4} gap={2}>
      <Text textColor={"white"}>Ing. Tecnologías Computacionales</Text>
      <Text textColor={"white"}>
        <strong>6to</strong> Semestre
      </Text>
      <Text textColor={"white"}>
        <strong>3</strong> horas completadas.
      </Text>
    </Flex>
  </Flex>
);
const CardContent = ({ type = 0 }: { type?: number }) => (
  <Grid
    templateColumns="repeat(20, 1fr)"
    templateRows="repeat(6, 1fr)"
    h={"50%"}
    backgroundColor={type === 0 ? "pink" : type === 1 ? "blue" : "purple"}
    p={8}
  >
    {type === 1 ? (
      <>
        {" "}
        <GridItem colStart={1} colSpan={8} rowStart={3}>
          <Image src={persona} />
        </GridItem>{" "}
        <GridItem colStart={9} colSpan={12} rowStart={3}>
          <InfoContent type={type} />
        </GridItem>
      </>
    ) : (
      <>
        {" "}
        <GridItem colStart={1} colSpan={12} rowStart={3}>
          <InfoContent type={type} />
        </GridItem>
        <GridItem colStart={12} colSpan={9} rowStart={3}>
          <Image src={type === 0 ? robot : type === 1 ? persona : adminRobot} />
        </GridItem>{" "}
      </>
    )}
  </Grid>
);

export const AppointmentDetails = () => {
  //TODO: This states are handled by the parent.
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={() => onOpen()}>Abrir</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />
        <ModalContent shadow={0}>
          <Button
            backgroundColor={"blue"}
            w={"15%"}
            position="absolute"
            top={"47%"}
            right={"45%"}
          >
            Completed
          </Button>
          <Flex>
            <Flex
              backgroundColor="gray.50"
              h={"90vh"}
              rounded={theme.radii.general}
              flexDir="column"
            >
              <CardContent />
              <DetailsContent />
            </Flex>
            <Flex
              backgroundColor="gray.50"
              h={"90vh"}
              rounded={theme.radii.general}
              flexDir="column"
            >
              <CardContent type={1} />
              <CardContent type={2} />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
