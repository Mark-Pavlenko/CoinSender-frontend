import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// material
import { Stack, Container, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import { Box, Grid } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { NEW_TECHNIQUE } from '../../constants/routes';
import Iconify from '../../components/Iconify';
import ChangeModal from './components/ChangeModal';
import { useFormik } from 'formik';

// ----------------------------------------------------------------------

export const EditInvoice = () => {
  const [currentFirstReceiver, setCurrentFirstReceiver] = useState(1);
  const [currentSecondReceiver, setCurrentSecondReceiver] = useState(2);
  const [details, setDetails] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
  const [type, setType] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');

  const { handleChange, handleSubmit, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {},
    onSubmit: (values) => {},
  });

  const invoice = [
    {
      id: 1,
      name: 'Anton Ishchenko',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4961',
    },
    {
      id: 2,
      name: 'Dima Yusov',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4962',
    },
    {
      id: 3,
      name: 'Sasha Mykhailovkyi',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4963',
    },
    {
      id: 4,
      name: 'Mark Pavlenko',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4964',
    },
    {
      id: 5,
      name: 'Artem Nuss',
      address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phone: '365-374-4965',
    },
  ];

  const openModal = ({ currentTarget: { id } }) => {
    setType(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeFirstReceiver = () => {
    const actualInvoice = invoice.find(({ id }) => id === currentFirstReceiver);
    return (
      <>
        <Stack sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{actualInvoice.name || ''}</Stack>
        <Stack>{actualInvoice.address || ''}</Stack>
        <Stack>Phone: {actualInvoice.phone || ''}</Stack>
      </>
    );
  };
  const changeSecondReceiver = () => {
    const actualInvoice = invoice.find(({ id }) => id === currentSecondReceiver);
    return (
      <>
        <Stack sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{actualInvoice.name || ''}</Stack>
        <Stack>{actualInvoice.address || ''}</Stack>
        <Stack>Phone: {actualInvoice.phone || ''}</Stack>
      </>
    );
  };

  const addNewDetail = () => {
    setDetails([...details, { id: details[details.length - 1].id + 1 }]);
  };

  const removeDetail = ({ target: { id } }) => {
    if (details.length === 1) {
      return;
    } else {
      setDetails(details.filter((detail) => detail.id != id));
    }
  };

  const statusItems = [
    { label: t('paid'), value: 'paid' },
    { label: t('unpaid'), value: 'unpaid' },
    { label: t('overdue'), value: 'overdue' },
    { label: t('draft'), value: 'draft' },
  ];

  const serviceTypeItems = [
    { label: 'Full Stack Development', value: 'fullStack' },
    { label: 'Backend Development', value: 'backend' },
    { label: 'UI Design', value: 'ui' },
    { label: 'UI/UX Design', value: 'uiUx' },
    { label: 'Front End Development', value: 'frontend' },
  ];

  return (
    <Page title="User | Minimal-UI">
      <ChangeModal
        changeFirstReceiver={setCurrentFirstReceiver}
        changeSecondReceiver={setCurrentSecondReceiver}
        invoices={invoice}
        close={closeModal}
        open={isOpen}
        type={type}
      />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t('edit.invoice')}
          </Typography>
        </Stack>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack>
            <Box
              sx={{
                boxShadow:
                  'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                borderRadius: '16px',
                mb: 3,
              }}
            >
              <Grid container>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Stack p={3}>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                      <Stack sx={{ fontSize: '1.125rem', fontWeight: 700 }}>{t('from')}:</Stack>
                      <Stack
                        sx={{ cursor: 'pointer' }}
                        color="#FD9B28"
                        direction="row"
                        alignItems="center"
                        gap={1}
                        id="from"
                        onClick={openModal}
                      >
                        <Button startIcon={<Iconify icon="eva:edit-fill" />}>{t('change')}</Button>
                      </Stack>
                    </Stack>
                    <Stack spacing={1}>{changeFirstReceiver(currentFirstReceiver)}</Stack>
                  </Stack>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Stack p={3}>
                    <Stack direction="row" justifyContent="space-between" mb={2}>
                      <Stack sx={{ fontSize: '1.125rem', fontWeight: 700 }}>{t('to')}:</Stack>
                      <Stack
                        sx={{ cursor: 'pointer' }}
                        color="#FD9B28"
                        direction="row"
                        alignItems="center"
                        gap={1}
                        id="to"
                        onClick={openModal}
                      >
                        <Button startIcon={<Iconify icon="eva:edit-fill" />}>{t('change')}</Button>
                      </Stack>
                    </Stack>
                    <Stack spacing={1}>
                      <Stack spacing={1}>{changeSecondReceiver(currentSecondReceiver)}</Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Stack p={3} pb={3} sx={{ background: 'rgb(237,238,238)' }}>
                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <TextField
                      disabled
                      fullWidth
                      name="invoiceNumber"
                      onChange={handleChange}
                      value={values['invoiceNumber'] || ''}
                      label={t('invoice.number')}
                    />
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{t('status')}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="status"
                        value={values.status || ''}
                        onChange={({ target: { value } }) => setFieldValue('status', value)}
                        label={t('status')}
                      >
                        {statusItems.map(({ label, value }) => (
                          <MenuItem value={value}>{label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DatePicker
                          disableFuture
                          label={t('date.added')}
                          openTo="year"
                          views={['year', 'month', 'day']}
                          value={new Date()}
                          onChange={(newValue) => {
                            console.log(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DatePicker
                          label={t('finish.date')}
                          openTo="year"
                          views={['year', 'month', 'day']}
                          value={new Date()}
                          onChange={(newValue) => {
                            console.log(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Stack>
              <Stack p={3}>
                <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                  {t('details')}:
                </Stack>
                {details.map(({ id }, index) => (
                  <>
                    <Grid style={{ marginBottom: 2 }} container spacing={2}>
                      <Grid item lg={3} md={3} sm={4} xs={12}>
                        <TextField
                          fullWidth
                          name="title"
                          onChange={(e) => console.log(e.target.value)}
                          value=""
                          label={t('title')}
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={4} xs={12}>
                        <TextField
                          fullWidth
                          name="description"
                          onChange={(e) => console.log(e.target.value)}
                          value=""
                          label={t('description')}
                        />
                      </Grid>
                      <Grid item lg={2} md={2} sm={4} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">{t('service.type')}</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="serviceType"
                            onChange={({ target: { value } }) =>
                              setFieldValue('serviceType', value)
                            }
                            label={t('service.type')}
                          >
                            {serviceTypeItems.map(({ value, label }) => (
                              <MenuItem value={value}>{label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg md sm={4} xs={12}>
                        <TextField
                          fullWidth
                          name={'quantity' + id}
                          value={values['quantity' + id]}
                          onChange={handleChange}
                          label={t('quantity')}
                        />
                      </Grid>
                      <Grid item lg md sm={4} xs={12}>
                        <TextField
                          fullWidth
                          name={'price' + id}
                          value={values['price' + id]}
                          onChange={handleChange}
                          label={t('price')}
                        />
                      </Grid>
                      <Grid item lg md sm={4} xs={12}>
                        <TextField
                          disabled
                          fullWidth
                          name="total"
                          onChange={(e) => console.log(e.target.value)}
                          // value={+values['price' + id] + +values['quantity' + id]}
                          value={+values['price' + id] * +values['quantity' + id] || 0}
                          label={t('total')}
                        />
                      </Grid>
                    </Grid>
                    <Stack mb={3} direction="row" justifyContent="flex-end">
                      <Button
                        onClick={removeDetail}
                        id={id}
                        startIcon={<Iconify icon="eva:trash-2-fill" />}
                      >
                        {t('remove')}
                      </Button>
                    </Stack>
                  </>
                ))}
              </Stack>
              <Stack
                px={3}
                pb={3}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item lg={3} md={3} sm={3} xs={6}>
                    <Stack>
                      <Button onClick={addNewDetail} startIcon={<Iconify icon="eva:plus-fill" />}>
                        {t('add.new.detail')}
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item lg md sm></Grid>
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <Stack>
                      <TextField
                        fullWidth
                        name="discount"
                        onChange={(e) => console.log(e.target.value)}
                        value=""
                        label={t('discount')}
                      />
                    </Stack>
                  </Grid>
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <TextField
                      fullWidth
                      name="taxes"
                      onChange={(e) => console.log(e.target.value)}
                      value=""
                      label={t('taxes')}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Stack height="50px">
                <Button variant="contained">{t('save.as.draft')}</Button>
              </Stack>
              <Stack height="50px">
                <Button variant="contained" type="submit">
                  {t('update.and.send')}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Page>
  );
};

// in.stock
