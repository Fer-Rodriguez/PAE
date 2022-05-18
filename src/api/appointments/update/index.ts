import axios from "axios";

import { EStatusAppointment } from "../../../interfaces/enums";

interface IIdsAppointmentDataMod {
  id_advisor?: string;
  id_admin?: string;
}

interface IBaseChanges {
  date?: string | Date;
  id_subject?: string;
  status?: EStatusAppointment;
  location?: string;
  problem_description?: string;
  photo_url?: string;
}

export const updateAppointment = (
  id: string,
  idStudent: string,
  baseChanges: IBaseChanges,
  detailChanges: IIdsAppointmentDataMod
) => {
  const data = JSON.stringify({
    id,
    idStudent,
    baseChanges,
    detailChanges,
  });

  const config = {
    method: "patch",
    url: "http://localhost:6060/appointment",
    headers: {
      "Content-Type": "application/json",
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
