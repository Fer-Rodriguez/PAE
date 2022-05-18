//Libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";

//Store
import { useStore } from "../../state/store";

//Components
import { ProfileDesktop } from "./Desktop";
import { ProfileCardMobile } from "./Mobile";

//Interfaces & enums & types.
import { IDataProfileCard, IUserData } from "../../interfaces";

export const ProfilePage = ({ mobile }: { mobile?: boolean }) => {
  const { id } = useParams();
  const myCurrentUserData: IDataProfileCard = useStore(
    (state) => ({
      id: state.id,
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

  const allUsers = useStore((state) => state.allUsers);

  const [selectedUser, setSelectedUser] = useState<
    IDataProfileCard | IUserData
  >(myCurrentUserData);

  const [adminMod, setAdminMod] = useState(false);

  const [periodSelected, setPeriod] = useState<"0" | "1" | "2">("0");

  useEffect(() => {
    if (id !== "user") {
      setAdminMod(true);
      allUsers.map((user) => {
        if (user !== null && user?.id === id) {
          setSelectedUser(user);
        }
      });
    }
  }, []);

  return (
    <>
      {mobile ? (
        <ProfileCardMobile
          data={selectedUser}
          type={myCurrentUserData.type}
          setPeriod={setPeriod}
          period={periodSelected}
          modAdmin={adminMod}
        />
      ) : (
        <ProfileDesktop
          data={selectedUser}
          setPeriod={setPeriod}
          period={periodSelected}
          type={myCurrentUserData.type}
          modAdmin={adminMod}
        />
      )}
    </>
  );
};
