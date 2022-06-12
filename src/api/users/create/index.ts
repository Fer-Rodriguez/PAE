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
}

export const CreateUser = async (newValues: ICreateUserData) => {
  const config = {
    method: "post",
    url: "https://login-register.yellowplant-d0967952.westus.azurecontainerapps.io:6070/register/create",
    data:
      newValues.semesterDD !== undefined
        ? {
            name: newValues.name,
            email: newValues.email,
            password: newValues.password,
            career: newValues.career,
            semester: newValues.semester,
            status: newValues.status,
            type: newValues.type,
            careerDD: newValues.careerDD,
            semesterDD: newValues.semesterDD,
          }
        : {
            name: newValues.name,
            email: newValues.email,
            password: newValues.password,
            career: newValues.career,
            semester: newValues.semester,
            status: newValues.status,
            type: newValues.type,
          },
  };

  return await axios(config);
};
