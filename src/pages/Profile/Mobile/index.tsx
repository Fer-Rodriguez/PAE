import { useState } from "react";
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
import { EditIcon } from "@chakra-ui/icons";

//Components
import {
  ButtonChangePassword,
  ButtonChangeSchedules,
  ButtonEraseAdmin,
  ButtonSaveChanges,
} from "../Buttons.component";
import { PasswordProfileModal } from "../Modal.component";
import { ModifySchedulesContent } from "../ModifySchedule.component";
import { IconPopOverForm } from "../../../components/IconPopOver";

//Interfaces
import { IProfileCard } from "../../../interfaces/index";
import { EUserType } from "../../../interfaces/enums";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme/index";
import profile_image from "../Assets/profile_image.png";

export const ProfileCardMobile = ({
  data,
  type,
  setPeriod,
  period,
}: IProfileCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modSchedules, setModSchedules] = useState(false);
  return (
    <>
      <PasswordProfileModal onClose={onClose} isOpen={isOpen} size={"xs"} />

      {modSchedules ? (
        setPeriod !== undefined &&
        period !== undefined && (
          <ModifySchedulesContent
            setPeriod={setPeriod}
            period={period}
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
                {type === EUserType.student ? "Asesorado/a" : "Asesor/a"}
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
                  {type === EUserType.admin ? (
                    <IconPopOverForm
                      text={data[title.toLowerCase()]}
                      icon={<EditIcon />}
                      key={title.toLowerCase()}
                      mobile
                      setData={() => console.log("Guardando la info en local")}
                    />
                  ) : (
                    <Text size="sm" my={1.5}>
                      {data[title.toLowerCase()]}
                    </Text>
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
                    <ButtonSaveChanges
                      setMyData={() => console.log("saving data")}
                      mobile
                    />
                    <ButtonEraseAdmin mobile />
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
