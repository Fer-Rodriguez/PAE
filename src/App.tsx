//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//CSS
import "./App.css";

import theme from "./theme";

import { Main } from "./Main";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Main />
    </ChakraProvider>
  );
}
