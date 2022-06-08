import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  FormControl,
} from "@chakra-ui/react";
import { ICareerData, IObjectData } from "../../interfaces";

interface ICarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setCarrera?: React.Dispatch<React.SetStateAction<string>>;
  setCarreraName?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
  options: Array<ICareerData>;
}

export const CarreraInput = ({
  control,
  defaultValue = "",
  setCarrera,
  setCarreraName,
  options,
  secondValidation = false,
}: ICarreraInput) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target);
    if (setCarrera) {
      setCarrera(e.target.value);
    }
    if (setCarreraName) {
      setCarreraName(
        e.target.options.item(e.target.options.selectedIndex)?.label as string
      );
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
            {options.map((option) => (
              <option value={option.id}>{option.acronym}</option>
            ))}
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
