//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return <ChakraProvider theme={theme}></ChakraProvider>;

