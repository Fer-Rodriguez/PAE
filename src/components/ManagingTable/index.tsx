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
//  Hook to create the table data model
import { useTable } from "react-table";
// Component interface
import { IManagingTable } from "../../interfaces";

// Local interface

/*
interface I{

}
*/

/*
 * ManagingTable: Tabla utilizada en múltiples pantallas de administración de datos del sistema.
 *   IManagingTable:
 *       @columns : Arreglo que contiene los headers para las columnas de la tabla. Más información: https://react-table.tanstack.com/docs/api/useTable#table-options
 *       @data : Arreglo "memoized" que contiene los datos a insertar las celdas de la tabla. Más información: https://react-table.tanstack.com/docs/api/useTable#table-options
 *       @headColor: color para la cabeza de la tabla
 */
export const ManagingTable = ({ headColor, internalProps }: IManagingTable) => {
  // Properties needed to form the table's data model
  // Further reading: https://react-table.tanstack.com/docs/api/useTable#instance-properties

  /*
  const { getTableProps, getTableBodyProps, flatHeaders, rows, prepareRow } =
    useTable({ columns, data });
*/
  return (
    <TableContainer w="100%" boxShadow="general" borderRadius="general">
      <Table variant="simple" {...internalProps.getTableProps()}>
        <Thead background={headColor}>
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
