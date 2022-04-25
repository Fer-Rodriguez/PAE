import { useGlobalFilter, useTable } from "react-table";

import {
  Flex,
  IconButton,
  Input,
  Heading,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { ManagingTable } from "../../components/ManagingTable";
import { Filter } from "../../assets/Filter";

import { IManagmentPage } from "../../interfaces";
import { useState } from "react";

/**
 *  Managment: Template page used to display a table and to filter its information through instance-specific filters
 * @columns : Memoized array containing the headers for the table columns. More info: https://react-table.tanstack.com/docs/api/useTable#table-options
 * @data : Memoized array containing the data to fill the table cells. More info: https://react-table.tanstack.com/docs/api/useTable#table-options
 * @header : String representing the header to be displayed on top of the table
 * @headColor : String representing background color for the table head
 * @mobile : Boolean indicating if the page is for mobile or desktop displays
 */

export const Managment = ({
  columns,
  data,
  header,
  headColor,
  mobile,
}: IManagmentPage) => {
  // We obtain the properties necessary to construct a table and use a global filter
  const {
    getTableProps,
    getTableBodyProps,
    flatHeaders,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  // Function to handle changes in the input representing the fobal filter. May be changed or modified to add more logic.
  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };

  // TODO: Hacer esto menos aburrido xd
  const noDataView = (
    <>
      <Heading textAlign="center" margin="0 auto">
        No hay datos de {header.toLowerCase()} disponibles
      </Heading>
    </>
  );

  const [showFilters, setShowFilters] = useState(false);
  const onFilterClick = () => setShowFilters(!showFilters);

  const mobileLayout = (
    <>
      <Flex
        gap="2vh"
        margin="0 auto"
        w="70vw"
        marginBottom="4vh"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading textAlign="center">{header}</Heading>
        <Flex gap="10%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              onChange={handleFilterInputChange}
              borderRadius="general"
              boxShadow="general"
              type="search"
              placeholder="Buscar..."
            />
          </InputGroup>
          <IconButton
            onClick={onFilterClick}
            variant="ghost"
            icon={<Icon as={Filter}></Icon>}
            aria-label="Filtros"
          />
        </Flex>
        <Flex hidden={showFilters} justifyContent="space-between">
          Filtros
        </Flex>
      </Flex>
      <Flex>
        <ManagingTable
          headColor={headColor}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          flatHeaders={flatHeaders}
          rows={rows}
          prepareRow={prepareRow}
        ></ManagingTable>
      </Flex>
    </>
  );
  const desktopLayout = (
    <>
      <Flex marginBottom="5vh" justifyContent="space-between">
        <Flex gap="10%" w="55%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              onChange={handleFilterInputChange}
              borderRadius="general"
              boxShadow="general"
              type="search"
              placeholder="Buscar..."
            />
          </InputGroup>
          <IconButton
            onClick={onFilterClick}
            variant="ghost"
            icon={<Icon as={Filter}></Icon>}
            aria-label="Filtros"
          />
        </Flex>
        <Heading>{header}</Heading>
      </Flex>
      <Flex
        hidden={showFilters}
        marginBottom="5vh"
        justifyContent="space-between"
      >
        Filtros
      </Flex>
      <Flex>
        <ManagingTable
          headColor={headColor}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          flatHeaders={flatHeaders}
          rows={rows}
          prepareRow={prepareRow}
        ></ManagingTable>
      </Flex>
    </>
  );

  if (data.length === 0) {
    return <>{noDataView}</>;
  } else {
    return <>{mobile ? mobileLayout : desktopLayout}</>;
  }
};
