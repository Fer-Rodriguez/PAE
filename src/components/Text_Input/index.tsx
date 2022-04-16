import React from "react";
import { Input } from "@chakra-ui/react";
interface ITextInput {
  placeholderText: string;
  width: string;
}
export const Text_Input = ({ placeholderText, width }: ITextInput) => {
  return (
    <div>
      <Input
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
      />
    </div>
  );
};
