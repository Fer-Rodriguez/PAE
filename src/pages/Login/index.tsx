import { useForm } from "react-hook-form";
import { useStore } from "../../state/store";
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
import { useNavigate } from "react-router-dom";
import { GetUser, GetUserInfo } from "../../api/users/get";
import { IUserData } from "../../interfaces";
import { ELanguage, EStatus, ETheme, EUserType } from "../../interfaces/enums";

interface IFormsLogin {
  mobile?: boolean;
}

export const FormsLogin = (props: IFormsLogin) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const tryLogin = async (data: any) => {
    const idUserData = await GetUser(data.mail, data.password);
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
        semester: 5,
        career: "ITC",
        config: { language: ELanguage.spanish, theme: ETheme.white },
        profilePic: "No tengo",
        schedule: null,
      };
      setUser(correctUser);
      navigate("/dashboard");
    }
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <Container {...(props.mobile ? { w: "60%" } : { w: "40%" })} maxW="60%">
      <Center h={"100%"}>
        <Flex direction={"column"} align={"center"}>
          <Logo
            {...(props.mobile ? { maxWidth: "30%" } : { maxWidth: "25%" })}
          ></Logo>
          <Text
            color={"purpleLight"}
            fontWeight={"semibold"}
            {...(props.mobile ? { fontSize: "2xl" } : { fontSize: "3xl" })}
            paddingTop={"20px"}
            paddingBottom={"20px"}
          >
            Inicia sesión
          </Text>
          <FormControl isRequired isInvalid={!isValid}>
            <Stack spacing={7} w={"100%"}>
              <MailInput control={control} secondValidation={true} />
              <PasswordInput control={control} secondValidation={true} />

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
                  onClick={handleSubmit(tryLogin)}
                ></ButtonGeneric>
              </Center>
              <Center>
                <Text fontSize={"sm"}>
                  ¿No tienes una cuenta?{" "}
                  <Link
                    fontSize="sm"
                    color="cyan.400"
                    onClick={() => register()}
                    textAlign={"right"}
                  >
                    Regístrate
                  </Link>
                </Text>
              </Center>
            </Stack>
          </FormControl>
        </Flex>
      </Center>
    </Container>
  );
};
