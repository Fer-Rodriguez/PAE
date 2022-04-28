//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";

//Pages
import { Managment } from "./pages/Managment";

import { CitasPage } from "./pages/Agenda_Citas";
import { CitasPage2 } from "./pages/Agenda_Citas/citas_2";
import { CitasPage3 } from "./pages/Agenda_Citas/citas_3";
import { Dashboard } from "./pages/Dashboard";

//CSS
import "./App.css";

import theme from "./theme";
import { useMemo } from "react";
import { Cell } from "react-table";
import { ButtonGeneric } from "./components/Button";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout
        desktop={<Dashboard />}
        mobile={<Dashboard mobile={true} />}
      />
    </ChakraProvider>
  );
}
