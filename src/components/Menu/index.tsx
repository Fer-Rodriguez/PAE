import React from "react";
import { Center, Image, Stack, HStack, VStack } from "@chakra-ui/react";
import menuImg1 from "../../assets/House.png";
import menuImg2 from "../../assets/Calendar.png";
import menuImg3 from "../../assets/menu_user.png";
import { isPropertyAccessChain } from "typescript";
import { motion } from "framer-motion";

function Menu() {
  return (
    <div>
      <VStack
        maxW="100px"
        spacing="5px"
        bgGradient="linear(to-r, #8482FF , #A462FF)"
        borderRadius="25px"
      >
        <motion.div
          initial={{ width: "91%" }}
          whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
        >
          <Center className="container" h="80px">
            <Image boxSize="80%" objectFit="contain" src={menuImg1} />
          </Center>
        </motion.div>

        <motion.div
          initial={{ width: "91%" }}
          whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
        >
          <Center className="container" h="80px">
            <Image boxSize="80%" objectFit="contain" src={menuImg2} />
          </Center>
        </motion.div>

        <motion.div
          initial={{ width: "91%" }}
          whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
        >
          <Center className="container" h="80px">
            <Image boxSize="80%" objectFit="contain" src={menuImg3} />
          </Center>
        </motion.div>
      </VStack>
    </div>
  );
}

export default Menu;
