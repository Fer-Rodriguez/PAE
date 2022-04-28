import { StoreSlice } from "./store";
import { EStatus_Appointement } from "../interfaces/enums";
import {
  INewAppointment,
  TAppointment,
  TCreateAppointment,
} from "../interfaces/types";

export type TAppointmentSlice = {
  appointments: Array<TAppointment>;
  newAppointment: INewAppointment;
  modifyAppointment: (
    index: number,
    property: string,
    value: string | EStatus_Appointement
  ) => void;
  addNewAppointment: ({
    date,
    description,
    photo_url,
    id_subject,
    id_petitioner,
    phase,
  }: TCreateAppointment) => void;
};

export const appointmentSlice: StoreSlice<TAppointmentSlice> = (set, get) => ({
  appointments: [],
  newAppointment: {
    date: "",
    description: "",
    photo_url: "",
    id_subject: "",
    id_petitioner: "",
  },
  addNewAppointment: ({
    date,
    description,
    photo_url,
    id_subject,
    id_petitioner,
    phase,
  }) => {
    const myNewAppointment: INewAppointment = { ...get().newAppointment };
    if (phase === 1) {
      (myNewAppointment.description = description),
        (myNewAppointment.photo_url = photo_url),
        (myNewAppointment.id_subject = id_subject),
        (myNewAppointment.id_petitioner = id_petitioner);
    } else {
      myNewAppointment.date = date;
    }

    set({ newAppointment: myNewAppointment });
  },

  modifyAppointment: (index, property, value) => {
    const newAppointments = get().appointments;
    newAppointments[index] = { ...newAppointments[index], [property]: value };
    set({ appointments: newAppointments });
  },
});
