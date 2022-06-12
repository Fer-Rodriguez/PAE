import io from "socket.io-client";

const ENDPOINT =
  "https://dashboard.yellowplant-d0967952.westus.azurecontainerapps.io:6090";

const socket = io(ENDPOINT, { autoConnect: false });

export default socket;
