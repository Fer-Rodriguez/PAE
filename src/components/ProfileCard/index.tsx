//Interfaces, Types & Enums
import {
  Box,
  Center,
  Circle,
  Image,
  Flex,
  Heading,
  Divider,
  Button,
  Text,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ETypeProfileCard } from "../../interfaces/enums";
import { IDataProfileCard } from "../../interfaces/index";

interface IProfileCard {
  type: ETypeProfileCard;
  data: IDataProfileCard;
  baseProps?: { [key: string]: any };
}

export const ProfileCard = ({ type, data, baseProps }: IProfileCard) => {
  const titlesInformation = ["Email", "Career", "Semester"];

  return (
    <Box
      {...baseProps}
      backgroundColor="#F3F5FF"
      className="drop-shadow-xl"
      height={
        type === ETypeProfileCard.student || type === ETypeProfileCard.admin
          ? "25rem"
          : "30rem"
      }
      width={"50rem"}
    >
      <Flex justifyContent={"center"} my={"5rem"}>
        <Spacer />
        <Circle backgroundColor={"#8963D9"} size="10rem" mx={15}>
          <Image
            maxW={"120px"}
            minW={"80px"}
            src=" https://www.learningcontainer.com/wp-content/uploads/2020/08/Sample-PNG-File-for-Testing.png"
            alt="Dan Abramov"
          />
        </Circle>
        <Spacer />

        <Flex flexDirection={"column"}>
          <Heading>{data.name}</Heading>
          <Text fontSize="2xl">Asesor</Text>

          <Divider size={"md"} borderColor="#8963D9" />
          <Grid templateColumns="repeat(2, 1fr)" gap={2} w="100%">
            <GridItem w="100%" h="10">
              {titlesInformation.map((title) => (
                <Text size="sm" my={4} color="#8963D9">
                  {title}
                </Text>
              ))}
            </GridItem>
            <GridItem w="100%" h="10">
              {titlesInformation.map((title) => (
                <Text size="sm" my={4}>
                  {data[title.toLowerCase()]}
                </Text>
              ))}
            </GridItem>
          </Grid>
        </Flex>
        <Spacer />
      </Flex>
      <Center>
        <Button backgroundColor={"#8963D9"} color="white">
          Cambiar contraseña
        </Button>
      </Center>
    </Box>
  );
};
