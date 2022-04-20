//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";

//Pages
import { ProfilePage } from "./pages/Profile";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout
        desktop={<ProfilePage />}
        mobile={<ProfilePage mobile={true} />}
      />
    </ChakraProvider>
  );
}
