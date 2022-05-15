import { IUserComponents } from "../../interfaces";
import { Img1, Img2, Img3, Img4, ImgMan } from "../../assets/login/LoginMobile";

import { Center } from "@chakra-ui/react";

export const MobileComponents = ({ userComponent }: IUserComponents) => {
  return (
    <>
      <div style={{ height: "25vh", minHeight: "190px" }}>
        {/* Background */}
        <div
          style={{
            maskImage: `radial-gradient(110% 50% at bottom, transparent 50%, #fff 51%)`,
            WebkitMaskImage: `radial-gradient(110% 50% at bottom, transparent 50%, #fff 51%)`,
            background: `linear-gradient(to right, rgba(114,9,183,0.6), rgba(67,97,238,0.6))`,
            width: "100vw",
            height: "22vh",
            maxHeight: "160px",
            minHeight: "120px",
          }}
        ></div>
        <Center>
          <div style={{ width: "60%", position: "absolute", top: "0px" }}>
            {/* Img1 */}
            <div
              style={{
                maxWidth: "100%",
                position: "absolute",
                top: "0px",
                right: "0px",
                width: "8%",
              }}
            >
              <Img1></Img1>
            </div>
            {/* Img2 */}
            <div
              style={{
                maxWidth: "100%",
                width: "8%",
                position: "absolute",
                top: "25px",
                right: "15vw",
              }}
            >
              <Img2></Img2>
            </div>
            {/* Img3 */}
            <div
              style={{
                maxWidth: "100%",
                position: "absolute",
                top: "0px",
                left: "15vw",
                width: "8%",
              }}
            >
              <Img3></Img3>
            </div>
            {/* Img4 */}
            <div
              style={{
                maxWidth: "100%",
                position: "absolute",
                top: "25px",
                left: "0px",
                width: "8%",
              }}
            >
              <Img4></Img4>
            </div>
            {/* Man */}
            <Center>
              <div
                style={{
                  maxWidth: "20%",
                  position: "absolute",
                  top: "20px",
                }}
              >
                <ImgMan></ImgMan>
              </div>
            </Center>
          </div>
        </Center>
      </div>
      {userComponent}
    </>
  );
};
