import { Colors } from "@chakra-ui/react";

export interface IPrueba {
  pruebita: string;
}

export interface IDividedCard {
  contentTop: JSX.Element,
  contentBottom: JSX.Element,
  vertical: boolean,
  colorFirst: string,
  colorSecond: string, 
  percentageFirst: string,
  percentageSecond: string,
  overlap: boolean;
}
