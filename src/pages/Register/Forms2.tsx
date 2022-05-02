import { Center, FormControl, Link, Stack, Text } from "@chakra-ui/react";
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

export const Forms2 = () => {
  const navigate = useNavigate();
  const [carrera, setCarrera] = useState("");
  const [doubleCarrera, setDoubleCarrera] = useState("");
  const [semesterCarrera, setSemesterCarrera] = useState("");
  const [semesterDoubleCarrera, setSemesterDoubleCarrera] = useState("");
  const [typeUser, setTypeUser] = useState("");

  const login = () => {
    navigate("/");
  };

  const {
    control,
    watch,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <FormControl isRequired isInvalid={!isValid}>
      <Stack spacing={4} w={"100%"}>
        <CarreraInput
          control={control}
          setCarrera={setCarrera}
          secondValidation={true}
        />

        <SemesterCarreraInput
          control={control}
          setSemesterCarrera={setSemesterCarrera}
          secondValidation={true}
        />

        <DoubleCarreraInput
          control={control}
          setDoubleCarrera={setDoubleCarrera}
          secondValidation={true}
        />

        {doubleCarrera && doubleCarrera !== "NA" ? (
          <SemesterDoubleCarreraInput
            control={control}
            setSemesterDoubleCarrera={setSemesterDoubleCarrera}
            secondValidation={true}
          />
        ) : null}

        {/* <TypeUserInput
          control={control}
          setTypeUser={setTypeUser}
        ></TypeUserInput> */}

        <TypeUserDrop
          control={control}
          setTypeUser={setTypeUser}
        ></TypeUserDrop>

        <Center>
          <ButtonGeneric
            bgColor="purpleLight"
            sizePX="40%"
            text="Siguiente"
            isDisabled={!isValid}
            // onClick={tryLogin}
          ></ButtonGeneric>
        </Center>
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
  );
};
