//Chakra
import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { BellIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
//Components
import { Menu } from "../../components/Menu";
//Interfaces
import { IUserComponents } from "../../interfaces";

//Assets
import { Logo } from "../../assets/Logo";
import cross from "../../assets/Cross.png";

export const MobileComponents = ({
  userComponent,
  setLoggedIn,
}: {
  userComponent: React.ReactNode;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn?.(false);
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <Flex flexDirection={"column"} minH={"100vh"} mt="3vh" gap={12}>
      <Spacer />
      <Flex position={"absolute"}>
        <Box position={"relative"} left="40%">
          <Logo maxWidth="20vw" />
        </Box>
        <Flex
          position={"absolute"}
          left="75vw"
          alignItems="center"
          pr="6"
          gap={"6"}
        >
          <Image
            src={cross}
            boxSize={8}
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          />

          <BellIcon boxSize={8} />
        </Flex>
      </Flex>
      {/** Here is going to be render the corresponding child component */}
      {userComponent}
      {/* TODO: Add responsive menu instead of Spacer**/}
      <Menu userType="user" mobile={true} />
    </Flex>
  );
};
