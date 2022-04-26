import { Heading, Text, Flex, Image, Center } from "@chakra-ui/react";

import { DividedCard } from "../../../components/DividedCard";

//Assets
import theme from "../../../theme";
import world from "../Icons/world.png";
import hand from "../Icons/hand.png";

import "../style.css";

export const SwitchesCards = () => {
  const TextContent = ({ language = false }: { language?: boolean }) => (
    <Center flexDirection={"column"}>
      <Text fontSize={"sm"} fontWeight="bold">
        Haz Click
      </Text>
      <Heading size={"lg"}>{language ? "ES" : "Luz"}</Heading>
      <Text fontSize={"x-small"}>
        {language ? "Para cambiar el idioma" : "Para cambiar el tema"}
      </Text>
    </Center>
  );

  return (
    <Flex direction={"column"} h="90%" gap={5}>
      <DividedCard
        colorFirst={theme.colors.purple}
        percentageFirst="50%"
        percentageSecond="50%"
        colorSecond="white"
        overlap={true}
        vertical={false}
        contentSecond={<TextContent language />}
        contentFirst={<Image src={world} boxSize="6vw" />}
      />
      <DividedCard
        colorFirst={theme.colors.purple}
        percentageFirst="50%"
        percentageSecond="50%"
        colorSecond="white"
        overlap={true}
        vertical={false}
        contentSecond={<TextContent />}
        contentFirst={<Image src={hand} boxSize="5vw" />}
      />
    </Flex>
  );
};
