import logo from "./logo.svg";
import Menu from "./components/Menu";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Menu />
    </ChakraProvider>
  );
}

export default App;
