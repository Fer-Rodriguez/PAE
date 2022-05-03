import { Grid, GridItem, Text, Flex, Box, Center } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import shallow from "zustand/shallow";

//Components
import { AppointmentListCard } from "./components/AppointmentListCard.component";
import { SwitchesCards } from "./components/SwitchesCards.components";
import { AppointmentsPollCard } from "./components/AppointMentPollCard.component";
import { MainCard } from "./components/MainCard.component";

//Interfaces
import { EUserType } from "../../interfaces/enums";
import { IAppointmentDataMod, IDataProfileCard } from "../../interfaces";

//Store
import { useStore } from "../../state/store";

//Assets
import "./style.css";
import "swiper/css";
import { useEffect, useState } from "react";
import { getRecentAppointment } from "../../api/appointments/get";
import axios from "axios";

const Desktop = ({ type, name }: { type: EUserType; name: string }) => (
  <Grid
    templateColumns="repeat(14, 1fr)"
    templateRows="repeat(8, 1fr)"
    gap={7}
    height={"100vh"}
  >
    <GridItem w="100%" colSpan={8} rowSpan={1} colStart={2}>
      <Flex gap={1} mb={6}>
        <Text fontWeight={"bold"}>Hola, </Text>
        <Text> {name}</Text>
      </Flex>

      <MainCard type={type} />
    </GridItem>
    <GridItem
      w="100%"
      h={"35vh"}
      rowStart={2}
      colStart={2}
      colSpan={4}
      rowSpan={3}
    >
      <AppointmentsPollCard type={type} />
    </GridItem>
    <GridItem w="100%" rowStart={2} colSpan={4} rowSpan={3}>
      <SwitchesCards />
    </GridItem>
    <GridItem w="100%" colStart={10} colSpan={4} rowSpan={4} mt={12}>
      <AppointmentListCard type={type} />
    </GridItem>
  </Grid>
);

const Mobile = ({ type, name }: { type: EUserType; name: string }) => {
  const FirstPage = () => (
    <Flex direction={"column"} gap={6}>
      <MainCard type={type} mobile />
      <AppointmentListCard type={type} mobile />
    </Flex>
  );

  const SecondPage = ({ type }: { type: EUserType }) => (
    <Flex flexDirection={"column"} gap={6}>
      <Box w={"60%"} mx={"25%"}>
        <AppointmentsPollCard type={type} mobile />
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
  const userData: IDataProfileCard = useStore(
    (state) => ({
      id: state.id,
      name: state.name,
      email: state.email,
      type: state.type,
      semester: state.semester,
      career: state.career,
      schedule: state.schedule,
      profilePic: state.profilePic,
    }),
    shallow
  );

  const setRecentAppointment = useStore((state) => state.setRecentAppointment);

  useEffect(() => {
    getRecentAppointment(userData.id, userData.type, setRecentAppointment);
  }, []);

  return mobile ? (
    <Mobile type={userData.type} name={userData.name} />
  ) : (
    <Desktop type={userData.type} name={userData.name} />
  );
};
