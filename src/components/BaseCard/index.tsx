//Chakra Components
import { Box, Grid, GridItem, Center } from "@chakra-ui/react";

//Interfaces, types & enyms.
import { IBaseCard } from "../../interfaces";

//Assets
import theme from "../../theme/index";

/*
  BaseCard: Component that represents the base card to be used in different sections.
*    IBaseCard:
*     @title : Content that modifies the title of the card, if it has one, since there are cards that do not have it.
*     @content : Content that allows entering the content of the letter, in case you want to add a component to it.
*/

export const BaseCard = (props: IBaseCard) => (
  <Center>
    <Box
      margin="7em 1em 1em 10em"
      width="65em"
      height="35em"
      overflow="hidden"
      boxShadow="dark-lg"
      p="5"
      rounded={theme.radii.menu}
    >
      <Grid
        templateRows="repeat(20, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <Box p="6">
          {/* Título ٩(◕‿◕｡)۶ */}
          <GridItem rowSpan={1} colSpan={1}>
            <Box>{props.title}</Box>
          </GridItem>
        </Box>
        <GridItem p="6" rowSpan={38} colSpan={3}>
          {/* Contenido (◕︵◕)*/}
          {props.content}
        </GridItem>
      </Grid>
    </Box>
  </Center>
);
