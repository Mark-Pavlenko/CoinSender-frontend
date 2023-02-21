import NoData from '../assets/icons/No-data-cuate.svg';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const EmptyData = () => {
  const { t } = useTranslation('common');

  return (
    <Stack sx={{ width: '100%', alignItems: 'center', mt: 5 }}>
      <img style={{ width: '50%' }} src={NoData} alt="" />
      {t('no.data')}
    </Stack>
  );
};
