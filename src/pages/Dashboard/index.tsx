import { Heading } from "@chakra-ui/react";
import desktop from "./desktop";
import mobile from "./mobile";

function Title({ text }: { text: string }) {
  const isLaptop = false;
  return <Heading>{text}</Heading>;
}

export { Title };
