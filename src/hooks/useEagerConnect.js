import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, network, walletConnect } from '../utils/connectors';

const useEagerConnect = () => {
  const { activate, active } = useWeb3React();
  const [tried, setTried] = useState(false);

  const checkIsActive = async () => {
    const isAuthorized = await injected.isAuthorized();
    if (isAuthorized && active) {
      activate(injected)
        .then(() => {
          setTried(true);
        })
        .catch((error) => {
          console.error(error);
          setTried(true);
        });
    } else if (localStorage.walletconnect) {
      activate(walletConnect)
        .then(() => {
          setTried(true);
        })
        .catch((error) => {
          console.error(error);
          setTried(true);
        });
    } else if (network) {
      activate(network)
        .then(() => {
          setTried(true);
        })
        .catch((error) => {
          console.error(error);
          setTried(true);
        });
    } else {
      setTried(true);
    }
  };

  useEffect(() => {
    checkIsActive();
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
    return setTried((prev) => prev);
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
