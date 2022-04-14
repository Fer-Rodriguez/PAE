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
function Info_Button() {
  return (
    // Button from facebook.com
    <IconButton
      backgroundColor="#4CC9F0"
      aria-label="Search database"
      isRound={true}
    />
  );
}
export default Info_Button;
