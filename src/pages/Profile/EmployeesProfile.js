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
import LeftIcon from '../../assets/icons/arrow-button-left.svg';
import { EMPLOYEES } from 'src/constants/routes';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';

const AntTabs = styled(TabList)({
  '& .MuiTabs-indicator': {
    background: '#FD9B28',
  },
  '& .css-1da5c08-MuiButtonBase-root-MuiTab-root.Mui-selected': {
    color: '#FD9B28',
  },
});

export const EmployeesProfile = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState('1');
  const user = useSelector(({ AuthUser: { user } }) => user);
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

  useEffect(() => dispatch({ type: 'GET_EMPLOYEE_SAGA', payload: params }), []);
  useEffect(() => {
    if (employee?.employee) {
      localStorage.setItem('currentEmployee', JSON.stringify(employee?.employee));
    }
  }, [employee]);

  return (
    <Page title="Employee's Profile | CoinSender">
      <PageLayout>
        {!employee.isLoading && params ? (
          <Stack>
            <PageTitle title="Employee's profile" path={EMPLOYEES} />
            <Stack>
              <TabContext value={value}>
                <Stack
                  display="flex"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <AntTabs
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
                  </AntTabs>
                  <Stack>
                    <Button
                      component={Link}
                      to={`/application/employees/${params}/edit`}
                      variant="contained"
                    >
                      {t('Edit')}
                    </Button>
                  </Stack>
                </Stack>

                <TabPanel sx={{ px: 0, py: 2 }} value="1">
                  <EmployeeProfileTab params={params} user={employee.employee} />
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
