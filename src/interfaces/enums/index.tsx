const enum EStatus {
  active,
  inactive,
}

const enum EUserType {
  advisor,
  student,
  admin,
  root,
}

const enum ELanguage {
  english,
  spanish,
}

const enum ETheme {
  white,
  dark,
}

enum ETypeDropdown {
  normal,
  three,
}

enum EStatusAlert {
  error = "error",
  success = "success",
  warning = "warning",
  info = "info",
}

enum EModalCalendarType {
  update,
  create,
  delete,
}

enum EMyCalendarView {
  week = "week",
  month = "month",
}

enum EStatusAppointment {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export {
  EStatus,
  EUserType,
  ELanguage,
  ETheme,
  ETypeDropdown,
  EStatusAlert,
  EModalCalendarType,
  EMyCalendarView,
  EStatusAppointment,
};
