//Libraries
import React, { useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric } from "../../components/Button";
import { AppointmentDetails } from "../AppointmentDetails";

//Functions
import { updateAppointment } from "../../api/appointments/update";

//Interfaces
import { EStatusAppointment, EUserType } from "../../interfaces/enums";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import { getAllAppointments } from "../../api/appointments/get";
import { updateAppointmentDetails } from "../../api/appointments-user/update";

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
  //TODO: meter estas operaciones en una función? hacer algo más limpio, pues
  //columns.shift();
  if (userType == EUserType.admin) {
    columns.push({
      Header: "",
      accessor: "accept",
      Cell: (cell: Cell<any, any>) => (
        <ButtonGeneric
          text={"Aceptar"}
          color={"purple"}
          onClick={() => {
            console.log(cell.row.values.id);
            console.log(cell.row.values.id_advisor);
            updateAppointment(cell.row.values.id, {
              status: EStatusAppointment.ACCEPTED,
            });
            updateAppointmentDetails(
              cell.row.values.id,
              "61ab6f07-72c9-4c37-ae27-b21d89823cc8",
              "id_advisor"
            );
          }}
        />
      ),
    });
  }
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
      <>
        <AppointmentDetails />
        <Managment
          columns={columns}
          data={data}
          headColor={"pink"}
          mobile={mobile}
          header={"Asesorías"}
        />
      </>
    );
  }
};
