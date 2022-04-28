import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

interface INameIput {
  control: Control<any>;
  defaultValue?: string;
  setMail?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const NameInput = ({
  control,
  defaultValue = "",
  setMail,
  secondValidation = false,
}: INameIput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setMail) {
      setMail(e.target.value);
    }
  };

  return (
    <Controller
      name="name"
      control={control || null}
      rules={{
        required: `Por favor ingresa tu nombre completo`,
        maxLength: {
          value: 255,
          message: `La entrada no puede ser mayor a 255 caracteres.`,
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isRequired isInvalid={Boolean(error)}>
          <FormLabel htmlFor="name">Nombre completo</FormLabel>
          <Input
            size={"sm"}
            placeholder="Daniel Pérez Rojas"
            onChange={(e) => {
              onChange(e);
              console.log(error);
              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
            isInvalid={Boolean(error)}
          ></Input>
          {!error ? (
            <FormHelperText>Ingresa tu nombre completo</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
