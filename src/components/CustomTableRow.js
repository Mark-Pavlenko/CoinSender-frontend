import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export const CustomTableRow = styled(TableRow)({
  '&.Mui-selected': {
    backgroundColor: 'rgba(253, 155, 40, 0.5)'
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'rgba(253, 155, 40, 0.6)'
  }
});