import { filter } from 'lodash';
import React, { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Box,
  Toolbar,
  Tooltip,
  Grid,
  TableHead,
  IconButton,
  AlertTitle,
  Alert,
  Modal,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { filterRequests } from '../../../commonHelpers/commonHelpers';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { visuallyHidden } from '@mui/utils';
import { toast } from 'react-toastify';
import { EmployeeRow } from './employeeRow';
import { ethers } from 'ethers';
import CircularProgress from '@mui/material/CircularProgress';
import { setUserBalance } from 'src/redux/actions';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { useWeb3React } from '@web3-react/core';
import { usePoapLinksSignContract } from 'src/hooks/useContract';
import { useMutation } from 'react-query';
import { buildQuery } from 'src/utils/contracts';
import { tokenSymbol } from 'src/utils';
import { BASE_URL } from 'src/services';

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

export default function EmployeesTable({
  tableHead,
  type,
  handler,
  wallets,
  data,
  wallet,
  userBalance,
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [filterTechnology, setFilterTechnology] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filtering, setFiltering] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const { account, library, chainId } = useWeb3React();

  const isLoading = useSelector(({ employees: { isLoading } }) => isLoading);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 2,
  };
  const {
    multiSendDiffEth: multiSendDiffEthQuery,
    estimateGas: { multiSendDiffEth: multiSendDiffEthEstimate },
  } = usePoapLinksSignContract();

  const { mutateAsync: multiSendDiffEth } = useMutation(
    `multiSendDiffEth`,
    ({ employeesWallets, employeesParsedAmounts, value }) =>
      buildQuery(
        multiSendDiffEthQuery,
        [employeesWallets, employeesParsedAmounts],
        multiSendDiffEthEstimate,
        {
          value,
        },
      ),
    {
      onError: (err) => console.log(err, `multiSendDiffEth`),
    },
  );

  const openModal = () => {
    handler(true, type);
  };

  const checkedRequests = filterRequests(data || [], filtering);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const isUserNotFound = filteredUsers.length === 0;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const getAccountInfo = async () => {
    if (!account) {
      toast.error('Connect metamask!');
      return;
    }
    if (userBalance === 0 || userBalance < totalAmount) {
      toast.error('Not enough funds!');
      return;
    }
    const employeesWallets = selected.map(({ wallet_id }) => wallet_id);
    const employeesParsedAmounts = selected.map(({ amount }) =>
      ethers.utils.parseUnits(amount.toString(), 18),
    );
    const employeesTotalAmounts = selected
      .map(({ amount }) => +amount)
      .reduce(function (a, b) {
        return a + b;
      })
      .toString();

    const value = parseUnits(employeesTotalAmounts, 18);

    const tx = await multiSendDiffEth({ employeesWallets, employeesParsedAmounts, value });
    const receipt = await tx.wait();
    dispatch({
      type: 'ADD_PAYMENT',
      payload: receipt.transactionHash,
      transfers: selected.map(({ transfer_id }) => transfer_id),
      wallet,
    });
    setTimeout(async () => {
      const balance = await library.getBalance(account);
      dispatch(setUserBalance(formatEther(balance.toString())));
    }, 20000);
  };

  const totalAmount =
    selected.length > 0
      ? selected
          .map(({ amount }) => +amount)
          .reduce(function (a = 0, b = 0) {
            return a + b;
          })
          .toString()
      : 0;

  return (
    <Card sx={{ height: '100%' }}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={style}>
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            You can download an example file —
            <strong>
              <a
                rel="noreferrer"
                href={`${BASE_URL}/transfers/example-download.xlsx`}
                target="_blank"
                download
              >
                here
              </a>
            </strong>
            .
          </Alert>
          <Stack mt={2}>
            <Button variant="contained" component="label" sx={{ width: '30%' }}>
              Upload File
              <input
                onChange={({ target: { files } }) => {
                  dispatch({ type: 'UPLOAD_TRANSFERS', payload: files });
                  setOpen(false);
                }}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                hidden
              />
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Grid container p={2} justifyContent="space-between" alignItems="center">
        <Grid item container md={9} gap={2}>
          <Button variant="contained" component="label" onClick={() => setOpen(true)}>
            Upload File
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: 'IMPORT_TRANSFERS_SAGA' })}
            component="label"
          >
            Import from employees
          </Button>
          <Button onClick={openModal} variant="contained">
            {t('add')}
          </Button>
          <Button
            onClick={getAccountInfo}
            sx={{ color: 'white', textTransform: 'none' }}
            variant="contained"
            color="success"
            disabled={totalAmount == 0}
          >
            Make a transfer
          </Button>
        </Grid>
        <Grid pt={1} textAlign="right" item xs={12} md={3}>
          Total amount: {selected.length > 0 ? totalAmount : 0}{' '}
          {account ? tokenSymbol(chainId) : ''}
        </Grid>
      </Grid>
      <Scrollbar>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
            {selected.length} selected
          </Typography>

          <Tooltip title="Delete">
            <IconButton
              disabled={selected.length === 0}
              onClick={() => {
                dispatch({
                  type: 'DELETE_TRANSFER_MULTI',
                  payload: selected.map((item) => item.id),
                });
                setSelected([]);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                    checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
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
                <></>
              </TableRow>
            </TableHead>
            {!isLoading && (
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = selected.indexOf(row) !== -1;
                    return (
                      <EmployeeRow
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
            {isUserNotFound && !isLoading && (
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 15]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </Scrollbar>
    </Card>
  );
}
