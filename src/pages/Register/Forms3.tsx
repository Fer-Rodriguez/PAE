import React, { useState } from "react";
import { Center, Flex, Link, Spacer, Stack, Text } from "@chakra-ui/react";
import { MyCalendar } from "../../components/Calendar";
import { EMyCalendarView } from "../../interfaces/enums";
import { useNavigate } from "react-router-dom";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { CreateUser } from "../../api/users/create";
import { GetUser, GetUserInfo } from "../../api/users/get";
import { useForm } from "react-hook-form";
import { ELanguage, EStatus, ETheme, EUserType } from "../../interfaces/enums";
import { IUserData } from "../../interfaces";
import { useStore } from "../../state/store";
import { Confirmation } from "./Confirmation";

export const Forms3 = ({ id }: { id: string }) => {
  return (
    <Box width={"100%"}>
      <Text> Ingresa tus horas disponibles en cada uno de los periodos </Text>
      <MyCalendar
        view={EMyCalendarView.week}
        mobile={false}
        idUser={id}
        register
      />
    </Box>
  );
};
