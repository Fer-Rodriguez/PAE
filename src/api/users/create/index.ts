import axios from "axios";
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
  const data = JSON.stringify({
    name: newValues.name,
    email: newValues.email,
    password: newValues.password,
    career: newValues.career,
    semester: newValues.semester,
    status: newValues.status,
    type: newValues.type,
  });

  const config = {
    method: "post",
    url: "http://localhost:6070/register/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
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
