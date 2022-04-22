//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";

//Pages
import { Managment } from "./pages/Managment";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout desktop={<Managment />} mobile={<Managment />} />
    </ChakraProvider>
  );
}
