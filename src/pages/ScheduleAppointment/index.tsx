import { useState } from "react";

import { Box } from "@chakra-ui/react";

import axios from "axios";

//Zustand
import { useStore } from "../../state/store";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

export const ScheduleAppointment = ({ mobile }: { mobile?: boolean }) => {
  const [formStep, setFormStep] = useState(0);
  const [idPetitioner, setIdPetitioner] = useState("");
  const [date, setDate] = useState("");
  const [idSubject, setIdSubject] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [image, setImage] = useState("");

  const createAppointment = () => {
    const data = JSON.stringify({
      idPetitioner: idPetitioner,
      date: date,
      idSubject: idSubject,
      problemDescription: problemDescription,
      image: image,
    });

    const config = {
      method: "post",
      url: "localhost:6060/appointment",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return (
        <BasicInfoScreen
          onNextScreenButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setFormStep(1);
          }}
          onDropDownChange={setIdSubject}
          onTextFieldChange={setProblemDescription}
          globalValue={idSubject}
          globalValue2={problemDescription}
        ></BasicInfoScreen>
      );
    } else if (step == 1) {
      return (
        <ScheduleScreen
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            //Llamada a API aquí xd
            // createAppointment();
            setFormStep(0);
          }}
        ></ScheduleScreen>
      );
    } else if (step == 2) {
      return <SuccessScreen></SuccessScreen>;
    } else {
      return <Box>Invalid form step</Box>;
    }
  };

  return <Box>{getScreenFromStep(formStep)}</Box>;
};
