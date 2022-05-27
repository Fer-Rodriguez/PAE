import { Box, Heading, Text } from "@chakra-ui/react";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

interface ISetters {
  setFormStep: React.Dispatch<number>;
  setIdSubject: React.Dispatch<string>;
  setSubjectName: React.Dispatch<string>;
  setProblemDescription: React.Dispatch<string>;
  setDate: React.Dispatch<string>;
  setImageFile: React.Dispatch<File>;
}

interface IInfo {
  idSubject: string;
  subjectName: string;
  problemDescription: string;
  formStep: number;
  imageFile: File | undefined;
}

export const ScheduleAppointment = ({
  mobile = false,
  createAppointment,
  setters,
  info,
}: {
  mobile?: boolean;
  createAppointment: () => Promise<boolean | undefined>;
  setters: ISetters;
  info: IInfo;
}) => {
  const {
    setFormStep,
    setIdSubject,
    setSubjectName,
    setProblemDescription,
    setDate,
    setImageFile,
  } = setters;
  const { idSubject, subjectName, problemDescription, formStep, imageFile } =
    info;

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return (
        <BasicInfoScreen
          mobile={mobile}
          onNextScreenButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setFormStep(1);
          }}
          onDropDownChange={setIdSubject}
          onSubjectChange={setSubjectName}
          onTextFieldChange={setProblemDescription}
          onFileUploaded={setImageFile}
          valueForFileInput={imageFile}
          valueForDropDown={idSubject}
          valueForTextField={problemDescription}
        ></BasicInfoScreen>
      );
    } else if (step == 1) {
      return (
        <ScheduleScreen
          mobile={mobile}
          subjectName={subjectName}
          onPreviousScreenButtonClick={(
            e: React.MouseEvent<HTMLButtonElement>
          ) => setFormStep(0)}
          onNextScreenButtonClick={async (
            e: React.MouseEvent<HTMLButtonElement>
          ) => {
            try {
              await createAppointment();
              setFormStep(2);
            } catch (e) {
              alert(
                "No podemos completar tu solicitud en este momento. Intentalo de nuevo más tarde."
              );
            }
          }}
          onFullDateSelected={setDate}
        ></ScheduleScreen>
      );
    } else if (step == 2) {
      return <SuccessScreen mobile={mobile}></SuccessScreen>;
    } else {
      return <Box>Invalid form step</Box>;
    }
  };

  return (
    <Box>
      <Heading>Agenda una asesoría</Heading>
      {getScreenFromStep(formStep)}
    </Box>
  );
};
