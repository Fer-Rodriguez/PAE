//Libraries
import { useCallback, useRef, useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";

import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

//Components
import { MyAlert } from "../MyAlert";
import { MyModal } from "./Modal.component";

//Interfaces, types & enums
import { EStatusAlert } from "../../interfaces/enums";

export const MyCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [event, setEvent] = useState(null) as any;
  const [totalHours, setTotalHours] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [alertHours, setAlertHours] = useState(false);

  const cal = useRef(null) as any;

  const getHoursBetweenDates = (date1: Date, date2: Date) => {
    return Math.abs(date1.valueOf() - date2.valueOf()) / 36e5;
  };

  const acceptSchedule = () => {
    const schedule = {
      id: String(Math.random()),
      title: "Asesoría",
      isAllDay: false,
      start: event?.start,
      end: event?.end,
      category: "time",
      dueDateClass: "",
      location: "",
      raw: {
        class: "public",
      },
      state: "Disponible",
    };

    const difference = getHoursBetweenDates(event?.start, event?.end);

    if (difference + totalHours <= 5) {
      cal.current.calendarInst.createSchedules([schedule]);
      setTotalHours(totalHours + difference);
    } else {
      setAlertHours(true);
    }
  };

  const beforeCreateSchedule = useCallback((e: any) => {
    const difference = getHoursBetweenDates(e.start, e.end);

    console.log("Total Hours + difference: ", totalHours + difference);
    if (totalHours + difference <= 5) {
      e.guide.clearGuideElement();
      setEvent(e);
      onOpen();
    } else {
      setAlertHours(true);
    }
  }, []);

  const beforeUpdateSchedule = useCallback((e) => {
    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  return (
    <>
      <h1>{totalHours}</h1>
      <MyAlert
        title="Error"
        description="El número de horas supera el límite de 5"
        status={EStatusAlert.error}
        active={alertHours}
        setActive={setAlertHours}
      />
      <Calendar
        ref={cal}
        height="600px"
        disableDblClick
        month={{
          startDayOfWeek: 0,
        }}
        scheduleView={["time"]}
        taskView={false}
        useCreationPopup={false}
        useDetailPopup={true}
        onBeforeCreateSchedule={beforeCreateSchedule}
        onBeforeUpdateSchedule={beforeUpdateSchedule}
        onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        week={{
          startDayOfWeek: 1,
          daynames: [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ],
          showTimezoneCollapseButton: true,
          timezonesCollapsed: true,
          workweek: true,
          hourStart: 8,
          hourEnd: 20,
        }}
      />

      <MyModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        event={event}
        accept={acceptSchedule}
      />
    </>
  );
};
