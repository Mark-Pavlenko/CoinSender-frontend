import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { isAddress } from '@ethersproject/address';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
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

export default function EditWallets({ open, handleClose, wallet, closeMenu }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const closeModal = () => {
    handleClose(false);
    resetForm();
  };
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const validationSchema = Yup.object().shape({
    address: Yup.string()
      .label('Wallet address')
      .required()
      .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value)),
  });

  const initialValues = {
    blockchain: networks.find(({ name }) => name === wallet?.network) || '',
    address: wallet?.wallet_address || '',
    wallet_name: wallet?.wallet_name,
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    values,
    setFieldValue,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      address: Yup.string()
        .label('Wallet address')
        .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value))
        .required('Is required'),
      wallet_name: Yup.string().label('Wallet name').required('Is required'),
    }),
    onSubmit: (values) => {
      dispatch({
        type: 'EDIT_GENERAL_WALLET',
        payload: {
          id: wallet?.id,
          network: values?.blockchain?.name,
          wallet_address: values.address,
          wallet_name: values.wallet_name,
        },
        org_id: user.organization_id,
      });
      handleClose(false);
      closeMenu();
    },
  });

  useEffect(() => {
    setFieldValue(
      'blockchain',
      networks.find(({ name }) => name === wallet?.network),
    );
    setFieldValue('address', wallet.wallet_address);
  }, [wallet]);

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Typography>Edit wallet</Typography>
            <FormControl fullWidth>
              <InputLabel id="wallet-address-label">Blockchain</InputLabel>
              <Select
                labelId="wallet-address-label"
                id="wallet-address"
                name="blockchain"
                value={values.blockchain}
                onChange={({ target: { value } }) => setFieldValue('blockchain', value)}
                label="Blockchain"
              >
                {networks.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label={t('Wallet name')}
              required
              onChange={handleChange}
              name="wallet_name"
              value={values.wallet_name}
              onBlur={handleBlur}
              error={Boolean(touched.wallet_name && errors.wallet_name)}
              helperText={Boolean(touched.wallet_name && errors.wallet_name) && errors.wallet_name}
            />
            <TextField
              fullWidth
              label={t('Notes')}
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.address && errors.address)}
              helperText={Boolean(touched.address && errors.address) && errors.address}
            />
            <Stack direction="row" gap={2}>
              <Button type="submit" sx={{ height: '30px' }} disabled={!isValid} variant="contained">
                {t('Edit')}
              </Button>
              <Button onClick={closeModal} sx={{ height: '30px' }} variant="contained">
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
