import { useState } from "react";
import qs from "qs";

import { Box } from "@chakra-ui/react";

import axios from "axios";

//Zustand
import { useStore } from "../../state/store";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

interface ISetters {
  setFormStep: React.Dispatch<number>;
  setIdSubject: React.Dispatch<string>;
  setProblemDescription: React.Dispatch<string>;
  setDate: React.Dispatch<string>;
  setImage: React.Dispatch<string>;
}

interface IInfo {
  idSubject: string;
  problemDescription: string;
  formStep: number;
}

export const ScheduleAppointment = ({
  mobile = false,
  createAppointment,
  setters,
  info,
}: {
  mobile?: boolean;
  createAppointment: () => Promise<boolean>;
  setters: ISetters;
  info: IInfo;
}) => {
  const { setFormStep, setDate, setIdSubject, setProblemDescription } = setters;
  const { idSubject, problemDescription, formStep } = info;

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return (
        <BasicInfoScreen
          onNextScreenButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setFormStep(1);
          }}
          onDropDownChange={setIdSubject}
          onTextFieldChange={setProblemDescription}
          valueForDropDown={idSubject}
          valueForTextField={problemDescription}
        ></BasicInfoScreen>
      );
    } else if (step == 1) {
      return (
        <ScheduleScreen
          onNextScreenButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            //Llamada a API aquí xd
            createAppointment().then((sucess) => {
              if (sucess) {
                setFormStep(2);
              } else {
                alert(
                  "No podemos completar tu solicitud en este momento. Intenta de nuevo más tarde."
                );
              }
            });
          }}
          onFullDateSelected={setDate}
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
