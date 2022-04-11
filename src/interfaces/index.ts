import { ChangeEvent, SyntheticEvent } from "react";
import { ETypeDropdown } from "./enums";

export interface IPrueba {
  pruebita: string;
}

export interface IObjectData {
  title: string;
  value?: any;
}

export interface IConfigurationsDropdown {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: any;
  placeholder: string;
  type: ETypeDropdown;
}
