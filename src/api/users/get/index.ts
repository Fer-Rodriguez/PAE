import axios from "axios";
import { IUserData } from "../../../interfaces";

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

export const GetAllAdvisors = async (
  setAllUsers: (newAllUsers: Array<IUserData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/register/getAll?type=advisor`,
  };

  const data = await axios(config)
    .then(function (response) {
      const advisors = response.data.users;

      const arrayAdvisorsUserData: Array<IUserData> = [];

      advisors.map((advisor: any) => {
        const advisorUserData: IUserData = {
          id: advisor.id,
          status: advisor.status,
          name: advisor.name,
          email: advisor.email,
          type: advisor.type,
          semester: advisor.userSemesters[0].semester,
          career: advisor.career[0] ? advisor.career[0].id : "",
          careerName: advisor.career[0] ? advisor.career[0].acronym : "",
          config: advisor.configuration,
          profilePic: "",
          createDate: advisor.created_at,
          notifications: [],
          polls: [],
        };

        arrayAdvisorsUserData.push(advisorUserData);
      });

      setAllUsers(arrayAdvisorsUserData);
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
