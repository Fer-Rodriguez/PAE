import { Cell } from "react-table";

export interface IPrueba {
  pruebita: string;
}

export interface IDividedCard {
  contentFirst: JSX.Element,
  contentSecond: JSX.Element,
  colorFirst: string,
  colorSecond: string, 
  percentageFirst: string,
  percentageSecond: string,
  vertical: boolean,
  overlap: boolean,
  basePropsFirst?: { [key: string]: any },
  basePropsSecond?: { [key: string]: any },
  containerProps?: { [key: string]: any }
}

export interface IManagingTable{

  columns: {
    Header: string,
    accessor: string,
    Cell?: (cell: Cell<any, any>) => any
  }[],

  data: Array<any>,
  headColor: string

}
