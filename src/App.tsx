import logo from "./logo.svg";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import Card from "./components/Card";
import Bell from "./components/Bell";

function App() {
  return (
    <ChakraProvider>
      <Bell />
      <Card title="Hola" subtitle="Adios" closeButton={true} />
    </ChakraProvider>
  );
}

export default App;
