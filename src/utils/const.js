import { connectorsByName } from './connectors';

export const ACTIVATE_NETWORK = connectorsByName.Network;

export const WALLETS = [
  {
    name: 'Metamask',
    icon: 'metamask.svg',
    walletConnector: connectorsByName.Injected,
  },
  // {
  //   name: 'WalletConnect',
  //   icon: 'wallet-connect.svg',
  //   walletConnector: connectorsByName.WalletConnect,
  // },
];

export const CONTRACTS = {
  71401: '0x4Adb7d14c0f899506EeBa72340e021d182D94837',
  71402: '0xA4b86a26A1C6751D9dc320416F30ff2fcbCdC946',
  1: '0xcC9FBd0CE84B843123Cce850bCBF9dAbD30bdc3f',
  56: '0x73070A6e91B6cf1A07b534bB0360a775B4C1aF69',
};

export const TOKENS = {
  71401: 'CKB',
  71402: 'CKB',
  1: 'ETH',
  56: 'BNB',
};
