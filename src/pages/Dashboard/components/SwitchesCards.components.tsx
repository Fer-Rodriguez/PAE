import { Flex, useColorMode } from "@chakra-ui/react";

import { Switch } from "../../../components/Switch";

//Assets
import theme from "../../../theme";
import world from "../Icons/world.png";
import hand from "../Icons/hand.png";

//Dark Mode
import { DarkMode } from "../../../colors";

import "../style.css";
import useDarkMode from "../../../context";
import { useState } from "react";

import { useTranslation } from "react-i18next";

export const SwitchesCards = ({ mobile = false }: { mobile?: boolean }) => {
  const { toggleColorMode, colorMode } = useColorMode();

  const { value, setValue } = useDarkMode();

  const [isToggled, setIsToggled] = useState(false);

  const [isToggled2, setIsToggled2] = useState(false);

  const [t, i18n] = useTranslation("global");

  const [init, setInit] = useState("es");

  const ChangeColor = () => {
    toggleColorMode();
    setValue(colorMode === "light" ? "dark" : "light");
  };

  const ChangeLng = () => {
    if (init == "es") {
      i18n.changeLanguage("en");
      setInit("en");
    } else {
      i18n.changeLanguage("es");
      setInit("es");
    }
  };

  function classHandler() {
    if (colorMode == "dark") {
      return "Black";
    } else {
      return "White";
    }
  }

  function classHandler2() {
    if (colorMode == "light") {
      return "slider";
    } else {
      return "slider2";
    }
  }

  return (
    <Flex direction={"column"} h="100%" gap={5}>
      <Switch
        rounded={true}
        isToggled={isToggled}
        onToggled={() => setIsToggled(!isToggled)}
        click={() => ChangeColor()}
        class={classHandler()}
        class2={classHandler2()}
      />
      <Switch
        rounded={true}
        isToggled={isToggled2}
        onToggled={() => setIsToggled2(!isToggled2)}
        click={() => ChangeLng()}
        class={classHandler()}
        class2={classHandler2()}
      />
    </Flex>
  );
};
