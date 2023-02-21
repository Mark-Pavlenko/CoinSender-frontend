import { Stack, Button, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Iconify from '../../../components/Iconify';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

export default function CustomDate({
  isVisible,
  setIsVisible,
  date,
  setStartDate,
  setEndDate,
  text,
  minDate,
}) {
  const { t } = useTranslation('common');

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        color="primary"
        variant="contained"
        sx={{ mr: 1 }}
        onClick={() => setIsVisible(true)}
        aria-label="delete"
      >
        <Iconify icon="eva:edit-fill" />
      </IconButton>
      {text} {moment(date).format('MMMM DD, YYYY')}
      <Stack sx={{ visibility: 'hidden', position: 'absolute', top: '100px', right: '100px' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DatePicker
              disablePast
              label={t('date.added')}
              value={date}
              onClose={() => {
                setIsVisible(false);
              }}
              onChange={(value) => {
                if (text === 'Issued on') {
                  setStartDate(value);
                  console.log(dayjs(value).add(1, 'month'));
                  setEndDate(new Date(dayjs(value).add(1, 'month')));
                } else {
                  setEndDate(value);
                }
              }}
              open={isVisible}
              minDate={minDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </Stack>
    </Stack>
  );
}
