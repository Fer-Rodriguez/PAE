//Libraries
import {
  ChakraProvider,
  Box,
  Spinner,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

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
import { ConfirmEmail } from "./pages/ConfirmEmail";

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

export const Main = ({
  loggedIn,
  setLoggedIn,
  loaded,
}: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loaded: boolean;
}) => {
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

  const userType = useRef(useStore.getState().type);

  useEffect(() => {
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
      userType.current = state.type;
    });
  }, []);

  return (
    <>
      {loaded ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  desktop={<FormsLogin setLoggedIn={setLoggedIn} />}
                  mobile={
                    <FormsLogin setLoggedIn={setLoggedIn} mobile={true} />
                  }
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

            {!loggedIn ? (
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
                <Route
                  path="verififyEmail/:tkn"
                  element={
                    <Login
                      desktop={<ConfirmEmail />}
                      mobile={<ConfirmEmail mobile={true} />}
                    ></Login>
                  }
                />
                <Route path="*" element={<Navigate replace to="/" />}></Route>
              </>
            ) : (
              <>
                <Route path="/dashboard">
                  <Route
                    index
                    element={
                      type === EUserType.root ? (
                        <MainLayout
                          setLoggedIn={setLoggedIn}
                          desktop={<AdminPage />}
                          mobile={<AdminPage mobile={true} />}
                        />
                      ) : type === EUserType.default ? (
                        <Flex
                          height={"100vh"}
                          alignItems="center"
                          justifyContent="center"
                          gap="1em"
                        >
                          <Heading>Cargando... </Heading>
                          <Spinner size="xl" color="purple" />
                        </Flex>
                      ) : (
                        <MainLayout
                          setLoggedIn={setLoggedIn}
                          desktop={<Dashboard />}
                          mobile={<Dashboard mobile={true} />}
                        />
                      )
                    }
                  />
                  <Route
                    path="asesorias"
                    element={
                      <>
                        <MainLayout
                          setLoggedIn={setLoggedIn}
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
                        setLoggedIn={setLoggedIn}
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
                      type === EUserType.admin ? (
                        <MainLayout
                          setLoggedIn={setLoggedIn}
                          desktop={<AdvisorsPage />}
                          mobile={<AdvisorsPage mobile />}
                        />
                      ) : (
                        <Navigate replace to="/dashboard" />
                      )
                    }
                  />
                </Route>
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
      ) : (
        <></>
      )}
    </>
  );
};
