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

enum ETypeProfileCard {
  advisor,
  student,
  admin,
}

export {
  EStatus,
  EUserType,
  ELanguage,
  ETheme,
  EStatus_Appointement,
  ETypeDropdown,
  ETypeProfileCard,
};
