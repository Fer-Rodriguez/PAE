import axios from "axios";

import { ENotificationStatus } from "../../../interfaces/enums";

export const updateNotification = async (
  idNotification: string,
  status: ENotificationStatus
) => {
  const config = {
    method: "patch",
    url: `http://localhost:6090/notification`,
    data: {
      idNotification,
      status,
    },
  };

  try {
    await axios.patch(`http://localhost:6090/notification`, {
      idNotification,
      status,
    });
  } catch (error) {
    console.error(error);
  }
};
