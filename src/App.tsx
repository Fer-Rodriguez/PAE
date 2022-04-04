import logo from "./logo.svg";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import Card from "./components/Card";
import ButtonType from "./components/Button";
import Bell from "./components/Bell";

function App() {
  return (
    <ChakraProvider>
      <Bell />
      <Card title="Hola" subtitle="Adios" />
    </ChakraProvider>
  );
}

export default App;
