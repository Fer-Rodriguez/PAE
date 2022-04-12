import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import BaseCard from "./components/BaseCard";
import Bell from "./components/Bell";

function App() {
  return (
    <ChakraProvider>
      <Bell />
      <BaseCard title="Hola" subtitle="Adios" closeButton={true} />
    </ChakraProvider>
  );
}

export default App;
