import logo from "./logo.svg";
import "./App.css";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import DividedCard from "./components/dividedCard";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <br></br>
      <br></br>
      <DividedCard></DividedCard>
      <br></br>
      <br></br>
    </ChakraProvider>
  );
}

export default App;
