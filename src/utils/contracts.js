import { Contract } from '@ethersproject/contracts';
import { isAddress } from '@ethersproject/address';
import { calculateGasMargin } from '.';

export const getSigner = (library, account) => library.getSigner(account).connectUnchecked();

export const getProviderOrSigner = (library, account) =>
  account ? getSigner(library, account) : library;

export const getContract = (address, ABI, library, account) => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, library && getProviderOrSigner(library, account));
};

export const getSignContract = (address, ABI, library, account) => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, library && account && getSigner(library, account));
};

export const getUnsignContract = (address, ABI, library) => {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, library);
};

export const buildQuery = async (method, args, estimateGas = false, options) => {
  let tx;
  try {
    if (estimateGas) {
      const gasLimit = await estimateGas(...args, options);
      tx = await method(...args, {
        gasLimit: calculateGasMargin(gasLimit),
        ...options,
      });
    } else {
      tx = await method(...args, options);
    }
    if (tx?.hash) {
      localStorage.transactionHash = `${tx.hash}`;
    }
    if (tx?.wait) {
      await tx.wait();
      localStorage.transactionHash = '';
    }
  } catch (err) {
    console.error(`buildQuery failed with args: ${args}`);
    throw new Error(err.error?.message || err.message || err);
  }

  return tx;
};

export const buildQueryGodwoken = async (method, args, estimateGas = '', options) => {
  let tx;
  try {
    if (estimateGas) {
      tx = await method(...args, {
        gasLimit: estimateGas,
        ...options,
      });
    } else {
      tx = await method(...args, options);
    }
    if (tx?.hash) {
      localStorage.transactionHash = `${tx.hash}`;
    }
    if (tx?.wait) {
      await tx.wait();
      localStorage.transactionHash = '';
    }
  } catch (err) {
    console.error(`buildQueryGodwoken failed with args: ${args}`);
    throw new Error(err.error?.message || err.message || err);
  }

  return tx;
};
