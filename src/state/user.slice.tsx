import { StoreSlice } from "./store";

const enum EStatus {
  active,
  inactive,
}

const enum EUserType {
  advisor,
  student,
  admin,
  root,
}

export type TUserSlice = {
  status: EStatus | "";
  name: string;
  email: string;
  type: EUserType | "";
  semester: number;
};

export const userSlice: StoreSlice<TUserSlice> = () => ({
  status: "",
  name: "",
  email: "",
  type: "",
  semester: 0,
});
