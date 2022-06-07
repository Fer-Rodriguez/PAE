import axios from "axios";

export const getSubjects = async (idCareer: string, semester: number) => {
  const config = {
    method: "get",
    url: `http://localhost:6080/subject/career?idCarrera=${idCareer}&semester=${semester}`,
  };

  const res = await axios(config);
  return res.data;
};
