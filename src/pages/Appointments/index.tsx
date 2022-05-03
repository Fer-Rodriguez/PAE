//Libraries
import React, { useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric } from "../../components/Button";

//Functions
import { updateAppointment } from "../../api/appointments/update";

//Interfaces
import { EStatusAppointment } from "../../interfaces/enums";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import { getAllAppointments } from "../../api/appointments/get";

export const AppointmentsPage = ({ mobile }: { mobile: boolean }) => {
  const [myData, setMyData] = useState([]);
  const userType = useStore((state) => state.type);
  const userId = useStore((state) => state.id);

  const obtainData = async () => {
    const response = await getAllAppointments(userId, userType);
    setMyData(response);
  };

  useEffect(() => {
    obtainData();
  }, []);

  const columns: {
    Header: string;
    accessor: string;
    Cell?: (cell: Cell<any, any>) => any;
  }[] = useMemo(
    () =>
      myData[0]
        ? Object.keys(myData[0]).map((key, _value) => {
            return {
              Header: key,
              accessor: key,
            };
          })
        : [],
    [myData]
  );

  //Las siguientes operaciones variarán según el tipo de tabla que se quiera construir
  //TODO: meter estas operaciones en una función
  columns.shift();
  columns.push({
    Header: "",
    accessor: "accept",
    Cell: (cell: Cell<any, any>) => (
      <ButtonGeneric
        text={"Aceptar"}
        color={"purple"}
        onClick={() => {
          updateAppointment(cell.row.values.id, {
            status: EStatusAppointment.ACCEPTED,
          });
        }}
      />
    ),
  });
  columns.push({
    Header: "",
    accessor: "details",
    Cell: (cell: Cell<any, any>) => (
      <ButtonGeneric text={"Detalles"} color={"blue"} />
    ),
  });
  const data = useMemo<IColumnDetails[]>(() => [...myData], [myData]);

  //TODO: mejorar esta condicional para que se tome en cuenta que myData puede quedar vacío si
  //no hay datos en la db
  if (myData.length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <Managment
        columns={columns}
        data={data}
        headColor={"pink"}
        mobile={mobile}
        header={"Asesorías"}
      />
    );
  }
};
