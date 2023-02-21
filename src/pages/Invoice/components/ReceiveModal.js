import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Stack, TextField, Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isAddress } from '@ethersproject/address';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  maxWidth: '440px',
  width: '100%',
  p: 2,
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

export default function ReceiveModal({
  open,
  close,
  setWallet,
  setWallets,
  wallet,
  setWalletHandler,
  setCoins,
  searchNetwork,
}) {
  const [networkId, setNetworkId] = useState(71402);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const handleClose = () => close();

  const { touched, errors, handleBlur, handleSubmit, handleChange, isValid } = useFormik({
    initialValues: {
      address: '',
      wallet_name: '',
    },
    validationSchema: Yup.object().shape({
      address: Yup.string()
        .label('Wallet address')
        .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value))
        .required('Is required'),
      wallet_name: Yup.string().label('Wallet name').required('Is required'),
    }),
    onSubmit: (values) => {
      const id = Math.random(10 ** 18);
      setWallet({
        address: values.address,
        chainId: networkId,
        network: networks.find(({ id }) => id === networkId)?.name,
        wallet_name: values.wallet_name,
        id,
      });
      setWallets((prev) => [
        ...prev,
        {
          address: values.address,
          wallet_name: values.wallet_name,
          chainId: networkId,
          network: networks.find(({ id }) => id === networkId)?.name,
          id,
        },
      ]);
      setWalletHandler({
        address: values.address,
        wallet_name: values.wallet_name,
        chainId: networkId,
        network: networks.find(({ id }) => id === networkId)?.name,
        id,
      });

      setCoins(searchNetwork(networks.find(({ id }) => id === networkId)?.name));

      dispatch({
        type: 'ADD_GENERAL_WALLET',
        payload: {
          network: networks.find(({ id }) => id === networkId)?.name || 'No data',
          wallet_address: values.address,
          wallet_name: values.wallet_name,
        },
        org_id: currentUser.organization_id,
      });
      handleClose();
    },
  });

  // useEffect(() => {
  //   if (wallet) {
  //     setFieldValue('address', wallet.address);
  //   }
  // }, [wallet]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid style={{ marginBottom: 2 }} container spacing={2}>
            <Grid item xs={12}>
              <Stack mb={2} sx={{ fontSize: '1.125rem', fontWeight: 700 }}>
                How do you want to receive funds?
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="wallet-address-label">Blockchain</InputLabel>
                <Select
                  labelId="wallet-address-label"
                  id="wallet-address"
                  name="serviceType"
                  value={networkId}
                  onChange={({ target: { value } }) => setNetworkId(value)}
                  label="Blockchain"
                >
                  {networks.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('Wallet name')}
                required
                onChange={handleChange}
                name="wallet_name"
                onBlur={handleBlur}
                error={Boolean(touched.wallet_name && errors.wallet_name)}
                helperText={
                  Boolean(touched.wallet_name && errors.wallet_name) && errors.wallet_name
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('Wallet address')}
                required
                onChange={handleChange}
                name="address"
                onBlur={handleBlur}
                error={Boolean(touched.address && errors.address)}
                helperText={Boolean(touched.address && errors.address) && errors.address}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ marginTop: '10px' }}
            variant="contained"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Save Wallet
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
