import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { INVOICE_CREATE } from '../../constants/routes';
import InvoiceTable from './components/InvoiceTable';
import { useDispatch, useSelector } from 'react-redux';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

export const Invoice = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_ADMIN_INVOICES' });
  }, []);

  const invoices = useSelector(({ invoices: { adminInvoices } }) => adminInvoices);
  const { t } = useTranslation('common');

  return (
    <Page title="Invoices | CoinSender">
      <PageLayout>
        <PageTitle
          title={`Invoices | ${invoices?.length || 0}`}
          button_name="New invoice"
          button_route={INVOICE_CREATE}
        />

        <Stack>
          <InvoiceTable data={invoices} />
        </Stack>
      </PageLayout>
    </Page>
  );
};
