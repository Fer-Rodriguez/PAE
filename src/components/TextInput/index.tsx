import React, { ChangeEvent } from "react";
import { Input, Textarea } from "@chakra-ui/react";
interface ITextInput {
  multiLine: boolean;
  placeholderText: string;
  width: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  value?: string;
  isInvalid?: boolean;
}
export const TextInput = ({
  multiLine,
  placeholderText,
  width,
  onChange,
  value,
  isInvalid,
}: ITextInput) => {
  if (multiLine)
    return (
      <Input
        /*
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //TODO: Darle focus al text in
          //setDescription(e.currentTarget.value);
          console.log("aaaa");
        }}
        */
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
        value={value}
        isInvalid={isInvalid}
      />
    );
  else
    return (
      <Textarea
        // TODO: On change para mobiles. NO funciona ahorita la forma en teléfono
        onChange={onChange}
        rows={7}
        resize="none"
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
        value={value}
        isInvalid={isInvalid}
      />
    );
};
