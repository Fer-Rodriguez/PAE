import {
  Center,
  Flex,
  FormControl,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { GetAllCareers, GetAllDDCareers } from "../../api/careers/get";

interface IForms2 {
  setInfo: React.Dispatch<any>;
  info: any;
  setFormStep: React.Dispatch<number>;
  setNewId: React.Dispatch<string>;
}

export const Forms2 = ({ info, setInfo, setFormStep, setNewId }: IForms2) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [carrera, setCarrera] = useState("");
  const [carreraName, setCarreraName] = useState("");
  const [doubleCarrera, setDoubleCarrera] = useState("");
  const [doubleCarreraName, setDoubleCarreraName] = useState("");
  const [semesterCarrera, setSemesterCarrera] = useState("");
  const [semesterDoubleCarrera, setSemesterDoubleCarrera] = useState("");
  const [typeUser, setTypeUser] = useState<EUserType | null>(null);
  const [seeModal, setSeeModal] = useState(false);

  const careers = useStore((state) => state.allCareers);
  const ddCareers = useStore((state) => state.ddCareers);

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
    console.log(info.semesterDoubleCarrera);
    if (info.semesterDoubleCarrera !== undefined) {
      await CreateUser({
        name: info.name,
        email: capitalize(info.mail),
        password: info.password,
        career: info.carrera,
        semester: info.semestreCarrera,
        status: EStatus.active,
        type: info.typeUserDrop,
        careerDD: info.doubleCarrera,
        semesterDD: info.semesterDoubleCarrera,
      });
    } else {
      await CreateUser({
        name: info.name,
        email: capitalize(info.mail),
        password: info.password,
        career: info.carrera,
        semester: info.semestreCarrera,
        status: EStatus.active,
        type: info.typeUserDrop,
      });
    }
    const idUserData = await GetUser(capitalize(info.mail), info.password);
    console.log("User data: ", idUserData);
    setNewId(idUserData.userId);
    const userData = await GetUserInfo(idUserData.userId);

    if (idUserData.status == "OK") {
      const correctUser: IUserData =
        userData.user.career.length === 1
          ? {
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
              semester: userData.user.userSemesters[0].semester,
              career: userData.user.career[0].id,
              careerName: userData.user.career[0].acronym,
              config: { language: ELanguage.spanish, theme: ETheme.white },
              profilePic: "No tengo",
              notifications: [],
              polls: [],
            }
          : {
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
              semester: userData.user.userSemesters[0].semester,
              career: userData.user.career[0].id,
              careerName: userData.user.career[0].acronym,
              semesterDD: userData.user.userSemesters[1].semester,
              careerDD: userData.user.career[1].id,
              careerNameDD: userData.user.career[1].acronym,
              config: { language: ELanguage.spanish, theme: ETheme.white },
              profilePic: "No tengo",
              notifications: [],
              polls: [],
            };

      setUser(correctUser);
    }
    if (info.typeUserDrop === EUserType.student) navigate("/dashboard");
    else setFormStep(2);
  };

  const login = () => {
    navigate("/");
  };

  const saveData = async (data: any) => {
    setInfo({ ...info, ...data });
    setSeeModal(true);
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
            options={careers}
            control={control}
            setCarrera={setCarrera}
            setCarreraName={setCarreraName}
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
            options={ddCareers}
            control={control}
            setDoubleCarrera={setDoubleCarrera}
            setDoubleCarreraName={setDoubleCarreraName}
            secondValidation={true}
          />
          {(doubleCarrera && doubleCarrera !== "NA") ||
          info.semesterDoubleCarrera ? (
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
          {(info.doubleCarrera && info.doubleCarrera !== "NA") ||
          info.semesterDoubleCarrera ? (
            <Text>
              Nombre: {info.name} <br />
              <br />
              Correo: {info.mail} <br />
              <br />
              Carrera: {carreraName} <br />
              <br />
              Semestre: {info.semestreCarrera}
              <br />
              <br />
              Carrera Doble Titulación: {doubleCarreraName} <br />
              <br />
              Semestre Doble Titulación: {info.semesterDoubleCarrera}
              <br />
              <br />
            </Text>
          ) : (
            <Text>
              Nombre: {info.name} <br />
              <br />
              Correo: {info.mail} <br />
              <br />
              Carrera: {carreraName} <br />
              <br />
              Semestre: {info.semestreCarrera}
              <br />
              <br />
            </Text>
          )}

          <Center>
            <ButtonGeneric
              bgColor="blue"
              sizePX="50%"
              text={
                info.typeUserDrop === EUserType.student
                  ? "Registrarse"
                  : "Introducir mis horarios"
              }
              onClick={() => createUser()}
            ></ButtonGeneric>
          </Center>
        </Confirmation>
      ) : null}
    </div>
  );
};
