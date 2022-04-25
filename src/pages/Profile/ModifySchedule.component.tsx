//Libraries
import { ChangeEvent } from "react";
import { Center, Heading, Box, Button, useToast } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

//Components
import { ButtonGeneric } from "../../components/Button";
import { DropDown } from "../../components/Dropdown";
import { MyCalendar } from "../../components/Calendar";

//Interfaces, Types & Enums
import { EMyCalendarView, ETypeDropdown } from "../../interfaces/enums";
import { IConfigurationsDropdown, IObjectData } from "../../interfaces/index";

//Assets
import theme from "../../theme";

interface IModifySchedulesContent {
  setPeriod: React.Dispatch<number>;
  setModeSchedules: React.Dispatch<boolean>;
  period: number;
  mobile?: boolean;
}

export const ModifySchedulesContent = ({
  setPeriod,
  setModeSchedules,
  period,
  mobile = false,
}: IModifySchedulesContent) => {
  const toast = useToast();

  const periodOptions: Array<IObjectData> = [
    {
      title: "Primer Periodo",
      value: 0,
    },
    {
      title: "Segundo Periodo",
      value: 1,
    },
    {
      title: "Tercer Periodo",
      value: 2,
    },
  ];

  const configurations: IConfigurationsDropdown = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      setPeriod(Number(e.target.value));
    },
    placeholder: "Selecciona el periodo",
    type: ETypeDropdown.three,
  };
  return (
    <Box p={6}>
      <Center>
        <Button
          variant="ghost"
          size={"sm"}
          onClick={() => setModeSchedules(false)}
        >
          <ChevronLeftIcon w={8} h={8} />
        </Button>
        <Heading color={theme.colors.purple}>Modificar Horarios</Heading>
      </Center>
      <Center>
        <Box w={mobile ? "70vw" : "30vw"} my={6}>
          <DropDown configuration={configurations} options={periodOptions} />
        </Box>
      </Center>
      <MyCalendar view={EMyCalendarView.week} />
      <Center margin={12}>
        <ButtonGeneric
          text="Guardar"
          color={theme.colors.purple}
          fontColor="white"
          onClick={() =>
            toast({
              title: "¡Listo!",
              description: "El Horario se ha guardado con éxito.",
              position: "top",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
        />
      </Center>
    </Box>
  );
};
