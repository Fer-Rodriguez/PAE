import axios from "axios";

export const DeleteSubject = async (id: string, idAdmin: string) => {
  const data = await axios
    .delete(
      `https://subjects.yellowplant-d0967952.westus.azurecontainerapps.io:6080/subject/?id=${id}&idAdmin=${idAdmin}`
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
