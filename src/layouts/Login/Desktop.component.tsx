import React from "react";

import { IUserComponents } from "../../interfaces";
import { Img1, Img2, Img3, Img4, ImgMan } from "../../assets/login/LoginMobile";

import { Flex } from "@chakra-ui/react";

export const DesktopComponents = ({ userComponent }: IUserComponents) => {
  return (
    <>
      <Flex>
        <div>
          {/* Background */}
          <div
            style={{
              maskImage: `radial-gradient(40% 100% at right, transparent 50%, #fff 51%)`,
              background: `linear-gradient(to right, rgba(114,9,183,0.6), rgba(67,97,238,0.6))`,
              width: "30vw",
              height: "100vh",
              maxWidth: "700px",
            }}
          ></div>
          {/* Img1 */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "27vw",
            }}
          >
            <Img1 maxWidth="10%"></Img1>
          </div>
          <div
            style={{
              position: "absolute",
              top: "10vh",
              left: "10vw",
            }}
          >
            <Img2 maxWidth="10%"></Img2>
          </div>
          {/* Img3 */}
          <div
            style={{
              position: "absolute",
              bottom: "30vh",
              left: "0",
            }}
          >
            <Img3 maxWidth="15%"></Img3>
          </div>
          {/* Img4 */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "5vw",
            }}
          >
            <Img4 maxWidth="10%"></Img4>
          </div>
          {/* ImgMan */}
          <div
            style={{
              position: "absolute",
              left: "15vw",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <ImgMan maxWidth="22%"></ImgMan>
          </div>
        </div>
        {userComponent}
      </Flex>
    </>
  );
};
