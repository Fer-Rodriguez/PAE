//Libraries
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layout
import { Login } from "./layouts/Login";

import { Dashboard } from "./pages/Dashboard";

import { MainLayout } from "./layouts/Main";

import { ProfilePage } from "./pages/Profile";

import { AppointmentsPage } from "./pages/Appointments";
import { AdvisorsPage } from "./pages/Advisors";

import { FormsLogin } from "./pages/Login";
import { FormsRegister } from "./pages/Register";

//CSS
import "./App.css";

import { PollCard } from "./pages/Poll";
import { CreateAppointmentLayout } from "./layouts/createAppointment";
import socket from "./socket";
import { useEffect, useState } from "react";
import { useToastHook } from "./hooks";
import { useStore } from "./state/store";
import {
  getAllAppointments,
  getRecentAppointment,
} from "./api/appointments/get";
import shallow from "zustand/shallow";
import { EUserType } from "./interfaces/enums";

enum ENotificationType {
  "APPOINTMENT_ACCEPTED" = "APPOINTMENT_ACCEPTED",
  "APPOINTMENT_REJECTED" = "APPOINTMENT_REJECTED",
  "NEW_REQUEST" = "NEW_REQUEST",
  "MESSAGE" = "MESSAGE",
}

interface INotificationData {
  title: string;
  description: string;
  idUser: string;
  type: ENotificationType;
}

export const Main = () => {
  const [currentNotification, setCurrentNotification] = useState({});

  const [state, newToast] = useToastHook();

  const { id, type, setRecentAppointment, setAllAppointments } = useStore(
    (state) => ({
      id: state.id,
      type: state.type,
      setRecentAppointment: state.setRecentAppointment,
      setAllAppointments: state.setAllAppointments,
    }),
    shallow
  );

  useEffect(() => {
    const updateAppointments = async () => {
      await getRecentAppointment(id, type, setRecentAppointment);
      const response = await getAllAppointments(id, type, true);
      setAllAppointments(response);
      //TODO: Solo funciona con este comentario...
      console.log("Actualizando");
    };

    const generateVisualNotification = async (data: INotificationData) => {
      if (data !== currentNotification) {
        setCurrentNotification(data);
        if (type === EUserType.admin) {
          if (data.type !== ENotificationType.MESSAGE) {
            updateAppointments();
          }
        } else if (type === EUserType.advisor || type === EUserType.student) {
          if (
            data.type === ENotificationType.APPOINTMENT_ACCEPTED ||
            data.type === ENotificationType.APPOINTMENT_REJECTED
          ) {
            updateAppointments();
          }
        }

        //TODO: No solo presentar el toast, sino también volver a consumir las APIS que refieren a appointments
        newToast({
          message: data.description,
          status: "success",
          title: `Nueva notificación: ${data.title}`,
        });
      } else {
        console.log("REPETIDO");
      }
    };

    socket
      .off("newNotification")
      .on("newNotification", generateVisualNotification);
  }, []);
  return (
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
            path="perfil/:id"
            element={
              <MainLayout
                desktop={<ProfilePage />}
                mobile={<ProfilePage mobile />}
              />
            }
          />
          <Route path="crear_asesoria" element={<CreateAppointmentLayout />} />
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
              <MainLayout desktop={<PollCard />} mobile={<PollCard mobile />} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
