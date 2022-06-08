import { useEffect, useState } from "react";
import {
  Center,
  Box,
  Image,
  Circle,
  Heading,
  Text,
  Divider,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

//Components
import {
  ButtonChangePassword,
  ButtonChangeSchedules,
  ButtonEraseAdvisor,
  ButtonSaveChanges,
} from "../Buttons.component";
import { PasswordProfileModal } from "../Modal.component";
import { ModifySchedulesContent } from "../ModifySchedule.component";
import {
  IconPopOverForm,
  IconPopOverDropdown,
} from "../../../components/IconPopOver";

//Interfaces
import { IObjectData, IProfileCard } from "../../../interfaces/index";
import { EUserType } from "../../../interfaces/enums";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme/index";
import profile_image from "../Assets/profile_image.png";
import { Link } from "react-router-dom";
import { updateUser } from "../../../api/users/update";
import { useStore } from "../../../state/store";
import { GetAllAdvisors } from "../../../api/users/get";
export const ProfileCardMobile = ({
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
      <PasswordProfileModal onClose={onClose} isOpen={isOpen} size={"xs"} />

      {modSchedules ? (
        setPeriod !== undefined &&
        period !== undefined && (
          <ModifySchedulesContent
            adminMod={modAdmin !== undefined && modAdmin}
            period={period}
            setPeriod={setPeriod}
            setModeSchedules={setModSchedules}
            mobile
          />
        )
      ) : (
        <Center>
          <Box
            overflow="hidden"
            boxShadow="dark-lg"
            w={"75%"}
            maxW={"80%"}
            p="5"
            rounded={theme.radii.general}
          >
            {modAdmin && (
              <Link to={"../asesores"}>
                <ArrowBackIcon boxSize={"8"} ml={6} mt={6} />
              </Link>
            )}
            <Center
              flexDir={"column"}
              justifyContent="space-around"
              alignContent={"center"}
              h="100%"
            >
              <Circle backgroundColor={"#8963D9"} size="10em" mx={15}>
                <Image
                  maxW={"80%"}
                  minW={"50%"}
                  src={profile_image}
                  alt="Imagen de perfil del usuario en cuestión."
                />
              </Circle>
              <Heading>{data.name}</Heading>
              <Text fontSize="xl" mb={"2.5"}>
                {data.type === EUserType.advisor
                  ? "Asesor/a"
                  : data.type === EUserType.student
                  ? "Asesorado"
                  : "Admin"}
              </Text>
              <Divider size={"sm"} borderColor={theme.colors.purple} />
              {titleProfileCard.map((title) => (
                <>
                  <Text
                    fontWeight={"bold"}
                    size="sm"
                    color={theme.colors.purple}
                  >
                    {title}
                  </Text>
                  {type !== EUserType.admin ? (
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
                  )}
                </>
              ))}
            </Center>
            {
              <Flex flexDirection={"column"} gap={6}>
                {type != EUserType.student && (
                  <>
                    <ButtonChangeSchedules setModeSchedules={setModSchedules} />
                  </>
                )}

                <ButtonChangePassword onOpen={onOpen} />
                {type === EUserType.admin && (
                  <Center flexDirection={"column"} gap={6}>
                    <ButtonSaveChanges setMyData={setMyDataChangesDB} mobile />
                    <ButtonEraseAdvisor mobile id={data.id} />
                  </Center>
                )}
              </Flex>
            }
          </Box>
        </Center>
      )}
    </>
  );
};
