import "./App.css";
import PopOver from "./components/popOver";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <PopOver
        size={"s"}
        closeButton={true}
        title={{
          text: "Encuestas",
          subtitle: "Selecciona una encuesta para editar sus preguntas",
          alignment: "left",
        }}
      >
        <div>miau miau</div>
      </PopOver>
    </ChakraProvider>
  );
}

export default App;
