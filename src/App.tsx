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
import { useMemo } from "react";
import { Cell } from "react-table";
import { ButtonGeneric } from "./components/Button";

export function App() {
  const students = [
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

  interface IColumnDetails {
    [key: string]: string;
  }

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

  const data = useMemo<IColumnDetails[]>(() => students, []);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="dashboard">
            <MainLayout
              desktop={<Dashboard />}
              mobile={<Dashboard mobile={true} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
