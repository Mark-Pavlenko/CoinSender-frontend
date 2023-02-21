import { Web3Provider } from '@ethersproject/providers';

import { POLLING_INTERVAL, REACT_APP_DEFAULT_CHAIN_ID } from './connectors';

import { numberToHex } from 'web3-utils';

export function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export const setupNetwork = async () => {
  const provider = window.ethereum;
  const chainId = REACT_APP_DEFAULT_CHAIN_ID;
  if (provider) {
    try {
      await provider.request({
        id: 1,
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        //@ts-ignore
        params: [{ chainId: numberToHex(chainId) }],
      });

      return true;
    } catch (switchError) {
      if (switchError?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                //@ts-ignore
                chainId: numberToHex(chainId),
                chainName: 'Godwoken Mainnet',
                nativeCurrency: {
                  name: 'CKB',
                  symbol: 'CKB',
                  decimals: 18,
                },
                rpcUrls: ['https://v1.mainnet.godwoken.io/rpc'],
                blockExplorerUrls: [`https://gw-mainnet-explorer.nervosdao.community/`],
              },
            ],
          });
          return true;
        } catch (error) {
          console.error('Failed to setup the network in Metamask:', error);
          return false;
        }
      }
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
};
