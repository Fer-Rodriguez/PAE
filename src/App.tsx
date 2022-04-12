//Libraries
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

//CSS
import "./App.css";

//Pages
import Dashboard from "./pages/Dashboard";

//Adding a custom component (Chakra UI Steps) into the main library of chakra, in order to use all the theme properties.
const theme = extendTheme({
  components: {
    Steps,
  },
});

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  );
}
