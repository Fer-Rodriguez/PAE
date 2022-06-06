import axios from "axios";

export const updateUser = async (data: any, careerData: any, id: string) => {
  const config = {
    method: "patch",
    url: `http://localhost:6070/register/update`,
    data: {
      id,
      dataToUpdate: data,
      careerDataToUpdate: careerData,
    },
  };

  try {
    await axios(config);
  } catch (error) {
    console.error(error);
  }
};
