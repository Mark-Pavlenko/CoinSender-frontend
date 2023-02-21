import { Grid, Container, Typography, Stack, Button } from '@mui/material';
import Page from '../components/Page';
import React, { useEffect, useState } from 'react';
// import Sorting from '../sections/@dashboaxrd/products/Sorting';
import { sortStringValuesTwoWays } from '../commonHelpers/commonHelpers';
import TablePagination from '@mui/material/TablePagination';
import { Link as RouterLink } from 'react-router-dom';
import { NEW_CLIENT } from '../constants/routes';
import Iconify from '../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import { BlogPostCard } from './Employees/components/BlogPostCard';
import { CardComponent } from 'src/components/Card';
// import BlogPostCard from './Clients/components/BlogPostCard';

export default function Employees() {
  const [value, setValue] = React.useState('az');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  const clients = useSelector(({ employees: { clientList } }) => clientList);
  const isLoading = useSelector(({ employees: { isLoading } }) => isLoading);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    dispatch({ type: 'GET_CLIENT_LIST', payload: currentUser.organization_id });
  }, []);

  const sortedEmployees = sortStringValuesTwoWays(clients, value);

  const handleOpen = (id) => {
    setIsOpen(true);
    setDeleteUserId(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Partners | CoinSender">
      <PageLayout>
        <ConfirmDeleteModal id={deleteUserId} open={isOpen} close={handleClose} type="employee" />
        <Stack>
          <Container sx={{ display: 'flex', padding: '0!important' }}></Container>
          <PageTitle title="Customers" button_name="Add partner" button_route={NEW_CLIENT} />
          {clients.length === 0 && !isLoading ? (
            <Typography mt="20%" textAlign="center" variant="subtitle2">
              You haven't created an partner yet.
            </Typography>
          ) : (
            <>
              <Grid mb={3} container spacing={4}>
                {clients &&
                  sortedEmployees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <CardComponent
                        handleOpen={handleOpen}
                        key={item.id}
                        item={item}
                        isPartner={true}
                      />
                    ))}
              </Grid>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-end"
                justifyContent="center"
              >
                {!isLoading && clients.length > 0 && (
                  <Grid item xs={3}>
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
                      count={clients.length}
                      rowsPerPage={rowsPerPage}
                      onPageChange={handleChangePage}
                      rowsPerPageOptions={[6, 12, 24]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage="Rows per page"
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${'of'} ${count}`}
                    />
                  </Grid>
                )}
              </Grid>
            </>
          )}
        </Stack>
      </PageLayout>
    </Page>
  );
}
