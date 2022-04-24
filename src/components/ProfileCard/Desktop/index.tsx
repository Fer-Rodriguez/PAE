//Interfaces, Types & Enums
import {
  Center,
  Circle,
  Image,
  Flex,
  Heading,
  Divider,
  Text,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { ChangeEvent } from "react";

//Components
import { ButtonGeneric } from "../../Button";
import { MyCalendar } from "../../Calendar";
import { DropDown } from "../../Dropdown";

//Interfaces
import {
  EMyCalendarView,
  ETypeDropdown,
  EUserType,
} from "../../../interfaces/enums";
import {
  IConfigurationsDropdown,
  IObjectData,
  IProfileCard,
} from "../../../interfaces/index";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme";

const ButtonChangePassword = () => (
  <Center>
    <ButtonGeneric
      color={theme.colors.purple}
      text="Cambiar contraseña"
      fontColor="white"
      margin="10"
    />
  </Center>
);

/**
 *  ProfileCard: Component made to acomodate and organize the information present in the 3 types of profile cards available.
 * @data : User Data that wull be presented in the profile card.
 * @type : Type of profileCard selected.
 */

//TODO: Add funcionality for "change Password" button.
export const ProfileCard = ({ data, baseProps }: IProfileCard) => {
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
            {data.type === EUserType.advisor && <ButtonChangePassword />}
          </Flex>

          <Divider size={"md"} borderColor="#8963D9" />
          <Grid templateColumns="repeat(2, 1fr)" w="100%">
            <GridItem w="100%" h="10">
              {titleProfileCard.map((title) => (
                <Text size="sm" my={4} color={theme.colors.purple}>
                  {title}
                </Text>
              ))}
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
                color={theme.colors.purple}
              >
                Mis Horarios
              </Text>
            </GridItem>
            <GridItem w="100%" h="10">
              {titleProfileCard.map((title) => (
                <Text size="sm" my={4}>
                  {data[title.toLowerCase()]}
                </Text>
              ))}
              <ButtonGeneric
                color={theme.colors.purple}
                text="Modificar"
                fontColor="white"
              />
            </GridItem>
          </Grid>
        </Flex>
        <Spacer />
      </Flex>
      {<ButtonChangePassword />}
      {<MyCalendar view={EMyCalendarView.month} />}
    </Flex>
  );
};
