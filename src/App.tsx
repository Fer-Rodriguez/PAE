//Libraries
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layout
import { Login } from "./layouts/Login";

//Pages
import { Managment } from "./pages/Managment";

import { ScheduleAppointment } from "./pages/ScheduleAppointment";
import { Dashboard } from "./pages/Dashboard";

import { MainLayout } from "./layouts/Main";

//CSS
import "./App.css";

import theme from "./theme";
import { ProfilePage } from "./pages/Profile";
import { FormsLogin } from "./pages/Login";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login desktop={<FormsLogin></FormsLogin>}></Login>}
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
            <Route path="asesorias" element={<></>} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
