import React, { useState } from "react";
import qs from "qs";
import axios from "axios";

//Zustand
import { useStore } from "../../state/store";

//Pages
import { ScheduleAppointment } from "../../pages/ScheduleAppointment";

//Components
import { DesktopComponents } from "../Main/Desktop.component";
import { MobileComponents } from "../Login/Mobile.component";
//Utils
import { Desktop, Mobile } from "../../services/Breakpoints";

export const CreateAppointmentLayout = () => {
  const [formStep, setFormStep] = useState(0);
  const [date, setDate] = useState("");
  const [idSubject, setIdSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const [image, setImage] = useState(""); //TODO: implementar la subida de archivos

  const setters = {
    setFormStep,
    setIdSubject,
    setSubjectName,
    setProblemDescription,
    setDate,
    setImage,
  };

  const info = {
    idSubject,
    subjectName,
    problemDescription,
    formStep,
  };

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

  return (
    <>
      <Desktop
        children={
          <DesktopComponents
            userComponent={
              <ScheduleAppointment
                createAppointment={createAppointment}
                setters={setters}
                info={info}
              />
            }
          />
        }
      />
      <Mobile
        children={
          <MobileComponents
            userComponent={
              <ScheduleAppointment
                createAppointment={createAppointment}
                setters={setters}
                info={info}
                mobile
              />
            }
          />
        }
      />
    </>
  );
};
