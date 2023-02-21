import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Stack, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isAddress } from '@ethersproject/address';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

export default function ClientModal({
  open,
  close,
  setClientInfo,
  setClients,
  client,
  setWallet,
  setWallets,
  wallet,
  setWalletHandler,
}) {
  const [networkId, setNetworkId] = useState({
    name: 'Godwoken',
    id: 71402,
  });

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
  });

  const { t } = useTranslation('common');

  const handleClose = () => close();

  const { touched, errors, setFieldValue, handleSubmit, getFieldProps, isValid, dirty } = useFormik(
    {
      initialValues: {
        details: [
          {
            email: '',
            name: '',
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // setClientInfo({
        //   name: values.name,
        //   email: values.email,
        //   wallet: values.address,
        //   blockchain: networkId.name,
        // });
        // setClients((prev) => [
        //   ...prev,
        //   {
        //     name: values.name,
        //     email: values.email,
        //     wallet: values.address,
        //     blockchain: networkId.name,
        //   },
        // ]);
      
        handleClose();
        const formData = new FormData();
        formData.append('avatar', null);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('organization_id', currentUser.organization_id);
        dispatch({
          type: 'ADD_CLIENT_SAGA',
          payload: formData,
          navigate,
          flag: 'invoice',
          org_id: currentUser.organization_id,
        });
      },
    },
  );

  useEffect(() => {
    if (wallet) {
      setFieldValue('address', wallet.address);
    }
  }, [wallet]);

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
                Who are you sending this invoice to?
              </Stack>
              <Stack>
                <TextField
                  fullWidth
                  label={t('name')}
                  required
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('email')}
                required
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ marginTop: '10px' }}
            disabled={!(isValid && dirty)}
            variant="contained"
            onClick={handleSubmit}
          >
            Save partner
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
