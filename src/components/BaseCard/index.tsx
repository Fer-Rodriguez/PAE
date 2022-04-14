//Chakra Components
import { Box, Grid, GridItem, Center } from "@chakra-ui/react";

//Own components
import { ButtonGeneric } from "../Button";

//Interfaces, types & enyms.
import { IBaseCard } from "../../interfaces";

//Assets
import theme from "../../theme/index";

/*
  BaseCard: Component that represents the base card to be used in different sections.
*    IBaseCard:
*     @title : Content that modifies the title of the card, if it has one, since there are cards that do not have it.
*     @subtitle : Content that modifies the subtitle of the card, if it has one, since there are cards that do not have it.
*     @closebutton : Content that modifies whether or not the card has a close button, since there are cards that do not have it.
*     @content : Content that allows entering the content of the letter, in case you want to add a component to it.
*/

export const BaseCard = (props: IBaseCard) => (
  <Center>
    <Box
      mt="5em"
      ml="5em"
      mr="3em"
      width="60em"
      height="35em"
      overflow="hidden"
      boxShadow="dark-lg"
      p="2em"
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
          {/* Subtítulo ヽ(*・ω・)ﾉ */}
          <GridItem mt="1em" rowSpan={1} colSpan={1}>
            <Box>{props.subtitle}</Box>
          </GridItem>
        </Box>
        <GridItem
          rowSpan={1}
          colSpan={1}
          display="flex"
          justifyContent="flex-end"
        >
          {/* Botón ヽ(o＾▽＾o)ノ */}
          {props.closeButton ? (
            <ButtonGeneric text="X" color={theme.colors.pink} />
          ) : null}
        </GridItem>
        <GridItem p="6" rowSpan={38} colSpan={3}>
          {/* Contenido */}
          (◕︵◕)
          {props.content}
        </GridItem>
      </Grid>
    </Box>
  </Center>
);
