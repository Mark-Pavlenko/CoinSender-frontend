import { filter } from 'lodash';
import React, { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableSortLabel,
  Box,
} from '@mui/material';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { filterRequests } from '../../commonHelpers/commonHelpers';
import { useTranslation } from 'react-i18next';
import { visuallyHidden } from '@mui/utils';

export default function RecentTransaction({ data, wallets }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterTechnology, setFilterTechnology] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filtering, setFiltering] = useState([]);

  const { t } = useTranslation('common');

  const TABLE_HEAD = [
    { id: 'name', label: t('description'), alignRight: false },
    { id: 'position', label: t('date'), alignRight: false },
    { id: 'language', label: t('amount'), alignRight: false },
    { id: 'HR', label: t('status'), alignRight: false },
    { id: '', label: '' },
  ];

  const findWallet = (id) => {
    const wallet = wallets.find(({ wallet_id }) => wallet_id === id);
    if (wallet) {
      return wallet.name;
    }
  };

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

  const checkedRequests = filterRequests(data, filtering);
  //--------------------------------------------

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - checkedRequests.length) : 0;

  const filteredUsers = applySortFilter(
    checkedRequests,
    getComparator(order, orderBy),
    filterTechnology,
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card sx={{ borderRadius: '0 0 5px 5px' }}>
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'rgb(237,238,238)' }}>
                {TABLE_HEAD.map((headCell) => (
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
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, wallet_id, name, createDateTime, status, description, avatarUrl } =
                    row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={avatarUrl} />
                          <Stack direction="column">
                            <Stack>Payment for:</Stack>
                            <Typography variant="subtitle2" noWrap>
                              {findWallet(wallet_id) || 'Loading...'}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="column">
                          <Typography variant="subtitle2" noWrap>
                            {createDateTime.split('T')[0]}
                          </Typography>
                          <Stack> {createDateTime.split('T')[1].slice(0, 5)}</Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" noWrap>
                          {description}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="subtitle2" noWrap>
                          {status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterTechnology} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
