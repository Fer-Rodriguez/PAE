import { ChangeEvent, ComponentType } from "react";

import { ETypeDropdown } from "../../interfaces/enums";
import { Box, Spacer, Center, VStack } from "@chakra-ui/react";

//Zustand
import { useStore } from "../../state/store";

import { ButtonGeneric } from "../../components/Button";
import { DropDown } from "../../components/Dropdown";
import { Text_Input } from "../../components/Text_Input";
//Assets
import theme from "../../theme/index";

export const CitasPage = ({ mobile }: { mobile?: boolean }) => {
  const myOptions = [
    {
      title: "Hola",
    },
    {
      title: "Mundo",
    },
    {
      title: ":D",
    },
  ];

  const configurations = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      //TODO: Darle focus al text in
      console.log("Evento: ", e);
    },
    placeholder: "Seleccionar materia",
    type: ETypeDropdown.normal,
  };

  return (
    <VStack spacing="50px" alignItems={mobile ? "center" : "start"}>
      <Box w="40%">
        <DropDown
          options={myOptions}
          configuration={configurations}
          color={theme.colors.pink}
          fontColor="white"
          borderRadius={theme.radii.button}
        />
      </Box>
      <Text_Input
        multiLine={false}
        placeholderText="Escribe aquí el problema en cuestión"
        width={mobile ? "85%" : "100%"}
      />
      <ButtonGeneric
        text="Añadir foto"
        color={theme.colors.blue}
        fontColor="black"
      />
      <Center w="100%">
        <ButtonGeneric
          text="Siguiente"
          color={theme.colors.pink}
          fontColor="white"
        />
      </Center>
    </VStack>
  );
};
