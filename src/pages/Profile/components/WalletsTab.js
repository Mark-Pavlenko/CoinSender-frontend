import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MoreMenu from './MoreMenu';

export const WalletsTab = () => {
  const walletList = useSelector(({ invoices: { wallets } }) => wallets);

  return (
    <Stack mt={1}>
      {walletList.length === 0 && (
        <Typography mt="20%" textAlign="center" variant="subtitle2">
          You haven't created an wallet yet.
        </Typography>
      )}
      {walletList?.map(({ network, wallet_address, wallet_name, id }) => (
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Stack>
            <Typography variant="subtitle1">{wallet_name}</Typography>
            <Typography fontSize="14px">{network}</Typography>
          </Stack>
          <Stack flexDirection="row" gap={1} alignItems="center" justifyContent="center">
            <Typography>{wallet_address}</Typography>
            <MoreMenu wallet={{ network, wallet_address, id, wallet_name }} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
