import { filter } from 'lodash';
import React, { useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Scrollbar from '../../../components/Scrollbar';
import { filterRequests } from '../../../commonHelpers/commonHelpers';
import { useTranslation } from 'react-i18next';
import { TextField, InputAdornment } from '@mui/material';
import { Grid } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';

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

export default function InvoiceTable({ data }) {
  const [order] = useState('asc');
  const [orderBy] = useState('name');
  const [filterTechnology] = useState('');
  const [filtering] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const StatusChip = styled(Stack)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '12px',
    width: '84px',
    height: '25px',
    textAlign: 'center',
    borderRadius: '4px',
  });

  const columns = [
    { field: 'invoice_number', headerName: 'Invoice No', flex: 1 },
    { field: 'company_name_client', headerName: 'Partner', flex: 1 },
    {
      field: 'amount_total',
      headerName: 'Amount',
      type: 'number',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'due_date',
      headerName: 'Data Added',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          new Date(params.row.due_date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }) || 'No data'
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        return params.row.status ? (
          <StatusChip
            sx={{
              background: '#4ACD7F',
            }}
          >
            Sent
          </StatusChip>
        ) : (
          <StatusChip
            sx={{
              background: '#D8D8D8',
            }}
          >
            Draft
          </StatusChip>
        );
      },
    },
  ];

  const checkedRequests = filterRequests(data, filtering);

  const filteredUsers = applySortFilter(
    checkedRequests,
    getComparator(order, orderBy),
    filterTechnology,
  );

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value.toLowerCase());
  };

  const invoices = filteredUsers.filter(
    ({ invoice_number, company_name_client }) =>
      invoice_number.toString().toLowerCase().includes(searchValue) ||
      company_name_client.toLowerCase().includes(searchValue),
  );

  return (
    <Card sx={{ borderRadius: '0 0 5px 5px' }}>
      <Stack>
        <Stack p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="search"
                onChange={handleSearch}
                label={t('search')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Scrollbar>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            disableColumnMenu={true}
            rows={invoices}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableMultipleSelection={true}
            onRowClick={({ row: { invoice_number } }) => navigate(`${invoice_number}`)}
            components={{
              NoRowsOverlay: () => (
                <Stack height="100%" width="100%" justifyContent="center" alignItems="center">
                  <Typography variant="subtitle2">You haven't created an invoice yet.</Typography>
                </Stack>
              ),
            }}
          />
        </div>
      </Scrollbar>
    </Card>
  );
}
