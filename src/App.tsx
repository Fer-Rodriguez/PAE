import logo from "./logo.svg";
import "./App.css";
import theme from "./theme";
import { Flex, ChakraProvider } from "@chakra-ui/react";
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
      <Flex direction="row" w="50%" h="300px" margin="0 auto" justifyContent="space-between" gap="20%">
        <DividedCard colorFirst="pink" colorSecond="blue" percentageFirst="45%" percentageSecond="55%" overlap={true}></DividedCard>
        <DividedCard colorFirst="pink" colorSecond="white" percentageFirst="75%" percentageSecond="25%" overlap={false}></DividedCard>
      </Flex>
      <br></br>
      <br></br>
      <Flex direction="row" w="50%" h="300px" margin="0 auto" justifyContent="space-between" gap="20%">
        <DividedCard colorFirst="pink" colorSecond="blue" percentageFirst="45%" percentageSecond="55%" overlap={true}></DividedCard>
        <DividedCard colorFirst="pink" colorSecond="white" percentageFirst="75%" percentageSecond="25%" overlap={false}></DividedCard>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
