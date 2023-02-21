import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
// material
import { Box } from '@mui/material';
import LogoImage from '../assets/icons/logo.png';
import { BANKING, INVOICE } from '../constants/routes';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const StyledRouterLink = styled(RouterLink)`
  display: contents;
`;

const StyledBox = styled(Box)`
  width: 100%;
  height: auto;
`;

export default function Logo({ sx }) {
  const auth = useSelector(({ AuthUser: { isAuth } }) => {
    return isAuth;
  });
  return (
    <StyledRouterLink to={auth ? INVOICE : '/'}>
      <StyledBox component="img" src={LogoImage} sx={{ borderRadius: '15px', ...sx }} />
    </StyledRouterLink>
  );
}
