//Libraries
import React, { useMemo } from "react";
import { Cell } from "react-table";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric } from "../../components/Button";

//Functions
import { updateAppointment } from "../../api/appointments/update";

//Interfaces
import { IDataProfileCard } from "../../interfaces";
import { EStatusAppointment, EUserType } from "../../interfaces/enums";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";

export const AppointmentsPage = ({ mobile }: { mobile: boolean }) => {
  const userType = useStore((state) => state.type);

  const apiAcceptAppointment = async () => {
    await updateAppointment("4901dfc1-42c0-46bf-82f6-93e3609ae2b3", {
      status: EStatusAppointment.ACCEPTED,
    });
  };

  const columnsAdmin = useMemo(
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
        accessor: "accept",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric
            text={"Aceptar"}
            color={"purple"}
            onClick={apiAcceptAppointment}
          />
        ),
      },
      {
        Header: "",
        accessor: "details",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text={"Detalles"} color={"blue"} />
        ),
      },
    ],
    []
  );

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
        accessor: "details",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text={"Detalles"} color={"blue"} />
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
    <Managment
      columns={userType === EUserType.admin ? columnsAdmin : columns}
      data={data}
      headColor={"pink"}
      mobile={mobile}
      header={"Asesorías"}
    />
  );
};
