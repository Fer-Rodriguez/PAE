import React, { useMemo } from "react";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";

export const AdvisorsPage = ({ mobile = false }: { mobile?: boolean }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Career",
        accessor: "career",
      },
      {
        Header: "Semester",
        accessor: "semester",
      },
      {
        Header: "Estatus",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "edit",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text={"Editar"} color={"pink"} fontColor="white" />
        ),
      },
    ],
    []
  );

  const tuArregloDeObjetos = [
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
  ];
  const data = useMemo<IColumnDetails[]>(() => tuArregloDeObjetos, []);
  return (
    <Managment
      columns={columns}
      data={data}
      headColor={"blue"}
      mobile={mobile}
      header={"Asesores"}
    />
  );
};
