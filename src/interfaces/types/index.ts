import { EStatus_Appointement } from "../enums";

export type TAppointment = {
  [key: string]: string | EStatus_Appointement;
  id_admin: string;
  id_advisor: string;
  id_advised: string;
  id_subject: string;
  date: string;
  status: EStatus_Appointement;
  location: string;
};
