/* eslint-disable @typescript-eslint/ban-types */
//Chakra Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import {
  ColumnInstance,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
  TablePropGetter,
  TableProps,
} from "react-table";

import { IManagingTableInternal } from "../../interfaces";

/**
 * ManagingTable: Tabla utilizada en múltiples pantallas de administración de datos del sistema.
 */
export const ManagingTable = (internalProps: IManagingTableInternal) => {
  return (
    <TableContainer w="100%" boxShadow="general" borderRadius="general">
      <Table variant="simple" {...internalProps.getTableProps()}>
        <Thead background={internalProps.headColor}>
          <Tr>
            {internalProps.flatHeaders.map((header) => (
              <Th textAlign="center" color="white" {...header.getHeaderProps()}>
                {header.render("Header")}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody {...internalProps.getTableBodyProps()}>
          {internalProps.rows.map((row) => {
            internalProps.prepareRow(row);
            return (
              <Tr
                borderBottom="2px solid #8963DA"
                sx={{ ":last-child": { borderBottom: "none" } }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td textAlign="center" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
