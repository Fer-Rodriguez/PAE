import axios from "axios";

import { EStatusAppointment } from "../../../interfaces/enums";

export const GetUser = async (email: string, password: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/login/get?email=${email}&password=${password}`,
  };

  const data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

export const GetUserInfo = async (idUser: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/register/get?id=${idUser}`,
  };

  const data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
