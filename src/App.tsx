import logo from "./logo.svg";
//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//CSS
import "./App.css";

//Components
import LayoutDashboard from "./layouts/dashboard";
import { Title } from "./pages/Dashboard";

function App() {
  return (
    <ChakraProvider>
      <LayoutDashboard Title={Title} />
    </ChakraProvider>
  );
}

export default App;
