//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//CSS
import "./App.css";

//Pages
import Dashboard from "./pages/Dashboard";

export function App() {
  return (
    <ChakraProvider>
      <Dashboard />
    </ChakraProvider>
  );
}
