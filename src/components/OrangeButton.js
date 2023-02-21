import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const OrangeButton = styled(Button)({
  background: '#FD9B28',
  boxSizing: 'border-box',
  boxShadow: 'initial',
  border: '3px solid #FD9B28',
  color: 'black',
  '&:hover': {
    background: 'inherit',
    opacity: 0.85
  }
});
