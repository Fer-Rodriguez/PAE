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

interface IForms3 {
  setInfo: React.Dispatch<any>;
  info: any;
  setFormStep: React.Dispatch<number>;
  step: number;
}

export const Forms3 = ({ info, setInfo, setFormStep, step }: IForms3) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [seeModal, setSeeModal] = useState(false);

  const capitalize = (str: string) => {
    if (typeof str === "string") {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "";
    }
  };

  const closePopUp = () => {
    setSeeModal(false);
  };

  const createUser = async () => {
    await CreateUser({
      name: info.name,
      email: capitalize(info.mail),
      password: info.password,
      career: info.carrera,
      semester: info.semestreCarrera,
      status: EStatus.active,
      type: EUserType.student,
    });
    const idUserData = await GetUser(capitalize(info.mail), info.password);
    const userData = await GetUserInfo(idUserData.userId);

    if (idUserData.status == "OK") {
      const correctUser: IUserData = {
        id: userData.user.id,
        status:
          userData.user.status === EStatus.active
            ? EStatus.active
            : userData.user.status === EStatus.deleted
            ? EStatus.deleted
            : EStatus.inactive,
        name: userData.user.name,
        email: userData.user.email,
        type:
          userData.user.type === EUserType.advisor
            ? EUserType.advisor
            : userData.user.type === EUserType.student
            ? EUserType.student
            : userData.user.type === EUserType.admin
            ? EUserType.admin
            : EUserType.root,
        semester: info.semestreCarrera,
        career: info.carrera,
        config: { language: ELanguage.spanish, theme: ETheme.white },
        profilePic: "No tengo",
        schedule: null,
      };
      setUser(correctUser);
      navigate("/dashboard");
    }
  };

  const login = () => {
    navigate("/");
  };

  const saveData = async (data: any) => {
    setInfo({ ...info, ...data });
    if (step == 4) {
      setSeeModal(true);
    } else {
      setFormStep(step + 1);
    }
  };

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  return (
    <div style={{ width: "100%" }}>
      <Stack spacing={4} w={"100%"}>
        <Text>
          Ingresa tus horas disponibles del {step == 2 && "primer"}
          {step == 3 && "segundo"} {step == 4 && "tercer"} periodo.
        </Text>

        <MyCalendar view={EMyCalendarView.week} />
        <Flex>
          <Spacer></Spacer>
          <ButtonGeneric
            bgColor="purpleLight"
            sizePX="40%"
            text="Atrás"
            onClick={() => setFormStep(step - 1)}
          ></ButtonGeneric>
          <Spacer></Spacer>
          <ButtonGeneric
            bgColor="purpleLight"
            sizePX="40%"
            text="Siguiente"
            isDisabled={!isValid}
            onClick={handleSubmit(saveData)}
          ></ButtonGeneric>
          <Spacer></Spacer>
        </Flex>
        <Center>
          <Text fontSize={"sm"}>
            ¿Ya tienes cuenta?{" "}
            <Link
              fontSize="sm"
              color="cyan.400"
              onClick={() => login()}
              textAlign={"right"}
            >
              Inicia sesión
            </Link>
          </Text>
        </Center>
      </Stack>
      {seeModal ? (
        <Confirmation info={info} customClose={() => closePopUp()}>
          <Text>
            Nombre: {info.name} <br />
            <br />
            Correo: {info.mail} <br />
            <br />
            Carrera: {info.carrera} <br />
            <br />
            Semestre: {info.semestreCarrera}
            <br />
            <br />
          </Text>
          <Center>
            <ButtonGeneric
              bgColor="blue"
              sizePX="50%"
              text="Registrarse"
              onClick={() => createUser()}
            ></ButtonGeneric>
          </Center>
        </Confirmation>
      ) : null}
    </div>
  );
};
