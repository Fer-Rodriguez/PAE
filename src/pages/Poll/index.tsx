//Chakra
import {
  Grid,
  GridItem,
  Image,
  Button,
  Divider,
  Text,
  Center,
  Box,
} from "@chakra-ui/react";

//Componets
import { BaseCard } from "../../components/BaseCard";
import { DividedCard } from "../../components/DividedCard";
import { DropDown } from "../../components/Dropdown";
import { ButtonGeneric } from "../../components/Button";

//React
import { ChangeEvent, useState } from "react";

//Assets Enum Types
import radial from "../../assets/radial_icon.png";
import text from "../../assets/text_icon.png";
import edit from "../../assets/edit_icon.png";
import user from "../../assets/menu_user.png";
import theme from "../../theme/index";

import { IConfigurationsDropdown, IObjectData } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export const PollCard = ({ mobile }: { mobile?: boolean }) => {
  const [ruta, setRuta] = useState(0);

  const options: Array<IObjectData> = [
    {
      title: "Option 1",
      value: "Option 1",
    },
    {
      title: "Option 2",
      value: "Option 2",
    },
  ];

  const configurations: IConfigurationsDropdown = {
    placeholder: "Añadir pregunta",
    type: ETypeDropdown.normal,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      console.log("Yo me ejecuto cuando me hacen click: ", e.target.value);
    },
  };

  return (
    <>
      {mobile ? (
        <>
          {" "}
          <></>
          {ruta === 0 ? (
            <Box width="100%">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <BaseCard
                    title="Encuestas"
                    subtitle="Seleccione una encuesta para editar sus preguntas"
                    closeButton={true}
                    content={
                      <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(12, 1fr)"
                        gap={2}
                      >
                        <GridItem colStart={2} colEnd={12} rowSpan={1}>
                          <DividedCard
                            contentFirst={<Image src={user} boxSize={55} />}
                            contentSecond={
                              <ButtonGeneric
                                text="Asesor"
                                color={theme.colors.white}
                                onClick={(e) => setRuta(1)}
                              />
                            }
                            colorFirst={theme.colors.pink}
                            colorSecond={theme.colors.white}
                            percentageFirst="80"
                            percentageSecond="20"
                            vertical={true}
                            overlap={false}
                          />
                        </GridItem>
                      </Grid>
                    }
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <BaseCard
                    title="Encuestas"
                    subtitle="Seleccione una encuesta para editar sus preguntas"
                    closeButton={true}
                    content={
                      <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(12, 1fr)"
                        gap={2}
                      >
                        <GridItem colStart={2} colEnd={12} rowSpan={1}>
                          <DividedCard
                            contentFirst={<Image src={user} boxSize={55} />}
                            contentSecond={
                              <ButtonGeneric
                                text="Asesorado"
                                color={theme.colors.white}
                                onClick={(e) => setRuta(1)}
                              />
                            }
                            colorFirst={theme.colors.blue}
                            colorSecond={theme.colors.white}
                            percentageFirst="80"
                            percentageSecond="20"
                            vertical={true}
                            overlap={false}
                          />
                        </GridItem>
                      </Grid>
                    }
                  />
                </SwiperSlide>
              </Swiper>
            </Box>
          ) : (
            <BaseCard
              title="Editando la encuesta para asesorados"
              closeButton={true}
              returnButton={
                <Button
                  float="left"
                  backgroundColor={theme.colors.white}
                  textColor={theme.colors.black}
                  fontSize={45}
                  rounded={30}
                  onClick={(e) => setRuta(0)}
                >
                  ←
                </Button>
              }
              content={
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(12, 1fr)"
                  gap={1}
                >
                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>
                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">¿Qué tan útil fue la asesoría? </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={1} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Escala </Text>
                  </GridItem>
                  <GridItem rowStart={1} colStart={10} colEnd={12}>
                    <Image src={radial} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>

                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>

                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">
                      ¿Qué tan profesional fue el asesor?{" "}
                    </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={7} rowEnd={10} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Escala </Text>
                  </GridItem>
                  <GridItem rowStart={7} rowEnd={15} colStart={10} colEnd={12}>
                    <Image src={radial} boxSize={5} />
                  </GridItem>
                  <GridItem rowStart={7} rowEnd={15} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>

                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>

                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">Comentarios adicionales </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={16} rowEnd={20} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Texto </Text>
                  </GridItem>
                  <GridItem rowStart={16} rowEnd={20} colStart={10} colEnd={12}>
                    <Image src={text} boxSize={5} />
                  </GridItem>
                  <GridItem rowStart={16} rowEnd={20} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>
                  <GridItem rowStart={30} rowEnd={50} colStart={1} colEnd={4}>
                    <DropDown
                      options={options}
                      configuration={configurations}
                    />
                  </GridItem>
                  <GridItem colStart={10} colEnd={12} rowStart={50} rowEnd={85}>
                    <Button fontSize={10}>CONFIRMAR</Button>
                  </GridItem>
                </Grid>
              }
            />
          )}
        </>
      ) : (
        <>
          {" "}
          <></>
          {ruta === 0 ? (
            <BaseCard
              title="Encuestas"
              subtitle="Seleccione una encuesta para editar sus preguntas"
              closeButton={true}
              content={
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(12, 1fr)"
                  gap={2}
                >
                  <GridItem colStart={2} colEnd={6} rowSpan={1}>
                    <DividedCard
                      contentFirst={<Image src={user} boxSize={55} />}
                      contentSecond={
                        <ButtonGeneric
                          text="Asesor"
                          color={theme.colors.white}
                          onClick={(e) => setRuta(1)}
                        />
                      }
                      colorFirst={theme.colors.pink}
                      colorSecond={theme.colors.white}
                      percentageFirst="80"
                      percentageSecond="20"
                      vertical={true}
                      overlap={false}
                    />
                  </GridItem>
                  <GridItem colStart={8} colEnd={12} rowSpan={1}>
                    <DividedCard
                      contentFirst={<Image src={user} boxSize={55} />}
                      contentSecond={
                        <ButtonGeneric
                          text="Asesorado"
                          color={theme.colors.white}
                          onClick={(e) => setRuta(1)}
                        />
                      }
                      colorFirst={theme.colors.blue}
                      colorSecond={theme.colors.white}
                      percentageFirst="80"
                      percentageSecond="20"
                      vertical={true}
                      overlap={false}
                    />
                  </GridItem>
                </Grid>
              }
            />
          ) : (
            <BaseCard
              title="Editando la encuesta para asesorados"
              closeButton={true}
              content={
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(12, 1fr)"
                  gap={1}
                >
                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>
                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">¿Qué tan útil fue la asesoría? </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={1} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Escala </Text>
                  </GridItem>
                  <GridItem rowStart={1} colStart={10} colEnd={12}>
                    <Image src={radial} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>

                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>

                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">
                      ¿Qué tan profesional fue el asesor?{" "}
                    </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={7} rowEnd={10} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Escala </Text>
                  </GridItem>
                  <GridItem rowStart={7} rowEnd={15} colStart={10} colEnd={12}>
                    <Image src={radial} boxSize={5} />
                  </GridItem>
                  <GridItem rowStart={7} rowEnd={15} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>

                  <GridItem
                    rowSpan={5}
                    colStart={1}
                    colEnd={2}
                    bg={theme.colors.purpleLight}
                  ></GridItem>

                  <GridItem rowSpan={5} colStart={3} colEnd={7}>
                    <Text fontSize="1xl">Comentarios adicionales </Text>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={1}>
                    <Center height="20px">
                      <Divider
                        orientation="vertical"
                        borderColor={theme.colors.black}
                        sx={{ borderRightWidth: 1 }}
                      />
                    </Center>
                  </GridItem>

                  <GridItem rowStart={16} rowEnd={20} colStart={8} colEnd={12}>
                    <Text fontSize="1xl">Texto </Text>
                  </GridItem>
                  <GridItem rowStart={16} rowEnd={20} colStart={10} colEnd={12}>
                    <Image src={text} boxSize={5} />
                  </GridItem>
                  <GridItem rowStart={16} rowEnd={20} colStart={12} colEnd={12}>
                    <Image src={edit} boxSize={5} />
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={12}>
                    <Divider
                      orientation="horizontal"
                      borderColor={theme.colors.black}
                      sx={{ borderBottomWidth: 2 }}
                    />
                  </GridItem>
                  <GridItem rowStart={30} rowEnd={50} colStart={1} colEnd={4}>
                    <DropDown
                      options={options}
                      configuration={configurations}
                    />
                  </GridItem>
                  <GridItem
                    colStart={10}
                    colEnd={12}
                    rowStart={70}
                    rowEnd={135}
                  >
                    <Button fontSize={25}>CONFIRMAR</Button>
                  </GridItem>
                </Grid>
              }
            />
          )}
        </>
      )}
    </>
  );
};
