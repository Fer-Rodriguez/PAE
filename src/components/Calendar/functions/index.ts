//Interfaces
import {
  IbeforeCreateSchedule,
  IbeforeUpdateClick,
  EBeforeType,
  IdeletSchedule,
  IupdateSchedule,
  EUpdateScheduleOperation,
  ImodifySchedule,
  ISchedule,
  IacceptSchedule,
  INextMonth,
  ETypeUpdateMonth,
} from "../interfaces";

import { EModalCalendarType } from "../../../interfaces/enums";

//Functions
import { getHoursBetweenDates } from "../../../services/Functions";

// -----------------------
// Weekly
// -----------------------
const beforeCreateSchedule = ({
  e,
  totalHours = 0,
  onOpen,
  setEvent,
  setModalType,
  setAlertHours,
  setDispTimeAlert,
  setWholeHourAlert,
}: IbeforeCreateSchedule) => {
  const difference = getHoursBetweenDates(e.start, e.end);

  if (
    (e.start.getMinutes() !== 0 || e.end.getMinutes() !== 0) &&
    setWholeHourAlert
  ) {
    setWholeHourAlert(true);
    return;
  }

  if (difference <= 0.5 && setDispTimeAlert) {
    setDispTimeAlert(true);
    return;
  }

  if (setAlertHours !== undefined && setDispTimeAlert && setWholeHourAlert) {
    setWholeHourAlert(false);
    setDispTimeAlert(false);
    if (totalHours + difference <= 5) {
      e.guide.clearGuideElement();
      onOpen();
      setEvent(e);
      setModalType(EModalCalendarType.create);
    } else {
      setAlertHours(true);
    }
  }
};

const beforeUpdateClick = ({
  type,
  onOpen,
  setEvent,
  setModalType,
  e,
}: IbeforeUpdateClick) => {
  setModalType(
    type === EBeforeType.click
      ? EModalCalendarType.delete
      : EModalCalendarType.update
  );
  setEvent(e);
  onOpen();
};

const deleteSchedule = ({
  setTotalHours,
  setAlertHours,
  modifySchedulesState,
  cal,
  e: event,
  totalHours,
}: IdeletSchedule) => {
  const { id, calendarId, start, end } = event.schedule;

  //Get hours of the schedule to be deleted
  const hours = getHoursBetweenDates(start, end);

  if (totalHours !== undefined)
    //Update the total hours
    setTotalHours !== undefined && setTotalHours(totalHours - hours);

  //Disable alert
  setAlertHours !== undefined && setAlertHours(false);

  //Remove schedule from state
  const propsRemoveSchedule: ImodifySchedule = {
    scheduleId: id,
    operation: EUpdateScheduleOperation.remove,
  };
  modifySchedulesState(propsRemoveSchedule);

  cal.current.calendarInst.deleteSchedule(id, calendarId);
};

const updateSchedule = ({
  setAlertHours,
  setModalType,
  setTotalHours,
  modifySchedulesState,
  cal,
  totalHours,
  e: event,
}: IupdateSchedule) => {
  const newHours = getHoursBetweenDates(
    event?.schedule.start,
    event?.changes.end
  );
  const originalHours = getHoursBetweenDates(
    event?.schedule.start,
    event?.schedule.end
  );

  setModalType(EModalCalendarType.create);

  if (totalHours !== undefined && totalHours - originalHours + newHours < 5) {
    //Disable alert for hours & update total hours with new update schedule
    setAlertHours !== undefined && setAlertHours(false);
    setTotalHours !== undefined &&
      setTotalHours(totalHours - originalHours + newHours);

    const propsModifySchedule: ImodifySchedule = {
      scheduleId: event?.schedule.id,
      operation: EUpdateScheduleOperation.update,
      key: "end",
      newValue: event?.end,
    };

    modifySchedulesState(propsModifySchedule);

    //Update Calendar UI
    cal.current.calendarInst.updateSchedule(
      event.schedule.id,
      event.schedule.calendarId,
      event.changes
    );
  } else {
    {
      setAlertHours !== undefined && setAlertHours(true);
    }
  }
};

//Functions for actions witn the calendar and Schedules
const acceptSchedule = ({
  e: event,
  totalHours = 0,
  setAlertHours,
  setSchedules,
  setTotalHours,
  cal,
  schedules,
}: IacceptSchedule) => {
  const schedule: ISchedule = {
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
    isVisible: true,
    state: "Disponible",
  };

  const difference = getHoursBetweenDates(event?.start, event?.end);

  if (setAlertHours !== undefined && setTotalHours !== undefined) {
    if (difference + totalHours <= 5) {
      setAlertHours(false);
      cal.current.calendarInst.createSchedules([schedule]);
      setTotalHours(totalHours + difference);
      setSchedules([...schedules, schedule]);
    } else {
      setAlertHours(true);
    }
  }
};

// -----------------------
// Monthly
// -----------------------

const updateMonth = ({ currentMonth, setMonth, type, cal }: INextMonth) => {
  const modifier = type === ETypeUpdateMonth.Add ? 1 : -1;
  const next = currentMonth.setMonth(currentMonth.getMonth() + modifier, 1);
  setMonth(new Date(next));

  if (type === ETypeUpdateMonth.Add) cal.current.calendarInst.next();
  else cal.current.calendarInst.prev();
};

export {
  //Weekly
  beforeCreateSchedule,
  beforeUpdateClick,
  deleteSchedule,
  updateSchedule,
  acceptSchedule,
  //Montly
  updateMonth as nextMonth,
};
