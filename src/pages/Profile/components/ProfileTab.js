import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Stack, Grid, Box, Typography, Alert, AlertTitle } from '@mui/material';
import ProfileLeftSide from './ProfileLeftSide';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { tokenSymbol } from 'src/utils';
import { useWeb3React } from '@web3-react/core';

const BlockWrapper = styled(Box)({
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
});

const CustomDivider = styled(Divider)({
  margin: '10px 0',
});

export default function ProfileTab({ user, params }) {
  const { t } = useTranslation('common');
  const { chainId, account } = useWeb3React();

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      ?.request({ method: 'eth_getBalance', params: [address, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum?.request({ method: 'eth_requestAccounts' }).then((result) => {
        accountChangeHandler(result[0]);
      });
    }
  };

  useEffect(async () => {
    await connectWalletHandler();
    await getUserBalance(defaultAccount);
  }, []);

  useEffect(async () => {
    await getUserBalance(defaultAccount);
  }, [userBalance]);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Grid container spacing={2}>
        <ProfileLeftSide user={user} />
        <Grid item xs={12} md={6} lg={8}>
          {params ? (
            <BlockWrapper
              sx={{
                paddingX: 4,
                paddingY: 4,
                mb: 3,
              }}
            >
              Wallet: {user?.wallet_id}
              <CustomDivider />
              Amount: {user?.amount}
            </BlockWrapper>
          ) : (
            <BlockWrapper
              sx={{
                paddingX: 4,
                paddingY: 4,
                mb: 3,
              }}
            >
              Email: {user?.email}
              <CustomDivider />
              Phone: {user?.phone || 'No data'}
              <CustomDivider />
              <Stack flexDirection="row" width="100%" alignItems="center" gap={2}>
                {account ? (
                  `Wallet: ${defaultAccount?.slice(0, 9) + '...' + defaultAccount?.slice(-3)}` || ''
                ) : (
                  <Alert sx={{ width: '100%' }} severity="info">
                    <AlertTitle>Wallet</AlertTitle>
                    Please connect your wallet to view information.
                  </Alert>
                )}
              </Stack>
              {account && (
                <Stack>
                  <CustomDivider />
                  Balance: {Number(userBalance).toFixed(2) + ' ' + tokenSymbol(chainId) || ''}
                </Stack>
              )}
            </BlockWrapper>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
