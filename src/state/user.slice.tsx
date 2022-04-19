import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";

export type TConfigObject = {
  language: ELanguage;
  theme: ETheme;
};

export type TUserSlice = {
  status: EStatus | "";
  name: string;
  email: string;
  type: EUserType | "";
  semester: number;
  config: TConfigObject;
  setLanguage: (newLanguage: ELanguage) => void;
  setTheme: (newTheme: ETheme) => void;
};

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  status: "",
  name: "Default",
  email: "",
  type: "",
  semester: 0,
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
