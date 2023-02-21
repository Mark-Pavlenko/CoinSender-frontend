import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { WALLETS } from '../../../utils/const';
import { network, injected, connectorsByName } from '../../../utils/connectors';
import { delay } from '../../../utils/index';

import { WrongNetwork, InitializingWallet } from '../index';

import styles from './WalletConnect.module.scss';

import metaLogo from '../../../assets/images/wallet-icons/metamask.svg';
import walletConnectLogo from '../../../assets/images/wallet-icons/wallet-connect.svg';

import MenuPopover from '../../MenuPopover';
import { Box, Button, Divider, Stack, Typography, Modal } from '@mui/material';
import { formatEther } from 'ethers/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUserBalance } from 'src/redux/actions';

import { tokenSymbol } from 'src/utils';

/**
 * Used for resetting account selection in Metamask
 * @param connector InjectedConnector
 */
async function resetPermissions(connector) {
  // Runs only they are brand new, or have hit the disconnect button
  const provider = await connector.getProvider();
  await provider.request({
    method: 'wallet_requestPermissions',
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
}

const networks = [
  {
    name: 'Godwoken',
    id: 71402,
  },
  {
    name: 'Ethereum',
    id: 1,
  },
  {
    name: 'Binance',
    id: 56,
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  padding: '48px 24px 64px',
};

const WalletConnectComponent = ({ type, isWalletModalVisiable }) => {
  const [isInitializingVisible, setIsInitializingVisible] = useState(false);
  const [pendingWallet, setPendingWallet] = useState();
  const [pendingError, setPendingError] = useState();
  const [currentWallet, setCurrentWallet] = useState();
  const [isWrongNetworkVisible, setIsWrongNetworkVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPopup, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { activate, account, library, connector, deactivate, error, chainId } = useWeb3React();

  const userBalance = useSelector(({ AuthUser: { balance } }) => {
    return balance;
  });

  const getCurrentWallet = (currentConnector) => {
    const wallet = WALLETS.find(({ walletConnector }) => currentConnector === walletConnector);
    setCurrentWallet(wallet);
  };

  const getCurrentNetwork = () => {
    if (chainId) {
      return networks.find(({ id }) => id === chainId).name;
    }
    return 'No data';
  };

  const activateWallet = useCallback(async (walletConnector) => {
    setPendingWallet(walletConnector);
    setOpen(false);
    setIsInitializingVisible(true);

    if (walletConnector) {
      setPopupOpen(false);
      await resetPermissions(walletConnector);
      activate(connectorsByName['injected']);
      localStorage.setItem('provider', 'injected');
    } else {
      setPendingError(true);
    }
  }, []);

  const handleCloseOnLogin = async () => {
    await delay(2000);
    setIsInitializingVisible(false);
  };

  const handleShowWrongNetwork = async () => {
    await delay(2000);
    setIsWrongNetworkVisible(true);
    activate(network);
  };

  useEffect(async () => {
    const provider = localStorage.getItem('provider');

    if (provider == 'null') {
      return setOpen(true);
    }
    if (provider) {
      return activate(connectorsByName[provider]);
    }
  }, []);

  useEffect(() => {
    if (account) {
      handleCloseOnLogin();
    }
  }, [account]);

  const [userMenuDropdown, setUserMenuDropdown] = useState(false);

  const userMenuRef = useRef();

  const handlerOutsideClick = (e) => {
    if (!e.path.includes(userMenuRef.current)) {
      setUserMenuDropdown(false);
    }
  };

  useEffect(() => {
    if (userMenuDropdown) {
      document.body.addEventListener('click', handlerOutsideClick);
    }
    return () => {
      document.body.removeEventListener('click', handlerOutsideClick);
    };
  }, [userMenuDropdown, handlerOutsideClick]);

  useEffect(() => {
    async function getBal() {
      const balance = await library.getBalance(account);
      dispatch(setUserBalance(formatEther(balance.toString())));
    }
    if ((library, account)) {
      getBal();
    }
  }, [library, account]);

  return (
    <>
      {account ? (
        <div style={{ color: 'black', display: type === 'second' ? 'none' : 'block' }}>
          <Stack>
            <Button
              onClick={(event) => {
                setAnchorEl(event.currentTarget);

                setPopupOpen(true);
              }}
              variant="contained"
            >
              Info
            </Button>
          </Stack>
          <MenuPopover
            anchorEl={anchorEl}
            open={openPopup}
            onClose={() => {
              setPopupOpen(false);
              setAnchorEl(null);
            }}
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
                {account && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      py: 2,
                      px: 2.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      Network:
                    </Typography>
                    &nbsp;
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {getCurrentNetwork()}
                    </Typography>
                  </Box>
                )}
                <Divider />

                {account && (
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
                      {account.slice(0, 9) + '...' + account.slice(-3) || ''}
                    </Typography>
                  </Box>
                )}
                <Divider />

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
                    {userBalance + ' ' + tokenSymbol(chainId) || ''}
                  </Typography>
                </Box>

                <Box ml={2}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      deactivate();
                      localStorage.setItem('provider', null);
                    }}
                  >
                    Disconnect
                  </Button>
                </Box>
              </div>
            </Box>
          </MenuPopover>
        </div>
      ) : (
        <Button
          sx={{ display: type === 'second' ? 'none' : 'block' }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Connect a wallet
        </Button>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <Stack spacing={2}>
            <Stack textAlign="center">
              <Typography mb={2} fontSize="24px" color="#242424" fontWeight={500}>
                Connect your wallet
              </Typography>
              <Typography mb={3} fontSize="14px" color="#242424">
                In order for you to use all the advantages of our service, connect your wallet to
                your account
              </Typography>
              <ul className={styles.walletList}>
                {WALLETS.map(({ name, icon, walletConnector }) => {
                  return (
                    <li key={name}>
                      <Button
                        sx={{ width: '100%' }}
                        onClick={() => activateWallet(walletConnector)}
                        block
                      >
                        {name == 'Metamask' && <img src={metaLogo} alt="icon" />}
                        {name == 'WalletConnect' && <img src={walletConnectLogo} alt="icon" />}
                        Connect {name}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={isInitializingVisible}
        onClose={() => setIsInitializingVisible(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <Stack spacing={2}>
            <InitializingWallet
              connector={pendingWallet}
              error={pendingError}
              activateWallet={activateWallet}
              setPendingError={setPendingError}
            />
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={isWrongNetworkVisible}
        onClose={() => {
          setIsWrongNetworkVisible(false);
          setIsInitializingVisible(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <Stack spacing={2}>
            <WrongNetwork>
              <Button
                variant="contained"
                onClick={() => {
                  setIsWrongNetworkVisible(false);
                  setIsInitializingVisible(false);
                }}
              >
                Okay
              </Button>
            </WrongNetwork>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
export default memo(WalletConnectComponent);
