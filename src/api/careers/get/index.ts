import axios from "axios";
import { ICareerData } from "../../../interfaces";

export const GetAllCareers = async (
  setAllCareers: (newAllCareers: Array<ICareerData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6110/career/all-careers`,
  };
  const data = await axios(config)
    .then(function (response) {
      const careers = response.data;
      const arrayCareersData: Array<ICareerData> = [];
      careers.map((career: any) => {
        const careerData = {
          careerId: career.id,
          careerName: career.name,
          careerAcronym: career.acronym,
          careerLength: career.length,
          careerDoubleDegree: career.doubleDegree ? career.doubleDegree : false,
        };
        arrayCareersData.push(careerData);
      });
      setAllCareers(arrayCareersData);
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

export const GetAllDDCareers = async (
  setAllDDCareers: (newAllDDCareers: Array<ICareerData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6110/career//career-double-degree`,
  };
  const data = await axios(config)
    .then(function (response) {
      const careers = response.data;
      const arrayCareersData: Array<ICareerData> = [];
      careers.map((career: any) => {
        const careerData = {
          careerId: career.id,
          careerName: career.name,
          careerAcronym: career.acronym,
          careerLength: career.length,
          doubleDegree: career.doubleDegree ? career.doubleDegree : false,
        };
        arrayCareersData.push(careerData);
      });
      setAllDDCareers(arrayCareersData);
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};
