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

export { EStatus, EUserType, ELanguage, ETheme, EStatus_Appointement };
