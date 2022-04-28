import { useMemo } from "react";

//Libraries
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cell } from "react-table";
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

interface IColumnDetails {
  [key: string]: string;
}

//Data

export function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Asesor",
        accessor: "assessor",
      },
      {
        Header: "Asesorado",
        accessor: "student",
      },
      {
        Header: "Class",
        accessor: "class",
      },
      {
        Header: "Estatus",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "button",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text={"Detalles"} color={"blue"}></ButtonGeneric>
        ),
      },
    ],
    []
  );
  const tuArregloDeObjetos = [
    {
      date: "16/01/2022 12:00",
      assessor: "Julián Martinez",
      student: "Daniela Ordan",
      class: "Electromagnetismo",
      status: "Pendiente",
    },
    {
      date: "15/01/2022 13:00",
      assessor: "Alejandro Castro",
      student: "Daniela Ordan",
      class: "Electromagnetismo",
      status: "Pendiente",
    },
    {
      date: "01/02/22 15:00",
      assessor: "Fernando Jimenez",
      student: "Daniel Maldonado",
      class: "Linux",
      status: "Terminada",
    },
    {
      date: "16/01/2022 10:00",
      assessor: "Guillermo Gutierrez",
      student: "Julián Martinez",
      class: "Español",
      status: "Abierta",
    },
    {
      date: "22/03/22 09:00",
      assessor: "Benjamín Parques",
      student: "Pedro Parques",
      class: "Ética",
      status: "Abierta",
    },
    {
      date: "20/04/2022 16:00",
      assessor: "Kanye West",
      student: "Rosalía",
      class: "Música",
      status: "Terminada",
    },
  ];

  const data = useMemo<IColumnDetails[]>(() => tuArregloDeObjetos, []);

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
                    desktop={
                      <Managment
                        columns={columns}
                        data={data}
                        headColor={"pink"}
                        mobile={false}
                        header={"Asesorías"}
                      />
                    }
                    mobile={
                      <Box m={6}>
                        <Managment
                          columns={columns}
                          data={data}
                          headColor={"pink"}
                          mobile
                          header={"Asesorías"}
                        />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
