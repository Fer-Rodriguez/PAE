import { StoreSlice } from "./store";
import { EStatus_Appointement } from "../interfaces/enums";
import { TAppointment } from "../interfaces/types";

export type TAppointmentSlice = {
  appointments: Array<TAppointment>;
  modifyAppointment: (
    index: number,
    property: string,
    value: string | EStatus_Appointement
  ) => void;
};

export const appointmentSlice: StoreSlice<TAppointmentSlice> = (set, get) => ({
  appointments: [],
  modifyAppointment: (index, property, value) => {
    const newAppointments = get().appointments;
    newAppointments[index] = { ...newAppointments[index], [property]: value };
    set({ appointments: newAppointments });
  },
});
