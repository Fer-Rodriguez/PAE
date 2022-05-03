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
import { getAllAppointments } from "../../api/appointments/get";

export const AppointmentsPage = ({ mobile }: { mobile: boolean }) => {
  const userType = useStore((state) => state.type);
  const userId = useStore((state) => state.id);

  const apiAcceptAppointment = async () => {
    await updateAppointment("4901dfc1-42c0-46bf-82f6-93e3609ae2b3", {
      status: EStatusAppointment.ACCEPTED,
    });
  };

  let dataFromAPI: IColumnDetails[] = [];
  let columnsFromData: (
    | {
        Header: string;
        accessor: string;
        Cell?: undefined;
      }
    | {
        Header: string;
        accessor: string;
        Cell: (cell: Cell<any, any>) => JSX.Element;
      }
  )[] = [];
  getAllAppointments(userId, userType).then((res) => {
    dataFromAPI = res.data;
    columnsFromData = Object.keys(res.data[0]).map((key, _value) => {
      return {
        Header: key,
        accessor: key,
      };
    });
    console.log("COLUMNAS: " + columnsFromData);
  });

  columnsFromData.push({
    Header: "",
    accessor: "accept",
    Cell: (cell: Cell<any, any>) => (
      <ButtonGeneric
        text={"Aceptar"}
        color={"purple"}
        onClick={() =>
          updateAppointment(cell.row.values.id, {
            status: EStatusAppointment.ACCEPTED,
          })
        }
      />
    ),
  });
  columnsFromData.push({
    Header: "",
    accessor: "details",
    Cell: (cell: Cell<any, any>) => (
      <ButtonGeneric text={"Detalles"} color={"blue"} />
    ),
  });

  useMemo(() => {
    columnsFromData;
  }, []);

  console.log("DATA: " + dataFromAPI);
  const data = useMemo<IColumnDetails[]>(() => dataFromAPI, []);
  return (
    <Managment
      columns={columnsFromData}
      data={data}
      headColor={"pink"}
      mobile={mobile}
      header={"Asesorías"}
    />
  );
};
