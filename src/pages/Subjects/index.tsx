import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { GetAllAdmins } from "../../api/users/get";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";
import { useStore } from "../../state/store";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";

export const SubjectPage = ({ mobile = false }: { mobile?: boolean }) => {
  const subjects = useRef(useStore.getState().allSubjects);
  const [subjectsColumnData, setSubjectsColumn] = useState<
    Array<IColumnDetails>
  >([{ id: "" }]);

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "subjectacronym",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Carrera",
        accessor: "careerAcronym",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      {
        Header: "",
        accessor: "edit",
        Cell: (cell: Cell<any, any>) => {
          const id = subjectsColumnData[cell.row.index].id;
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
      {
        Header: "",
        accessor: "delete",
        Cell: (cell: Cell<any, any>) => {
          const id = subjectsColumnData[cell.row.index].id;
          return (
            <>
              {id !== undefined && (
                <Link to={`../perfil/${id}`}>
                  <ButtonGeneric
                    text={"Eliminar"}
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
    [subjectsColumnData]
  );

  const getSubjectData = async () => {
    const subjectsColumn: Array<IColumnDetails> = [];
    await subjects.current
      .filter((element: any) => element.page === 132)[0]
      .subjects.forEach((subject) => {
        const columnData: IColumnDetails = {
          ...subject,
        };

        subjectsColumn.push(columnData);
      });

    setSubjectsColumn(subjectsColumn);
  };

  useEffect(() => {
    useStore.subscribe((state) => {
      subjects.current = state.allSubjects;
      getSubjectData();
    });
  }, []);

  useEffect(() => {
    getSubjectData();
  }, []);

  return (
    <>
      {subjectsColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={subjectsColumnData}
          headColor={"blue"}
          mobile={mobile}
          header={"Materias"}
        />
      )}
    </>
  );
};
