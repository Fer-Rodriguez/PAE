import React from "react";
import { isPropertyAccessChain } from "typescript";
import { motion } from "framer-motion";
import { Center, Image, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import menuImg1 from "../../assets/House.png";
import menuImg2 from "../../assets/Calendar.png";
import menuImg3 from "../../assets/menu_user.png";
interface IMenu {
  mobile: boolean;
}
export const Menu = ({ mobile }: IMenu) => {
  if (mobile) {
    return (
      <div>
        <HStack
          maxW="100%"
          spacing="5px"
          marginBottom="0px"
          marginTop="auto"
          bgGradient="linear(to-r, #8482FF , #A462FF)"
        >
          <Link to={"dashboard"}>
            <motion.div
              initial={{ width: "91%" }}
              whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
            >
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={menuImg1} />
              </Center>
            </motion.div>
          </Link>

          <Link to="asesorias">
            <motion.button
              initial={{ width: "91%" }}
              whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
            >
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={menuImg2} />
              </Center>
            </motion.button>
          </Link>

          <motion.div
            initial={{ width: "91%" }}
            whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
          >
            <Center className="container" h="80px">
              <Image boxSize="80%" objectFit="contain" src={menuImg3} />
            </Center>
          </motion.div>
        </HStack>
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
        >
          <Link to="../../dashboard">
            <motion.div
              initial={{ width: "91%" }}
              whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
            >
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={menuImg1} />
              </Center>
            </motion.div>
          </Link>

          <motion.div
            initial={{ width: "91%" }}
            whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
          >
            <Link to="../asesorias">
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={menuImg2} />
              </Center>
            </Link>
          </motion.div>

          <Link to="../perfil">
            <motion.div
              initial={{ width: "91%" }}
              whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
            >
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={menuImg3} />
              </Center>
            </motion.div>
          </Link>
        </VStack>
      </div>
    );
  }
};
