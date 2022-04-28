import { useForm } from "react-hook-form";
import { Center, Container, Flex, Text, Stack } from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { NameInput } from "../../components/FormsRegister/NameInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { MailInput } from "../../components/FormsLogin/MailInput";
import { PasswordInput } from "../../components/FormsRegister/PasswordInput";
import { CarreraInput } from "../../components/FormsRegister/CarreraInput";

interface IRegister {
  mobile?: boolean;
}

export const FormsRegister = (props: IRegister) => {
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
            <Stack spacing={2} w={"100%"}>
              <NameInput control={control}></NameInput>
              <MailInput control={control}></MailInput>
              <PasswordInput control={control}></PasswordInput>
              <PasswordInput control={control}></PasswordInput>
            </Stack>

            <Center>
              <ButtonGeneric
                bgColor="purpleLight"
                sizePX="40%"
                text="Ingresar"
              ></ButtonGeneric>
            </Center>
          </Stack>
        </Flex>
      </Center>
    </Container>
  );
};
