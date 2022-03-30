import logo from "./logo.svg";
import LayoutDashboard from "./layouts/dashboard";

import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <LayoutDashboard />
    </ChakraProvider>
  );
}

export default App;
