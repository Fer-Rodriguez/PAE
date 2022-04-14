import { ReactElement } from "react";

export interface IPrueba {
  pruebita: string;
}

export interface IBaseCard {
  title?: string;
  subtitle?: string;
  closeButton?: boolean;
  content?: ReactElement;
}

export interface IButtonGeneric {
  text: string;
  color: string;
}
