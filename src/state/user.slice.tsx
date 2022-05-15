import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";
import { ISchedule, IUserData, TConfigObject } from "../interfaces";

export interface TUserSlice extends IUserData {
  setLanguage: (newLanguage: ELanguage) => void;
  setTheme: (newTheme: ETheme) => void;
  setUser: (newUserData: IUserData) => void;
}

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  id: "b4753ce1-0332-4a25-80bb-f6b5962b492f",
  status: EStatus.active,
  name: "Shalom Pineda",
  email: "shalomPineda@gmail.com",
  type: EUserType.student,
  career: "Economía",
  semester: 6,
  profilePic: "",
  schedule: null,
  config: {
    language: ELanguage.spanish,
    theme: ETheme.white,
  },
  setLanguage: (newLanguage) => {
    const newConfig: TConfigObject = { ...get().config };
    newConfig.language = newLanguage;
    set({ config: newConfig });
  },
  setTheme: (newTheme) => {
    const newConfig: TConfigObject = { ...get().config };
    newConfig.theme = newTheme;
    set({ config: newConfig });
  },
  setUser: (newUserData) => {
    set({
      id: newUserData.id,
      status: newUserData.status,
      name: newUserData.name,
      email: newUserData.email,
      type: newUserData.type,
      career: newUserData.career,
      semester: newUserData.semester,
      profilePic: newUserData.profilePic,
      schedule: newUserData.schedule,
      config: newUserData.config,
    });
  },
});
