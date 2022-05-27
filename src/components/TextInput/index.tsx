import { ChangeEvent, ChangeEventHandler } from "react";
import { Input, Textarea } from "@chakra-ui/react";
interface ITextInput {
  multiLine: boolean;
  placeholderText: string;
  width: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void | undefined | any;
  onChangeArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  isInvalid?: boolean;
  extraInputProps?: { [key: string]: any };
}
export const TextInput = ({
  multiLine,
  placeholderText,
  width,
  onChange,
  onChangeArea,
  value,
  isInvalid,
  extraInputProps,
}: ITextInput) => {
  if (!multiLine)
    return (
      <Input
        // TODO: On change para multiline. NO funciona ahorita la forma en multiline
        borderRadius="25px"
        backgroundColor="#E2E8F0"
        color="black"
        borderColor="#FFFFFF"
        placeholder={placeholderText}
        width={width}
        value={value}
        isInvalid={isInvalid}
        onChange={onChange}
        {...extraInputProps}
      />
    );
  else
    return (
      <Textarea
        onChange={(e) => {
          if (onChangeArea !== undefined) {
            onChangeArea(e);
          }
        }}
        rows={7}
        resize="none"
        color="black"
        placeholder={placeholderText}
        width={width}
        value={value}
        isInvalid={isInvalid}
        focusBorderColor="pink"
        borderRadius="25px"
        {...extraInputProps}
      />
    );
};
