import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Page from '../../components/Page';
import { Grid } from '@material-ui/core';
import BasicModal from '../Dashboard/components/modal';
import { Button, Container, Stack, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InfoTable from '../Dashboard/components/InfoTable';
import { useTranslation } from 'react-i18next';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

export const Transactions = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('all');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const organisations = useSelector(({ organisations: { organisationList, isLoading } }) => ({
    organisationList,
    isLoading,
  }));

  const wallets = useSelector(({ wallets: { walletList, isLoading } }) => ({
    walletList,
    isLoading,
  }));

  useEffect(() => {
    dispatch({ type: 'GET_PAYMENT_LIST' });
  }, []);

  const payments = useSelector(({ payments: { paymentList, isLoading, balance } }) => ({
    paymentList,
    isLoading,
  }));

  const organizationHead = [
    { id: 'name', label: t('From'), alignRight: false },
    { id: 'position', label: t('To'), alignRight: false },
    { id: 'value', label: t('Amount'), alignRight: false },
    { id: 'createDateTime', label: t('Date'), alignRight: false },
    { id: 'status', label: t('Status'), alignRight: false },
    { id: 'description', label: t('Notes'), alignRight: false },
  ];

  const openModal = (value, type) => {
    setIsOpen(value);
    setType(type);
  };

  const handleInput = ({ target: { value } }) => setInputValue(value);
  const handleSelect = ({ target: { value } }) => setTransactionStatus(value);
  const filterData = (array) => {
    if (array.length > 0) {
      return array
        .filter(
          ({ amount, createDateTime, employee }) =>
            amount.toString().includes(inputValue) ||
            createDateTime.includes(inputValue) ||
            employee?.name.includes(inputValue) ||
            employee?.second_name.includes(inputValue) ||
            (employee?.name + ' ' + employee?.second_name).includes(inputValue),
        )
        .filter((item) => {
          if (transactionStatus === 'all') {
            return item;
          }
          return item?.payment?.status === transactionStatus;
        });
    } else {
      return [];
    }
  };

  return (
    <Page title="Transaction | CoinSender">
      <PageLayout>
        <Stack>
          {payments.isLoading ? (
            'Loading...'
          ) : (
            <Grid container spacing={3}>
              <Grid item lg={10} xs={12}>
                <PageTitle title="My transfers" />
                <Grid container spacing={3} style={{ marginBottom: '8px' }}>
                  <Grid item lg={4} xs={12}>
                    <TextField
                      onChange={handleInput}
                      placeholder="Amount or 2022-08-03"
                      fullWidth
                      label={t('Search')}
                    />
                  </Grid>
                  <Grid item lg={3} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">{t('Status')}</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="gender"
                        label={t('Status')}
                        onChange={handleSelect}
                      >
                        <MenuItem value="all">{t('All tranfsers')}</MenuItem>
                        <MenuItem value={true}>{t('Succcess')}</MenuItem>
                        <MenuItem value={false}>{t('Rejected')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <InfoTable
                  type="org"
                  handler={openModal}
                  data={filterData(payments?.paymentList)}
                  tableHead={organizationHead}
                  wallets={wallets.walletList}
                />
              </Grid>
            </Grid>
          )}
        </Stack>
      </PageLayout>
    </Page>
  );
};
