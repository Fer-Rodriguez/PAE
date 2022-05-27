import { Grid, GridItem, Text, Flex, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import shallow from "zustand/shallow";

//Components
import { AppointmentListCard } from "./components/AppointmentListCard.component";
import { SwitchesCards } from "./components/SwitchesCards.components";
import { AppointmentsPollCard } from "./components/AppointMentPollCard.component";
import { MainCard } from "./components/MainCard.component";

//Interfaces
import { EUserType } from "../../interfaces/enums";
import { IDataProfileCard } from "../../interfaces";

//Store
import { useStore } from "../../state/store";

//Assets
import "./style.css";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { getRecentAppointment } from "../../api/appointments/get";
import { Survey } from "../../components/Survey";

const Desktop = ({
  type,
  name,
  surveyAnswered,
  surveyController,
  surveyQuestions,
}: {
  type: EUserType;
  name: string;
  surveyAnswered: boolean;
  surveyController: React.Dispatch<React.SetStateAction<boolean>>;
  surveyQuestions: {
    question: string;
    type: "text" | "scale" | "yesOrNo";
    scaleBegining?: string;
    scaleEnding?: string;
  }[];
}) => (
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
    {/* Aquí puede haber dos approaches para múltiples encuestas: un state que tenga las preguntas y
    se actualice y solo dejamos la misma instancia de survey o vamos creando instancias de survey*/}
    <Survey
      surveyAnswered={surveyAnswered}
      surveyController={surveyController}
      surveyQuestions={surveyQuestions}
      triggeringNotificationId={""}
      appointmentId={""}
    ></Survey>
  </Grid>
);

const Mobile = ({
  type,
  name,
  surveyAnswered,
  surveyController,
  surveyQuestions,
}: {
  type: EUserType;
  name: string;
  surveyAnswered: boolean;
  surveyController: React.Dispatch<React.SetStateAction<boolean>>;
  surveyQuestions: {
    question: string;
    type: "text" | "scale" | "yesOrNo";
    scaleBegining?: string;
    scaleEnding?: string;
  }[];
}) => {
  const FirstPage = () => (
    <Flex direction={"column"} gap={6}>
      <MainCard type={type} mobile />
      <AppointmentListCard type={type} mobile />
      <Survey
        surveyAnswered={surveyAnswered}
        surveyQuestions={surveyQuestions}
        triggeringNotificationId={""}
        surveyController={surveyController}
        appointmentId={""}
      ></Survey>
    </Flex>
  );

  const SecondPage = ({ type }: { type: EUserType }) => (
    <Flex flexDirection={"column"} gap={8} mt="8">
      <Box width={"80%"} h="35vh" mx={"10%"} mb="6">
        <SwitchesCards mobile />
      </Box>
      <Box maxW={"80%"} mx="15%" mb={12}>
        <AppointmentsPollCard type={type} mobile />
      </Box>
    </Flex>
  );

  return (
    <Box maxW={"100vw"} mx={"15vw"}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
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

  //TODO: Use effect cuando cambie surveyAnswered para comprobar si hay otra survey que contestar
  //TODO: Usar setSurveyQuestions cuando se tengan las notificaciones, se rescate el id de la appointment pendiente y se obtengan las preguntas
  const [surveyAnswered, setSurveyAnswered] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState<
    {
      question: string;
      type: "text" | "scale" | "yesOrNo";
      scaleBegining?: string;
      scaleEnding?: string;
    }[]
  >([
    {
      question: "¿Qué tan útil te pareció la asesoría?",
      type: "scale",
      scaleBegining: "Para nada útil",
      scaleEnding: "Muy útil",
    },
    {
      question: "¿Qué tan profesional fue el asesor?",
      type: "scale",
      scaleBegining: "Nada profesional",
      scaleEnding: "Muy profesional",
    },
    { question: "Comentarios generales", type: "text" },
    { question: "El asesor no asistió", type: "yesOrNo" },
  ]);

  const setRecentAppointment = useStore((state) => state.setRecentAppointment);

  useEffect(() => {
    getRecentAppointment(userData.id, userData.type, setRecentAppointment);
  }, []);

  return mobile ? (
    <Mobile
      type={userData.type}
      name={userData.name}
      surveyAnswered={surveyAnswered}
      surveyController={setSurveyAnswered}
      surveyQuestions={surveyQuestions}
    />
  ) : (
    <Desktop
      type={userData.type}
      name={userData.name}
      surveyAnswered={surveyAnswered}
      surveyController={setSurveyAnswered}
      surveyQuestions={surveyQuestions}
    />
  );
};
