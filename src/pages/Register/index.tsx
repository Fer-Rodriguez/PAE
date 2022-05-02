import {
  Center,
  Container,
  Flex,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useState } from "react";
import { Logo } from "../../assets/Logo";
import { Forms1 } from "./Forms1";
import { Forms2 } from "./Forms2";
import { Forms3 } from "./Forms3";

interface IRegister {
  mobile?: boolean;
}

export const FormsRegister = (props: IRegister) => {
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

          {/* <VisuallyHidden> */}
          <Forms1 />
          {/* </VisuallyHidden> */}

          {/* <Forms2 /> */}
          {/* <Forms3/> */}
        </Flex>
      </Center>
    </Container>
  );
};
