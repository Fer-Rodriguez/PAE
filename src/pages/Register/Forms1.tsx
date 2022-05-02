import { Center, Text, FormControl, Stack, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { NameInput } from "../../components/FormsRegister/NameInput";
import { MailInput } from "../../components/FormsRegister/MailInput";
import { PasswordInput } from "../../components/FormsRegister/PasswordInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ConfirmPasswordInput } from "../../components/FormsRegister/ConfirmPasswordInput";
import { useNavigate } from "react-router-dom";

interface IForms1 {
  onNextScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Forms1 = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("popo");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

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
        <NameInput
          control={control}
          setName={setFullname}
          secondValidation={true}
        />
        <MailInput
          control={control}
          setMail={setMail}
          secondValidation={true}
        />
        <PasswordInput
          control={control}
          setPassword={setPassword}
          secondValidation={true}
        />

        <ConfirmPasswordInput
          watch={watch}
          control={control}
          setConfirmPassword={setPassword}
          secondValidation={true}
        />
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
