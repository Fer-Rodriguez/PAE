import React from "react";
import { act, render, screen } from "@testing-library/react";
import { ButtonGeneric } from "./components/Button";
import ReactDOM from "react-dom";
import { Button } from "@chakra-ui/react";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<ButtonGeneric text={"hola"} color={"red"} />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

it("FUNCIONAAAAAAAAAAAAA", () => {
  const button = <ButtonGeneric text={"hola"} color={"red"} />;
  const text = "hola";
  const color = "red";
  expect(button).toEqual(<ButtonGeneric text={text} color={color} />);
});
