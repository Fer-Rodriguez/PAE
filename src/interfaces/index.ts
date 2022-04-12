import { Colors } from "@chakra-ui/react";

export interface IPrueba {
  pruebita: string;
}

export interface IDividedCard {
  content: JSX.Element,
  vertical: boolean,
  colorFirst: string,
  colorSecond: string, 
  percentageFirst: string,
  percentageSecond: string,
  overlap: boolean;
}
