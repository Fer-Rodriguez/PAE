import axios from "axios";

import { EStatusAppointment } from "../../../interfaces/enums";

interface IAppointmentDataMod {
  date?: string | Date;
  id_subject?: string;
  status?: EStatusAppointment;
  location?: string;
  problem_description?: string;
  photo_url?: string;
}

export const updateAppointment = (
  id: string,
  newValues: IAppointmentDataMod
) => {
  const data = JSON.stringify({
    id,
    newValues,
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
