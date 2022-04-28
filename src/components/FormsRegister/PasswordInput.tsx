import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";

interface IPasswordInput {
  control: Control<any>;
  defaultValue?: string;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
  register?: boolean;
}

export const PasswordInput = ({
  control,
  defaultValue = "",
  setPassword,
  secondValidation = false,
}: IPasswordInput) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setPassword) {
      setPassword(e.target.value);
    }
  };

  return (
    <Controller
      name="password"
      control={control || null}
      rules={{
        required: `Por favor ingresa tu contraseña`,
        minLength: {
          value: 8,
          message: `Tu contraseña debe de tener por lo menos 8 caracteres.`,
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl isRequired isInvalid={Boolean(error)}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <InputGroup size={"md"}>
            <Input
              type={show ? "text" : "password"}
              size={"sm"}
              placeholder="••••••••"
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
          </InputGroup>

          {!error ? (
            <FormHelperText>Ingresa tu contraseña</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </FormControl>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
