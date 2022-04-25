/* eslint-disable @typescript-eslint/ban-types */
import {
  Cell,
  ColumnInstance,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
} from "react-table";
import { ChangeEvent, ComponentType } from "react";
import { ETypeDropdown, EUserType } from "./enums";

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

export interface IManagmentPage {
  columns: {
    Header: string;
    accessor: string;
    Cell?: (cell: Cell<any, any>) => any;
  }[];
  data: Array<any>;
  header: string;
  headColor: string;
  mobile?: boolean;
}

export interface IManagingTableInternal {
  headColor: string;
  // All this properties are obtained from the useTableHook. See https://react-table.tanstack.com/docs/api/useTable for more info.
  getTableProps: (propGetter?: TablePropGetter<{}> | undefined) => TableProps;
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<{}> | undefined
  ) => TableBodyProps;
  flatHeaders: ColumnInstance<any>[];
  rows: Row<any>[];
  prepareRow: (row: Row<any>) => void;
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
  type: EUserType;
  email: string;
  career: string;
  semester: number;
  profilePic: string;
  schedule?: ISchedule | null;
}

export interface IUserComponents {
  userComponent?: React.ReactNode;
}

//Local Interface
export interface IProfileCard {
  data: IDataProfileCard;
  baseProps?: { [key: string]: any };
}
