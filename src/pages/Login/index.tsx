import { useForm } from "react-hook-form";
import {
  Center,
  Container,
  Flex,
  Text,
  Stack,
  Checkbox,
  Spacer,
  Link,
  FormControl,
} from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { MailInput } from "../../components/FormsLogin/MailInput";
import { PasswordInput } from "../../components/FormsLogin/PasswordInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IFormsLogin {
  mobile?: boolean;
}

export const FormsLogin = (props: IFormsLogin) => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const {
    control,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const tryLogin = () => {
    navigate("/dashboard");
    //llamar back y a la siguiente pantalla
  };

  return (
    <Container {...(props.mobile ? { w: "60%" } : { w: "40%" })} maxW="60%">
      <Center h={"100%"}>
        <Flex direction={"column"} align={"center"}>
          <Logo
            {...(props.mobile ? { maxWidth: "30%" } : { maxWidth: "35%" })}
          ></Logo>
          <Text
            color={"purpleLight"}
            fontWeight={"semibold"}
            {...(props.mobile ? { fontSize: "2xl" } : { fontSize: "4xl" })}
            paddingTop={"30px"}
            paddingBottom={"20px"}
          >
            Inicia sesión
          </Text>
          <FormControl isRequired isInvalid={!isValid}>
            <Stack spacing={7} w={"100%"}>
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

              <Flex>
                <Checkbox size="sm" defaultChecked colorScheme={"cyan"}>
                  Recuérdame
                </Checkbox>
                <Spacer />
                <Link
                  fontSize="sm"
                  color="cyan.400"
                  href="#"
                  textAlign={"right"}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Flex>
              <Center>
                <ButtonGeneric
                  bgColor="purpleLight"
                  sizePX="40%"
                  text="Ingresar"
                  isDisabled={!isValid}
                  onClick={tryLogin}
                ></ButtonGeneric>
              </Center>
              <Center>
                <Link
                  fontSize="sm"
                  color="cyan.400"
                  href="#"
                  textAlign={"right"}
                >
                  Regístrate
                </Link>
              </Center>
            </Stack>
          </FormControl>
        </Flex>
      </Center>
    </Container>
  );
};
