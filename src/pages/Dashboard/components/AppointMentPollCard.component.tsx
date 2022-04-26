import { Heading, Flex, Image, Button } from "@chakra-ui/react";

import { DividedCard } from "../../../components/DividedCard";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Assets
import theme from "../../../theme";
import notebook from "../Icons/notebook.png";
import hamds from "../Icons/hands.png";
import "../style.css";

export const AppointmentsPollCard = ({ type }: { type: EUserType }) => {
  const BottomContent = () => (
    <Flex flexDirection={"column"} m={"2"} gap={3}>
      <Heading as="h4" size="md">
        {type === EUserType.admin ? "¡Encuestas!" : "Agendar Asesoría"}
      </Heading>
      <Button
        borderRadius={theme.radii.general}
        backgroundColor={theme.colors.purple}
        color="white"
        size="sm"
      >
        {type === EUserType.admin ? "Editar" : "Agendar"}
      </Button>
    </Flex>
  );

  return (
    <DividedCard
      colorFirst={theme.colors.blue}
      percentageFirst="60%"
      percentageSecond="40%"
      colorSecond="white"
      overlap={false}
      vertical
      contentSecond={<BottomContent />}
      contentFirst={
        <Image
          src={type === EUserType.admin ? hamds : notebook}
          boxSize={type === EUserType.admin ? "15vw" : "8vw"}
        />
      }
    />
  );
};
