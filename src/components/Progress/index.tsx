//Libraries
import { Button, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";

//Enums, Tyoes & Interfaces
import { IStep, IFinalProgressContent } from "../../interfaces";

//Local Interfaces
interface IProgress {
  steps: Array<IStep>;
  finalContent?: IFinalProgressContent;
  baseProps?: { [key: string]: any };
}

/**
 *  Progress: Functions that returns a progress bar represented as steps in a continous line.
 * @steps : Array of object of type "IStep" which has labels, descriptions, icon and JSX Content
 * @finalContent : Object which contains a final JSX elements after all the steps have been completed, as well as a function which'll be executed after a click on the final button
 * @baseProps : Props that are part of the base component "Steps"; more info here: https://github.com/jeanverster/chakra-ui-steps
 *
 */

export const Progress = ({ steps, finalContent, baseProps }: IProgress) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  //TODO: Modificar los "Buttons" por los botones del template de componente.
  return (
    <Flex flexDir={"column"} width="100%">
      <Steps activeStep={activeStep} {...baseProps} colorScheme="purple">
        {steps.map((step) => (
          <Step
            label={step.label}
            key={step.label}
            icon={step.icon}
            description={step.description}
          >
            {step.content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length && finalContent ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          {finalContent.finishedContent}
          <Button mx="auto" mt={6} size="sm" onClick={finalContent.onFinished}>
            Continuar
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          {activeStep < steps.length && (
            <>
              {" "}
              <Button
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
              >
                Anterior
              </Button>
              <Button size="sm" onClick={nextStep}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};
