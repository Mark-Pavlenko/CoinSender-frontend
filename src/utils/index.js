import { DEFAULT_CHAIN_ID } from './connectors';
import { TOKENS } from './const';
import { BigNumber as BigNumberETH } from '@ethersproject/bignumber';

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatAddress = (address) => {
  return address.length >= 10 ? `${address.slice(0, 5)}...${address.slice(-4)}` : address;
};

const SCAN_PREFIXES = {
  71402: 'https://v1.mainnet.godwoken.io/rpc',
  71401: 'https://godwoken-testnet-v1.ckbapp.dev',
  56: 'https://bsc-dataseed1.binance.org/',
  1: 'https://eth-mainnet.public.blastapi.io',
};

export function getScanLink(type, chainId, data) {
  const prefix = SCAN_PREFIXES[chainId] || SCAN_PREFIXES[1];
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export const getAddressByChainId = (address, chainId) =>
  chainId && address[chainId] ? address[chainId] : address[DEFAULT_CHAIN_ID];

export const calculateGasMargin = (value) =>
  value.mul(BigNumberETH.from(10000).add(BigNumberETH.from(2500))).div(BigNumberETH.from(10000));

export const tokenSymbol = (networkId) => {
  return TOKENS[networkId];
};
