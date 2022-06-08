//Libraries
import create, { SetState, GetState } from "zustand";

//Slices
import { TUserSlice, userSlice } from "./user.slice";
import { TAppointmentSlice, appointmentSlice } from "./appointment.slice";
import { TSubjectSlice, subjectSlice } from "./subject.slice";

export type StoreState = TUserSlice & TAppointmentSlice & TSubjectSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;

export const useStore = create<StoreState>((set, get) => ({
  ...userSlice(set, get),
  ...appointmentSlice(set, get),
  ...subjectSlice(set, get),
}));
