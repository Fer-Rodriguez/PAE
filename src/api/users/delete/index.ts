import axios from "axios";

export const DeleteUser = async (id: string) => {
  console.log("Eliminando MUAJAJA");
  const data = await axios
    .delete(
      `https://login-register.yellowplant-d0967952.westus.azurecontainerapps.io:6070/register/delete?id=${id}`
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
