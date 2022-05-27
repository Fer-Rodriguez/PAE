import {
  Center,
  Flex,
  FormControl,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { CarreraInput } from "../../components/FormsRegister/CarreraInput";
import { DoubleCarreraInput } from "../../components/FormsRegister/DoubleCarreraInput";
import { SemesterCarreraInput } from "../../components/FormsRegister/SemesterCarreraInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useNavigate } from "react-router-dom";
import { SemesterDoubleCarreraInput } from "../../components/FormsRegister/SemesterDoubleCarreraInput";
// import { TypeUserInput } from "../../components/FormsRegister/TypeUserInput";
import { TypeUserDrop } from "../../components/FormsRegister/TypeUserDrop";
import { Confirmation } from "./Confirmation";
import { CreateUser } from "../../api/users/create";
import { ELanguage, EStatus, ETheme, EUserType } from "../../interfaces/enums";
import { GetUser, GetUserInfo } from "../../api/users/get";
import { IUserData } from "../../interfaces";
import { useStore } from "../../state/store";

interface IForms2 {
  setInfo: React.Dispatch<any>;
  info: any;
  setFormStep: React.Dispatch<number>;
}

export const Forms2 = ({ info, setInfo, setFormStep }: IForms2) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [carrera, setCarrera] = useState("");
  const [doubleCarrera, setDoubleCarrera] = useState("");
  const [semesterCarrera, setSemesterCarrera] = useState("");
  const [semesterDoubleCarrera, setSemesterDoubleCarrera] = useState("");
  const [typeUser, setTypeUser] = useState("");
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
    if (data.typeUserDrop == "asesor") {
      setFormStep(2);
    } else {
      setSeeModal(true);
    }
  };

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  return (
    <div style={{ width: "100%" }}>
      <FormControl isRequired isInvalid={!isValid} w={"100%"}>
        <Stack spacing={4} w={"100%"}>
          <CarreraInput
            control={control}
            setCarrera={setCarrera}
            secondValidation={true}
            defaultValue={info.carrera}
          />
          <SemesterCarreraInput
            control={control}
            setSemesterCarrera={setSemesterCarrera}
            secondValidation={true}
            defaultValue={info.semestreCarrera}
          />
          <DoubleCarreraInput
            control={control}
            setDoubleCarrera={setDoubleCarrera}
            secondValidation={true}
          />
          {(doubleCarrera && doubleCarrera !== "NA") ||
          info.semestreDoueblaCarrera ? (
            <SemesterDoubleCarreraInput
              control={control}
              setSemesterDoubleCarrera={setSemesterDoubleCarrera}
              secondValidation={true}
            />
          ) : null}
          <TypeUserDrop
            control={control}
            setTypeUser={setTypeUser}
            defaultValue={info.typeUserDrop}
          ></TypeUserDrop>
          <Flex>
            <Spacer></Spacer>
            <ButtonGeneric
              bgColor="purpleLight"
              sizePX="40%"
              text="Atrás"
              onClick={() => setFormStep(0)}
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
      </FormControl>
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
