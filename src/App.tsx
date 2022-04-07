import logo from "./logo.svg";
import Menu from "./components/Menu";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import Text_Input from "./components/Text_Input";

function App() {
  return (
    <ChakraProvider>
      <Menu />
      <Text_Input placeholderText="hola mundo" width="80%" />
    </ChakraProvider>
  );
}

export default App;
