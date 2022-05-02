import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import { FormLabel, FormHelperText, Select } from "@chakra-ui/react";

interface IDoubleCarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setDoubleCarrera?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const DoubleCarreraInput = ({
  control,
  defaultValue = "",
  setDoubleCarrera,
  secondValidation = false,
}: IDoubleCarreraInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (setDoubleCarrera) {
      setDoubleCarrera(e.target.value);
    }
  };

  return (
    <Controller
      name="doubleCarrera"
      control={control || null}
      render={({ field: { onChange, value } }) => (
        <div>
          <FormLabel htmlFor="doubleCarrera">
            Carrera de doble titulación
          </FormLabel>
          <Select
            isInvalid={false}
            id="doubleCarrera"
            onChange={(e) => {
              onChange(e);
              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
          >
            <option value={"NA"}>No aplica</option>
            <option value={"ITC"}>ITC</option>
            <option value={"IRS"}>IRS</option>
            <option value={"IBT"}>IBT</option>
            <option value={"IMT"}>IMT</option>
          </Select>
          <FormHelperText>
            Selecciona tu carrera de doble titulación
          </FormHelperText>
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
