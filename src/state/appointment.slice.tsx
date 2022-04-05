import { StoreSlice } from "./store";

enum EStatus {
  pending,
  accepted,
  completed,
  canceled,
}

type TAppointment = {
  [key: string]: string | EStatus;
  id_admin: string;
  id_advisor: string;
  id_advised: string;
  id_subject: string;
  date: string;
  status: EStatus;
  location: string;
};

export type TAppointmentSlice = {
  appointments: Array<TAppointment>;
  modifyAppointment: (
    index: number,
    property: string,
    value: string | EStatus
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
