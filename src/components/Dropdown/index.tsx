import { Select } from "@chakra-ui/react";

interface IObjectData {
  [key: string]: any;
}

interface IDropDown {
  data: IObjectData;
}

export const DropDown = ({ data }: IDropDown) => {
  return <Select placeholder=""></Select>;
};
