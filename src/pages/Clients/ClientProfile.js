/* eslint-disable */
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import { Button, Container, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import EmployeeProfileTab from './components/EmployeeProfileTab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, useParams } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RecentTransaction from '../Dashboard/RecentTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { CLIENTS } from 'src/constants/routes';
import LeftIcon from '../../assets/icons/arrow-button-left.svg';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

export const ClientProfile = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState('1');
  const user = useSelector(({ employees: { client } }) => client);
  const employee = useSelector(({ employees: { employee, isLoading } }) => ({
    employee,
    isLoading,
  }));

  const dispatch = useDispatch();
  const params = useParams().id;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const wallets = useSelector(({ wallets: { walletList, isLoading } }) => ({
    walletList,
    isLoading,
  }));

  const payments = useSelector(({ payments: { paymentList, isLoading, balance } }) => ({
    paymentList,
    balance,
    isLoading,
  }));

  useEffect(() => dispatch({ type: 'GET_CLIENT_BY_ID', id: params }), []);
  useEffect(() => {
    if (employee?.employee) {
      localStorage.setItem('currentEmployee', JSON.stringify(employee?.employee));
    }
  }, [employee]);

  return (
    <Page title="Partner Profile | CoinSender">
      <PageLayout>
        {!employee.isLoading && params ? (
          <Stack>
            <PageTitle
              title="Client's profile"
              path={CLIENTS}
              button_name="Edit"
              button_route={`/application/partners/${params}/edit`}
              button_icon={false}
            />
            <Stack>
              <TabContext value={value}>
                <Stack
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <TabList
                    variant="scrollable"
                    scrollButtons={false}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      icon={<AccountBoxIcon />}
                      iconPosition="start"
                      label={t('profile')}
                      value="1"
                    />
                  </TabList>
                </Stack>

                <TabPanel sx={{ px: 0, py: 2 }} value="1">
                  <EmployeeProfileTab params={params} user={user} />
                </TabPanel>
                <TabPanel sx={{ px: 0, py: 2 }} value="2">
                  <RecentTransaction wallets={wallets.walletList} data={payments.paymentList} />
                </TabPanel>
              </TabContext>
            </Stack>
          </Stack>
        ) : null}
      </PageLayout>
    </Page>
  );
};
