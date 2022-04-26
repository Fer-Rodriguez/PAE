import React from "react";

import { IUserComponents } from "../../interfaces";

import { LoginDesktop } from "../../assets/login/LoginDesktop";
import { Logo } from "../../assets/Logo";

import { Center, Container, Flex } from "@chakra-ui/react";

export const DesktopComponents = ({ userComponent }: IUserComponents) => {
  return (
    <>
      <Flex>
        <div>
          <LoginDesktop></LoginDesktop>
        </div>
        <Container paddingTop={"50px"}>
          <Center>
            <Logo maxWidth="80px"></Logo>
          </Center>
        </Container>
      </Flex>
    </>
  );
};
