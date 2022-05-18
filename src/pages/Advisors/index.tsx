import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";

export const AdvisorsPage = ({ mobile = false }: { mobile?: boolean }) => {
  const [apiData, setData] = useState([{}]);
  const [selectedAdivosr, setSelectedAdvisor] = useState({});

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
          <Link to={`../perfil/${tuArregloDeObjetos[cell.row.index].id}`}>
            <ButtonGeneric text={"Editar"} color={"pink"} fontColor="white" />
          </Link>
        ),
      },
    ],
    []
  );

  //TODO: Añadir la llamada al endpoint para obtener todos los usuarios asesores.
  const getAdvisorData = async () => {
    console.log("Obteniendo asesores");
  };

  useEffect(() => {
    getAdvisorData();
  }, []);

  const tuArregloDeObjetos = [
    {
      id: "asdasdawdawd",
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      id: "asdasdawdawd",
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      id: "asdasdawdawd",
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      id: "asdasdawdawd",
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      id: "asdasdawdawd",
      date: "16/01/2022 12:00",
      name: "Julián Martinez",
      career: "IRS",
      semester: "6to",
      status: "Correcto",
    },
    {
      id: "asdasdawdawd",
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
