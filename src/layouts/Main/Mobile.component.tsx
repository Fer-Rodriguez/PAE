//Chakra
import { Box, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//Components
import { Menu } from "../../components/Menu";

//Assets
import { Logo } from "../../assets/Logo";
import cross from "../../assets/Cross.png";
import { Bell } from "../../components/Bell";
import { DarkMode } from "../../colors";

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
    <Flex flexDirection={"column"}>
      <Flex
        backgroundColor={DarkMode().bgTotal}
        position={"fixed"}
        pl="5%"
        pr="2%"
        top="0%"
        pt="10px"
        w="100%"
        zIndex={100}
        justifyContent="space-between"
      >
        <Box>
          <Logo maxWidth="20vw" />
        </Box>
        <Flex flexGrow={0} alignItems="center">
          <Image
            src={cross}
            boxSize={8}
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          />
          <Bell columns={[]} data={[]} headColor={""} />
        </Flex>
      </Flex>
      {/** Here is going to be render the corresponding child component */}
      <Box mb="50px" mt="60px">
        {userComponent}
      </Box>
      <Menu userType="user" mobile={true} />
    </Flex>
  );
};
