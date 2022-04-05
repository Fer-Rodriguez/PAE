import React, { useRef } from "react";
import LDashboard from "../../layouts/dashboard";
import { Heading, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const Title = () => <Heading>Hola, Shalom Pineda</Heading>;

export const Index = () => {
  return <div>index</div>;
};

const MainCard = () => {
  return (
    <div>
      <Box
        w="100%"
        h="100%"
        bgGradient="linear-gradient(90deg, rgba(107,126,239,1) 0%, rgba(152,85,207,1) 54%);"
        borderRadius={20}
      />
      <Index />
      <Button>Hola</Button>
    </div>
  );
};

function Dashboard() {
  return <LDashboard Title={<Title />} MainCard={<MainCard />}></LDashboard>;
}

export default Dashboard;
