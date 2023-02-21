import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Stack, Avatar, Button, TableRow, TableCell, Checkbox, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import MoreMenu from '../../../components/MoreMenu';
import { AVATAR_URL } from 'src/constants/defaultURL';

export function EmployeeRow({ row, selected, wallets, handleClick }) {
  const [open, setOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const firstOrg = useSelector(({ organisations: { organisationList } }) => organisationList)[0];
  const dispatch = useDispatch();

  const initialValues = {
    amount: 0,
  };

  const { handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues,
    onSubmit: (values, actions, event) => {
      dispatch({
        type: 'ADD_PAYMENT',
        payload: {
          description: 'Some description',
          status: 'Pending',
          organization_wallet_id: firstOrg.wallet_id,
          wallet_id: row.wallet_id,
          value: +values.amount,
          payer_secret_id: firstOrg.wallet_secret_id,
        },
      });
      resetForm();
    },
  });

  const { t } = useTranslation('common');
  const { name, second_name, wallet_id, id, amount, employee, _id, notes } = row;

  return (
    <React.Fragment>
      <TableRow
        hover
        key={_id}
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        aria-checked={selected}
        sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
        // onClick={handleOpen}
      >
        <TableCell onClick={(event) => handleClick(event, row)} padding="checkbox">
          <Checkbox color="primary" checked={selected} />
        </TableCell>
        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {second_name + ' ' + name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">
          {wallet_id.slice(0, 5) + '...' + wallet_id.slice(-9) || ''}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {amount || ''}
          </Typography>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {notes || 'No data'}
          </Typography>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <MoreMenu user={row} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} width="100%" component="form" onSubmit={handleSubmit}>
              <Stack direction="row" gap={3}>
                <TextField
                  style={{ width: '50%' }}
                  label={t('amount')}
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                  {t('send')}
                </Button>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
