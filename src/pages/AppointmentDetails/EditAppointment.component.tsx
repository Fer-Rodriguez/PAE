import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

//Assets
import { DropDown } from "../../components/Dropdown";
import { IConfigurationsDropdown, IObjectData } from "../../interfaces";
import { EStatusAppointment, ETypeDropdown } from "../../interfaces/enums";
import { TextInput } from "../../components/TextInput";

export const EditAppointmentContent = ({
  setStatus,
  setLocation,
}: {
  setStatus: React.Dispatch<EStatusAppointment>;
  setLocation: React.Dispatch<string>;
}) => {
  const dropdownStatusOptions: IObjectData[] = [
    {
      title: "Aceptada",
      value: EStatusAppointment.ACCEPTED,
    },
    {
      title: "Cancelada",
      value: EStatusAppointment.CANCELED,
    },
    {
      title: "En revisión",
      value: EStatusAppointment.PENDING,
    },
  ];

  const configurationDropdown: IConfigurationsDropdown = {
    onChange: (e) => setStatus(e.target.value as EStatusAppointment),
    placeholder: "Asigna un estatus a la cita",
    type: ETypeDropdown.three,
  };

  return (
    <Flex flexDir={"column"} p={8} alignItems="center" mr={24}>
      <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
        Estatus
      </Text>
      <DropDown
        configuration={configurationDropdown}
        options={dropdownStatusOptions}
        baseProps={{ width: "60%", mb: "3vh" }}
      />
      <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
        Ubicación
      </Text>
      <TextInput
        width="60%"
        multiLine={false}
        placeholderText="Colocar ubicación"
        onChange={(e) => setLocation(e.target.value)}
      />
    </Flex>
  );
};
