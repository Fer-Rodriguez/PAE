import React from "react";
import { Input, Textarea } from "@chakra-ui/react";
interface ITextInput {
  multiLine: boolean;
  placeholderText: string;
  width: string;
}
export const Text_Input = ({
  multiLine,
  placeholderText,
  width,
}: ITextInput) => {
  if (multiLine)
    return (
      <Input
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
      />
    );
  else
    return (
      <Textarea
        rows={7}
        resize="none"
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
      />
    );
};
