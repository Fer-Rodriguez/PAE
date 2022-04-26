import {
  Grid,
  GridItem,
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Image,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/Button";
import { DividedCard } from "../../components/DividedCard";

//Components
import FlagMan from "./Icons/FlagMan";

//Interfaces
import { EUserType } from "../../interfaces/enums";

//Assets
import theme from "../../theme";
import notebook from "./Icons/notebook.png";
import world from "./Icons/world.png";
import hand from "./Icons/hand.png";
import rocket from "./Icons/cohete.png";
import hamds from "./Icons/hands.png";
import "./style.css";

const AppointmentListCard = ({ type }: { type: EUserType }) => {
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

const SwitchesCards = () => {
  const TextContent = ({ language = false }: { language?: boolean }) => (
    <Center flexDirection={"column"}>
      <Text fontSize={"sm"} fontWeight="bold">
        Haz Click
      </Text>
      <Heading size={"lg"}>{language ? "ES" : "Luz"}</Heading>
      <Text fontSize={"x-small"}>
        {language ? "Para cambiar el idioma" : "Para cambiar el tema"}
      </Text>
    </Center>
  );

  return (
    <Flex direction={"column"} h="90%" gap={5}>
      <DividedCard
        colorFirst={theme.colors.purple}
        percentageFirst="50%"
        percentageSecond="50%"
        colorSecond="white"
        overlap={true}
        vertical={false}
        contentSecond={<TextContent language />}
        contentFirst={<Image src={world} boxSize="6vw" />}
      />
      <DividedCard
        colorFirst={theme.colors.purple}
        percentageFirst="50%"
        percentageSecond="50%"
        colorSecond="white"
        overlap={true}
        vertical={false}
        contentSecond={<TextContent />}
        contentFirst={<Image src={hand} boxSize="5vw" />}
      />
    </Flex>
  );
};

const AppointmentsPollCard = ({ type }: { type: EUserType }) => {
  const BottomContent = () => (
    <Flex flexDirection={"column"} m={"2"} gap={3}>
      <Heading as="h4" size="sm">
        {type === EUserType.admin ? "¡Encuestas!" : "Agendar Asesoría"}
      </Heading>
      <Button
        borderRadius={theme.radii.general}
        backgroundColor={theme.colors.purple}
        color="white"
        size="sm"
      >
        {type === EUserType.admin ? "Editar" : "Agendar"}
      </Button>
    </Flex>
  );

  return (
    <DividedCard
      colorFirst={theme.colors.blue}
      percentageFirst="60%"
      percentageSecond="40%"
      colorSecond="white"
      overlap={false}
      vertical
      contentSecond={<BottomContent />}
      contentFirst={
        <Image
          src={type === EUserType.admin ? hamds : notebook}
          boxSize={type === EUserType.admin ? "15vw" : "8vw"}
        />
      }
    />
  );
};

const MainCard = ({ type }: { type: EUserType }) => {
  return (
    <Flex
      className="MainCard"
      p={6}
      flexDirection="row"
      rounded={theme.radii.general}
    >
      <Flex flexDirection={"column"}>
        <Text color={"white"}>
          {type === EUserType.admin
            ? "Tienes una nueva solicitud"
            : "Tu próxima asesoria"}
        </Text>
        <Heading color={"white"}>Lunes, 25 de Marzo</Heading>
        <HStack gap={6} mt={2}>
          <Text color={"white"}>19:30 - 20:30</Text>
          <ButtonGeneric
            text="Detalles"
            color={theme.colors.pink}
            fontColor="white"
          />
        </HStack>
      </Flex>
      {type === EUserType.student ? (
        <Box position={"absolute"} top="7%" left={"46%"}>
          <FlagMan />
        </Box>
      ) : (
        <Box position={"absolute"} top="15%" left={"40%"}>
          <Image boxSize={"20vw"} src={rocket} />
        </Box>
      )}
    </Flex>
  );
};

export const Dashboard = () => {
  return (
    <Grid
      templateColumns="repeat(14, 1fr)"
      templateRows="repeat(8, 1fr)"
      gap={7}
      height={"100vh"}
    >
      <GridItem w="100%" colSpan={8} rowSpan={1} colStart={2}>
        <Flex gap={1} mb={6}>
          <Text fontWeight={"bold"}>Hola, </Text>
          <Text> Shalom Pineda</Text>
        </Flex>

        <MainCard type={EUserType.admin} />
      </GridItem>
      <GridItem
        w="100%"
        h={"35vh"}
        rowStart={2}
        colStart={2}
        colSpan={4}
        rowSpan={3}
      >
        <AppointmentsPollCard type={EUserType.admin} />
      </GridItem>
      <GridItem w="100%" rowStart={2} colSpan={4} rowSpan={3}>
        <SwitchesCards />
      </GridItem>
      <GridItem w="100%" colStart={10} colSpan={4} rowSpan={4} mt={12}>
        <AppointmentListCard type={EUserType.admin} />
      </GridItem>
    </Grid>
  );
};
