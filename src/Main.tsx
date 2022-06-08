//Libraries
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

import { CreateAppointmentLayout } from "./layouts/createAppointment";
import socket from "./socket";
import { useEffect, useRef, useState } from "react";
import { useToastHook } from "./hooks";
import { useStore } from "./state/store";
import {
  getAllAppointments,
  getRecentAppointment,
} from "./api/appointments/get";
import shallow from "zustand/shallow";
import { ELanguage, EStatus, ETheme, EUserType } from "./interfaces/enums";
import { GetUserInfo } from "./api/users/get";
import { IUserData } from "./interfaces";
import { FormsRecovery } from "./pages/RecoverPassword";
import { AdminPage } from "./pages/Administrators";
import { SubjectPage } from "./pages/Subjects";

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
  const setUser = useStore((state) => state.setUser);

  const { id, type, setRecentAppointment, setAllAppointments } = useStore(
    (state) => ({
      id: state.id,
      type: state.type,
      setRecentAppointment: state.setRecentAppointment,
      setAllAppointments: state.setAllAppointments,
    }),
    shallow
  );

  const userType = useRef(useStore.getState().type);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      GetUserInfo(userId).then((userData) => {
        const isRoot = userData.user.type === EUserType.root;
        const correctUser: IUserData = {
          id: userData.user.id,
          status:
            userData.user.status === EStatus.active
              ? EStatus.active
              : userData.user.status === EStatus.deleted
              ? EStatus.deleted
              : EStatus.inactive,
          name: userData.user.name,
          email: userData.user.email,
          type:
            userData.user.type === EUserType.advisor
              ? EUserType.advisor
              : userData.user.type === EUserType.student
              ? EUserType.student
              : userData.user.type === EUserType.admin
              ? EUserType.admin
              : EUserType.root,
          semester: isRoot ? null : userData.user.userSemesters[0].semester,
          career: isRoot ? null : userData.user.career[0].id,
          careerName: isRoot ? null : userData.user.career[0].acronym,
          config: { language: ELanguage.spanish, theme: ETheme.white },
          profilePic: "No tengo",
          notifications: [],
          polls: [],
        };
        setUser(correctUser);
      });
    }
    const updateAppointments = async () => {
      await getRecentAppointment(id, type, setRecentAppointment);
      const response = await getAllAppointments(id, type, true);
      console.log("Todos los appointments: ", response);
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

  useEffect(() => {
    useStore.subscribe((state) => {
      console.log(state.type);
      userType.current = state.type;
    });
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
        {id === "" ? (
          <>
            <Route
              path="/recoverPassword"
              element={
                <Login
                  desktop={<FormsRecovery />}
                  mobile={<FormsRecovery mobile={true} />}
                />
              }
            />
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
          </>
        ) : (
          <Route path="/dashboard">
            <Route
              index
              element={
                userType.current === EUserType.root ? (
                  <MainLayout
                    desktop={<AdminPage />}
                    mobile={<AdminPage mobile={true} />}
                  />
                ) : (
                  <MainLayout
                    desktop={<Dashboard />}
                    mobile={<Dashboard mobile={true} />}
                  />
                )
              }
            />
            <Route
              path="subjects"
              element={
                <>
                  <MainLayout
                    desktop={<SubjectPage />}
                    mobile={<SubjectPage mobile={true} />}
                  />
                </>
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
            <Route
              path="crear_asesoria"
              element={<CreateAppointmentLayout />}
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
        )}
      </Routes>
    </BrowserRouter>
  );
};
