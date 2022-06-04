import { useNavigate } from "react-router-dom";
import { Heading, Flex, Image, Button } from "@chakra-ui/react";

import { DividedCard } from "../../../components/DividedCard";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Assets
import theme from "../../../theme";
import notebook from "../Icons/notebook.png";
import hamds from "../Icons/hands.png";
import "../style.css";

export const AppointmentsPollCard = ({
  type,
  mobile = false,
}: {
  type: EUserType;
  mobile?: boolean;
}) => {
  const navigate = useNavigate();

  const BottomContent = () => (
    <Flex flexDirection={"column"} m={"2"} gap={3}>
      <Heading as="h4" size="md" textAlign={"center"}>
        {type === EUserType.admin
          ? "¡Encuestas!"
          : type === EUserType.advisor
          ? "¡3 asesorías completadas!"
          : "Agendar Asesoría"}
      </Heading>
      {type !== EUserType.advisor && (
        <Button
          borderRadius={theme.radii.general}
          backgroundColor={theme.colors.purple}
          color="white"
          size="sm"
          onClick={() => {
            navigate(type === EUserType.admin ? "encuestas" : "crear_asesoria");
          }}
        >
          {type === EUserType.admin ? "Editar" : "Agendar"}
        </Button>
      )}
    </Flex>
  );

  return (
    <DividedCard
      colorFirst={
        type === EUserType.admin ? theme.colors.pink : theme.colors.blue
      }
      percentageFirst="60%"
      percentageSecond="40%"
      colorSecond="white"
      overlap={false}
      vertical
      contentSecond={<BottomContent />}
      contentFirst={
        mobile ? (
          <Image
            src={type === EUserType.admin ? hamds : notebook}
            boxSize={mobile ? "25vw" : "30vw"}
          />
        ) : (
          <Image
            src={type === EUserType.admin ? hamds : notebook}
            boxSize={type === EUserType.admin ? "15vw" : "8vw"}
          />
        )
      }
    />
  );
};
