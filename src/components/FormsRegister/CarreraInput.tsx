import { ChangeEvent, ComponentType } from "react";
import { DropDown } from "../Dropdown";
import React from "react";
import { IConfigurationsDropdown } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";

interface ICarreraInput {
  setCarrera?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const CarreraInput = ({
  setCarrera,
  secondValidation = false,
}: ICarreraInput) => {
  const myOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (secondValidation) {
      if (setCarrera) {
        setCarrera(e.target.value);
      }
    }
  };

  const config: IConfigurationsDropdown = {
    onChange: myOnChange,
    type: ETypeDropdown.normal,
    placeholder: "Selecciona tu carrera",
  };

  return (
    <DropDown
      options={[
        { title: "ITC", value: "ITC" },
        { title: "IRS", value: "IRS" },
        { title: "LAD", value: "LAD" },
      ]}
      configuration={config}
    ></DropDown>
  );
};
