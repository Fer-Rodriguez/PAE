import { useMemo, useState, useEffect, useRef } from "react";
import { GetAllAdmins } from "../../api/users/get";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";
import { useStore } from "../../state/store";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import socket from "../../socket";
import { getAllSubjects } from "../../api/subjects/get";

//Dark Mode
import { DarkMode } from "../../colors";

export const SubjectPage = ({ mobile = false }: { mobile?: boolean }) => {
  const setAllUsers = useStore((state) => state.setAllUsers);
  const setAllSubjects = useStore((state) => state.setAllSubjects);

  useEffect(() => {
    socket.connect();
    // socket.emit("initial", { myId: userData.id }, (response: any) => {
    //   console.log(response.status);
    // });
    GetAllAdmins(setAllUsers);
    getAllSubjects(setAllSubjects);
  }, []);
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
                    color={DarkMode().pink}
                    fontColor={DarkMode().textWtB}
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
                    color={DarkMode().pink}
                    fontColor={DarkMode().textWtB}
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
          headColor={DarkMode().blue}
          mobile={mobile}
          header={"Materias"}
        />
      )}
    </>
  );
};
