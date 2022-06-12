import axios from "axios";

export const updateAppointmentDetails = async (
  id: string,
  newValue: string,
  fieldToBeChanged: string
) => {
  const data = JSON.stringify({
    id,
    newValue,
    fieldToBeChanged,
  });

  const config = {
    method: "patch",
    url: "https://appointments.yellowplant-d0967952.westus.azurecontainerapps.io:6060/appointment/details",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
