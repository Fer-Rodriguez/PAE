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
  overlap: boolean;
}
