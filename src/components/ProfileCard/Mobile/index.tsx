import {
  Center,
  Box,
  Flex,
  Image,
  Circle,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

//Components
import { ButtonGeneric } from "../../Button";

//Interfaces
import { IProfileCard } from "../../../interfaces/index";
import { EUserType } from "../../../interfaces/enums";

//Data
import { titleProfileCard } from "../../../data";

//Assets
import theme from "../../../theme/index";

export const ProfileCardMobile = ({ data, baseProps }: IProfileCard) => {
  return (
    <>
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
                src=""
                alt="Imagen de perfil del usuario en cuestión."
              />
            </Circle>
            <Heading>{data.name}</Heading>
            <Text fontSize="xl" mb={"2.5"}>
              {data.type === EUserType.advisor
                ? "Asesor"
                : data.type === EUserType.student
                ? "Asesorado/a"
                : "Admin"}
            </Text>
            <Divider size={"sm"} borderColor={theme.colors.purple} />
            {titleProfileCard.map((title) => (
              <>
                <Text fontWeight={"bold"} size="sm" color={theme.colors.purple}>
                  {title}
                </Text>
                <Text size="sm" my={1.5}>
                  {data[title.toLowerCase()]}
                </Text>
              </>
            ))}
            <ButtonGeneric
              margin={"6px"}
              color={theme.colors.purple as string}
              text={"Cambiar contraseña"}
              fontColor={"white"}
            />
          </Center>
        </Box>
      </Center>
    </>
  );
};
