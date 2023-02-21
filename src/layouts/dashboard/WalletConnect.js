import React, { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import MenuPopover from '../../components/MenuPopover';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';

const WalletConnect = () => {
  const anchorRef = useRef(null);

  const { t } = useTranslation('common');

  const [open, setOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [buttonText, setButtonText] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  const { activate, account, connector, deactivate, error } = useWeb3React();

  useEffect(async () => {
    await connectWalletHandler();
    if (defaultAccount) {
      await setButtonText('Info');
    } else {
      await setButtonText('Connect wallet');
    }
  }, [defaultAccount]);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum?.request({ method: 'eth_requestAccounts' }).then((result) => {
        accountChangeHandler(result[0]);
      });
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  };

  const getUserBalance = (address) => {
    window.ethereum
      ?.request({ method: 'eth_getBalance', params: [address, 'latest'] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
        setIsLoading(false);
      });
  };

  const disconnectHandler = async () => {
    await window.ethereum
      .request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() =>
        window.ethereum.request({
          method: 'eth_requestAccounts',
        }),
      );
    setDefaultAccount(null);
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  window.ethereum?.on('accountsChanged', accountChangeHandler);

  window.ethereum?.on('chainChanged', chainChangedHandler);

  window.ethereum?.on('disconnect', disconnectHandler);

  return (
    <div style={{ color: 'black' }}>
      <Stack>
        <Button
          ref={anchorRef}
          onClick={() => {
            connectWalletHandler();
            handleOpen();
          }}
          variant="contained"
        >
          {buttonText}
        </Button>
      </Stack>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 'auto' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            py: 2,
            px: 2.5,
          }}
        >
          <div>
            {defaultAccount && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  py: 2,
                  px: 2.5,
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  Wallet Address:
                </Typography>
                &nbsp;
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {defaultAccount}
                </Typography>
              </Box>
            )}
            <Divider />
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  py: 2,
                  px: 2.5,
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  Loading...
                </Typography>
              </Box>
            )}
            {userBalance && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  py: 2,
                  px: 2.5,
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  Balance:
                </Typography>
                &nbsp;
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {userBalance}
                </Typography>
              </Box>
            )}
            <Box ml={2}>
              <Button variant="contained" onClick={() => deactivate()}>
                Disconnect!!!!!
              </Button>
            </Box>
            <div>{errorMessage}</div>
          </div>
        </Box>
      </MenuPopover>
    </div>
  );
};

export default WalletConnect;
