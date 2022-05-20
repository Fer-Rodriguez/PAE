import { Box } from "@chakra-ui/react";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

interface ISetters {
  setFormStep: React.Dispatch<number>;
  setIdSubject: React.Dispatch<string>;
  setProblemDescription: React.Dispatch<string>;
  setDate: React.Dispatch<string>;
  setImageFile: React.Dispatch<File>;
}

interface IInfo {
  idSubject: string;
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
    setDate,
    setIdSubject,
    setProblemDescription,
    setImageFile,
  } = setters;
  const { idSubject, problemDescription, formStep, imageFile } = info;

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return (
        <BasicInfoScreen
          onNextScreenButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setFormStep(1);
          }}
          onDropDownChange={setIdSubject}
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
      return <SuccessScreen></SuccessScreen>;
    } else {
      return <Box>Invalid form step</Box>;
    }
  };

  return <Box>{getScreenFromStep(formStep)}</Box>;
};
