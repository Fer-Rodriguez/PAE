//Chakra Components
import { Select } from "@chakra-ui/react";

//Interfaces, types & enyms.
import { IObjectData, IConfigurationsDropdown } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";

// Local Interfaces
interface IDropDown {
  options: Array<IObjectData>;
  configuration: IConfigurationsDropdown;
  baseProps?: { [key: string]: any };
}

/**
 *  custonOptionStyle: Función que regresa un objeto con propiedades de estilo, de acuardo al dropdown seleccionado.
 * @index : Índice del tag <option> en cuestión.
 * @type : Tipo de dropdown seleccionado
 *
 * @return: Regresa un objeto con llaves que aluden al estilo del componente.
 */

const customOptionStyle = (index: number, type: ETypeDropdown) => {
  return type === ETypeDropdown.normal
    ? //TODO: Change color with theme value.
      { background: index % 2 == 0 ? "#4CC9F0" : "white" }
    : {
        background:
          index === 0 ? "#4CC9F0" : index === 1 ? "#F72585" : "#8963D9",
      };
};

/**
 * Dropdown: Componente que permite la presentación de un dropdwown versatil y customizable.
 * @options : Conjunto de objetos que representarán cada una de las opciones del dropdown.
 * @configutation : Párámetro que permite configurar al dropdown a través de su valor default, el método para "OnChange", el tipo de dropdown, etc...
 * @baseProps : Elementos base que permiten establecer propiedades DIRECTAS al componente de Select. Estas propiedades son de Chakra UI, y se describen en la siguiente liga:
 * https://chakra-ui.com/docs/components/form/select
 */

export const DropDown = ({ options, configuration, baseProps }: IDropDown) => {
  //TODO: Change color with theme value.
  return (
    <Select
      variant="filled"
      placeholder={configuration.placeholder}
      onChange={(e) => configuration.onChange(e)}
      backgroundColor="#EFEFEF"
      focusBorderColor="#4CC9F0"
      {...baseProps}
    >
      {options.map((myOption, index) => (
        <option
          style={customOptionStyle(index, configuration.type)}
          value={myOption.value && myOption.title}
          className=""
        >
          {myOption.title}
        </option>
      ))}
    </Select>
  );
};
