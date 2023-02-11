import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import ListTeam from '../components/ListTeam';

// Generate Order Data
function createData(
  _id: string,
  name: string,
  department: string,
  source_repo: string,
  createdat: string,
) {
  return { _id, name, department, source_repo, createdat };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {

  function testing() {
    let test = ListTeam()
    console.log(test)
    //const rows = [
    //  createData(test[0]._id, test[0].name, test[0].department, test[0].source_repo, test[0].createdat),
    //];

    console.log(test)
    return test
  }

  testing()

  return (
   <React.Fragment>
      <Title>Teams</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((rows) => (
            <TableRow key={rows.id}>
              <TableCell>{rows.date}</TableCell>
              <TableCell>{rows.name}</TableCell>
              <TableCell>{rows.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Teams
      </Link>
    </React.Fragment>
  );
}
