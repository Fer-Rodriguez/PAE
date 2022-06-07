import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";
import {
  INotification,
  ISchedule,
  IUserData,
  TConfigObject,
} from "../interfaces";

interface IAllUsers {
  allUsers: Array<IUserData>;
  setAllUsers: (newAllUsers: Array<IUserData>) => void;
}

export interface TUserSlice extends IUserData, IAllUsers {
  setLanguage: (newLanguage: ELanguage) => void;
  setTheme: (newTheme: ETheme) => void;
  setUser: (newUserData: IUserData) => void;
  setNotifications: (newNotifications: Array<INotification>) => void;
}

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  allUsers: [],
  id: "61ab6f07-72c9-4c37-ae27-b21d89823cc8",
  status: EStatus.active,
  name: "Shalom Pineda",
  email: "shalomPineda@gmail.com",
  type: EUserType.admin,
  career: "f31755a0-26b1-414d-9b62-fd4be6346323",
  semester: 6,
  profilePic: "",
  notifications: [],
  config: {
    language: ELanguage.spanish,
    theme: ETheme.white,
  },
  setNotifications: (newNotifications) => {
    set({ notifications: newNotifications });
  },
  setAllUsers: (newAllUsers) => {
    set({ allUsers: newAllUsers });
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

      config: newUserData.config,
    });
  },
});
