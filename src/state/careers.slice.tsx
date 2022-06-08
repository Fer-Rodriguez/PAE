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
  id: "a",
  name: "a",
  acronym: "xd",
  length: 8,
  setAllCareers: (newAllCareers) => {
    set({ allCareers: newAllCareers });
  },
  setAllDDCareers: (newAllDDCareers) => {
    set({ ddCareers: newAllDDCareers});
  },
  setCareer: (newCareerData) => {
    set({
      id: newCareerData.id,
      name: newCareerData.name,
      acronym: newCareerData.acronym,
      length: newCareerData.length,
      doubleDegree: newCareerData.doubleDegree
        ? newCareerData.doubleDegree
        : false,
    });
  },
});
