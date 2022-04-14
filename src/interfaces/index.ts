import { ReactElement } from "react";

export interface IPrueba {
  pruebita: string;
}

export interface IBaseCard {
  title?: string;
  margin?: string;
  padding?: string;
  boxshadow?: string;
  content?: ReactElement;
}

export interface IButtonGeneric {
  text: string;
  color: string;
}
