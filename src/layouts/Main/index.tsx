//Components

import { MobileComponents } from "./Mobile.component";
import { DesktopComponents } from "./Desktop.component";
import { Desktop, Mobile } from "../../services/Breakpoints";
import { Box } from "@chakra-ui/react";

interface IMainLayout {
  desktop?: React.ReactNode;
  tablet?: React.ReactNode;
  mobile?: React.ReactNode;
}

export const MainLayout = (props: IMainLayout) => {
  return (
    <>
      <Desktop children={<DesktopComponents userComponent={props.desktop} />} />
      <Mobile children={<MobileComponents userComponent={props.mobile} />} />
    </>
  );
};
