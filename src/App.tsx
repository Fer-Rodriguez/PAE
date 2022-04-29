import { useMemo } from "react";

//Libraries
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import { Login } from "./layouts/Login";

//Pages
import { Managment } from "./pages/Managment";

import { Dashboard } from "./pages/Dashboard";

import { MainLayout } from "./layouts/Main";

import { ProfilePage } from "./pages/Profile";

import { CitasPage } from "./pages/Agenda_Citas";

import { ButtonGeneric } from "./components/Button";

//CSS
import "./App.css";

import theme from "./theme";
import { AppointmentsPage } from "./pages/Appointments";
import { AdvisorsPage } from "./pages/Advisors";

//Data

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/dashboard">
            <Route
              index
              element={
                <MainLayout
                  desktop={<Dashboard />}
                  mobile={<Dashboard mobile={true} />}
                />
              }
            />
            <Route
              path="asesorias"
              element={
                <>
                  <MainLayout
                    desktop={<AppointmentsPage mobile={false} />}
                    mobile={
                      <Box m={6}>
                        <AppointmentsPage mobile />
                      </Box>
                    }
                  />
                </>
              }
            />
            <Route
              path="perfil"
              element={
                <MainLayout
                  desktop={<ProfilePage />}
                  mobile={<ProfilePage mobile />}
                />
              }
            />
            <Route
              path="crear_asesoria"
              element={
                <MainLayout
                  desktop={<CitasPage />}
                  mobile={<CitasPage mobile />}
                />
              }
            />
            <Route
              path="asesores"
              element={
                <MainLayout
                  desktop={<AdvisorsPage />}
                  mobile={<AdvisorsPage mobile />}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
