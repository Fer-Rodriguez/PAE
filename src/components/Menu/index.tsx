import React from "react";
import { isPropertyAccessChain } from "typescript";
import { motion } from "framer-motion";
import { Center, Image, VStack, HStack, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { IMenuOptions } from "../../interfaces";

import menuImg1 from "../../assets/House.png";
import menuImg2 from "../../assets/Calendar.png";
import menuImg3 from "../../assets/menu_user.png";
import { useStore } from "../../state/store";

function getMenuOptions(userType: string): Array<IMenuOptions> {
  let menuOption;
  if (userType === "root") {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuImg1,
      },
      {
        linkTo: "asesorias",
        imgSrc: menuImg2,
      },
      {
        linkTo: "perfil",
        imgSrc: menuImg3,
      },
      {
        linkTo: "perfil",
        imgSrc: menuImg3,
      },
      {
        linkTo: "perfil",
        imgSrc: menuImg3,
      },
    ];
  } else if (userType === "admin") {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuImg1,
      },
      {
        linkTo: "../asesorias",
        imgSrc: menuImg2,
      },
      {
        linkTo: "../asesores",
        imgSrc: menuImg3,
      },
      {
        linkTo: "../perfil/user",
        imgSrc: menuImg3,
      },
    ];
  } else {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuImg1,
      },
      {
        linkTo: "../asesorias",
        imgSrc: menuImg2,
      },
      {
        linkTo: "../perfil",
        imgSrc: menuImg3,
      },
    ];
  }
  return menuOption;
}
interface IMenu {
  userType: string;
  mobile: boolean;
}
export const Menu = ({ mobile }: IMenu) => {
  const userType = useStore((state) => state.type);
  const options = getMenuOptions(userType);

  if (mobile) {
    return (
      <div>
        <Flex
          maxW="100%"
          marginBottom="0px"
          marginTop="auto"
          alignContent="center"
          alignItems="center"
          justifyContent="space-around"
          bgGradient="linear(to-r, #8482FF , #A462FF)"
        >
          {options.map((options) => (
            <Link to={options.linkTo}>
              <motion.div
                initial={{ width: "100%" }}
                whileHover={{ scale: 1.2, backgroundColor: "#FFFFFF" }}
              >
                <Center className="container" h="80px">
                  <Image
                    boxSize="90%"
                    objectFit="contain"
                    src={options.imgSrc}
                  />
                </Center>
              </motion.div>
            </Link>
          ))}
        </Flex>
      </div>
    );
  } else {
    return (
      <div>
        <VStack
          maxW="100px"
          spacing="5px"
          bgGradient="linear(to-r, #8482FF , #A462FF)"
          borderRadius="25px"
          alignItems="center"
        >
          {options.map((options) => (
            <Link to={options.linkTo}>
              <motion.div
                initial={{ width: "95%" }}
                whileHover={{ scale: 1.2, backgroundColor: "#FFFFFF" }}
              >
                <Center className="container" h="80px">
                  <Image
                    boxSize="80%"
                    objectFit="contain"
                    src={options.imgSrc}
                  />
                </Center>
              </motion.div>
            </Link>
          ))}
        </VStack>
      </div>
    );
  }
};
