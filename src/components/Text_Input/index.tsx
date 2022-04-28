import React, { ChangeEvent } from "react";
import { Input, Textarea } from "@chakra-ui/react";
interface ITextInput {
  multiLine: boolean;
  placeholderText: string;
  width: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Text_Input = ({
  multiLine,
  placeholderText,
  width,
  onChange,
}: ITextInput) => {
  if (multiLine)
    return (
      <Input
        onChange={onChange}
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
        // TODO: On change para mobiles. NO funciona ahorita la forma en teléfono
        //onChange={onChange}
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
