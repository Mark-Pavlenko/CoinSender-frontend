import { getContract, getSignContract, getUnsignContract } from '../utils/contracts';
import MULTI_SEND_ABI from '../web3/abi/MultiSend.json';
import { useWeb3React } from '@web3-react/core';
import { REACT_APP_DEFAULT_CHAIN_ID } from 'src/utils/connectors';
import { CONTRACTS } from 'src/utils/const';
import { getAddressByChainId } from 'src/utils/index';

function useContractByChainId(address, ABI, withSignerIfPossible = true) {
  const { library, account, chainId } = useWeb3React();
  return getContract(
    getAddressByChainId(address, chainId || Number(REACT_APP_DEFAULT_CHAIN_ID)),
    ABI,
    library,
    withSignerIfPossible && account ? account : undefined,
  );
}

function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React();
  return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
}

function useSignContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useWeb3React();
  return getSignContract(
    address,
    ABI,
    library,
    withSignerIfPossible && account ? account : undefined,
  );
}

function useUnsignContract(address, ABI) {
  const { library } = useWeb3React();
  return getUnsignContract(address, ABI, library);
}

export const usePoapLinksSignContract = () => {
  const { chainId } = useWeb3React();
  return useSignContract(
    getAddressByChainId(CONTRACTS, chainId || Number(REACT_APP_DEFAULT_CHAIN_ID)),
    MULTI_SEND_ABI,
    true,
  );
};

export const usePoapLinksUnsignContract = (withSignerIfPossible = false) => {
  const { chainId } = useWeb3React();
  return useUnsignContract(
    getAddressByChainId(CONTRACTS, chainId || Number(REACT_APP_DEFAULT_CHAIN_ID)),
    MULTI_SEND_ABI,
    withSignerIfPossible,
  );
};

export default useContract;
