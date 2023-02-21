import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import MoreMenu from './MoreMenu';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Chip,
  TablePagination,
} from '@mui/material';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StatusChip = styled(Stack)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '12px',
  width: '84px',
  height: '25px',
  textAlign: 'center',
  borderRadius: '4px',
});

export function Row({ row, handleClick, selected }) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation('common');
  const { invoice_number, company_name_client, amount_total, due_date, status } = row;
  return (
    <React.Fragment>
      <TableRow
        hover
        key={invoice_number}
        tabIndex={-1}
        component={Link}
        to={`${invoice_number}`}
        sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
      >
        <TableCell component="th" scope="row">
          {Number(invoice_number) || invoice_number}
        </TableCell>
        <TableCell align="left">{company_name_client}</TableCell>
        <TableCell align="center">{Number(amount_total) || amount_total}</TableCell>
        <TableCell align="center">
          {new Date(due_date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }) || 'No data'}
        </TableCell>
        <TableCell align="left">
          {status ? (
            <StatusChip
              sx={{
                background: '#4ACD7F',
              }}
            >
              Sent
            </StatusChip>
          ) : (
            <StatusChip
              sx={{
                background: '#D8D8D8',
              }}
            >
              Draft
            </StatusChip>
          )}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
