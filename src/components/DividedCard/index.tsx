//Chakra Components
import {
  Flex,
  Center,
} from "@chakra-ui/react";

// Local interface
import { IDividedCard } from "../../interfaces";


/*
  DividedCard: Componente que representa una tarjeta dividida en dos secciones distintas
*    IDividedCard:
*     @contentFirst : Contenido a ser mostrado en la tarjeta de arriba/izquierda, dependiendo de la orientación
*     @contentSecond : Contenido a ser mostrado en la tarjeta de abajo/derecha, dependiendo de la orientación
*     @colorFirst : Color de la tarjeta de arriba/izquierda, dependiendo de la orientación
*     @colorSecond : Color de la tarjeta de abajo/derecha, dependiendo de la orientación
*     @percentageFirst : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la primera tarjeta
*     @percentageFirst : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la segunda tarjeta
*     @vertical : Booleano que indica la orientación del componente. Si es true, la orientación es vertical. Si es false, es horizontal
*     @overlap : Booleano que indica si la tarjeta de arriba/izquierda debería sobreponerse a la otra
*     @basePropsFirst?: Props base para Flex. Referencia: https://chakra-ui.com/docs/components/layout/flex
*     @basePropsSecond?: Props base para Center. Referencia: https://chakra-ui.com/docs/components/layout/center
*     @containerProps?: Props base para Center. Referencia: https://chakra-ui.com/docs/components/layout/center
}
*/

export const DividedCard = (props: IDividedCard) => (
    <Flex
      boxShadow="general"
      borderRadius="general"
      direction={(props.vertical)? "column" : "row"}
      w="100%"
      h="100%"
      bg={(props.overlap)? props.colorSecond:""}
      {...props.containerProps}
    >
      <Center
        zIndex={(props.overlap)? 2:1}
        position="relative"
        boxShadow={(props.overlap)? "general" : ""}
        h={(props.vertical)? props.percentageFirst : ""}
        w={(props.vertical)? "" : props.percentageFirst}
        borderRadius={(props.overlap)? "general" : ((props.vertical)? "verticalDividedCardTop" : "horizontalDividedCardLeft")} // ((props.vertical)? "verticalDividedCardTop" : "horizontalDividedCardLeft")
        bg={props.colorFirst}
        overflow="clip"
        {...props.basePropsFirst}
      >
        {props.contentFirst}
      </Center>

      <Center
        position="relative"
        zIndex="1" //TODO: Quizás soportar que la segunda tarjeta pueda ser la que está por encima?
        h={(props.vertical)? props.percentageSecond : ""}
        w={(props.vertical)? "" : props.percentageSecond}
        borderRadius={(props.overlap)? "general" : ((props.vertical)? "verticalDividedCardBottom" : "horizontalDividedCardRight")}
        bg={props.colorSecond}
        overflow="clip"
        {...props.basePropsSecond}
      >
        {props.contentSecond}
      </Center>
    </Flex>
);