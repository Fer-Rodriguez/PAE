//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//Layout
import { MainLayout } from "./layouts/Main";

//Pages
import { ProfilePage } from "./pages/Profile";
import { Dashboard } from "./pages/Dashboard";

//CSS
import "./App.css";

import theme from "./theme";

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainLayout
        desktop={<Dashboard />}
        mobile={<Dashboard mobile={true} />}
      />
    </ChakraProvider>
  );
}
