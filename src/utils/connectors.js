import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const REACT_APP_DEFAULT_CHAIN_ID = 71402;
export const REACT_APP_GW_TESTNET_RPC_URL = 'https://godwoken-testnet-v1.ckbapp.dev';
export const REACT_APP_GW_MAINNET_RPC_URL = 'https://v1.mainnet.godwoken.io/rpc';
export const REACT_APP_BSC_MAINNET_RPC_URL = 'https://bsc-dataseed1.binance.org/';
export const REACT_APP_ETH_MAINNET_RPC_URL = 'https://eth-mainnet.public.blastapi.io';
export const DEFAULT_CHAIN_ID = Number(REACT_APP_DEFAULT_CHAIN_ID);

export const POLLING_INTERVAL = 12000;

export const NETWORK_URLS = {
  71401: REACT_APP_GW_TESTNET_RPC_URL,
  71402: REACT_APP_GW_MAINNET_RPC_URL,
  56: REACT_APP_BSC_MAINNET_RPC_URL,
  1: REACT_APP_ETH_MAINNET_RPC_URL,
};

export const injected = new InjectedConnector({
  supportedChainIds: [71401, 71402, 56, 1],
});

export const network = new NetworkConnector({
  urls: {
    71401: NETWORK_URLS[71401],
    71402: NETWORK_URLS[71402],
    56: NETWORK_URLS[56],
    1: NETWORK_URLS[1],
  },
  defaultChainId: DEFAULT_CHAIN_ID,
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    71401: NETWORK_URLS[71401],
    71402: NETWORK_URLS[71402],
    56: NETWORK_URLS[56],
    1: NETWORK_URLS[1],
  },
  bridge: 'https://pancakeswap.bridge.walletconnect.org/',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const ConnectorNames = {
  Injected: 'Injected',
  Network: 'Network',
  WalletConnect: 'WalletConnect',
};

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletConnect,
  injected: injected,
};
