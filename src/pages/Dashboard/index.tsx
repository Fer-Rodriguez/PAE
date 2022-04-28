import axios from "axios";
import { Grid, GridItem, Text, Flex, Box, Center } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";

//Components
import { AppointmentListCard } from "./components/AppointmentListCard.component";
import { SwitchesCards } from "./components/SwitchesCards.components";
import { AppointmentsPollCard } from "./components/AppointMentPollCard.component";
import { MainCard } from "./components/MainCard.component";

//Interfaces
import { EUserType } from "../../interfaces/enums";

//Assets
import "./style.css";
import "swiper/css";
import { useEffect } from "react";

const Desktop = () => (
  <Grid
    templateColumns="repeat(14, 1fr)"
    templateRows="repeat(8, 1fr)"
    gap={7}
    height={"100vh"}
  >
    <GridItem w="100%" colSpan={8} rowSpan={1} colStart={2}>
      <Flex gap={1} mb={6}>
        <Text fontWeight={"bold"}>Hola, </Text>
        <Text> Shalom Pineda</Text>
      </Flex>

      <MainCard type={EUserType.admin} />
    </GridItem>
    <GridItem
      w="100%"
      h={"35vh"}
      rowStart={2}
      colStart={2}
      colSpan={4}
      rowSpan={3}
    >
      <AppointmentsPollCard type={EUserType.admin} />
    </GridItem>
    <GridItem w="100%" rowStart={2} colSpan={4} rowSpan={3}>
      <SwitchesCards />
    </GridItem>
    <GridItem w="100%" colStart={10} colSpan={4} rowSpan={4} mt={12}>
      <AppointmentListCard type={EUserType.admin} />
    </GridItem>
  </Grid>
);

const Mobile = () => {
  const FirstPage = () => (
    <Flex direction={"column"} gap={6}>
      <MainCard type={EUserType.admin} mobile />
      <AppointmentListCard type={EUserType.admin} mobile />
    </Flex>
  );

  const SecondPage = () => (
    <Flex flexDirection={"column"} gap={6}>
      <Box w={"60%"} mx={"25%"}>
        <AppointmentsPollCard type={EUserType.admin} mobile />
      </Box>
      <Box width={"80%"} h="35vh" mx={"15%"}>
        <SwitchesCards mobile />
      </Box>
    </Flex>
  );

  return (
    <Box maxW={"100vw"} mx={"15vw"}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>{FirstPage}</SwiperSlide>
        <SwiperSlide>{SecondPage}</SwiperSlide>
      </Swiper>
    </Box>
  );
};

export const Dashboard = ({ mobile = false }: { mobile?: boolean }) => {
  const apiCall = () => {
    const data = JSON.stringify({
      id: "1076e70c-099e-4914-aea5-21d37f409ef7",
      newValues: {
        status: "DELETED",
        location: "caramba",
      },
    });

    const config = {
      method: "patch",
      url: "http://localhost:6060/appointment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return mobile ? <Mobile /> : <Desktop />;
};
