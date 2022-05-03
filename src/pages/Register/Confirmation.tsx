import React from "react";
import PopOver, { ETypeSize } from "../../components/popOver";

interface IConfirmation {
  info: any;
  children?: any;
}

export const Confirmation = ({ info, children }: IConfirmation) => {
  return (
    <PopOver
      size={ETypeSize.s}
      title={{
        text: "Resumen",
        alignment: "center",
        titleColor: "purpleLight",
      }}
      closeButton={true}
    >
      {children}
    </PopOver>
  );
};
