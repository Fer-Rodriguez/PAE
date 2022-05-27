import { useState } from "react";
import {
  Circle,
  Image,
  Flex,
  Heading,
  Divider,
  Text,
  Spacer,
  Grid,
  GridItem,
  useDisclosure,
  HStack,
  Center,
} from "@chakra-ui/react";

import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

//Components
import { ModifySchedulesContent } from "../ModifySchedule.component";
import {
  ButtonChangePassword,
  ButtonChangeSchedules,
  ButtonEraseAdvisor,
  ButtonSaveChanges,
} from "../Buttons.component";
import { PasswordProfileModal } from "../Modal.component";
import { IconPopOverForm } from "../../../components/IconPopOver";

//Interfaces
import { EUserType } from "../../../interfaces/enums";
import { IProfileCard } from "../../../interfaces/index";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme";
import avatarProfile from "../Assets/avatarProfile.png";
import { Link } from "react-router-dom";

/**
 *  ProfileCard: Component made to acomodate and organize the information present in the 3 types of profile cards available.
 * @data : User Data that wull be presented in the profile card.
 * @type : Type of profileCard selected.
 */

//TODO: Add funcionality for "change Password" button.
export const ProfileDesktop = ({
  data,
  baseProps,
  setPeriod,
  period,
  type,
  modAdmin = false,
}: IProfileCard) => {
  const [modSchedules, setModSchedules] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [myData, setMyData] = useState(data);

  const setMyDataLocal = (value: string | number | boolean, key: string) => {
    console.log("Updating local data");
  };

  const setMyDataChangesDB = () => {
    //TODO: Save data changes inside this function onto the database
    console.log("Saving data");
  };

  return (
    <>
      <PasswordProfileModal onClose={onClose} isOpen={isOpen} />
      {modSchedules ? (
        setPeriod !== undefined &&
        period !== undefined && (
          <ModifySchedulesContent
            setPeriod={setPeriod}
            period={period}
            setModeSchedules={setModSchedules}
            adminMod={modAdmin}
          />
        )
      ) : (
        <Flex
          {...baseProps}
          backgroundColor="#F3F5FF"
          className="drop-shadow-xl"
          flexDirection={"column"}
        >
          <Flex>
            {modAdmin && (
              <Link to={"../asesores"}>
                <ArrowBackIcon boxSize={"8"} ml={6} mt={6} />
              </Link>
            )}

            <Image src={avatarProfile} boxSize="25vw" objectFit="contain" />

            <Spacer />

            <Flex flexDirection={"column"} w={"50%"} justifyContent="center">
              <Flex justifyContent={"space-between"}>
                <Flex flexDirection={"column"}>
                  <Heading>{data.name}</Heading>
                  <Text fontSize="2xl" mb={"2.5"}>
                    {type === EUserType.advisor
                      ? "Asesor/a"
                      : data.type === EUserType.student
                      ? "Asesorado"
                      : "Admin"}
                  </Text>
                </Flex>
                {data.type !== EUserType.student && (
                  <Flex flexDirection={"column"} m={2} gap={2}>
                    <ButtonChangePassword onOpen={onOpen} />
                    {modAdmin ||
                      (type === EUserType.advisor && (
                        <ButtonChangeSchedules
                          setModeSchedules={setModSchedules}
                        />
                      ))}
                  </Flex>
                )}
              </Flex>

              <Divider size={"md"} borderColor="#8963D9" />
              <Grid templateColumns="repeat(2, 1fr)" w="100%">
                <GridItem w="100%">
                  {titleProfileCard.map((title) => (
                    <Text size="sm" my={4} color={theme.colors.purple}>
                      {title}
                    </Text>
                  ))}
                </GridItem>
                <GridItem w="100%" h="10">
                  {titleProfileCard.map((title) =>
                    type !== EUserType.admin ? (
                      <Text size="sm" my={4}>
                        {data[title.toLowerCase()]}
                      </Text>
                    ) : (
                      <IconPopOverForm
                        text={data[title.toLowerCase()]}
                        icon={<EditIcon />}
                        key={title.toLowerCase()}
                        setData={setMyDataLocal}
                      />
                    )
                  )}
                </GridItem>
              </Grid>
            </Flex>
            <Spacer />
          </Flex>
          {type === EUserType.student && (
            <ButtonChangePassword onOpen={onOpen} />
          )}
          {type === EUserType.admin && (
            <HStack justifyContent={"center"} mb={6}>
              {" "}
              {modAdmin && <ButtonEraseAdvisor />}
              <ButtonSaveChanges setMyData={setMyDataChangesDB} />
            </HStack>
          )}
        </Flex>
      )}
    </>
  );
};
