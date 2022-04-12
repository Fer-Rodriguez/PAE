import { Box } from "@chakra-ui/react";
import theme from "../../theme/index";
import { Center } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { ReactElement } from "react";
import ButtonGeneric from "../Button";

/* La carta tiene como posibles propiedades título, subtítulo, botón de cerra y
el contenido, el cual puede ser otro componente :O */

function BaseCard({
  title,
  subtitle,
  closeButton,
  content,
}: {
  title?: string;
  subtitle?: string;
  closeButton?: boolean;
  content?: ReactElement;
}) {
  return (
    <Center>
      <Box
        /* Supongo que sería buena idea poner breakpoints para los margenes :c y
        con los demás valores (Borde, Shadow, etc.) pero pues aún no hay unu */
        mt="125px"
        ml="150px"
        mr="50px"
        width="850px"
        height="475px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="dark-lg"
        p="4"
        rounded={30}
        bg="white"
      >
        {/* Grid para mantener el botón, título y subtítulos en sus respectivas posiciones de manera más sencilla
        y colocar el contenido en la parte específica. */}
        <Grid
          h="200px"
          templateRows="repeat(20, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={2}
        >
          <Box p="6">
            {/* Título ٩(◕‿◕｡)۶ */}
            <GridItem rowSpan={1} colSpan={1} bg="white">
              <Box fontWeight="bold" as="h1" fontSize={25} isTruncated>
                {title}
              </Box>
            </GridItem>
            {/* Subtítulo ヽ(*・ω・)ﾉ */}
            <GridItem mt="10px" rowSpan={1} colSpan={1} bg="white">
              <Box
                fontWeight="semibold"
                as="span"
                fontSize={15}
                color="gray.600"
                isTruncated
              >
                {subtitle}
              </Box>
            </GridItem>
          </Box>
          <GridItem
            rowSpan={1}
            colSpan={1}
            bg="white"
            display="flex"
            justifyContent="flex-end"
          >
            {/* Botón ヽ(o＾▽＾o)ノ */}
            {closeButton ? (
              <ButtonGeneric text="X" color={theme.colors.pink} />
            ) : null}
          </GridItem>
          <GridItem p="6" rowSpan={38} colSpan={3} bg="white">
            {/* Contenido */}
            (◕︵◕)
            {content}
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}

export default BaseCard;
