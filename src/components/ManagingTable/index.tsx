//Chakra Components
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'
//  Hook to create the table data model
import { useTable } from 'react-table'
// Component interface
import { IManagingTable } from '../../interfaces'

/*
* ManagingTable: Tabla utilizada en múltiples pantallas de administración de datos del sistema.
*   IManagingTable:
*       @columns : Arreglo que contiene los headers para las columnas de la tabla. Más información: https://react-table.tanstack.com/docs/api/useTable#table-options
*       @data : Arreglo "memoized" que contiene los datos a insertar las celdas de la tabla. Más información: https://react-table.tanstack.com/docs/api/useTable#table-options
*/
export const ManagingTable = ({columns, data}: IManagingTable) => {

    // Properties needed to form the table's data model
    // Further reading: https://react-table.tanstack.com/docs/api/useTable#instance-properties
    const {
        getTableProps,
        getTableBodyProps,
        flatHeaders,
        rows,
        prepareRow
    } = useTable({columns, data})

    return (

        <TableContainer boxShadow="general" borderRadius="general">
            <Table variant='simple' {...getTableProps()}>
                <Thead background="pink">
                    
                    <Tr>
                        {flatHeaders.map(header => (
                            <Th textAlign="center" color="white" {...header.getHeaderProps()}>
                                {header.render('Header')}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <Tr borderBottom="2px solid #8963DA" sx={{':last-child': {borderBottom: "none"}}} {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <Td  textAlign="center" {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                    })
                                }
                            </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
        
    )
}