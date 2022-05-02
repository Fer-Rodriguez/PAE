import { StoreSlice } from "./store";
import { EStatusAppointment } from "../interfaces/enums";
import {
  INewAppointment,
  TAppointment,
  TCreateAppointment,
} from "../interfaces/types";
import { IAppointmentDataMod } from "../interfaces";

export type TAppointmentSlice = {
  appointments: Array<TAppointment>;
  recentAppointment: IAppointmentDataMod;
  newAppointment: INewAppointment;
  modifyAppointment: (
    index: number,
    property: string,
    value: string | EStatusAppointment
  ) => void;
  addNewAppointment: ({
    date,
    description,
    photo_url,
    id_subject,
    id_petitioner,
    phase,
  }: TCreateAppointment) => void;

  setRecentAppointment: (newRecentAppointment: IAppointmentDataMod) => void;
};

export const appointmentSlice: StoreSlice<TAppointmentSlice> = (set, get) => ({
  appointments: [],
  recentAppointment: {
    date: "",
    id_subject: "",
    status: EStatusAppointment.ACCEPTED,
    location: "",
    problem_description: "",
    photo_url: "",
    created_at: "",
    updated_at: "",
  },
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

  setRecentAppointment: (newRecentAppointment) => {
    set({ recentAppointment: newRecentAppointment });
  },
});
