import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Link } from '@mui/material';
import { SIGN_IN } from '../../../constants/routes';

function ForgotSuccess() {
  return (
    <div>
      <Link variant="subtitle2" component={RouterLink} to={SIGN_IN} underline="none">
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Return to Main Page
        </LoadingButton>
      </Link>
    </div>
  );
}

export default ForgotSuccess;
