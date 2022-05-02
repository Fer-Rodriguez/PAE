import axios from "axios";

export const getRecentAppointment = (id: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/admin?id=${id}`,
  };

  axios(config).then((res) => console.log("FERGOD RESPONSE: ", res.data));
};
