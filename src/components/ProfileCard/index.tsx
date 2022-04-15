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

//Local Interface
interface IProfileCard {
  type: ETypeProfileCard;
  data: IDataProfileCard;
  baseProps?: { [key: string]: any };
}

/**
 *  ProfileCard: Component made to acomodate and organize the information present in the 3 types of profile cards available.
 * @data : User Data that wull be presented in the profile card.
 * @type : Type of profileCard selected.
 */

//TODO: Add layout for profile cards regarding advisors and admins.
//TODO: Add funcionality for "change Password" button.
export const ProfileCard = ({ type, data, baseProps }: IProfileCard) => {
  const titlesInformation = ["Email", "Career", "Semester"];
  6;
  return (
    <Box
      {...baseProps}
      backgroundColor="#F3F5FF"
      className="drop-shadow-xl"
      height={
        type === ETypeProfileCard.student || type === ETypeProfileCard.admin
          ? "65vh" //Here we use VH insted of % because the latter requieres a fixed height from the parent (Which could not be the case for all the applications of this component)
          : "80vh"
      }
      minW={"55%"}
      maxW={"100%"}
    >
      <Flex justifyContent={"center"} my={"5rem"}>
        <Spacer />
        <Circle backgroundColor={"#8963D9"} size="10rem" mx={15}>
          <Image
            maxW={"80%"}
            minW={"50%"}
            src={data.profilePic}
            alt="Dan Abramov"
          />
        </Circle>
        <Spacer />

        <Flex flexDirection={"column"} w={"50%"}>
          <Heading>{data.name}</Heading>
          <Text fontSize="2xl" mb={"2.5"}>
            {data.type === ETypeProfileCard.advisor
              ? "Asesor"
              : data.type === ETypeProfileCard.student
              ? "Asesorado"
              : "Admin"}
          </Text>

          <Divider size={"md"} borderColor="#8963D9" />
          <Grid templateColumns="repeat(2, 1fr)" w="100%">
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
        <Button backgroundColor={"#8963D9"} color="white" m={"7"}>
          Cambiar contraseña
        </Button>
      </Center>
    </Box>
  );
};
