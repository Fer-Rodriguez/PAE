import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";
import {
  INotification,
  IPoll,
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
  setPolls: (newPolls: Array<IPoll>) => void;
}

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  allUsers: [],
  id: "15bc1e73-20ad-43df-929b-4044da97e4e3",
  status: EStatus.active,
  name: "Shalom Pineda",
  email: "shalomPineda@gmail.com",
  type: EUserType.admin,
  career: "Economía",
  semester: 6,
  profilePic: "",
  notifications: [],
  polls: [],
  config: {
    language: ELanguage.spanish,
    theme: ETheme.white,
  },
  setNotifications: (newNotifications) => {
    set({ notifications: newNotifications });
  },
  setPolls: (newPolls) => {
    set({ polls: newPolls });
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
      careerName: newUserData.careerName,
      config: newUserData.config,
    });
  },
});
