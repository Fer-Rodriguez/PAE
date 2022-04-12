import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
    dividedCardTop: "25px 25px 0px 0px",
    dividedCardBottom: "0px 0px 25px 25px", //combinar estos dos en un solo radius
    general: "25px",
    appointment: "10px",
    button: "40px",
    menu: "30px",
  },
});

export default theme;
