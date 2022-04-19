//Components

import { MobileComponents } from "./Mobile.component";
import { DesktopComponents } from "./Desktop.component";
import { Desktop, Mobile, Tablet } from "../../services/Breakpoints";
import { Box } from "@chakra-ui/react";

interface IMainLayout {
  children?: Element;
}

export const MainLayout = (props: IMainLayout) => {
  return (
    <Box h={"100vh"}>
      <Desktop children={<DesktopComponents />} />
      {/*<Tablet children={<DesktopComponents />} />
      <Mobile children={<MobileComponents />} />*/}
    </Box>
  );
};
