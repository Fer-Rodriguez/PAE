import { useState, ChangeEvent, ComponentType } from "react";

import { ETypeDropdown } from "../../interfaces/enums";
import { Box, Spacer, Center, VStack } from "@chakra-ui/react";

//Zustand
import { useStore } from "../../state/store";

import { ButtonGeneric } from "../../components/ButtonGeneric";
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

  const [idSubject, setIdSubject] = useState("");
  const [description, setDescription] = useState("");
  const photoURL = "www.imagenes.com/alguna-imagen";
  const addNewAppointment = useStore((state) => state.addNewAppointment);
  const configurations = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      //TODO: Darle focus al text in
      setIdSubject(e.currentTarget.value);
    },
    placeholder: "Seleccionar materia",
    type: ETypeDropdown.normal,
  };

  addNewAppointment({
    date: "",
    description: "",
    photo_url: "",
    id_subject: "",
    id_petitioner: "",
    phase: 1,
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(`Description: ${description} & Password: ${idSubject}`);
  };

  return (
    <VStack spacing="50px" alignItems={mobile ? "center" : "start"}>
      <form onSubmit={handleSubmit}>
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            //TODO: Darle focus al text in
            setDescription(e.currentTarget.value);
          }}
        />
        <ButtonGeneric
          text="Añadir foto"
          bgColor={theme.colors.blue}
          fontColor="black"
          sizePX={"40%"}
        />
        <Center w="100%">
          <ButtonGeneric
            type="submit"
            text="Siguiente"
            bgColor={theme.colors.pink}
            fontColor="white"
            sizePX={"40%"}
          />
        </Center>
      </form>
    </VStack>
  );
};
