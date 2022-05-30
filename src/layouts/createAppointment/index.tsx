import { useState } from "react";
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
import storage from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const CreateAppointmentLayout = () => {
  const [formStep, setFormStep] = useState(0);
  const [date, setDate] = useState("");
  const [idSubject, setIdSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const setters = {
    setFormStep,
    setIdSubject,
    setSubjectName,
    setProblemDescription,
    setImageFile,
    setDate,
  };

  const info = {
    idSubject,
    subjectName,
    problemDescription,
    formStep,
    imageFile,
  };

  const idPetitioner = useStore((state) => state.id);

  const createAppointment = async () => {
    const data = {
      idPetitioner: idPetitioner,
      date: date,
      idSubject: idSubject,
      problemDescription: problemDescription,
      image: "https://aunnotenemosestaparte.com/imagen.jpg",
    };

    console.log("Data que envío: ", data);

    const config = {
      method: "post",
      url: "http://localhost:6060/appointment",
      data,
    };

      let successfulRequest = false;

      const res = await axios(config);
      if (res.status === 200) {
        successfulRequest = true;
        console.log(res);
      } else {
        console.log(res);
      }
      return successfulRequest;
    } catch (e) {
      console.log(e);
    }
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
