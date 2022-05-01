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

import { CitasPage2 } from "./pages/Agenda_Citas/citas_2";

import { ButtonGeneric } from "./components/Button";

import { AppointmentsPage } from "./pages/Appointments";
import { AdvisorsPage } from "./pages/Advisors";

import { FormsLogin } from "./pages/Login";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                desktop={<FormsLogin />}
                mobile={<FormsLogin mobile={true} />}
              />
            }
          />
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
                  desktop={<CitasPage2 />}
                  mobile={<CitasPage2 mobile />}
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
