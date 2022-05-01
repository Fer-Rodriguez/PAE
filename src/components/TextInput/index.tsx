import { ChangeEvent } from "react";
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
        // TODO: On change para multiline. NO funciona ahorita la forma en multiline
        borderRadius="25px"
        backgroundColor="#F8F8F8"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
        value={value}
        isInvalid={isInvalid}
        onChange={(e) => e}
      />
    );
  else
    return (
      <Textarea
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
