import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Input,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";

interface IIconPopOverForm {
  setData: (value: string | number | boolean, key: string) => void;
  icon: ReactElement<any, string>;
  text: string;
  myKey: string;
  mobile?: boolean;
}

export const IconPopOverForm = ({
  setData,
  mobile = false,
  icon,
  text,
  myKey,
}: IIconPopOverForm) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [value, setValue] = useState(text);
  const firstFieldRef = React.useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const accept = () => {
    onClose();
    setData(value, myKey);
  };

  return (
    <Flex flexDirection={"row"} my={3}>
      <Box d="inline-block" mr={3}>
        {text}
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement={mobile ? "top-start" : "right"}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton aria-label="Icono de ejecución" size="sm" icon={icon} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Input
            ref={firstFieldRef}
            defaultValue={""}
            onChange={(e) => setValue(e.target.value)}
          />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={() => accept()}>
              Aceptar
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
