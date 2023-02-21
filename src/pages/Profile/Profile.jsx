/* eslint-disable */
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Page from '../../components/Page';
import { Container, Stack, Typography, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ProfileTab from './components/ProfileTab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { ChangePassFormProfile } from './components/ChangePassFormProfile';
import { EDIT_PROFILE } from 'src/constants/routes';
import { PageLayout } from 'src/layouts/PagesLayout';
import { PageTitle } from 'src/components/PageTitle';
import { WalletsTab } from './components/WalletsTab';

export const Profile = () => {
  const { t } = useTranslation('common');
  const [value, setValue] = React.useState('1');
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch({ type: 'GET_EMPLOYEE_SAGA', payload: user?.id }), [];
    dispatch({ type: 'GET_GENERAL_WALLETS', payload: user.organization_id });
  });

  return (
    <Page title="Profile | CoinSender">
      <PageLayout>
        <PageTitle title="Profile" />
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
                <Tab icon={<SettingsIcon />} iconPosition="start" label={t('Settings')} value="2" />
                <Tab
                  icon={<AccountBalanceWalletIcon />}
                  iconPosition="start"
                  label={t('Wallets')}
                  value="3"
                />
              </TabList>
              {value === '1' && (
                <Stack>
                  <Button component={Link} to={EDIT_PROFILE} variant="contained">
                    {t('Edit')}
                  </Button>
                </Stack>
              )}
            </Stack>
            <TabPanel sx={{ px: 0, py: 2 }} value="1">
              <ProfileTab user={user} />
            </TabPanel>
            <TabPanel sx={{ px: 0, py: 2 }} value="2">
              <ChangePassFormProfile />
            </TabPanel>
            <TabPanel sx={{ px: 0, py: 2 }} value="3">
              <WalletsTab />
            </TabPanel>
          </TabContext>
        </Stack>
      </PageLayout>
    </Page>
  );
};
