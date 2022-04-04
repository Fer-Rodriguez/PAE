import { Box } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import ButtonType from "../Button";

function Card({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <Center>
      <Box
        mt="125px"
        ml="100px"
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
        <Grid
          h="200px"
          templateRows="repeat(20, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={2}
        >
          <Box p="6">
            {/* Título */}
            <GridItem rowSpan={1} colSpan={1} bg="white">
              <Box fontWeight="bold" as="h1" fontSize={25} isTruncated>
                {title}
              </Box>
            </GridItem>
            {/* Subtítulo */}
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
          <GridItem rowSpan={1} colSpan={1} bg="white">
            {/* Botón */}
            <ButtonType text="X" />
          </GridItem>
          <GridItem p="6" rowSpan={38} colSpan={3} bg="white">
            {/* Contenido */}
            (◕︵◕)
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
}

export default Card;
