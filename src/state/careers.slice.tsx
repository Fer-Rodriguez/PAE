import { StoreSlice } from "./store";
import { ICareerData } from "../interfaces";

interface IAllCareers {
  allCareers: Array<ICareerData>;
  ddCareers: Array<ICareerData>;
  setAllCareers: (newAllCareers: Array<ICareerData>) => void;
  setAllDDCareers: (newAllDDCareers: Array<ICareerData>) => void;
}
export interface TCareerSlice extends ICareerData, IAllCareers {
  setCareer: (newCareerData: ICareerData) => void;
}

export const careerSlice: StoreSlice<TCareerSlice> = (set) => ({
  allCareers: [],
  ddCareers: [],
  careerId: "a",
  careerName: "a",
  careerAcronym: "xd",
  careerLength: 8,
  setAllCareers: (newAllCareers) => {
    set({ allCareers: newAllCareers });
  },
  setAllDDCareers: (newAllDDCareers) => {
    set({ ddCareers: newAllDDCareers });
  },
  setCareer: (newCareerData) => {
    set({
      careerId: newCareerData.careerId,
      careerName: newCareerData.careerName,
      careerAcronym: newCareerData.careerAcronym,
      careerLength: newCareerData.careerLength,
      careerDoubleDegree: newCareerData.careerDoubleDegree
        ? newCareerData.careerDoubleDegree
        : false,
    });
  },
});
