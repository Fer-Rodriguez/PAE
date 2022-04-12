import logo from "./logo.svg";
import "./App.css";
import theme from "./theme";
import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
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
        <DividedCard content={<Box>Hola</Box>}vertical={true} colorFirst="pink" colorSecond="blue" percentageFirst="45%" percentageSecond="55%" overlap={true}></DividedCard>
        <DividedCard content={<Box>Adiós</Box>}vertical={true} colorFirst="pink" colorSecond="white" percentageFirst="75%" percentageSecond="25%" overlap={false}></DividedCard>
      </Flex>
      <br></br>
      <br></br>
      <Flex direction="column" w="50%" h="300px" margin="0 auto" justifyContent="space-between" gap="20%">
        <DividedCard content={<Box>Hola</Box>} vertical={false} colorFirst="pink" colorSecond="blue" percentageFirst="50%" percentageSecond="50%" overlap={true}></DividedCard>
        <DividedCard content={<Box>Adiós</Box>} vertical={false} colorFirst="pink" colorSecond="white" percentageFirst="75%" percentageSecond="25%" overlap={false}></DividedCard>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
