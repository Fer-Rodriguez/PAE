//Chakra Components
import {
  Flex,
  Center,
} from "@chakra-ui/react";
// Local Interfaces
import { IDividedCard } from "../../interfaces";

/*
DividedCard: Componente que representa una tarjeta dividida en dos secciones distintas
  Props:
  @contentFirst : Contenido a ser mostrado en la tarjeta de arriba/izquierda, dependiendo de la orientación
  @contentSecond : Contenido a ser mostrado en la tarjeta de abajo/derecha, dependiendo de la orientación
  @colorFirst : Color de la tarjeta de arriba/izquierda, dependiendo de la orientación
  @colorSecond : Color de la tarjeta de abajo/derecha, dependiendo de la orientación
  @percentageFirst : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la primera tarjeta
  @percentageFirst : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la segunda tarjeta
  @vertical : Booleano que indica la orientación del componente. Si es true, la orientación es vertical. Si es false, es horizontal
  @overlap : Booleano que indica si la tarjeta de arriba/izquierda debería sobreponerse a la otra
*/

export const DividedCard = (props: IDividedCard) => {
  return (

    <Flex
      boxShadow="0px 5px 5px 0px rgba(0,0,0,0.30)"
      borderRadius="general"
      direction={(props.vertical)? "column" : "row"}
      w="100%"
      h="100%"
      bg={(props.overlap)? props.colorSecond:""}
      
    >
      <Center
        zIndex={(props.overlap)? 2:1}
        position="relative"
        boxShadow={(props.overlap)? "0px 5px 5px 0px rgba(0,0,0,0.40)" : ""}
        h={(props.vertical)? props.percentageFirst : "auto"}
        w={(props.vertical)? "" : props.percentageFirst}
        borderRadius={(props.overlap)? "general":"dividedCardTop"}
        bg={props.colorFirst}
      >
        {props.contentFirst}
      </Center>

      <Center
        position="relative"
        zIndex="1" //TODO: Quizás soportar que la segunda tarjeta pueda ser la que está por encima?
        h={(props.vertical)? props.percentageSecond : "auto"}
        w={(props.vertical)? "auto" : props.percentageSecond}
        borderRadius={(props.overlap)? "general":"dividedCardBottom"}
        bg={props.colorSecond}
      >
        {props.contentSecond}
      </Center>
    </Flex>
  );
};

export default DividedCard;
