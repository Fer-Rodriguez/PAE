//Libraries
import { useCallback, useRef, useState } from "react";
import {
  Heading,
  useDisclosure,
  HStack,
  Box,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

//Components
import { MyAlert } from "../MyAlert";
import { MyModal } from "./Modal.component";
import { ButtonGeneric } from "../Button";

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
  ETypeUpdateMonth,
} from "./interfaces";

//Functions
import {
  beforeCreateSchedule,
  beforeUpdateClick,
  deleteSchedule,
  updateSchedule,
  acceptSchedule,
  nextMonth,
} from "./functions";

//Assets
import theme from "../../theme";
import { idText } from "typescript";

interface IMyCalendar {
  view?: EMyCalendarView;
  setSelectedDay?: React.Dispatch<Date>;
  daySelected?: Date;
  h?: string;
}

function AlertDialogExample({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as any} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export const MyCalendar = ({
  view = EMyCalendarView.week,
  setSelectedDay,
  daySelected,
  h,
}: IMyCalendar) => {
  //Set States
  const [myEvent, setEvent] = useState<any>(null);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [schedules, setSchedules] = useState<Array<ISchedule>>([]);
  const [modalType, setModalType] = useState<EModalCalendarType>(
    EModalCalendarType.create
  );
  const [currentMonth, setMonth] = useState(new Date());

  //-----------------------------------

  //Use Ref
  const cal = useRef(null) as any;

  //Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertHours, setAlertHours] = useState<boolean>(false);

  /**
   * modifySchedulesState
   * Functions that updates the "schedules" states based on updates or deletes.
   *
   * @param props = ScheduleId (Id of the schedule to modify), operation (Type of operation - Update / Delete),
   * key? (Key which hold the value to mnodify), newValue? (New value to place in the key described above)
   */
  const modifySchedulesState = (props: ImodifySchedule) => {
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

  //TODO: Add methods for day selection at monthly view
  //TODO: Restrict multiple selection at monthly view
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
        <Calendar
          ref={cal}
          className="calendar"
          {...(h ? { height: h } : { height: "65vh" })}
          view={view}
          disableDblClick
          scheduleView={["time"]}
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
          month={{
            moreLayerSize: {
              height: "auto",
            },
            grid: {
              header: {
                height: 34,
              },
              footer: {
                height: 10,
              },
            },
            narrowWeekend: true,
            startDayOfWeek: 1, // monday
            visibleWeeksCount: 3,
            visibleScheduleCount: 4,
          }}
        />
      )}
    </Box>
  );
};
