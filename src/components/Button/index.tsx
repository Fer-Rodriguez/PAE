//Chakra Components
import { Button } from "@chakra-ui/react";

//Interfaces, types & enyms.
import { IButtonGeneric } from "../../interfaces";

//Assets
import theme from "../../theme/index";

/*
  ButtonGeneric: Component that represents the basic button.
*    IButtonGeneric:
*     @text : Property that modifies the content that the button will have.
*     @color : Property that modifies the color that the button will have.
*/

export const ButtonGeneric = (props: IButtonGeneric) => (
  <Button
    backgroundColor={props.color}
    rounded={theme.radii.button}
    textAlign="center"
    /* parte responsiva */
    fontSize={{ base: "1em", md: "1em", lg: "1em" }}
  >
    {props.text}
  </Button>
);
