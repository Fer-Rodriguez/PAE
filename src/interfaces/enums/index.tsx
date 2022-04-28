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

enum EStatus_Appointement {
  pending,
  accepted,
  completed,
  canceled,
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

export {
  EStatus,
  EUserType,
  ELanguage,
  ETheme,
  EStatus_Appointement,
  ETypeDropdown,
  EStatusAlert,
  EModalCalendarType,
  EMyCalendarView,
};
