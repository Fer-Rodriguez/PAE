//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { Login } from "./layouts/Login";

//Pages
import { FormsRegister } from "./pages/Register";
import { FormsLogin } from "./pages/Login";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Login desktop={<FormsLogin />} mobile={<FormsLogin mobile={true} />} />
    </ChakraProvider>
  );
}
