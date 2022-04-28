import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

import { EStatusAlert } from "../../interfaces/enums";

interface IMyAlert {
  status: EStatusAlert;
  title: string;
  description: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyAlert = ({
  status,
  title,
  description,
  active,
  setActive,
}: IMyAlert) => {
  return (
    <>
      {active && (
        <Alert status={status}>
          <AlertIcon />
          <AlertTitle mr={2}>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={(e) => setActive(false)}
          />
        </Alert>
      )}
    </>
  );
};