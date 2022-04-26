import { Grid, GridItem, Text, Flex } from "@chakra-ui/react";

//Components
import { AppointmentListCard } from "./components/AppointmentListCard.component";
import { SwitchesCards } from "./components/SwitchesCards.components";
import { AppointmentsPollCard } from "./components/AppointMentPollCard.component";
import { MainCard } from "./components/MainCard.component";

//Interfaces
import { EUserType } from "../../interfaces/enums";

import "./style.css";

export const Dashboard = () => {
  return (
    <Grid
      templateColumns="repeat(14, 1fr)"
      templateRows="repeat(8, 1fr)"
      gap={7}
      height={"100vh"}
    >
      <GridItem w="100%" colSpan={8} rowSpan={1} colStart={2}>
        <Flex gap={1} mb={6}>
          <Text fontWeight={"bold"}>Hola, </Text>
          <Text> Shalom Pineda</Text>
        </Flex>

        <MainCard type={EUserType.admin} />
      </GridItem>
      <GridItem
        w="100%"
        h={"35vh"}
        rowStart={2}
        colStart={2}
        colSpan={4}
        rowSpan={3}
      >
        <AppointmentsPollCard type={EUserType.admin} />
      </GridItem>
      <GridItem w="100%" rowStart={2} colSpan={4} rowSpan={3}>
        <SwitchesCards />
      </GridItem>
      <GridItem w="100%" colStart={10} colSpan={4} rowSpan={4} mt={12}>
        <AppointmentListCard type={EUserType.admin} />
      </GridItem>
    </Grid>
  );
};
