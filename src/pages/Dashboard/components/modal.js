import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { isAddress } from '@ethersproject/address';

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

export default function BasicModal({ open, handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const closeModal = () => {
    handleReset();
    handleClose(false);
  };
  const transfers = useSelector(({ transfers: { transferList } }) => transferList);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Is required'),
    second_name: Yup.string().required('Is required'),
    wallet_id: Yup.string()
      .label('Wallet address')
      .required()
      .test('Is address', 'Please enter correct wallet address', (value) => isAddress(value)),
  });

  const initialValuesForCompany = {
    name: '',
    second_name: '',
    amount: 0,
    wallet_id: '',
  };

  const { handleChange, handleSubmit, isValid, values, handleReset, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValuesForCompany,
      validationSchema,
      onSubmit: (values) => {
        dispatch({
          type: 'ADD_TRANSFER_SAGA',
          payload: {
            ...{ ...values, amount: values.amount.toString() },
          },
        });

        handleClose(false);
        handleReset();
      },
    });

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
            <Typography>{t('add.employee')}</Typography>
            <TextField fullWidth label={t('name')} name="name" onChange={handleChange} />
            <TextField fullWidth label={t('surname')} name="second_name" onChange={handleChange} />
            <TextField
              fullWidth
              type="number"
              label={t('amount')}
              inputProps={{
                step: 'any',
                min: '0.001',
              }}
              name="amount"
              value={values.amount}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label={t('wallet.id')}
              error={Boolean(touched.wallet_id && errors.wallet_id)}
              helperText={touched.wallet_id && errors.wallet_id}
              name="wallet_id"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <TextField fullWidth label="Notes" name="notes" onChange={handleChange} />
            <Stack direction="row" gap={2}>
              <Button
                type="submit"
                sx={{ height: '30px' }}
                disabled={!isValid}
                variant="contained"
                disabled={!isValid}
              >
                {t('add')}
              </Button>
              <Button onClick={closeModal} sx={{ height: '30px' }} variant="contained">
                {t('cancel')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
