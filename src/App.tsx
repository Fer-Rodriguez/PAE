import logo from "./logo.svg";
import Menu from "./components/Menu";
import Text_Input from "./components/Text_Input";
import Info_Button from "./components/Info_Button";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Menu />
      <Info_Button />
    </ChakraProvider>
  );
}

export default App;
