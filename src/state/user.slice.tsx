import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";
import { ISchedule } from "../interfaces";

export type TConfigObject = {
  language: ELanguage;
  theme: ETheme;
};

export type TUserSlice = {
  status: EStatus;
  name: string;
  email: string;
  type: EUserType;
  semester: number;
  career: string;
  config: TConfigObject;
  profilePic: string;
  schedule: ISchedule | null;
  setLanguage: (newLanguage: ELanguage) => void;
  setTheme: (newTheme: ETheme) => void;
};

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  status: EStatus.active,
  name: "Shalom Pineda",
  email: "shalomPineda@gmail.com",
  type: EUserType.admin,
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
});
