import { useGlobalFilter, useSortBy, useTable } from "react-table";

import { Heading } from "@chakra-ui/react";

import { IManagmentPage, IManagingTableInternal } from "../../interfaces";
import { useState } from "react";
import { ManagmentMobile } from "./Mobile";
import { ManagmentDesktop } from "./Desktop";

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
  } = useTable(
    { columns, data, hiddenColumns: ["id", "id_advisor"] },
    useGlobalFilter,
    useSortBy
  );

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

  const [hideFilters, setHideFilters] = useState(true);
  const onFilterClick = () => setHideFilters(!hideFilters);

  const internalProps: IManagingTableInternal = {
    headColor: headColor,
    getTableProps: getTableProps,
    getTableBodyProps: getTableBodyProps,
    flatHeaders: flatHeaders,
    rows: rows,
    prepareRow: prepareRow,
  };

  const mobileLayout = ManagmentMobile({
    onFilterClick,
    hideFilters,
    handleFilterInputChange,
    header,
    internalProps,
  });

  const desktopLayout = ManagmentDesktop({
    onFilterClick,
    hideFilters,
    handleFilterInputChange,
    header,
    internalProps,
  });

  if (data.length === 0) {
    return <>{noDataView}</>;
  } else {
    return <>{mobile ? mobileLayout : desktopLayout}</>;
  }
};
