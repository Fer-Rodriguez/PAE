//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout />
    </ChakraProvider>
  );
}
