import axios from "axios";
import { config } from "process";
import { EUserType } from "../../../interfaces/enums";

export const getRecentAppointment = async (
  id: string,
  type: EUserType,
  setRecentAppointment: any
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/admin?id=${id}&id_type=${type}`,
  };

  await axios(config).then((res) => setRecentAppointment(res.data));
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

export const getPossibleDates = async (idSubject: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/possibleDates?idSubject=${idSubject}`,
  };

  return axios(config)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};
