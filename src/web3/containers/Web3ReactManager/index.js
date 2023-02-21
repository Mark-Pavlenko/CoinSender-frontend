import { useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import { network } from '../../../utils/connectors';
import useInactiveListener from '../../../hooks/useInactiveListener';
import useEagerConnect from '../../../hooks/useEagerConnect';
import { toast } from 'react-toastify';

export default function Web3ReactManager({ children }) {
  // const { active, error, activate } = useWeb3React();

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  // useEffect(() => {
  //   if (!error && !active) {
  //     activate(network);
  //   }
  // }, [activate, error, active]);

  // // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  // // useInactiveListener(!triedEager);

  // useEffect(() => {
  //   if (error && !(error instanceof UnsupportedChainIdError)) {
  //     toast.error('WEB3 Error');
  //   }
  // }, [error]);

  // // on page load, do nothing until we've tried to connect to the injected connector
  // // if (!triedEager) {
  // //   return null;
  // // }
  return children;
}
