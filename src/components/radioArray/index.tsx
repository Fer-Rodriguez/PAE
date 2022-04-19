import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

/**
 * radioArray: component that returns a  RadioGroup of RadioButtons
 * @radioButtonArray : array of RadioButtons ([value => value of the RadioButton that will be returned on form submission; text? => string of the RadioButton])
 */
interface IRadioArray {
  radioButtonArray: { value: any; text?: string }[];
}
//TODO: Change color with theme's value
const RadioArray: React.FunctionComponent<IRadioArray> = ({
  radioButtonArray,
}) => {
  const createRadioButton = radioButtonArray.map((radioButton) => (
    <Radio colorScheme={"pink"} value={radioButton.value}>
      {radioButton.text}
    </Radio>
  ));

  return (
    <RadioGroup>
      <Stack spacing={5} direction="row">
        {createRadioButton}
      </Stack>
    </RadioGroup>
  );
};

export default RadioArray;
