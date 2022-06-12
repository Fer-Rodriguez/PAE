import axios from "axios";

export const updateSubject = async (
  id: string,
  name: string,
  acronym: string,
  availability: boolean,
  englishName: string,
  idAdmin: string
) => {
  const config = {
    method: "patch",
    url: `https://subjects.yellowplant-d0967952.westus.azurecontainerapps.io:6080/subject/`,
    data: {
      id,
      name,
      acronym,
      availability,
      englishName,
      idAdmin,
    },
  };

  try {
    await axios(config);
  } catch (error) {
    console.error(error);
  }
};
