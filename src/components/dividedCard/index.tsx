import React from "react";
import {
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import { IDividedCard } from "../../interfaces";

/*
Qué estaría bien mandar como props para customizar esta cosa:


overlap? => implica sombra y que no termine en linea recta
direction => horizontal o vertical
colorFirst => color de la de arriba o la de la izquierda (dependiendo de direction)
colorSecond => color de la de abajo o la de la derecha (dependiendo de direction)

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
        {props.content}
      </Center>

      <Center
        position="relative"
        zIndex="1"
        h={(props.vertical)? props.percentageSecond : "auto"}
        w={(props.vertical)? "auto" : props.percentageSecond}
        borderRadius={(props.overlap)? "general":"dividedCardBottom"}
        bg={props.colorSecond}
      >
        {props.content}
      </Center>
    </Flex>
  );
};

export default DividedCard;
