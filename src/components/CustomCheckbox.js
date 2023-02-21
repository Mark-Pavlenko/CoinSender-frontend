import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

export const CustomCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-indeterminate': {
    color: '#FD9B28'
  },
  '&.Mui-checked': {
    color: '#FD9B28'
  }
});