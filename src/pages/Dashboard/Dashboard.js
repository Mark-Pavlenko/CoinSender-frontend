import React, { Component, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Button, Container, Typography, Avatar } from '@mui/material';
import Page from '../../components/Page';
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import InfoTable from './components/InfoTable';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import BasicModal from './components/modal';
import { useFormik } from 'formik';
import EmployeesTable from './components/EmployeesTable';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { setUserBalance } from 'src/redux/actions';
import { usePoapLinksSignContract } from 'src/hooks/useContract';
import { useMutation } from 'react-query';
import { buildQuery } from 'src/utils/contracts';
import { tokenSymbol } from 'src/utils';
import * as Yup from 'yup';
import { EmployeeAutocomplete } from './CenterModeCarousel/CenterModeCarousel';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

// ----------------------------------------------------------------------

export const Banking = () => {
  const employees = useSelector(({ employees: { employeeList } }) => employeeList);
  const transfers = useSelector(({ transfers: { transferList } }) => transferList);

  const [currentUser, setCurrentUser] = useState(null);
  //   const [defaultAccount, setDefaultAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [userBalanceState, setUserBalanceState] = useState(null);
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { account, library, chainId } = useWeb3React();

  const userBalance = useSelector(({ AuthUser: { balance } }) => balance);

  const organisations = useSelector(({ organisations: { organisationList, isLoading } }) => ({
    organisationList,
    isLoading,
  }));

  const wallets = useSelector(({ wallets: { walletList, isLoading } }) => ({
    walletList,
    isLoading,
  }));

  const payments = useSelector(({ payments: { paymentList, isLoading, balance } }) => paymentList);

  const {
    multiSendDiffEth: multiSendDiffEthQuery,
    estimateGas: { multiSendDiffEth: multiSendDiffEthEstimate },
  } = usePoapLinksSignContract();

  const data = transfers.map((item) => ({
    ...item,
    name: item?.employee?.name || '',
    second_name: item?.employee?.second_name || 'No data',
  }));

  const {
    data: multiSendDiffEthTx,
    mutateAsync: multiSendDiffEth,
    isLoading: multiSendDiffEthLoading,
  } = useMutation(
    `multiSendDiffEth`,
    ({ employeesWallets, employeesParsedAmounts, value }) =>
      buildQuery(
        multiSendDiffEthQuery,
        [[employeesWallets], [employeesParsedAmounts]],
        multiSendDiffEthEstimate,
        {
          value,
        },
      ),
    {
      onError: (err) => console.log(err, `multiSendDiffEth`),
    },
  );

  useEffect(() => {
    dispatch({ type: 'GET_TRANSFER_LIST' });
    dispatch({ type: 'GET_EMPLOYEE_LIST' });
    dispatch({ type: 'GET_PAYMENT_LIST' });
    setCurrentUser(transfers[0]);
  }, []);

  useEffect(() => setCurrentUser(transfers[0]), [transfers]);

  const employeeHead = [
    { id: 'second_name', label: t('fullName.employee'), alignRight: false },
    { id: 'wallet_id', label: t('wallet.id'), alignRight: false },
    { id: 'amount', label: t('amount'), alignRight: false },
    { id: 'notes', label: t('Notes'), alignRight: false },
    { id: '', label: '', alignRight: false },
  ];

  const organizationHead = [
    { id: 'name', label: t('From'), alignRight: false },
    { id: 'position', label: t('To'), alignRight: false },
    { id: 'value', label: t('Amount'), alignRight: false },
    { id: 'createDateTime', label: t('Date'), alignRight: false },
    { id: 'status', label: t('Status'), alignRight: false },
    { id: 'notes', label: t('Notes'), alignRight: false },
  ];

  const openModal = (value, type) => {
    setIsOpen(value);
    setType(type);
  };

  const closeModal = (value) => {
    setIsOpen(value);
  };

  const handleType = (value) => {
    setType(value);
  };

  const { handleChange, handleSubmit, values, resetForm, handleBlur, errors, touched } = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object().shape({
      amount: Yup.string().matches(/^\d*\.?\d*$/, "Only digits and '.' are allowed"),
    }),
    onSubmit: async (values) => {
      dispatch({
        type: 'ADD_PAYMENT',
        payload: {
          ...values,
          description: 'Some description',
          status: 'Pending',
          organization_wallet_id: organisations.organisationList[0].wallet_id,
          payer_secret_id: organisations.organisationList[0].wallet_secret_id,
        },
      });
      resetForm();
      const balance = await library.getBalance(account);
      dispatch(setUserBalance(formatEther(balance.toString())));
    },
  });

  const getAccountInfo = async () => {
    if (!account) {
      toast.error('Connect metamask!');
      return;
    }
    if (+userBalance >= +values.amount) {
      if (values.amount == 0) {
        toast.error('Value must not be 0');
        return;
      }
      try {
        if (currentUser) {
          const employeesWallets = currentUser.wallet_id;
          const employeesParsedAmounts = parseUnits(values.amount.toString(), 18);
          const value = parseUnits(values.amount, 18);
          const tx = await multiSendDiffEth({ employeesWallets, employeesParsedAmounts, value });

          const receipt = await tx.wait();

          dispatch({
            type: 'ADD_PAYMENT',
            payload: receipt.transactionHash,
            transfers: [currentUser.transfer_id],
            wallet: account,
          });
          setTimeout(async () => {
            const balance = await library.getBalance(account);
            dispatch(setUserBalance(formatEther(balance.toString())));
          }, 20000);
        }
      } catch (e) {
        toast.error('Rejected');
      }
    } else {
      toast.error('Not enough funds!');
    }
  };

  return (
    <Page title="Dashboard | CoinSender">
      <PageLayout>
        <Grid container>
          <Grid item xs={12}>
            <BasicModal handleClose={closeModal} open={isOpen} />
          </Grid>
        </Grid>
        <Stack>
          <PageTitle title="" />
          <Stack mb={3}>
            <Typography sx={{ px: 0, mb: 2, fontSize: '16px', fontWeight: '500' }} variant="h6">
              {t('Transfers')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={12} xs={12}>
                <EmployeesTable
                  type="emp"
                  userBalance={userBalance}
                  handlerType={handleType}
                  handler={openModal}
                  data={data}
                  employees={employees}
                  wallets={wallets.walletList}
                  tableHead={employeeHead}
                  wallet={account}
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack mt={10} mb={3}>
            <Grid container spacing={3}>
              <Grid item lg={12} xs={12}>
                <Typography sx={{ px: 0, py: 2, fontSize: '16px', fontWeight: 500 }} variant="h6">
                  {t('Latest transfers')}
                </Typography>
                <InfoTable
                  type="org"
                  isLoading={organisations.isLoading}
                  handler={openModal}
                  data={payments.slice(-5)}
                  pagination={false}
                  tableHead={organizationHead}
                  wallets={wallets.walletList}
                />
              </Grid>
            </Grid>
          </Stack>
          {/*<Stack>*/}
          {/*  <Grid container spacing={3}>*/}
          {/*    <Grid item lg={8} xs={12}>*/}
          {/*      <RecentTransaction*/}
          {/*        wallets={wallets.walletList}*/}
          {/*        data={payments.paymentList}*/}
          {/*      />*/}
          {/*    </Grid>*/}
          {/*  </Grid>*/}
          {/*</Stack>*/}
        </Stack>
      </PageLayout>
    </Page>
  );
};
