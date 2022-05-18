import axios from "axios";
import { EUserType } from "../../../interfaces/enums";

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

export const getAllAppointments = async (
  id: string,
  type: string,
  full: boolean
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/allAppointments?id=${id}&userType=${type}&full=${full}`,
  };

  let response: any;
  await axios(config).then((res) => {
    response = res.data;
    console.log("respuesta: ", response);
  });

  return response;
};
