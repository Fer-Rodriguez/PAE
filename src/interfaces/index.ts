import { Cell } from "react-table";
import { ChangeEvent, ComponentType } from "react";
import { ETypeDropdown, ETypeProfileCard } from "./enums";

export interface IPrueba {
  pruebita: string;
}

export interface IDividedCard {
  contentFirst: JSX.Element;
  contentSecond: JSX.Element;
  colorFirst: string;
  colorSecond: string;
  percentageFirst: string;
  percentageSecond: string;
  vertical: boolean;
  overlap: boolean;
  basePropsFirst?: { [key: string]: any };
  basePropsSecond?: { [key: string]: any };
  containerProps?: { [key: string]: any };
}

export interface IManagingTable {
  columns: {
    Header: string;
    accessor: string;
    Cell?: (cell: Cell<any, any>) => any;
  }[];

  data: Array<any>;
  headColor: string;
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

export interface IDailySchedule {
  hours: Array<[string, string]>;
}

export interface IWeeklySchedule {
  days: Array<IDailySchedule>;
}

export interface ISchedule {
  firstPeriod: Array<IWeeklySchedule>;
  secondPeriod: Array<IWeeklySchedule>;
  thirdPeriod: Array<IWeeklySchedule>;
}

export interface IDataProfileCard {
  [key: string]: any;
  name: string;
  type: ETypeProfileCard;
  email: string;
  career: string;
  semester: string;
  profilePic: string;
  schedule?: ISchedule;
}

export interface IUserComponents {
  userComponent?: React.ReactNode;
}
