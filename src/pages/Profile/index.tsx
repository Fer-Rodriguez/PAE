//Libraries
import { useState } from "react";
import shallow from "zustand/shallow";

//Store
import { useStore } from "../../state/store";

//Components
import { ProfileDesktop } from "./Desktop";
import { ProfileCardMobile } from "./Mobile";

//Interfaces & enums & types.
import { IDataProfileCard } from "../../interfaces";

export const ProfilePage = ({ mobile }: { mobile?: boolean }) => {
  const userData: IDataProfileCard = useStore(
    (state) => ({
      name: state.name,
      email: state.email,
      type: state.type,
      semester: state.semester,
      career: state.career,
      schedule: state.schedule,
      profilePic: state.profilePic,
    }),
    shallow
  );

  const [periodSelected, setPeriod] = useState(0);

  return (
    <>
      {mobile ? (
        <ProfileCardMobile
          data={userData}
          type={userData.type}
          setPeriod={setPeriod}
          period={periodSelected}
        />
      ) : (
        <ProfileDesktop
          data={userData}
          setPeriod={setPeriod}
          period={periodSelected}
          type={userData.type}
        />
      )}
    </>
  );
};
