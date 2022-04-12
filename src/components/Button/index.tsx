import { Button } from "@chakra-ui/react";

/* El botón solo recibe como propiedad el texto que tendrá,
debería de recibir algo más? O.o
tiene un pequeño ejemplo de los breakpoints responsivos, la parte de fontSize*/

function ButtonGeneric({ text, color }: { text: string; color: string }) {
  return (
    <Button
      backgroundColor={color}
      rounded={30}
      textAlign="center"
      /* parte responsiva */
      fontSize={{ base: "20px", md: "20px", lg: "20px" }}
    >
      {text}
    </Button>
  );
}

export default ButtonGeneric;
