import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

//Store
import { useStore } from "../../state/store";

//Assets
import robot from "../../assets/robot.png";
import persona from "../../assets/persona.png";
import adminRobot from "../../assets/adminRobot.png";
import { DropDown } from "../../components/Dropdown";
import { IConfigurationsDropdown, IObjectData } from "../../interfaces";
import { EStatusAppointment, ETypeDropdown } from "../../interfaces/enums";

interface ICardComponent {
  type?: number;
  editAppointment: boolean;
  setSelectedAdvisor: React.Dispatch<string>;
  selectedAdvisor: string;
}

const InfoContent = ({
  type = 0,
  editAppointment,
  setSelectedAdvisor,
  selectedAdvisor,
}: ICardComponent) => {
  const detailsData = useStore((state) => state.selectedAppointment);

  //TODO: Las opciones las tiene que dar la API
  const dropdownOption: IObjectData[] = [
    {
      title: "Víctor Mancera",
      value: "7746ad47-7664-4043-ab40-5aca0ce6872b",
    },
  ];

  const configurationDropdown: IConfigurationsDropdown = {
    onChange: (e) => setSelectedAdvisor(e.target.value),
    placeholder: "Selecciona a un/a asesor/a",
    type: ETypeDropdown.normal,
  };

  return (
    <Flex flexDirection={"column"}>
      <Box gap={10} textAlign="center">
        <Text fontSize="2xl" textColor={"white"}>
          {type === 0
            ? "Asesor/a"
            : type === 1
            ? "Asesorado/a"
            : "Administrador/a"}
        </Text>
        {editAppointment && type === 0 ? (
          <DropDown
            options={dropdownOption}
            configuration={configurationDropdown}
          />
        ) : (
          <Heading textColor={"white"}>
            {type === 0
              ? detailsData.advisor
                ? detailsData.advisor.name
                : "Ninguno/a"
              : type === 1
              ? detailsData.student.name
              : detailsData.admin.name}
          </Heading>
        )}
      </Box>
      {type !== 0 || selectedAdvisor !== "" || !editAppointment ? (
        <Flex flexDir={"column"} padding={4} gap={2}>
          <Text textColor={"white"}>Ing. Tecnologías Computacionales</Text>
          <Text textColor={"white"}>
            <strong>6to</strong> Semestre
          </Text>
          <Text textColor={"white"}>
            <strong>3</strong> horas completadas.
          </Text>
        </Flex>
      ) : (
        <Text color={"white"}>
          Aquí se colocarán los detalles del asesor seleccionado
        </Text>
      )}
    </Flex>
  );
};
export const CardContent = ({
  type = 0,
  editAppointment = false,
  setSelectedAdvisor,
  selectedAdvisor,
}: ICardComponent) => (
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
          <InfoContent
            type={type}
            editAppointment={editAppointment}
            selectedAdvisor={selectedAdvisor}
            setSelectedAdvisor={setSelectedAdvisor}
          />
        </GridItem>
      </>
    ) : (
      <>
        {" "}
        <GridItem colStart={1} colSpan={12} rowStart={3}>
          <InfoContent
            type={type}
            editAppointment={editAppointment}
            selectedAdvisor={selectedAdvisor}
            setSelectedAdvisor={setSelectedAdvisor}
          />
        </GridItem>
        <GridItem colStart={12} colSpan={9} rowStart={3}>
          <Image src={type === 0 ? robot : type === 1 ? persona : adminRobot} />
        </GridItem>{" "}
      </>
    )}
  </Grid>
);
