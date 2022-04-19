//Chakra
import {
  Box,
  Flex,
  Spacer,
  Image,
  Grid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";
import { useMemo } from "react";
import makeData from "../../components/Bell/makeData";

//Components
import { Menu } from "../../components/Menu";
import { Bell } from "../../components/Bell";

//Interfaces
import { IUserComponents } from "../../interfaces";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";

function GetData() {
  const columns = useMemo(
    () => [
      { Header: "Notificacion", accessor: "notification" },
      { Header: "Descripcion", accessor: "dataNotification" },
      {
        Header: "",
        accessor: "button",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text="Detalles" color="red" />
        ),
      },
    ],
    []
  );

  const data = useMemo(() => makeData(5), []);

  return <Bell columns={columns} data={data} headColor="black" />;
}

export const DesktopComponents = ({ userComponent }: IUserComponents) => (
  <Grid
    templateRows="repeat(9, 1fr)"
    templateColumns="repeat(16, 1fr)"
    h={"100vh"}
    mx={4}
    gap={4}
  >
    <GridItem rowStart={1} rowSpan={2} colSpan={2}>
      <Flex justifyContent={"center"} alignContent={"flex-end "}>
        <Image
          maxWidth={"9vw"}
          src="https://orienta-me.com/assets/globals/img/orienta-me/login/t_queremos.png"
          alt="Logo del Programa de Acompañamiento Estudiantil"
          justifyContent="space-around"
        />
      </Flex>
    </GridItem>

    <GridItem rowStart={2} rowSpan={1} colStart={14}>
      <Flex
        w={"100%"}
        h={"100%"}
        alignItems="center"
        justifyContent={"space-around"}
      >
        <CloseIcon boxSize={4} />
        {GetData()}
      </Flex>
    </GridItem>
    <GridItem rowStart={5} colSpan={2} colStart={1}>
      <Center>
        <Menu />
      </Center>
    </GridItem>

    <GridItem rowStart={3} rowSpan={6} colStart={3} colSpan={12}>
      <Box w="100%" h={"100%"}>
        {/** Here is going to be render the corresponding child component */}
        {userComponent}
      </Box>
    </GridItem>
  </Grid>
);
