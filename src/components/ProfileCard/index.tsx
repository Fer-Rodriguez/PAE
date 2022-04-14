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
            src={data.profilePic}
            alt="Dan Abramov"
          />
        </Circle>
        <Spacer />

        <Flex flexDirection={"column"}>
          <Heading>{data.name}</Heading>
          <Text fontSize="2xl">
            {data.type === ETypeProfileCard.advisor
              ? "Asesor"
              : data.type === ETypeProfileCard.student
              ? "Asesorado"
              : "Admin"}{" "}
          </Text>

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
