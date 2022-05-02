import { Box, Heading, Text, HStack, Flex, Image } from "@chakra-ui/react";

//Components

import { ButtonGeneric } from "../../../components/Button";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Zustand
import { useStore } from "../../../state/store";

//Assets
import FlagMan from "../Icons/FlagMan";
import theme from "../../../theme";
import rocket from "../Icons/cohete.png";

import "../style.css";
import { IAppointmentDataMod } from "../../../interfaces";
import { useEffect, useState } from "react";

interface IDates {
  day: string;
  monthDay: string;
  month: string;
  hours: string;
}

export const MainCard = ({
  type,
  mobile = false,
}: {
  type: EUserType;
  mobile?: boolean;
}) => {
  const recentAppointment = useStore((state) => state.recentAppointment);
  const [dates, setDates] = useState<IDates>({
    day: "",
    month: "",
    monthDay: "",
    hours: "",
  });

  useEffect(() => {
    const convertDate = () => {
      const dateObject: IDates = {
        day: "",
        month: "",
        monthDay: "",
        hours: "",
      };
      const myDate = new Date(recentAppointment.date as string);
      dateObject.day = myDate.toLocaleDateString("mx-MX", { weekday: "long" });
      dateObject.monthDay = myDate.getDate().toString();
      dateObject.month = myDate.toLocaleString("mx-Mx", { month: "long" });

      const initialHour = myDate.getHours() + ":" + myDate.getMinutes();
      myDate.setHours(myDate.getHours() + 1);
      const finalHpur = myDate.getHours() + ":" + myDate.getMinutes();

      dateObject.hours = initialHour + " - " + finalHpur;

      return dateObject;
    };
    setDates(convertDate());
  }, [recentAppointment]);

  return (
    <Flex
      className="MainCard"
      p={6}
      flexDirection="row"
      rounded={theme.radii.general}
      alignContent="center"
      justifyContent={mobile ? "center" : "flex-start"}
    >
      <Flex flexDirection={"column"}>
        <Text color={"white"}>
          {type === EUserType.admin
            ? "Tienes una nueva solicitud"
            : "Tu próxima asesoria"}
        </Text>
        <Heading color={"white"}>
          {dates.day}, {dates.monthDay} de {dates.month}
        </Heading>
        <HStack gap={6} mt={2}>
          <Text color={"white"}>{dates.hours}</Text>
          <ButtonGeneric
            text="Detalles"
            color={theme.colors.pink}
            fontColor="white"
          />
        </HStack>
      </Flex>
      {!mobile &&
        (type === EUserType.student ? (
          <Box position={"absolute"} top="7%" left={"46%"}>
            <FlagMan />
          </Box>
        ) : (
          <Box position={"absolute"} top="15%" left={"40%"}>
            <Image boxSize={"20vw"} src={rocket} />
          </Box>
        ))}
    </Flex>
  );
};
