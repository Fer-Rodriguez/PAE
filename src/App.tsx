//Libraries
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route
            path="/dashboard"
            element={
              <MainLayout
                desktop={<Dashboard />}
                mobile={<Dashboard mobile={true} />}
              />
            }
          />
          <Route
            path="/asesorías"
            element={
              <>
                <h1>Hola</h1>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
