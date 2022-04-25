//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";
import { Login } from "./layouts/Login";

//Pages
import { ProfilePage } from "./pages/Profile";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Login
      // desktop={<ProfilePage />}
      // mobile={<ProfilePage mobile={true} />}
      />
    </ChakraProvider>
  );
}
