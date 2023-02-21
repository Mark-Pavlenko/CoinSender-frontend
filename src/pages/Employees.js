import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
import Page from '../components/Page';
import { BlogPostCard } from './Employees/components/BlogPostCard';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { sortStringValuesTwoWays } from '../commonHelpers/commonHelpers';
import TablePagination from '@mui/material/TablePagination';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { NEW_EMPLOYEES } from '../constants/routes';
import Iconify from '../components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import { CardComponent } from 'src/components/Card';

export default function Employees() {
  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = React.useState('az');
  const [isOpen, setIsOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  const employees = useSelector(({ employees: { employeeList } }) => employeeList);
  const isLoading = useSelector(({ employees: { isLoading } }) => isLoading);
  const dispatch = useDispatch();

  const { t } = useTranslation('common');

  useEffect(() => {
    dispatch({ type: 'GET_EMPLOYEE_LIST' });
  }, []);

  const sortedEmployees = sortStringValuesTwoWays(employees, value);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: '',
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

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
    <Page title="Employees | CoinSender">
      <PageLayout>
        <ConfirmDeleteModal id={deleteUserId} open={isOpen} close={handleClose} type="employee" />
        <Stack>
          <Box sx={{ pb: 5 }}>
            <Container sx={{ display: 'flex', padding: '0!important' }}></Container>
            <PageTitle title="Employees" button_name="Add employee" button_route={NEW_EMPLOYEES} />
            {employees.length === 0 && !isLoading ? (
              <Typography mt="20%" textAlign="center" variant="subtitle2">
                You haven't created an employee yet.
              </Typography>
            ) : (
              <>
                <Grid mb={3} container spacing={4}>
                  {employees &&
                    sortedEmployees
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item) => (
                        <CardComponent
                          handleOpen={handleOpen}
                          key={item.id}
                          item={item}
                          isEmployee={true}
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
                  {!isLoading && employees.length > 0 && (
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
                        count={employees.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[6, 12, 24]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage={t('rows.per.page')}
                        labelDisplayedRows={({ from, to, count }) =>
                          `${from}-${to} ${t('of').toLowerCase()} ${count}`
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Box>
        </Stack>
      </PageLayout>
    </Page>
  );
}
