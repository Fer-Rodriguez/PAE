import { useState } from "react";
import qs from "qs";

import { Box } from "@chakra-ui/react";

import axios from "axios";

//Zustand
import { useStore } from "../../state/store";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

export const ScheduleAppointment = ({ mobile }: { mobile?: boolean }) => {
  const [formStep, setFormStep] = useState(0);
  const [date, setDate] = useState("");
  const [idSubject, setIdSubject] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [image, setImage] = useState(""); //TODO: implementar la subida de archivos

  const idPetitioner = useStore((state) => state.id);
  const createAppointment = async () => {
    const data = qs.stringify({
      idPetitioner: idPetitioner,
      date: date,
      idSubject: idSubject,
      problemDescription: problemDescription,
      image: "https://aunnotenemosestaparte.com/imagen.jpg",
    });

    const config = {
      method: "post",
      url: "http://localhost:6060/appointment",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let successfulRequest = false;
    await axios(config)
      .then(function (response) {
        successfulRequest = true;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return successfulRequest;
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
