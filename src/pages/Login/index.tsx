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
    console.log(idUserData);
    const userData = await GetUserInfo(idUserData.userId);
    console.log(userData);

    if (idUserData.status == "OK") {
      const correctUser: IUserData = {
        id: userData.id,
        status:
          userData.status === EStatus.active
            ? EStatus.active
            : userData.status === EStatus.deleted
            ? EStatus.deleted
            : EStatus.inactive,
        name: userData.name,
        email: userData.email,
        type:
          userData.type === EUserType.advisor
            ? EUserType.advisor
            : userData.type === EUserType.student
            ? EUserType.student
            : userData.type === EUserType.admin
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

    //Ya obtuve el ID y la info, entonces, seteamos
    //setUser()
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
          <FormControl
            isRequired
            isInvalid={!isValid}
            onSubmit={(info) => console.log(info)}
          >
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
