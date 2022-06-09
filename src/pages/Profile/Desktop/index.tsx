import { useEffect, useState } from "react";
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
import {
  IconPopOverForm,
  IconPopOverDropdown,
} from "../../../components/IconPopOver";

//Interfaces
import { EUserType } from "../../../interfaces/enums";
import { IObjectData, IProfileCard } from "../../../interfaces/index";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme";
import avatarProfile from "../Assets/avatarProfile.png";
import { Link } from "react-router-dom";
import { updateUser } from "../../../api/users/update";
import { useStore } from "../../../state/store";
import { GetAllAdvisors } from "../../../api/users/get";

//Dark Mode
import { DarkMode } from "../../../colors";

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
  const [email, setEmail] = useState(data.email);
  const [career, setCareer] = useState(data.career);
  const [careerName, setCareerName] = useState(data.careerName);
  const [semester, setSemester] = useState(data.semester);
  const careers = useStore((state) => state.allCareers);
  const setAllUsers = useStore((state) => state.setAllUsers);
  useEffect(() => {
    setEmail(data.email);
    setCareer(data.career);
    setCareerName(data.careerName);
    setSemester(data.semester);
  }, [data]);

  const setDropdownOptions = (options: Array<IObjectData>) => {
    careers.map((option: any) => {
      const curCareer = {
        title: option.acronym,
        value: option.id,
        valueII: option.length,
      };
      options.push(curCareer);
    });
  };
  const dropDownOptions: Array<IObjectData> = [];
  setDropdownOptions(dropDownOptions);

  const setMyDataLocal = (value: string | number | boolean, key: string) => {
    if (key === "Email") {
      setEmail(value as string);
    } else if (key === "Career") setCareer(value as string);
    else if (key === "careerName") setCareerName(value as string);
    else setSemester(value as number);
  };

  const setMyDataChangesDB = async () => {
    const dataToUpdate = {
      email,
      //career, TODO: Reemplazar career de un input a un dropdwon con las carreras que sí están disponibles.
      //semester, TODO: El endpoint solo acepta las propiedades de la tabla de usuarios (No de sus subtablas)
      updated_at: new Date(),
    };
    const id_career = career;
    const careerData = {
      id_career,
      semester,
      updated_at: new Date(),
    };

    await updateUser(dataToUpdate, careerData, data.id);
    await GetAllAdvisors(setAllUsers);
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
          backgroundColor={DarkMode().bgTotal}
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
                    {data.type === EUserType.advisor
                      ? "Asesor/a"
                      : data.type === EUserType.student
                      ? "Asesorado"
                      : "Admin"}
                  </Text>
                </Flex>
                {data.type !== EUserType.student && (
                  <Flex flexDirection={"column"} m={2} gap={2}>
                    <ButtonChangePassword onOpen={onOpen} />
                    {data.type === EUserType.advisor && (
                      <ButtonChangeSchedules
                        setModeSchedules={setModSchedules}
                      />
                    )}
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
                        {title === "Career"
                          ? data["careerName"]
                          : data[title.toLowerCase()]}
                      </Text>
                    ) : title === "Career" ? (
                      <IconPopOverDropdown
                        text={career}
                        acronym={careerName ? careerName : career}
                        icon={<EditIcon />}
                        myKey={title}
                        options={dropDownOptions}
                        setData={setMyDataLocal}
                      />
                    ) : (
                      <IconPopOverForm
                        text={
                          title === "Email"
                            ? email
                            : title === "Career"
                            ? career
                            : semester.toString()
                        }
                        icon={<EditIcon />}
                        myKey={title}
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
              {modAdmin && <ButtonEraseAdvisor id={data.id} />}
              <ButtonSaveChanges setMyData={setMyDataChangesDB} />
            </HStack>
          )}
        </Flex>
      )}
    </>
  );
};
