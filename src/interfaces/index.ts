import { ResponsiveValue } from "@chakra-ui/react";

export interface IPrueba {
  pruebita: string;
}

export interface IPopOver {
  size: string; //"s" => small, "m" => medium, "l" => large
  title?: {
    text: string;
    titleColor?: string;
    subtitle?: string;
    alignment: ResponsiveValue<any>;
  };
  closeButton: boolean;
}
