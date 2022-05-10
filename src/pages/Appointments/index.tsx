//Libraries
import React, { useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";
import { useDisclosure, Box, Heading, Spinner, Flex } from "@chakra-ui/react";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric } from "../../components/Button";
import { AppointmentDetails } from "../AppointmentDetails";

//Interfaces
import { EStatusAppointment, EUserType } from "../../interfaces/enums";

import { Managment } from "../Managment";
import { getAllAppointments } from "../../api/appointments/get";
import { IDetailsAppointmentData } from "../../interfaces";

export const AppointmentsPage = ({ mobile }: { mobile: boolean }) => {
  const [savedChange, setSavedChange] = useState(false);
  //Data states
  const [fullData, setFullData] = useState<IDetailsAppointmentData[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [calledAPI, setCalledAPI] = useState<boolean>(false);

  //Edit state
  const [editAppointment, setEditAppointment] = useState(false);

  //Details Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Store
  const userType = useStore((state) => state.type);
  const userId = useStore((state) => state.id);
  const setSelectedData = useStore((state) => state.setSelectedAppointment);

  useEffect(() => {
    const obtainData = async () => {
      const response = await getAllAppointments(userId, userType);
      setFullData(response);
      const dataTable: any[] = [];
      response.map((data: any) =>
        dataTable.push({
          date: new Date(data.appointment.date).toLocaleString(),
          asesor:
            data.advisor !== undefined ? data.advisor.name : "Sin asignar",
          materia: data.subject.name,
          usuario: data.student.name,
          status: data.appointment.status,
        })
      );
      setTableData(dataTable);
    };
    obtainData().then(
      () => {
        setCalledAPI(true);
      },
      () => {
        setCalledAPI(true);
      }
    );
  }, [userId, userType, savedChange]);

  const myOnClick = (index: number, edit: boolean) => {
    setEditAppointment(edit);
    onOpen();
    setSelectedData(fullData[index]);
  };

  const noDataView = (
    <>
      <Heading textAlign="center" margin="0 auto">
        No hay datos de asesorías disponibles
      </Heading>
    </>
  );

  //Functions who determines which button is presented
  const DetailsEditsButton = (
    status = EStatusAppointment.ACCEPTED,
    index: number
  ) => {
    if (userType !== EUserType.admin) {
      if (status !== EStatusAppointment.PENDING) {
        return (
          <ButtonGeneric
            text={"Detalles"}
            fontColor="white"
            color={"blue"}
            onClick={() => {
              myOnClick(index, false);
            }}
          />
        );
      }
    } else {
      if (status === EStatusAppointment.PENDING) {
        return (
          <ButtonGeneric
            text={"Editar"}
            fontColor="white"
            color={"pink"}
            onClick={() => {
              myOnClick(index, true);
            }}
          />
        );
      } else {
        return (
          <ButtonGeneric
            text={"Detalles"}
            fontColor="white"
            color={"blue"}
            onClick={() => {
              myOnClick(index, false);
            }}
          />
        );
      }
    }
  };

  const myColumns = [
    { Header: "Fecha", accessor: "date" },
    { Header: "Asesor", accessor: "asesor" },
    { Header: "Materia", accessor: "materia" },
    { Header: "Asesorado", accessor: "usuario" },
    { Header: "Estatus", accessor: "status" },
    {
      Header: "",
      accessor: "details",
      Cell: (cell: Cell<any, any>) =>
        DetailsEditsButton(cell.row.values.status, cell.row.index),
    },
  ];

  const data = useMemo(() => [...tableData], [tableData]);

  if (tableData.length === 0) {
    if (!calledAPI) {
      return (
        <Flex h="50vh" justifyContent="center" alignItems="center">
          <Spinner color="purple" size="xl" />
        </Flex>
      );
    }
    return noDataView;
  } else {
    return (
      <>
        <AppointmentDetails
          isOpen={isOpen}
          onClose={onClose}
          editAppointment={editAppointment}
          savedChange={setSavedChange}
        />
        <Managment
          columns={myColumns}
          data={data}
          headColor={"pink"}
          mobile={mobile}
          header={"Asesorías"}
        />
      </>
    );
  }
};
