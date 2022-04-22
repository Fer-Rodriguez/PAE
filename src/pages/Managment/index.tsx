//tmp
import { useMemo } from "react";
import { Cell, useTable } from "react-table";

import {
  Flex,
  IconButton,
  Input,
  Box,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
  createIcon,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { ManagingTable } from "../../components/ManagingTable";
import { ButtonGeneric } from "../../components/Button";
import { Filter } from "../../assets/Filter";

/*

Props que se necesitarán:

header : indica el título de la página de administración
mobile : es vista movil?

tableHeaderColor : color del header
columns : columnas del 

*/

export const Managment = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
      },

      {
        Header: "Asesor",
        accessor: "assessor",
      },

      {
        Header: "Asesorado",
        accessor: "student",
      },

      {
        Header: "Class",
        accessor: "class",
      },

      {
        Header: "Estatus",
        accessor: "status",
      },

      {
        Header: "",
        accessor: "button",
        Cell: (cell: Cell<any, any>) => (
          <ButtonGeneric text="Detalles" color="blue"></ButtonGeneric>
        ),
      },
    ],
    []
  );

  const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return arr;
  };

  const mockData = () => {
    return {
      date: "16/01/2022 12:30",
      assessor: "Julian Martinez",
      student: "Daniela Ordan",
      class: "Electromagnetismo",
      status: "Completada",
    };
  };

  function makeData(howMany: number) {
    return range(howMany).map(() => {
      return {
        ...mockData,
      };
    });
  }
  const data = useMemo(() => makeData(10), []);

  // Vamos a separar esto del componente de la tabla. Pasar solo lo que necesitas a la ManagingTable
  const { getTableProps, getTableBodyProps, flatHeaders, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Flex marginBottom="5vh" justifyContent="space-between">
        <Flex gap="10%" w="55%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              borderRadius="general"
              boxShadow="general"
              type="search"
              placeholder="Buscar asesorado..."
            />
          </InputGroup>
          <IconButton icon={<Icon as={Filter}></Icon>} aria-label="Filtros" />
        </Flex>
        <Heading>Asesorías</Heading>
      </Flex>
      <Flex>
        <ManagingTable
          columns={columns}
          data={data}
          headColor="pink"
        ></ManagingTable>
      </Flex>
    </>
  );
};
