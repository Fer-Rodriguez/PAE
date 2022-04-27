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
} from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { MailInput } from "../../components/FormsLogin/MailInput";
import { PasswordInput } from "../../components/FormsLogin/PasswordInput";
import { ButtonGeneric } from "../../components/Button";

interface IFormsLogin {
  mobile?: boolean;
}

export const FormsLogin = (props: IFormsLogin) => {
  const { control } = useForm({ mode: "onChange" });
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
          <Stack spacing={7} w={"100%"}>
            <MailInput control={control}></MailInput>
            <PasswordInput control={control}></PasswordInput>
            <Flex>
              <Checkbox defaultChecked colorScheme={"cyan"}>
                Recuérdame
              </Checkbox>
              <Spacer />
              <Link color="cyan.400" href="#">
                ¿Olvidaste tu contraseña?{" "}
              </Link>
            </Flex>
            <ButtonGeneric
              text="Ingresar"
              color="purpleLight"
              fontColor="white"
            ></ButtonGeneric>
          </Stack>
        </Flex>
      </Center>
    </Container>
  );
};
