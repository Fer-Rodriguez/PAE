import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  FormControl,
} from "@chakra-ui/react";

interface ICarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setCarrera?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const CarreraInput = ({
  control,
  defaultValue = "",
  setCarrera,
  secondValidation = false,
}: ICarreraInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (setCarrera) {
      setCarrera(e.target.value);
    }
  };

  return (
    <Controller
      name="carrera"
      control={control || null}
      rules={{
        required: `Por favor selecciona tu carrera`,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="carrera">Carrera</FormLabel>
          <Select
            id="carrera"
            placeholder="Selecciona tu carrera"
            onChange={(e) => {
              console.log("Seleccionando carrera: ", e.target.value);
              onChange(e.target.value);

              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
            isInvalid={Boolean(error)}
          >
            {/**TODO: Hacer esto dinámico desde la api de carreras */}
            <option value={"f31755a0-26b1-414d-9b62-fd4be6346323"}>ITC</option>
          </Select>

          {!error ? (
            <FormHelperText>Ingresa tu carrera</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
