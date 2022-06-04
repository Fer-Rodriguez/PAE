import { ChangeEvent } from "react";

import { ETypeDropdown } from "../../interfaces/enums";
import {
  Box,
  Center,
  VStack,
  Image,
  FormControl,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { DropDown } from "../../components/Dropdown";
import { TextInput } from "../../components/TextInput";
//Assets
import imageBasicInfo from "../../assets/appoint_basicInfo.png";
import theme from "../../theme/index";
import { Controller, useForm } from "react-hook-form";
import { FileUploadButton } from "./fileUploadButton";

export const BasicInfoScreen = ({
  mobile,
  onNextScreenButtonClick,
  onDropDownChange,
  onSubjectChange,
  onTextFieldChange,
  onFileUploaded,
  valueForDropDown,
  valueForTextField,
  valueForFileInput,
}: {
  mobile?: boolean;
  onNextScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDropDownChange?: React.Dispatch<string>;
  onSubjectChange?: React.Dispatch<string>;
  onTextFieldChange?: (newValue: string) => void;
  onFileUploaded?: React.Dispatch<File>;
  valueForDropDown?: string;
  valueForTextField?: string;
  valueForFileInput?: File;
}) => {
  //TODO: Remplazar esto con una llamada GET a la base de datos
  const myOptions = [
    {
      title: "Modelación matemática fundamental",
      value: "f7d6a2f4-4ac2-4323-8039-d082c270b1a4",
    },
    {
      title: "Programación Orientada a Objetos",
      value: "352c0bf1-2782-4bf8-9fbf-6b75d852ee7e",
    },
  ];

  const {
    control,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <>
      {" "}
      <Text color="grey" as="i">
        ¿Qué tema quieres tratar en la asesoría?
      </Text>
      <br></br>
      <br></br>
      <FormControl isRequired isInvalid={!isValid}>
        <VStack spacing="50px" alignItems={mobile ? "center" : "start"}>
          <Box w="40%">
            <Controller
              name="idSubject"
              control={control}
              rules={{
                required: "No puedes dejar la materia vacía",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <DropDown
                    isInvalid={Boolean(error)}
                    options={myOptions}
                    configuration={{
                      onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                        //TODO: Darle focus al text in
                        onChange(e);
                        const currentSubject = e.target.options.item(
                          e.target.options.selectedIndex
                        )?.title;
                        if (currentSubject !== undefined) {
                          onSubjectChange?.(currentSubject);
                        }
                        onDropDownChange?.(e.target.value);
                      },
                      placeholder: "Seleccionar materia",
                      type: ETypeDropdown.normal,
                    }}
                    value={value}
                    color={theme.colors.pink}
                    fontColor="white"
                    borderRadius={theme.radii.button}
                  />
                  {error ? (
                    <FormErrorMessage>{error?.message}</FormErrorMessage>
                  ) : (
                    <></>
                  )}
                </>
              )}
              defaultValue={valueForDropDown}
            ></Controller>
          </Box>
          <Controller
            name="problemDescription"
            control={control}
            rules={{
              required:
                "Por favor proporciona una descripción al problema que quieres tratar en la asesoría",
              pattern: {
                value: /^(?!\s*$).+/,
                message: `La descripción no puede estar vacía`,
              },
            }}
            defaultValue={valueForTextField}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  isInvalid={Boolean(error)}
                  multiLine
                  placeholderText="Escribe aquí el problema en cuestión"
                  width={mobile ? "85%" : "100%"}
                  value={value}
                  onChangeArea={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    onChange(e);
                    onTextFieldChange?.(e.target.value);
                  }}
                />
                {error ? (
                  <FormErrorMessage>{error?.message}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </>
            )}
          ></Controller>
          <FileUploadButton
            currentFile={valueForFileInput}
            onChange={onFileUploaded}
          ></FileUploadButton>
        </VStack>
        <Center w="100%">
          <ButtonGeneric
            bgColor="pink"
            sizePX=""
            text="Siguiente"
            isDisabled={!isValid}
            onClick={onNextScreenButtonClick}
          ></ButtonGeneric>
        </Center>
        <Box w="40%">
          <Image
            maxW={mobile ? "30%" : "20%"}
            bottom="0%"
            right="0%"
            zIndex="2"
            objectFit="contain"
            position="absolute"
            float="right"
            src={imageBasicInfo}
          />
        </Box>
      </FormControl>
    </>
  );
};
