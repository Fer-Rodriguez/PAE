import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
