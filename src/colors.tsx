import { useColorModeValue } from "@chakra-ui/react";
import theme from "./theme";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const DarkMode = () => {
  const text = useColorModeValue(theme.colors.black, theme.colors.white);
  const text2 = useColorModeValue(theme.colors.white, theme.colors.black);
  const bgTotal = useColorModeValue(
    theme.colors.lightThemeBackground,
    theme.colors.darkThemeBackground
  );
  const bgColor = useColorModeValue(theme.colors.pink, theme.colors.pinkDark);
  const bgColor2 = useColorModeValue(theme.colors.blue, theme.colors.blueDark);
  const bgColor3 = useColorModeValue(
    theme.colors.white,
    theme.colors.blackLight
  );
  return { bgColor, bgColor2, bgColor3, text, text2, bgTotal };
};
