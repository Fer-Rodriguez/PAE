import { ChangeEvent, ComponentType } from "react";
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

export interface IStep {
  label: string;
  icon?: ComponentType<any>;
  content: JSX.Element;
  description?: string;
}

export interface IFinalProgressContent {
  onFinished: () => void;
  finishedContent: JSX.Element;
}
