import axios from "axios";
import React from "react";
import { EUserType } from "../../../interfaces/enums";
import { IAppointmentDataMod } from "../../../interfaces";

export const getRecentAppointment = (
  id: string,
  type: EUserType,
  setRecentAppointment: any
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/admin?id=${id}&id_type=${type}`,
  };

  axios(config).then((res) => setRecentAppointment(res.data));
};
