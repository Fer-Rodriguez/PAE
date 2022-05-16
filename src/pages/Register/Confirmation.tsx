import React from "react";
import PopOver, { ETypeSize } from "../../components/popOver";

interface IConfirmation {
  info: any;
  children?: any;
  customClose?: () => void;
}

export const Confirmation = ({
  info,
  children,
  customClose,
}: IConfirmation) => {
  return (
    <PopOver
      size={ETypeSize.s}
      title={{
        text: "Resumen",
        alignment: "center",
        titleColor: "purpleLight",
      }}
      closeButton={true}
      customClose={customClose}
    >
      {children}
    </PopOver>
  );
};
