import { useMediaQuery } from "react-responsive";

interface IResponsive {
  children: React.ReactNode;
}

//Breakpoints defined by the team.

//Queries that allows the programmer to determine the device that is currently being used by the final user.
const useMobileMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 576px)" });

const useTabletQuery = () => useMediaQuery({ query: "(min-width: 768px)" });

const useDesktopQuery = () => useMediaQuery({ query: "(min-width: 992px) " });

//Components that handles the logic to show or not the content given as a prop
export const Mobile = ({ children }: IResponsive) => {
  const isMobile = useMobileMediaQuery();
  return isMobile ? <> {children} </> : <></>;
};

export const Tablet = ({ children }: IResponsive) => {
  const isTablet = useTabletQuery();
  return isTablet ? <>{children}</> : <></>;
};

export const Desktop = ({ children }: IResponsive) => {
  const isDesktop = useDesktopQuery();
  return isDesktop ? <>{children}</> : <></>;
};
