import { Center, Container, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Logo } from "../../assets/Logo";
import { Forms1 } from "./Forms1";
import { Forms2 } from "./Forms2";
import { Forms3 } from "./Forms3";

interface IRegister {
  mobile?: boolean;
}

export const FormsRegister = (props: IRegister) => {
  const [formStep, setFormStep] = useState(0);
  const [info, setInfo] = useState<any>({});

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return <Forms1 info={info} setInfo={setInfo} setFormStep={setFormStep} />;
    } else if (step == 1) {
      return <Forms2 info={info} setInfo={setInfo} setFormStep={setFormStep} />;
    } else if (step == 2) {
      return <>HOLA POPO</>;
    }
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
            {...(props.mobile ? { fontSize: "2xl" } : { fontSize: "3xl" })}
            paddingTop={"20px"}
            paddingBottom={"20px"}
          >
            Regístrate
          </Text>

          {getScreenFromStep(formStep)}

          {/* <Forms3/> */}
        </Flex>
      </Center>
    </Container>
  );
};
