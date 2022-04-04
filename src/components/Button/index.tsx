import { Button, ButtonGroup } from "@chakra-ui/react";

function ButtonType({ text }: { text: string }) {
  return (
    <Button
      colorScheme="pink"
      rounded={30}
      textAlign="center"
      position="absolute"
      right={310}
    >
      {text}
    </Button>
  );
}

export default ButtonType;
