//Chakra
import {
  Grid,
  GridItem,
  Image,
  Button,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";

//Componets
import { DividedCard } from "../../../components/DividedCard";
import Student from "../Desktop/student";
import Advisor from "../Desktop/advisor";
import StudentM from "../Mobile/studentM";
import AdvisorM from "../Mobile/advisorM";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//React
import { useState } from "react";

//Assets Enum Types
import asesor from "../../../assets/asesor-icon.svg";
import asesorado from "../../../assets/asesorado-icon.svg";
import theme from "../../../theme/index";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";

//Dark Mode
import { DarkMode } from "../../../colors";

interface IDesktopPoll {
  Asesor?: any;
  Asesorado?: any;
}

export const DesktopPoll = ({ Asesor, Asesorado }: IDesktopPoll) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const size = useBreakpointValue({ base: "sm", md: "2xl" });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered={true}>
      <ModalOverlay />
      <ModalContent h="600px" rounded={30}>
        <ModalHeader
          margin={4}
          fontSize={35}
          fontWeight="bold"
          marginBottom={-4}
        >
          Encuestas
        </ModalHeader>
        <Text textColor="#9D9E9D" fontWeight="bold" marginLeft={10}>
          Selecciona una encuesta para editar su perfil de preguntas
        </Text>
        <ModalCloseButton
          rounded={30}
          backgroundColor="#F44336"
          color={DarkMode().bgTotalv2}
          margin={4}
        />

        <ModalBody>
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(12, 1fr)"
            gap={2}
          >
            <GridItem colStart={2} colEnd={6} rowSpan={1} marginTop={5}>
              <Box as="button" onClick={Asesor} width="100%">
                <DividedCard
                  contentFirst={<Image src={asesor} boxSize={250} />}
                  contentSecond={
                    <Text fontWeight="bold" fontSize={25}>
                      Asesor
                    </Text>
                  }
                  colorFirst={DarkMode().pink}
                  colorSecond={DarkMode().bgTotalv2}
                  percentageFirst="80"
                  percentageSecond="20"
                  vertical={true}
                  overlap={false}
                />
              </Box>
            </GridItem>
            <GridItem colStart={8} colEnd={12} rowSpan={1} marginTop={5}>
              <Box as="button" onClick={Asesorado} width="100%">
                <DividedCard
                  contentFirst={<Image src={asesorado} boxSize={250} />}
                  contentSecond={
                    <Text fontWeight="bold" fontSize={25}>
                      Asesorados
                    </Text>
                  }
                  colorFirst={DarkMode().blue}
                  colorSecond={DarkMode().bgTotalv2}
                  percentageFirst="80"
                  percentageSecond="20"
                  vertical={true}
                  overlap={false}
                />
              </Box>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
