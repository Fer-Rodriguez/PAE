import { Cell } from "react-table";

export interface IPrueba {
  pruebita: string;
}

export interface IBaseCard {
  title?: string;
  content?: JSX.Element;
}

export interface IButtonGeneric {
  text: string;
  color: string;
  margin?: string;
  padding?: string;
  boxShadow?: string;
  fontColor?: string;
  hover?: { backgroud: string; color: string; fontWeight?: string };
}

export interface IBell {
  columns: {
    Header: string;
    accessor: string;
    Cell?: (cell: Cell<any, any>) => any;
  }[];

  data: Array<any>;
  headColor: string;
}
