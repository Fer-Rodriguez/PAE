//Libraries
import { useCallback, useEffect, useRef, useState } from "react";
import { useDisclosure, Box } from "@chakra-ui/react";

import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

//Components
import { MyAlert } from "../MyAlert";
import { MyModal } from "./Modal.component";

//Interfaces, types & enums
import {
  EStatusAlert,
  EModalCalendarType,
  EMyCalendarView,
} from "../../interfaces/enums";
import {
  ISchedule,
  EUpdateScheduleOperation,
  IupdateSchedule,
  ImodifySchedule,
  IbeforeCreateSchedule,
  IbeforeUpdateClick,
  EBeforeType,
  IdeletSchedule,
  IacceptSchedule,
} from "./interfaces";

//Functions
import {
  beforeCreateSchedule,
  beforeUpdateClick,
  deleteSchedule,
  updateSchedule,
  acceptSchedule,
} from "./functions";
import axios from "axios";

interface IMyCalendar {
  view?: EMyCalendarView;
  period: "0" | "1" | "2";
  h?: string;
  register?: boolean;
  idUser?: string;
}

function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export const MyCalendar = ({
  view = EMyCalendarView.week,
  period,
  idUser,
  h,
  register = false,
}: IMyCalendar) => {
  //Set States
  const [myEvent, setEvent] = useState<any>(null);
  const [totalHours, setTotalHours] = useState<number>(0);

  const [schedulesFirst, setSchedulesFirst] = useState<Array<ISchedule>>([
    {
      id: String(Math.random()),
      start: new Date(),
      title: "Hola",
      category: "time",
      isAllDay: false,
      end: addHours(2),

      isVisible: true,
    },
  ]);
  const [schedulesSecond, setSchedulesSecond] = useState<Array<ISchedule>>([]);
  const [schedulesThird, setSchedulesThird] = useState<Array<ISchedule>>([]);

  const [modalType, setModalType] = useState<EModalCalendarType>(
    EModalCalendarType.create
  );

  //-----------------------------------

  //Use Ref
  const cal = useRef(null) as any;

  // -------------------------------------

  //UseEffect

  const getSchedules = async () => {
    axios
      .get(`http://localhost:6090/schedule/?idUser=${idUser}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!register) getSchedules();
  }, []);

  //Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertHours, setAlertHours] = useState<boolean>(false);
  const [disponibilityTimeAlert, setDispTimeAlert] = useState(false);
  const [wholeHourAlert, setWholeHourAlert] = useState(false);

  const getCurrentSchedule = () => {
    if (period === "0") {
      return { schedules: schedulesFirst, setSchedules: setSchedulesFirst };
    } else if (period === "1") {
      return { schedules: schedulesSecond, setSchedules: setSchedulesSecond };
    } else
      return { schedules: schedulesThird, setSchedules: setSchedulesThird };
  };

  /**
   * modifySchedulesState
   * Functions that updates the "schedules" states based on updates or deletes.
   *
   * @param props = ScheduleId (Id of the schedule to modify), operation (Type of operation - Update / Delete),
   * key? (Key which hold the value to mnodify), newValue? (New value to place in the key described above)
   */
  const modifySchedulesState = (props: ImodifySchedule) => {
    const { schedules, setSchedules } = getCurrentSchedule();
    if (props.operation === EUpdateScheduleOperation.remove) {
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.id !== props.scheduleId
      );

      setSchedules(updatedSchedules);
    } else {
      const newSchedules = schedules;
      let oldSchedule = {} as ISchedule;
      let originalIndex = 0;

      newSchedules.map((schedule, index) => {
        if (schedule.id === props.scheduleId) {
          oldSchedule = schedule;
          originalIndex = index;
        }
      });

      if (props.key !== undefined) {
        const newSchedule: ISchedule = {
          ...oldSchedule,
          [props.key]: props.newValue,
        };

        newSchedules[originalIndex] = newSchedule;
        setSchedules(newSchedules);
      }
    }
  };

  //------------------------------------------------

  //Middleware

  //------------------------------------------------

  const middleBeforeCreate = useCallback((e) => {
    const props: IbeforeCreateSchedule = {
      e,
      totalHours,
      onOpen,
      setEvent,
      setModalType,
      setAlertHours,
      setDispTimeAlert,
      setWholeHourAlert,
    };

    beforeCreateSchedule(props);
  }, []);

  const middleBeforeUpdate = useCallback((e) => {
    const props: IbeforeUpdateClick = {
      e,
      onOpen,
      setEvent,
      setModalType,
      type: EBeforeType.update,
    };
    setEvent(e);

    beforeUpdateClick(props);
  }, []);

  const middleBeforeClick = useCallback((e) => {
    const props: IbeforeUpdateClick = {
      e,
      onOpen,
      setEvent,
      setModalType,
      type: EBeforeType.click,
    };

    beforeUpdateClick(props);
  }, []);

  const middleDelete = () => {
    const props: IdeletSchedule = {
      setTotalHours,
      setAlertHours,
      modifySchedulesState,
      cal,
      totalHours,
      e: myEvent,
    };
    deleteSchedule(props);
  };

  const middleAccept = () => {
    const { schedules, setSchedules } = getCurrentSchedule();
    const props: IacceptSchedule = {
      setTotalHours,
      setAlertHours,
      setSchedules,
      schedules,
      cal,
      totalHours,
      e: myEvent,
    };
    acceptSchedule(props);
  };

  const middleUpdate = () => {
    const props: IupdateSchedule = {
      setTotalHours,
      setAlertHours,
      setModalType,
      modifySchedulesState,
      cal,
      totalHours,
      e: myEvent,
    };
    updateSchedule(props);
  };

  //-----------------------------------------------

  const calendarWeeklyOperations = {
    accept: middleAccept,
    applyUpdate: middleUpdate,
    eliminateSchedule: middleDelete,
  };

  //TODO: On creation, fill calendar with schedules from advisors.

  return (
    <Box overflowY={"scroll"}>
      {view === EMyCalendarView.week && (
        <>
          <MyAlert
            title="Error"
            description="El número de horas supera el límite de 5"
            status={EStatusAlert.error}
            active={alertHours}
            setActive={setAlertHours}
          />
          <MyAlert
            title="Error"
            description="La disponibilidad mínima es de 1 hora."
            status={EStatusAlert.error}
            active={disponibilityTimeAlert}
            setActive={setDispTimeAlert}
          />
          <MyAlert
            title="Error"
            description="El tiempo inicial y fnal de disponibilidad debe ser al comienzo de la hora en cuestión."
            status={EStatusAlert.error}
            active={wholeHourAlert}
            setActive={setWholeHourAlert}
          />
          <MyModal
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            event={myEvent}
            operations={calendarWeeklyOperations}
            type={modalType}
          />
        </>
      )}

      {view === EMyCalendarView.week && (
        <>
          <h1>Periodo: {period}</h1>
          <h1>Horas: {totalHours}</h1>
          <Calendar
            ref={cal}
            className="calendar"
            height="100%"
            view={view}
            disableDblClick
            scheduleView={["time"]}
            schedules={getCurrentSchedule().schedules}
            taskView={false}
            useCreationPopup={false}
            onClickSchedule={middleBeforeClick}
            onBeforeCreateSchedule={middleBeforeCreate}
            onBeforeUpdateSchedule={middleBeforeUpdate}
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
        </>
      )}
    </Box>
  );
};
