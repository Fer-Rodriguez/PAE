//Libraries
import shallow from "zustand/shallow";

//Store
import { useStore } from "../../state/store";

//Components
import { ProfileCard } from "../../components/ProfileCard";

//Interfaces & enums & types.
import { IDataProfileCard } from "../../interfaces";

export const ProfilePage = () => {
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

  return (
    <>
      <ProfileCard data={userData} type={userData.type} />
    </>
  );
};
