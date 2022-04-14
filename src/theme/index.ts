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
    black: "#FFFFFF",
  },
  //Border radii for components
  radii: {
    menu: "50px",
    button: "40px",
  },
});

export default theme;
