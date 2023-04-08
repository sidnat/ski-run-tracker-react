import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const BasicTable = (props) => {
  const { config } = props
  const { headers, rows } = config
  const [sortDirection, setSortDirection] = React.useState('DESC');

  const toggleSortDirection = (field, onSort) => {
    const tempSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC'
    setSortDirection(prevState => prevState === 'ASC' ? 'DESC' : 'ASC')
    onSort(field, tempSortDirection)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.entries(headers).map(([key, value]) => {
              return (
                <TableCell>
                  {key}
                  {value.onSort && <IconButton onClick={() => toggleSortDirection(key, value.onSort)}><MenuIcon /></IconButton>}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            console.log('row', row)
            return (
              <TableRow key={index} >
                {Object.values(headers).map((headerOptions) => (
                  <TableCell key={headerOptions.key} scope="row">
                    {row[headerOptions.key]}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

export default BasicTable

// run name
// run counter