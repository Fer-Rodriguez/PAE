import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { GetAllAdmins } from "../../api/users/get";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ButtonGeneric as Button } from "../../components/Button";
import { useStore } from "../../state/store";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import socket from "../../socket";
import { Box, Center } from "@chakra-ui/react";

//Dark Mode
import { DarkMode } from "../../colors";

export const AdminPage = ({ mobile = false }: { mobile?: boolean }) => {
  const setAllUsers = useStore((state) => state.setAllUsers);

  useEffect(() => {
    socket.connect();
    // socket.emit("initial", { myId: userData.id }, (response: any) => {
    //   console.log(response.status);
    // });
    GetAllAdmins(setAllUsers);
  }, []);
  const administrators = useRef(useStore.getState().allUsers);
  const [administratorsColumnData, setAdministratorsColumn] = useState<
    Array<IColumnDetails>
  >([{ id: "" }]);

  const columns = useMemo(
    () => [
      {
        Header: "Fecha de ingreso",
        accessor: "date",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Carrera",
        accessor: "career",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      {
        Header: "Estatus",
        accessor: "status",
      },
      {
        Header: "",
        accessor: "delete",
        Cell: (cell: Cell<any, any>) => {
          const id = administratorsColumnData[cell.row.index].id;
          return (
            <>
              {id !== undefined && (
                <Link to={``}>
                  <Button
                    text={"Eliminar"}
                    color={DarkMode().pink}
                    fontColor="white"
                  />
                </Link>
              )}
            </>
          );
        },
      },
    ],
    [administratorsColumnData]
  );

  //TODO: Añadir la llamada al endpoint para obtener todos los usuarios asesores.
  const getAdminData = async () => {
    const administratorsColumn: Array<IColumnDetails> = [];
    await administrators.current.forEach((administrator) => {
      const columnData: IColumnDetails = {
        id: administrator.id,
        date: new Date(administrator.createDate!).toLocaleString(),
        name: administrator.name,
        semester: administrator.semester.toString(),
        status: administrator.status,
        career: administrator.careerName
          ? administrator.careerName
          : administrator.career,
      };

      administratorsColumn.push(columnData);
    });

    console.log("Columns: ", administratorsColumn);

    setAdministratorsColumn(administratorsColumn);
  };

  useEffect(() => {
    useStore.subscribe((state) => {
      administrators.current = state.allUsers;
      getAdminData();
    });
  }, []);

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <>
      {administratorsColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={administratorsColumnData}
          headColor={DarkMode().blue}
          mobile={mobile}
          header={"Administradores"}
        />
      )}
      <Center marginTop={"20px"}>
        <ButtonGeneric
          bgColor="purple"
          sizePX="25%"
          text="Crear un administrador"
          onClick={() => console.log()}
        ></ButtonGeneric>
      </Center>
    </>
  );
};
