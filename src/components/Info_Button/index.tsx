import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
/*
TODO: 13/01/2022 
-Implementar icono para el boton
-Adecuar la interfaz para el popup implementado por Myros
*/
interface IInfoButton {
  popUp: string;
}
export const Info_Button = () => {
  return (
    <IconButton
      backgroundColor="#4CC9F0"
      aria-label="Search database"
      isRound={true}
    />
  );
};
