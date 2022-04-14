//Libraries
import { ChakraProvider, Divider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

//CSS
import "./App.css";
import theme from "./theme";

//Adding a custom component (Chakra UI Steps) into the main library of chakra, in order to use all the theme properties.
const theme = extendTheme({
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
});

export function App() {
  return <ChakraProvider theme={theme}></ChakraProvider>;
}
