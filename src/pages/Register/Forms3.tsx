import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MyCalendar } from "../../components/Calendar";
import { EMyCalendarView } from "../../interfaces/enums";
import { useNavigate } from "react-router-dom";

export const Forms3 = () => {
  const navigate = useNavigate();
  const [carrera, setCarrera] = useState("");
  return (
    <Box width={"100%"}>
      <Text> Ingresa tus horas disponibles del primer periodo </Text>
      <MyCalendar view={EMyCalendarView.week} h={"50vh"} period={"0"} />
    </Box>
  );
};
