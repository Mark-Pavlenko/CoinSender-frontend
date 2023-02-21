import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReactToPrint from 'react-to-print';
// material
import {
  Box,
  Stack,
  Container,
  Typography,
  IconButton,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  SvgIcon,
  Paper,
  TableHead,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Divider, Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { ButtonGroup, Table } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
// ----------------------------------------------------------------------

export const InvoiceDetails = () => {
  let componentRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const params = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    dispatch({
      type: 'GET_INVOICE_BY_ID',
      payload: { organization_id: currentUser.organization_id, invoice_number: +params.id },
    });
  }, []);

  const invoice = useSelector(({ invoices: { invoice } }) => invoice);

  const GridWithMarginBottom = styled(Grid)({
    marginBottom: '40px !important',
  });

  const CustomTableCellHeader = styled(TableCell)({
    verticalAlign: 'middle !important',
    textAlign: 'left',
  });

  const RobotoTypography = styled(Typography)({
    fontFamily: 'Roboto',
  });

  const STable = styled('table')({
    border: '1px solid #dee2e6',
    borderCollapse: 'collapse',
  });
  const STh = styled('th')({
    border: '1px solid #dee2e6',
    borderCollapse: 'collapse',
    textAlign: 'left',
    padding: '10px',
  });
  const STd = styled('td')({
    border: '1px solid #dee2e6',
    borderCollapse: 'collapse',
    padding: '10px',
  });

  return (
    <Page title="Invoice details">
      <PageLayout>
        <Stack
          sx={{
            boxShadow:
              'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
            borderRadius: '16px',
            p: 3,
            fontFamily: 'Roboto',
            background: '#fff',
          }}
        >
          <Stack
            ref={(el) => (componentRef = el)}
            sx={{
              '@media print': {
                margin: '0 50px !important',
                paddingTop: '50px !important',
              },
            }}
          >
            <Stack justifyContent="space-between" flexDirection="row" alignItems="center">
              <Stack mb={5}>
                <PageTitle
                  border={true}
                  title={`INVOICE | ${invoice?.company_name_client || 'No data'}`}
                />
                <RobotoTypography
                  sx={{ fontWeight: 500, fontSize: '16px' }}
                  color="#808080"
                  gutterBottom
                  mt={-2}
                >
                  No. {invoice?.invoice_number || 'No data'} | Date{' '}
                  {dayjs(invoice?.created_date || new Date()).format('MMMM D, YYYY')} | Due Date{' '}
                  {dayjs(invoice?.due_date || new Date()).format('MMMM D, YYYY')}
                </RobotoTypography>
              </Stack>
              <Stack>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <ReactToPrint
                    trigger={() => (
                      <Tooltip title="View">
                        <IconButton aria-label="view">
                          <SvgIcon component={VisibilityIcon} />
                        </IconButton>
                      </Tooltip>
                    )}
                    content={() => componentRef}
                  />
                </ButtonGroup>
              </Stack>
            </Stack>
            <GridWithMarginBottom container spacing={2}>
              <Grid item xs={12} sm={5}>
                <RobotoTypography
                  paragraph={true}
                  sx={{
                    fontSize: '27px',
                    fontWeight: 500,
                  }}
                >
                  From
                </RobotoTypography>
                <RobotoTypography fontWeight={500} fontSize="18px">
                  {invoice?.organization?.company_name}
                </RobotoTypography>
                <RobotoTypography fontWeight={500} fontSize="18px">
                  {invoice?.email || 'No data'}
                </RobotoTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <RobotoTypography
                  paragraph={true}
                  sx={{
                    fontSize: '27px',
                    fontWeight: 500,
                  }}
                >
                  To
                </RobotoTypography>
                <RobotoTypography fontWeight={500} fontSize="18px">
                  {invoice?.company_name_client || 'No data'}
                </RobotoTypography>
                <RobotoTypography fontWeight={500} fontSize="18px">
                  {invoice?.email_client || 'No data'}
                </RobotoTypography>
              </Grid>
            </GridWithMarginBottom>
            <Stack>
              <RobotoTypography
                sx={{ textTransform: 'uppercase', fontSize: '21px', fontWeight: 700 }}
                color="#FFA31A"
                textAlign="center"
                mb={2}
              >
                Payment info
              </RobotoTypography>
            </Stack>
            <Stack
              mb={2}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                background: '#f9f9fa',
                p: 3,
                borderRadius: '25px',
                border: '1px solid #edeff2',
              }}
            >
              <Stack>
                <RobotoTypography sx={{ fontSize: '18px', fontWeight: 500 }} color="#808080">
                  Network: <br /> {invoice?.blockchain || 'No data'} (
                  {invoice?.amount_currency || ''})
                </RobotoTypography>
                <RobotoTypography sx={{ fontSize: '18px', fontWeight: 500 }} color="#808080">
                  Wallet Address: <br /> {invoice?.wallet_client || 'No data'}
                </RobotoTypography>
              </Stack>
              <Stack>
                {invoice?.qr_code && (
                  <img
                    style={{ width: '150px', height: '150px' }}
                    src={invoice?.qr_code}
                    alt="QR"
                  />
                )}
              </Stack>
            </Stack>
            <SimpleBar>
              <STable style={{ width: '100%' }}>
                <tr>
                  <STh>Description</STh>
                  <STh>Quantity</STh>
                  <STh>Price</STh>
                  <STh>Discount</STh>
                  <STh>TAX</STh>
                  <STh>Amount</STh>
                </tr>
                {invoice?.invoice_items?.length > 0 &&
                  invoice?.invoice_items?.map((row, index) => (
                    <tr>
                      <STd>{row.description}</STd>
                      <STd>
                        {row.qty} {row.qty_type}
                      </STd>
                      <STd>{row.unit_price}</STd>
                      <STd>{row.discount}%</STd>
                      <STd>{row.tax}%</STd>
                      <STd>{row.amount}</STd>
                    </tr>
                  ))}
              </STable>
            </SimpleBar>
            <Stack
              mt={3}
              sx={{
                background: '#f9f9fa',
                borderRadius: '25px',
                py: 3,
                pr: 10,
                border: '1px solid #edeff2',
              }}
            >
              <Stack justifyContent="flex-end" flexDirection="row">
                <Stack width="30%" fontSize="18px" textAlign="left">
                  Amount without tax
                </Stack>
                <Stack width="20%" fontSize="18px" textAlign="right">
                  {invoice?.amount_total +
                    ' ' +
                    (invoice?.amount_currency && invoice?.amount_currency) || 'No data'}
                </Stack>
              </Stack>
              <Stack justifyContent="flex-end" flexDirection="row">
                <Stack width="30%" fontSize="18px" textAlign="left">
                  Total Tax amount
                </Stack>
                <Stack width="20%" fontSize="18px" textAlign="right">
                  {invoice?.amount_total_tax +
                    ' ' +
                    (invoice?.amount_currency && invoice?.amount_currency) || 'No data'}
                </Stack>
              </Stack>
              <Stack justifyContent="flex-end" flexDirection="row">
                <Stack width="30%" fontSize="18px" fontWeight={700} textAlign="left">
                  Total amount
                </Stack>
                <Stack width="20%" fontSize="18px" fontWeight={700} textAlign="right">
                  {invoice?.amount_with_tax +
                    ' ' +
                    (invoice?.amount_currency && invoice?.amount_currency) || 'No data'}
                </Stack>
              </Stack>
            </Stack>
            {/* <Stack
              mt={20}
              sx={{
                background: '#f9f9fa',
                borderRadius: '25px',
                py: 4,
                px: 6,
                border: '1px solid #edeff2',
              }}
            >
              <Stack>
                <RobotoTypography fontSize="28px" fontWeight={700}>
                  Thank for your business!
                </RobotoTypography>
                <RobotoTypography fontSize="18px">MegaDev | + 380 (93) 385 27 71</RobotoTypography>
              </Stack>
            </Stack> */}
          </Stack>
        </Stack>
      </PageLayout>
    </Page>
  );
};
