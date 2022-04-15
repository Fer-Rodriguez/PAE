import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  //Adding a custom component (Chakra UI Steps) into the main library of chakra, in order to use all the theme properties.
  components: {
    Steps,
    Divider: {
      defaulProps: { size: "md" },
      sizes: {
        lg: { borderWidth: "6px" },
        md: { borderWidth: "4px" },
        sm: { borderWidth: "2px" },
      },
    },
  },
  //Color palette
  colors: {
    pink: "#f72585",
    blue: "#4CC9F0",
    purple: "#8963DA",

    purpleLight: "#9B6CFF",
    purpleDark: "#880CD9",

    white: "#FFFFFF",
    black: "#000000",
  },
  //Border radii for components
  radii: {
    verticalDividedCardFirst: "25px 25px 0px 0px",
    verticalDividedCardSecond: "0px 0px 25px 25px",
    horizontalDividedCardFirst: "25px 0px 0px 25px",
    horizontalDividedCardSecond: "0px 25px 25px 0px",
    general: "25px",
    appointment: "10px",
    button: "40px",
    menu: "30px",
  },

  shadows:{
    general: "0px 5px 5px 0px rgba(0,0,0,0.30)"
  }
});

export default theme;
