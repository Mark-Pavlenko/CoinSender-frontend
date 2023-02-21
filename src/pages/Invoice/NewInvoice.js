import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// material
import {
  Stack,
  Container,
  Typography,
  Button,
  Divider,
  Autocomplete,
  IconButton,
} from '@mui/material';
// components
import Page from '../../components/Page';
import { Box, Grid } from '@material-ui/core';
import { FormControl, Popover } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Iconify from '../../components/Iconify';
import CustomDate from './components/CustomDate';
import { useFormik, FieldArray, getIn, Form, FormikProvider, Field } from 'formik';
import SearchIcon from '@mui/icons-material/Search';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useWeb3React } from '@web3-react/core';
import ClientModal from './components/ClientModal';
import { formatAddress, tokenSymbol } from 'src/utils';
import ReceiveModal from './components/ReceiveModal';
import useResponsive from 'src/hooks/useResponsive';
import { toast } from 'react-toastify';
import { createInvoiceAction, getInvoiceNumberAction } from 'src/redux/invoices/actions';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// ----------------------------------------------------------------------

export const NewInvoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReceiveModal, setIsOpenReceiveModal] = useState(false);
  const [isDatePickerVisible, SetIsDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, SetIsEndDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selected, setSelected] = useState('');
  const [client, setClient] = useState({ name: '', email: '' });
  const [clients, setClients] = useState([]);
  const [wallet, setWallet] = useState({ id: null, address: '' });
  const [wallets, setWallets] = useState([]);
  const [currencyCoin, setCurrencyCoin] = useState('');
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(true);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const [fiveCoins, setFiveCoins] = useState([]);

  const { t } = useTranslation('common');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const invoiceNumber = useSelector(({ invoices: { invoiceNumber } }) => invoiceNumber);
  const { account, chainId } = useWeb3React();
  const isDesktop = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverIsOpen(false);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value.toLowerCase());
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const ETHCoins = [
    'ETH',
    'DAI',
    'USDC',
    'USDT',
    'AAVE',
    'aDAI',
    'agEUR',
    'ALBT',
    'ANGLE',
    'ANKR',
    'ANT',
    'APW',
    'aUSDC',
    'AVT',
    'AXS',
    'BANANA',
    'BAT',
    'bluSGD',
    'BNB',
    'BOB',
    'BPT',
    'CADC',
    'CAPS',
    'CODE',
    'COLL',
    'COMMON',
    'DAI',
    'DATA',
    'DEFENSE',
    'DSLA',
    'EPIC',
    'ETH',
    'EURe',
    'EURL',
    'EUROC',
    'FEI',
    'FORT',
    'FRM',
    'FTM',
    'FUSE',
    'FWB',
    'GD',
    'GEEQ',
    'GNO',
    'GRT',
    'GTC',
    'INDA',
    'jEUR',
    'jEURx',
    'KNC',
    'LEGENDARY',
    'LIT',
    'LUCK',
    'MAGIC',
    'MANA',
    'MEM',
    'MKR',
    'MPH',
    'OCEAN',
    'OLY',
    'RERP',
    'PKN',
    'PNK',
    'POWER',
    'QUICK',
    'RARE',
    'RDN',
    'RLC',
    'RLY',
    'SAND',
    'SDT',
    'SPEED',
    'STORJ',
    'STRT',
    'SUSHI',
    'USDC',
    'USDT',
    'VLX',
    'WETH',
    'WNK',
    'XIDR',
    'XSGD',
    'YEL',
  ];
  const GODCoins = ['CKB'];
  const BNBCoins = [
    'BNB',
    'USDC',
    'USDT',
    'BUSD',
    'AAVE',
    'ANKR',
    'AXS',
    'BANANA',
    'BLOK',
    'BPAD',
    'BUSD',
    'CAKE',
    'CAPS',
    'COLL',
    'DATA',
    'FRM',
    'FTM',
    'FUSE',
    'jEUR',
    'KNC',
    'LIT',
    'MATIC',
    'PAX',
    'PKN',
    'SUSHI',
    'USDC',
    'USDT',
    'VLX',
    'WETH',
    'WNK',
  ];

  const searchCurrentNetwork = (name) => {
    switch (name) {
      case 'Ethereum':
        return ETHCoins;
      case 'Godwoken':
        return GODCoins;
      case 'Binance':
        return BNBCoins;
      default:
        break;
    }
  };

  const clearPopoverState = (item, array) => {
    if (!array) {
      setCurrencyCoin(item);
      setPopoverIsOpen(false);
      setSearchValue('');
    }
    if (array) {
      if (!array.slice(0, 5).includes(item)) {
        const temp = array.slice(0, 4);
        setCurrencyCoin(item);
        setPopoverIsOpen(false);
        setSearchValue('');
        temp.push(item);
        setFiveCoins(temp);
      }
      setCurrencyCoin(item);
      setPopoverIsOpen(false);
      setSearchValue('');
    }
  };

  const networks = [
    {
      name: 'Godwoken',
      id: 71402,
    },
    {
      name: 'Ethereum',
      id: 1,
    },
    {
      name: 'Binance',
      id: 56,
    },
  ];

  const quantity_type = [
    { value: 'pc' },
    { value: 'h' },
    { value: 'd' },
    { value: 'wk' },
    { value: 'mo' },
    { value: 'words' },
  ];

  const clientsList = useSelector(({ employees: { clientList } }) => clientList);
  const walletList = useSelector(({ invoices: { wallets } }) => wallets);

  const validationSchema = Yup.object().shape({
    serviceType: Yup.string().required('Is required'),
    selected_wallet: Yup.string().required('Is required'),
    details: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string()
            .required('Description is required')
            .max(15, 'Maximum length 15 characters'),
          discount: Yup.number()
            .min(0, 'Must be at least 0')
            .max(100, 'Must be no more than 100')
            .required('Discount is required'),
          unit_price: Yup.number().min(0, 'Must be at least 0').required('Price is required'),
          qty: Yup.number().min(0, 'Must be at least 0').required('Quantity is required'),
          tax: Yup.number()
            .min(0, 'Must be at least 0')
            .max(999, 'Must be no more than 999')
            .required('Taxes is required'),
          amount: Yup.string(),
          amount_with_tax: Yup.string(),
          amount_total_tax: Yup.string(),
          amount_total: Yup.string(),
        }),
      )
      .min(1)
      .max(3),
  });

  const formik = useFormik({
    initialValues: {
      details: [
        {
          id: Math.random(),
          description: '',
          discount: '0',
          unit_price: '',
          qty: '',
          tax: '0',
          amount: '',
          amount_with_tax: '',
          amount_total_tax: '',
          amount_total: '',
          qty_type: 'pc',
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setAmountValues(values);
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openReceiveModal = () => {
    setIsOpenReceiveModal(true);
  };

  const closeReceiveModal = () => {
    setIsOpenReceiveModal(false);
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isValid,
    dirty,
    setFieldValue,
    handleSubmit,
  } = formik;

  const getInvoiceAmount = ({ unit_price, qty, discount, tax }) => {
    if (qty && unit_price && discount && tax) {
      const quantity = unit_price * qty;
      const disc = quantity - (quantity / 100) * discount;
      const taxes = (disc / 100) * tax;
      return disc + taxes;
    } else if (qty && unit_price && discount) {
      const quantity = unit_price * qty;
      return quantity - (quantity / 100) * discount;
    } else if (qty && unit_price && tax) {
      const disc = unit_price * qty;
      const taxes = (disc / 100) * tax;
      return disc + taxes;
    } else if (qty && unit_price) {
      return unit_price * qty;
    } else return 0;
  };

  const getInvoiceAmountWithoutTaxes = ({ unit_price, qty, discount }) => {
    if (qty && unit_price && discount) {
      const quantity = unit_price * qty;
      return quantity - (quantity / 100) * discount;
    } else if (qty && unit_price) {
      return unit_price * qty;
    } else return 0;
  };

  const getInvoiceTaxes = ({ unit_price, qty, discount, tax }) => {
    if (qty && unit_price && discount && tax) {
      const quantity = unit_price * qty;
      const disc = quantity - (quantity / 100) * discount;
      return (disc / 100) * tax;
    } else if (qty && unit_price && tax) {
      const disc = unit_price * qty;
      return (disc / 100) * tax;
    } else return 0;
  };

  const getInvoicesTotalAmount = (invoices, func) => {
    return invoices.reduce((acc, invoice) => {
      acc += func(invoice);
      return acc;
    }, 0);
  };

  const setAmountValues = (array) => {
    for (let i = 0; i < array.details.length; i++) {
      let detail = array.details[i];
      let res = getInvoiceAmount(detail);
      setFieldValue(`details.${i}.amount`, res);
    }

    setIsSubmitActive(true);
    setTimeout(() => {
      setIsSubmitActive(false);
    }, 1000);
  };

  const setWalletHandler = (value) => {
    if (value) {
      setSelected(value);
      if (value) {
        setWallet({
          ...value,
          chainId: networks.find(({ name }) => name === value.network).id || '',
        });
        setWallets([value]);
      }
    }
  };

  useEffect(() => {
    dispatch(getInvoiceNumberAction());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (
      isValid &&
      touched &&
      client &&
      client.email &&
      client.name &&
      wallet &&
      wallet.address &&
      account &&
      user &&
      user.email
    ) {
      setIsSubmitButtonActive(false);
    } else {
      setIsSubmitButtonActive(true);
    }
  }, [isValid, client, wallet, account, user, touched]);

  const setClientHander = (value) => {
    if (value) {
      setClients([value]);
      setClient(value);
    }
  };

  const network = networks.find(({ name }) => name === client?.blockchain);
  const networkByChainId = networks.find(({ id }) => id === wallet?.chainId);

  useEffect(() => {
    dispatch({ type: 'GET_CLIENT_LIST', payload: user.organization_id });
    dispatch({ type: 'GET_GENERAL_WALLETS', payload: user.organization_id });
  }, []);

  useEffect(() => {
    const createInvoice = async () => {
      const resWithoutTaxes = getInvoicesTotalAmount(
        values.details,
        getInvoiceAmountWithoutTaxes,
      ).toFixed(2);
      const resTotal = getInvoicesTotalAmount(values.details, getInvoiceAmount).toFixed(2);
      const resTotalTaxes = getInvoicesTotalAmount(values.details, getInvoiceTaxes).toFixed(2);

      const newValues = values.details.map((item) => {
        item.invoice_number = invoiceNumber;
        delete item.id;
        return item;
      });

      if (!account) {
        toast.error('Connect Metamask!');
        return;
      }
      dispatch(
        createInvoiceAction({
          payload: {
            email: user.email,
            email_client: client.email,
            invoice_number: Number(invoiceNumber),
            created_date: startDate,
            due_date: endDate,
            wallet: wallet?.address,
            wallet_client: wallet?.address,
            amount_with_tax: resWithoutTaxes,
            amount_total_tax: resTotalTaxes,
            amount_total: resTotal,
            invoice_items: newValues,
            blockchain: wallet?.network,
            company_name_client: client.name,
            amount_currency: currencyCoin,
          },
          navigate,
        }),
      );
    };
    if (isSubmitActive) {
      createInvoice();
    }
  }, [isSubmitActive]);

  return (
    <Page title="Invoice | CoinSender">
      <PageLayout>
        <ClientModal
          close={closeModal}
          open={isOpen}
          setClientInfo={setClient}
          setClients={setClients}
          client={client}
          setWallet={setWallet}
          setWallets={setWallets}
          wallet={wallet}
          setWalletHandler={setWalletHandler}
        />
        <ReceiveModal
          close={closeReceiveModal}
          open={isOpenReceiveModal}
          setWallet={setWallet}
          setWallets={setWallets}
          wallet={wallet}
          setWalletHandler={setWalletHandler}
          setCoins={setFiveCoins}
          searchNetwork={searchCurrentNetwork}
        />
        <Stack>
          <PageTitle title="New Invoice" />
          <Box>
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
                      </Stack>
                      <Stack spacing={1}>
                        <Stack sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                          {user && user.name ? user.name : 'Name'}{' '}
                          {user && user.second_name ? user.second_name : 'Surname'}
                        </Stack>
                        <Stack>{user && user.email ? user.email : 'email'}</Stack>
                      </Stack>
                    </Stack>
                    <Stack p={3}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Stack sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Your partner information:
                        </Stack>
                        {clients.length ? (
                          <Stack
                            sx={{ cursor: 'pointer' }}
                            color="#FD9B28"
                            direction="row"
                            alignItems="center"
                            gap={1}
                            id="from"
                            onClick={() => {
                              setClient(null);
                              setFieldValue('serviceType', null);
                              setClients([]);
                            }}
                          >
                            <IconButton color="primary" variant="contained" aria-label="delete">
                              <Iconify icon="eva:edit-fill" />
                            </IconButton>
                          </Stack>
                        ) : null}
                      </Stack>
                      {clients.length ? (
                        <Stack spacing={1}>
                          <Stack sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            {client.name}
                          </Stack>
                          <Stack>{client?.email}</Stack>
                        </Stack>
                      ) : (
                        <FormControl fullWidth>
                          <InputLabel
                            required
                            error={Boolean(errors.serviceType)}
                            id="wallet-address-label"
                          >
                            Find or add new partner
                          </InputLabel>
                          <Select
                            labelId="wallet-address-label"
                            id="wallet-address"
                            name="serviceType"
                            error={Boolean(errors.serviceType)}
                            value=""
                            required
                            onChange={({ target: { value } }) => {
                              setFieldValue('serviceType', value.email);
                              setClientHander(value);
                            }}
                            label="Find or add new partner"
                          >
                            <Button
                              sx={{ width: '95%', marginLeft: '10px', my: 1 }}
                              variant="contained"
                              color="primary"
                              margin="normal"
                              type="button"
                              onClick={openModal}
                            >
                              Add a new partner
                            </Button>

                            <MenuItem
                              sx={{
                                color: '#000',
                                fontSize: '1rem',
                                fontWeight: '700',
                              }}
                              value={false}
                              disabled
                            >
                              Your existing partners
                            </MenuItem>
                            {clientsList.map((item) => (
                              <MenuItem key={item.email} value={item}>
                                {`${item.email} (${item.name})`}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Stack>
                    <Stack py={2} px={3}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Stack sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          How do you want to get paid?
                        </Stack>
                        {wallets.length ? (
                          <Stack
                            sx={{ cursor: 'pointer' }}
                            color="primary"
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                            id="from"
                            onClick={() => {
                              setWallet({ id: null, address: '' });
                              setWallets([]);
                              setFieldValue('selected_wallet', null);
                              setCurrencyCoin('');
                            }}
                          >
                            <IconButton color="primary" variant="contained" aria-label="delete">
                              <Iconify icon="eva:edit-fill" />
                            </IconButton>
                          </Stack>
                        ) : null}
                      </Stack>
                      {wallets.length ? (
                        <Stack spacing={1}>
                          <Stack>{wallet?.network}</Stack>
                          <Stack sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            {wallet?.address}
                          </Stack>

                          <Stack gap={1}>
                            <Stack mt={2}>
                              <Typography fontWeight={500}>Please, select a coin:</Typography>
                            </Stack>
                            <Stack flexDirection="row" gap={1} alignItems="center">
                              {fiveCoins.slice(0, 5).map((item) => (
                                <Button
                                  variant={item === currencyCoin ? 'contained' : 'outlined'}
                                  key={item}
                                  onClick={() => {
                                    if (item === currencyCoin) {
                                      setCurrencyCoin('');
                                    } else {
                                      setCurrencyCoin(item);
                                    }
                                  }}
                                >
                                  {item}
                                </Button>
                              ))}

                              {searchCurrentNetwork(wallet.network).length > 5 && (
                                <Button
                                  aria-describedby={id}
                                  variant="outlined"
                                  onClick={handleClick}
                                  sx={{
                                    background: 'white',
                                    color: 'black',
                                    border: '1px solid #007994',
                                  }}
                                >
                                  ...
                                </Button>
                              )}
                            </Stack>

                            <Popover
                              id={id}
                              open={popoverIsOpen}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                            >
                              <Stack p={2} sx={{ height: '300px' }}>
                                <Stack mb={2}>
                                  <TextField
                                    fullWidth
                                    name="search"
                                    onChange={handleSearch}
                                    label="Type a Currency"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <SearchIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Stack>
                                {!searchValue && (
                                  <Stack gap={1}>
                                    <Typography mb={1} fontWeight={600}>
                                      Popular
                                    </Typography>
                                    <MenuItem
                                      onClick={() =>
                                        clearPopoverState(
                                          'DAI',
                                          searchCurrentNetwork(wallet.network),
                                        )
                                      }
                                    >
                                      DAI
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        clearPopoverState(
                                          'USDC',
                                          searchCurrentNetwork(wallet.network),
                                        )
                                      }
                                    >
                                      USDC
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        clearPopoverState(
                                          'USDT',
                                          searchCurrentNetwork(wallet.network),
                                        )
                                      }
                                    >
                                      USDT
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() =>
                                        clearPopoverState(
                                          'ETH',
                                          searchCurrentNetwork(wallet.network),
                                        )
                                      }
                                    >
                                      ETH
                                    </MenuItem>
                                    <Typography fontWeight={600} mb={1}>
                                      All currencies
                                    </Typography>
                                    {searchCurrentNetwork(wallet.network).map((item) => (
                                      <Stack>
                                        <MenuItem
                                          onClick={() =>
                                            clearPopoverState(
                                              item,
                                              searchCurrentNetwork(wallet.network),
                                            )
                                          }
                                        >
                                          {item}
                                        </MenuItem>
                                      </Stack>
                                    ))}
                                  </Stack>
                                )}
                                {searchValue && (
                                  <Stack gap={1}>
                                    {searchCurrentNetwork(wallet.network)
                                      .filter((item) =>
                                        item
                                          .toLowerCase()
                                          .includes(searchValue.toLocaleLowerCase()),
                                      )
                                      .map((item) => (
                                        <Stack>
                                          <MenuItem
                                            onClick={() =>
                                              clearPopoverState(
                                                item,
                                                searchCurrentNetwork(wallet.network),
                                              )
                                            }
                                          >
                                            {item}
                                          </MenuItem>
                                        </Stack>
                                      ))}
                                    {searchCurrentNetwork(wallet.network).filter((item) =>
                                      item.toLowerCase().includes(searchValue.toLocaleLowerCase()),
                                    ).length === 0 && (
                                      <Stack>
                                        <Typography fontWeight={600}>Not Found!</Typography>
                                        <Typography>
                                          Are you sure the spelling is correct?
                                        </Typography>
                                      </Stack>
                                    )}
                                  </Stack>
                                )}
                              </Stack>
                            </Popover>
                          </Stack>
                        </Stack>
                      ) : (
                        <FormControl fullWidth>
                          <InputLabel
                            required
                            error={Boolean(errors.selected_wallet)}
                            id="wallet-address-label"
                          >
                            Find or add new wallet
                          </InputLabel>
                          <Select
                            labelId="wallet-address-label"
                            id="wallet-address"
                            name="serviceType"
                            required
                            error={Boolean(errors.selected_wallet)}
                            value=""
                            onChange={({ target: { value } }) => {
                              setWalletHandler({ ...value, address: value.wallet_address });
                              setFiveCoins(searchCurrentNetwork(value.network));
                              setFieldValue('selected_wallet', value.wallet_address);
                            }}
                            label="Find or add new wallet"
                          >
                            <MenuItem
                              sx={{
                                color: '#000',
                                fontSize: '1rem',
                                fontWeight: '700',
                              }}
                              value={false}
                              disabled
                            >
                              Your current wallet
                            </MenuItem>
                            {account && (
                              <MenuItem
                                key={account}
                                value={{
                                  wallet_address: account,
                                  network: networks.find(({ id }) => id === chainId).name || '',
                                }}
                              >
                                {`(${networks.find(({ id }) => id === chainId).name || ''}) ${
                                  account.slice(0, 5) + '...' + account.slice(-5) || ''
                                } `}
                              </MenuItem>
                            )}
                            <MenuItem
                              sx={{
                                color: '#000',
                                fontSize: '1rem',
                                fontWeight: '700',
                              }}
                              value={false}
                              disabled
                            >
                              Your existing wallets
                            </MenuItem>
                            {walletList.map((item) => (
                              <MenuItem key={item.wallet_address} value={item}>
                                {`${item.wallet_name} (${item.network}) ${
                                  item.wallet_address.slice(0, 5) +
                                    '...' +
                                    item.wallet_address.slice(-5) || ''
                                } `}
                              </MenuItem>
                            ))}
                            {/* <Button
                              sx={{
                                color: 'main',
                                marginLeft: '10px',
                                fontSize: '1rem',
                                fontWeight: '400',
                              }}
                              margin="normal"
                              type="button"
                              onClick={openReceiveModal}
                            > */}

                            <Button
                              sx={{ width: '95%', marginLeft: '10px', mt: 1 }}
                              variant="contained"
                              onClick={openReceiveModal}
                            >
                              Add a new wallet
                            </Button>
                          </Select>
                        </FormControl>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Stack p={3}>
                      <Stack spacing={1} alignItems="flex-end">
                        {/* <Stack>Invoice #1</Stack> */}
                        <Stack>Invoice #{invoiceNumber ? invoiceNumber : 0}</Stack>
                        <CustomDate
                          isVisible={isDatePickerVisible}
                          setIsVisible={SetIsDatePickerVisible}
                          date={startDate}
                          setStartDate={setStartDate}
                          setEndDate={setEndDate}
                          text="Issued on"
                        />

                        <Stack direction="row" alignItems="center" sx={{ fontWeight: 600 }}>
                          <CustomDate
                            isVisible={isEndDatePickerVisible}
                            setIsVisible={SetIsEndDatePickerVisible}
                            date={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            minDate={startDate}
                            text="Payment due by"
                          />
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                <Stack p={3}>
                  {isDesktop && (
                    <Grid style={{ marginBottom: 2 }} container spacing={2}>
                      <Grid item lg={2} md={2} sm={4} xs={12}>
                        <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Description
                        </Stack>
                      </Grid>
                      <Grid item lg={3} md={3} sm={2} xs={12}>
                        <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Quantity
                        </Stack>
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={12}>
                        <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Price
                        </Stack>
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={12}>
                        <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Discount
                        </Stack>
                      </Grid>
                      <Grid item lg={2} md={2} sm={2} xs={12}>
                        <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                          Taxes
                        </Stack>
                      </Grid>

                      <Grid item lg={1} md={1} sm={1} xs={12}></Grid>
                    </Grid>
                  )}
                  <FormikProvider value={formik}>
                    <Form autoComplete="off">
                      <FieldArray name="details">
                        {({ push, remove }) => (
                          <>
                            {values.details.map((detail, index) => {
                              const description = `details[${index}].description`;
                              const touchedDescription = getIn(touched, description);
                              const errorDescription = getIn(errors, description);

                              const qty = `details[${index}].qty`;
                              const touchedQuantity = getIn(touched, qty);
                              const errorQuantity = getIn(errors, qty);

                              const unit_price = `details[${index}].unit_price`;
                              const touchedPrice = getIn(touched, unit_price);
                              const errorPrice = getIn(errors, unit_price);

                              const discount = `details[${index}].discount`;
                              const touchedDiscount = getIn(touched, discount);
                              const errorDiscount = getIn(errors, discount);

                              const tax = `details[${index}].tax`;
                              const touchedTaxes = getIn(touched, tax);
                              const errorTaxes = getIn(errors, tax);

                              const qty_type = `details[${index}].qty_type`;

                              const amount = `details[${index}].amount`;

                              return (
                                <Stack key={detail.id} mb={2}>
                                  <Grid style={{ marginBottom: 2 }} container spacing={2}>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                      <TextField
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={description}
                                        label={t('description')}
                                        value={detail.description}
                                        required
                                        helperText={
                                          touchedDescription && errorDescription
                                            ? errorDescription
                                            : ''
                                        }
                                        error={Boolean(touchedDescription && errorDescription)}
                                      />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={12} xs={12}>
                                      <Stack display="flex" gap={1} flexDirection="row">
                                        <Stack width="100%">
                                          <TextField
                                            type="number"
                                            fullWidth
                                            name={qty}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label={t('quantity')}
                                            value={detail.qty}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            required
                                            helperText={
                                              touchedQuantity && errorQuantity ? errorQuantity : ''
                                            }
                                            error={Boolean(touchedQuantity && errorQuantity)}
                                          />
                                        </Stack>
                                        <Stack>
                                          <FormControl fullWidth>
                                            <InputLabel required id="demo-simple-select-label">
                                              Type
                                            </InputLabel>
                                            <Select
                                              sx={{ width: '75px' }}
                                              name={qty_type}
                                              label="Type"
                                              required
                                              defaultValue="pc"
                                              onChange={({ target: { value } }) =>
                                                setFieldValue(qty_type, value)
                                              }
                                            >
                                              {quantity_type.map(({ value }) => (
                                                <MenuItem key={value} value={value}>
                                                  {value}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Stack>
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                      <TextField
                                        type="number"
                                        fullWidth
                                        name={unit_price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={t('price')}
                                        value={detail.unit_price}
                                        required
                                        InputProps={{ inputProps: { min: 0 } }}
                                        helperText={touchedPrice && errorPrice ? errorPrice : ''}
                                        error={Boolean(touchedPrice && errorPrice)}
                                      />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                      <TextField
                                        type="number"
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Iconify icon="eva:percent-outline" />
                                            </InputAdornment>
                                          ),
                                        }}
                                        inputProps={{ min: '0', max: '100' }}
                                        fullWidth
                                        name={discount}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={'Discount'}
                                        value={detail.discount}
                                        required
                                        helperText={
                                          touchedDiscount && errorDiscount ? errorDiscount : ''
                                        }
                                        error={Boolean(touchedDiscount && errorDiscount)}
                                      />
                                    </Grid>
                                    <Grid item lg={2} md={2} sm={12} xs={12}>
                                      <TextField
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <Iconify icon="eva:percent-outline" />
                                            </InputAdornment>
                                          ),
                                          inputProps: { min: 0, max: 1000 },
                                        }}
                                        label={t('taxes')}
                                        type="number"
                                        fullWidth
                                        name={tax}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        value={detail.tax}
                                        helperText={touchedTaxes && errorTaxes ? errorTaxes : ''}
                                        error={Boolean(touchedTaxes && errorTaxes)}
                                      />
                                    </Grid>
                                    <Grid item lg={1} md={1} sm={12} xs={12}>
                                      <Stack mt={1} alignItems="center">
                                        <IconButton
                                          sx={{ width: 'fit-content' }}
                                          color="primary"
                                          variant="contained"
                                          disabled={values.details.length === 1}
                                          onClick={() => remove(index)}
                                        >
                                          <HighlightOffIcon />
                                        </IconButton>
                                        {/* <Button
                                          margin="normal"
                                          color="primary"
                                          variant="contained"
                                          disabled={values.details.length === 1}
                                          onClick={() => remove(index)}
                                        >
                                          x
                                        </Button> */}
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                </Stack>
                              );
                            })}
                            <Stack
                              pb={3}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid
                                container
                                spacing={2}
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                              >
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                  <Stack
                                    sx={{ marginBottom: '130px' }}
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                  >
                                    {values.details.length < 5 && (
                                      <Button
                                        onClick={() =>
                                          push({
                                            id: Math.random(),
                                            description: '',
                                            discount: '',
                                            unit_price: '',
                                            qty: '',
                                            tax: '',
                                            amount: '',
                                          })
                                        }
                                        variant="contained"
                                        startIcon={<Iconify icon="eva:plus-fill" />}
                                      >
                                        {t('add.new.detail')}
                                      </Button>
                                    )}
                                  </Stack>
                                </Grid>
                              </Grid>
                              <Grid
                                fullWidth
                                container
                                spacing={2}
                                alignItems="center"
                                justifyContent="flex-end"
                              >
                                <Grid item lg={10} md={10} sm={4} xs={12}>
                                  <Stack direction="row" justifyContent="space-between" mb={2}>
                                    <Typography mt={2}>Amount without tax </Typography>
                                    <Typography mt={2}>
                                      {getInvoicesTotalAmount(
                                        values.details,
                                        getInvoiceAmountWithoutTaxes,
                                      ).toFixed(2)}{' '}
                                      {currencyCoin || ''}
                                    </Typography>
                                  </Stack>
                                  <Divider />
                                </Grid>
                                <Grid item lg={10} md={10} sm={4} xs={12}>
                                  <Stack direction="row" justifyContent="space-between" mb={2}>
                                    <Typography mt={2}> Total Tax amount </Typography>
                                    <Typography mt={2}>
                                      {getInvoicesTotalAmount(
                                        values.details,
                                        getInvoiceTaxes,
                                      ).toFixed(2)}{' '}
                                      {currencyCoin || ''}
                                    </Typography>
                                  </Stack>
                                  <Divider />
                                </Grid>
                                <Grid item lg={10} md={10} sm={4} xs={12}>
                                  <Stack direction="row" justifyContent="space-between" mb={2}>
                                    <Typography mt={2}>Total amount </Typography>
                                    <Typography mt={2}>
                                      {getInvoicesTotalAmount(
                                        values.details,
                                        getInvoiceAmount,
                                      ).toFixed(2)}{' '}
                                      {currencyCoin || ''}
                                    </Typography>
                                  </Stack>
                                  <Divider />
                                </Grid>
                              </Grid>
                            </Stack>
                            <Stack
                              pb={3}
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid
                                container
                                spacing={2}
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                              >
                                <Grid item lg={6} md={6} sm={6} xs={12}>
                                  <Stack
                                    sx={{ marginBottom: '100px' }}
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                  >
                                    <Button
                                      variant="contained"
                                      type="submit"
                                      disabled={!(isValid && dirty && currencyCoin)}
                                    >
                                      {'Create & Send'}
                                    </Button>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>
                          </>
                        )}
                      </FieldArray>
                    </Form>
                  </FormikProvider>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </PageLayout>
    </Page>
  );
};
