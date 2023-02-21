import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const SContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: '0 24px 0 24px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 32px 0 32px',
  },
}));

export const PageLayout = ({ children }) => {
  return (
    <SContainer maxWidth="4000px" disableGutters>
      {children}
    </SContainer>
  );
};
