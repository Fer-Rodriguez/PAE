import { Center } from "@chakra-ui/react";
import { ProfileCard } from "../../components/ProfileCard";

import { IDataProfileCard } from "../../interfaces";
import { ETypeProfileCard } from "../../interfaces/enums";

function Dashboard() {
  const data: IDataProfileCard = {
    name: "Shalom Pineda Alvarado",
    type: ETypeProfileCard.advisor,
    email: "shalom@teAmo.com",
    career: "ITC",
    semester: "6to",
    profilePic: "Profile",
  };

  return (
    <div className="m-12">
      <Center>
        <ProfileCard type={ETypeProfileCard.student} data={data} />
      </Center>
    </div>
  );
}

export default Dashboard;
