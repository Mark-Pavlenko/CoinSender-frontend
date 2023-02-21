import { filter } from 'lodash';
import React, { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Box,
  TableHead,
} from '@mui/material';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { filterRequests } from '../../../commonHelpers/commonHelpers';
import { useSelector } from 'react-redux';
import { Row } from './row';
import { visuallyHidden } from '@mui/utils';
import CircularProgress from '@mui/material/CircularProgress';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function InfoTable({ tableHead, data, handler, type, wallets, pagination }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterTechnology] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filtering] = useState([]);

  const isLoading = useSelector(({ payments: { isLoading } }) => isLoading);

  const checkedRequests = filterRequests(data || [], filtering);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - checkedRequests.length) : 0;

  const filteredUsers = applySortFilter(
    checkedRequests,
    getComparator(order, orderBy),
    filterTechnology,
  );

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Stack p={2} direction="row" justifyContent="space-between" alignItems="center"></Stack>
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      hideSortIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box sx={{ ...visuallyHidden }}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { name } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <Row
                        wallets={wallets}
                        selected={isItemSelected}
                        handleClick={handleClick}
                        row={row}
                        key={row.id}
                      />
                    );
                  })}
              </TableBody>
            )}
            {isLoading && (
              <TableBody>
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell sx={{ py: 5 }} align="center" colSpan={6}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
            {filteredUsers.length === 0 && !isLoading && (
              <TableBody>
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {pagination ? (
          <Stack>
            <TablePagination
              sx={{
                '.MuiTablePagination-displayedRows': {
                  margin: 0,
                },
                '.MuiTablePagination-selectLabel': {
                  margin: 0,
                },
              }}
              page={page}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 15, 20]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        ) : null}
      </Scrollbar>
    </Card>
  );
}
