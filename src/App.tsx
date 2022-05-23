import { useMemo } from "react";

//Libraries
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import { Login } from "./layouts/Login";

//Pages
import { Managment } from "./pages/Managment";

import { ScheduleAppointment } from "./pages/ScheduleAppointment";
import { Dashboard } from "./pages/Dashboard";

import { MainLayout } from "./layouts/Main";

import { SubjectPage } from "./pages/Subject";

import { ProfilePage } from "./pages/Profile";

import { AppointmentsPage } from "./pages/Appointments";
import { AdvisorsPage } from "./pages/Advisors";

import { FormsLogin } from "./pages/Login";
import { FormsRegister } from "./pages/Register";

//CSS
import "./App.css";

import theme from "./theme";
import { PollCard } from "./pages/Poll";

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
          <Route
            path="/register"
            element={
              <Login
                desktop={<FormsRegister />}
                mobile={<FormsRegister mobile={true} />}
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
                  desktop={<ScheduleAppointment />}
                  mobile={<ScheduleAppointment mobile />}
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
            <Route
              path="encuestas"
              element={
                <MainLayout
                  desktop={<PollCard />}
                  mobile={<PollCard mobile />}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
