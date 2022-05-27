import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";
import { useStore } from "../../state/store";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";

export const AdvisorsPage = ({ mobile = false }: { mobile?: boolean }) => {
  const advisors = useStore((state) => state.allUsers);
  const [advisorsColumnData, setAdvisorsColumn] = useState<
    Array<IColumnDetails>
  >([{ id: "" }]);

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
        Cell: (cell: Cell<any, any>) => {
          const id = advisorsColumnData[cell.row.index].id;
          return (
            <>
              {id !== undefined && (
                <Link to={`../perfil/${id}`}>
                  <ButtonGeneric
                    text={"Editar"}
                    color={"pink"}
                    fontColor="white"
                  />
                </Link>
              )}
            </>
          );
        },
      },
    ],
    [advisorsColumnData]
  );

  //TODO: Añadir la llamada al endpoint para obtener todos los usuarios asesores.
  const getAdvisorData = async () => {
    const advisorsColumn: Array<IColumnDetails> = [];
    await advisors.forEach((advisor) => {
      const columnData: IColumnDetails = {
        id: advisor.id,
        date: new Date(advisor.createDate!).toLocaleString(),
        name: advisor.name,
        semester: advisor.semester.toString(),
        status: advisor.status,
        career: advisor.career,
      };

      advisorsColumn.push(columnData);
    });

    console.log("Columns: ", advisorsColumn);

    setAdvisorsColumn(advisorsColumn);
  };

  useEffect(() => {
    getAdvisorData();
  }, []);

  return (
    <>
      {advisorsColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={advisorsColumnData}
          headColor={"blue"}
          mobile={mobile}
          header={"Asesores"}
        />
      )}
    </>
  );
};
