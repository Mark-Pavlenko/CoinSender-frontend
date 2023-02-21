import { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from '../../../utils/web3';
// import Web3ReactManager from '../Web3ReactManager';

const Web3Wrapper = ({ children }) => {
  useEffect(() => {
    if ('ethereum' in window) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
  }, []);
  return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};

export default Web3Wrapper;
