import React, { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import Notification from './components/notification/notification';
import { useDispatch } from 'react-redux';
import { IS_AUTH } from './constants/actions';
import Web3Wrapper from './web3/containers/Web3Wrapper';
import { QueryClient, QueryClientProvider } from 'react-query';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch({ type: IS_AUTH });
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <Web3Wrapper>
      <QueryClientProvider client={queryClient}>
        <ThemeConfig>
          <Router />
          <Notification />
        </ThemeConfig>
      </QueryClientProvider>
    </Web3Wrapper>
  );
}
