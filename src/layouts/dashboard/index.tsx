import { Grid, GridItem } from "@chakra-ui/react";

export default function dashboard() {
  return (
    <Grid
      h="100vh"
      gap={8}
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(12, 1fr)"
      paddingTop={20}
      paddingLeft={10}
      paddingRight={10}
    >
      <GridItem colSpan={1} rowSpan={2} bg="tomato" />
      <GridItem rowStart={3} rowEnd={10} colSpan={1} bg="tomato" />
      <GridItem colStart={2} colSpan={2} bg="green" />
      <GridItem colStart={2} colSpan={2} rowSpan={3} bg="green" />
      <GridItem colStart={2} colSpan={1} rowSpan={3} bg="blue" />
      <GridItem colSpan={1} rowSpan={6} bg="blue" />
      <GridItem colStart={2} colSpan={1} rowSpan={3} bg="blue" />
      <GridItem colSpan={1} colStart={4} rowSpan={10} rowStart={1} bg="blue" />
    </Grid>
  );
}
