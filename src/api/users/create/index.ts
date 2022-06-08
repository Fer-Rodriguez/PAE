import axios from "axios";
import qs from "qs";

import { INewUserSchedule } from "../../../interfaces";
import { EStatus, EUserType } from "../../../interfaces/enums";

interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  career: string;
  semester: number;
  status: EStatus;
  type: EUserType;
  careerDD?: string;
  semesterDD?: number;
  schedules?: Array<INewUserSchedule>;
}

export const CreateUser = async (newValues: ICreateUserData) => {
  const config = {
    method: "post",
    url: "http://localhost:6070/register/create",
    data: {
      name: newValues.name,
      email: newValues.email,
      password: newValues.password,
      career: newValues.career,
      semester: newValues.semester,
      status: newValues.status,
      type: newValues.type,
    },
  };

  const responseData = await axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return responseData;
};
