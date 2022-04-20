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
  VStack,
} from "@chakra-ui/react";

//Components
import { ButtonGeneric } from "../../Button";

//Interfaces
import { EUserType } from "../../../interfaces/enums";
import { IProfileCard } from "../../../interfaces/index";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme";

/**
 *  ProfileCard: Component made to acomodate and organize the information present in the 3 types of profile cards available.
 * @data : User Data that wull be presented in the profile card.
 * @type : Type of profileCard selected.
 */

//TODO: Add funcionality for "change Password" button.
export const ProfileCard = ({ data, baseProps }: IProfileCard) => {
  6;
  return (
    <Flex
      {...baseProps}
      backgroundColor="#F3F5FF"
      className="drop-shadow-xl"
      flexDirection={"column"}
    >
      <Flex my={"5rem"}>
        <Spacer />

        <Circle backgroundColor={"#8963D9"} size="10rem" mx={15}>
          <Image
            maxW={"80%"}
            minW={"50%"}
            src={data.profilePic}
            alt="Imagen de perfil del usuario en cuestión."
          />
        </Circle>

        <Spacer />

        <Flex flexDirection={"column"} w={"50%"}>
          <Flex justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Heading>{data.name}</Heading>
              <Text fontSize="2xl" mb={"2.5"}>
                {data.type === EUserType.advisor
                  ? "Asesor/a"
                  : data.type === EUserType.student
                  ? "Asesorado"
                  : "Admin"}
              </Text>
            </Flex>
            {data.type === EUserType.advisor && (
              <Center>
                <ButtonGeneric
                  color={theme.colors.purple}
                  text="Cambiar contraseña"
                  fontColor="white"
                />
              </Center>
            )}
          </Flex>

          <Divider size={"md"} borderColor="#8963D9" />
          <Grid templateColumns="repeat(2, 1fr)" w="100%">
            <GridItem w="100%" h="10">
              {titleProfileCard.map((title) => (
                <Text size="sm" my={4} color={theme.colors.purple}>
                  {title}
                </Text>
              ))}
            </GridItem>
            <GridItem w="100%" h="10">
              {titleProfileCard.map((title) => (
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
        <ButtonGeneric
          color={theme.colors.purple}
          text="Cambiar contraseña"
          fontColor="white"
          margin="10"
        />
      </Center>
    </Flex>
  );
};
