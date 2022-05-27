import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

import { ButtonGeneric } from "../ButtonGeneric";
import PopOver, { ETypeSize } from "../popOver";
import { CheckboxQuestion } from "./checkboxQuestion";
import { ScaleQuestion } from "./scaleQuestion";
import { TextQuestion } from "./textQuestion";

export const Survey = ({
  surveyAnswered,
  surveyQuestions,
  surveyController,
  triggeringNotificationId,
  appointmentId,
}: {
  surveyQuestions: {
    question: string;
    type: "text" | "scale" | "yesOrNo";
    scaleBegining?: string;
    scaleEnding?: string;
  }[];
  surveyAnswered: boolean;
  surveyController: React.Dispatch<React.SetStateAction<boolean>>;
  triggeringNotificationId: string;
  appointmentId: string;
}) => {
  /* Aquí haz el POST a reports*/
  const sendAnswers = async (data: any) => {
    alert(JSON.stringify(data));
  };

  const {
    formState: { isValid },
    control,
    register,
    handleSubmit,
  } = useForm({ mode: "onChange" });

  return (
    <PopOver
      size={ETypeSize.s}
      closeButton={false}
      customOpen={!surveyAnswered}
    >
      <Heading textAlign="center" as="h2" fontSize="2xl" marginBlockEnd="20px">
        ¿Qué tal te fue en tu asesoría con Bruce Wayne?
      </Heading>
      <FormControl>
        <form>
          <Flex direction="column" gap="20px">
            {surveyQuestions?.map((entry) => {
              switch (entry.type) {
                case "text": {
                  return (
                    <TextQuestion
                      extraPropsTextInput={register(entry.question)}
                      question={entry.question}
                    ></TextQuestion>
                  );
                }
                case "scale": {
                  return (
                    <Controller
                      control={control}
                      name={entry.question}
                      rules={{
                        required: "Por favor responde esta pregunta",
                      }}
                      render={({ fieldState: { error } }) => (
                        <>
                          <ScaleQuestion
                            question={entry.question}
                            scaleBegining={entry.scaleBegining}
                            scaleEnding={entry.scaleEnding}
                            extraRadioProps={register(entry.question)}
                          ></ScaleQuestion>
                          {error ? (
                            <FormErrorMessage>
                              {error?.message}
                            </FormErrorMessage>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    ></Controller>
                  );
                }
                case "yesOrNo": {
                  return (
                    <CheckboxQuestion
                      question={entry.question}
                      extraPropsCheckbox={register(entry.question)}
                    ></CheckboxQuestion>
                  );
                }
              }
            })}
          </Flex>
        </form>
      </FormControl>
      <br></br>
      <Center w="100%">
        <ButtonGeneric
          type="submit"
          bgColor="blue"
          sizePX="fit-content"
          text="Enviar respuestas"
          isDisabled={!isValid}
          disabledHoverText="Por favor contesta las preguntas obligatorias"
          onClick={() => {
            handleSubmit(sendAnswers);
            surveyController(true);
          }}
        ></ButtonGeneric>
      </Center>
    </PopOver>
  );
};
