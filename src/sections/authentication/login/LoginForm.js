import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { gapi } from 'gapi-script';
import googleIcon from '../../../assets/images/google.png';

// material
import {
  Link,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { loginUser, googleLoginAction } from '../../../redux/actions';
import { FORGOT_PASSWORD, SIGN_UP } from '../../../constants/routes';
import { GoogleLogin } from 'react-google-login';

import styled from 'styled-components';
const GOOGLE_CLIENT_ID = '405150766512-pl33ad95bs7uqe9urolbaojgosticsae.apps.googleusercontent.com';

// ----------------------------------------------------------------------

function LoginForm({ loginUser }) {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: GOOGLE_CLIENT_ID,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (value) => {
      loginUser(value, navigate);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const onGoogleLoginSuccess = async (responce) => {
    if (responce.tokenId) {
      dispatch(googleLoginAction(responce.tokenId, navigate));
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} mb={2}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
        <Typography sx={{ color: '#FFA31A', fontFamily: 'Futura Md BT' }} mb={3} color="#808080">
          <Link
            fontSize="14px"
            fontWeight={500}
            component={RouterLink}
            to={FORGOT_PASSWORD}
            underline="hover"
          >
            Forgot Password?
          </Link>
        </Typography>
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>

        <Divider sx={{ mb: -2, mt: 1 }}>or</Divider>

        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => <GoogleLoginCustomButton renderProps={renderProps} />}
          onSuccess={onGoogleLoginSuccess}
          onFailure={(err) => console.log(err)}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
          buttonText={'Login with Google'}
          accessType={'offline'}
          autoLoad={false}
          prompt="consent"
        />

        <Stack textAlign="center" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
          <Typography color="#808080" textAlign="center" variant="subtitle1">
            Don’t have an account?{' '}
            <Link
              fontSize="16px"
              fontWeight={500}
              component={RouterLink}
              to={SIGN_UP}
              underline="always"
            >
              Sign Up
            </Link>
          </Typography>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

const GoogleLoginCustomButton = ({ renderProps }) => {
  return (
    <GoogleButtonContainer>
      <StyledGoogleLoginButton onClick={renderProps.onClick} style={{ width: '100%' }}>
        <ImageComponent src={googleIcon} />
        Login with Google
      </StyledGoogleLoginButton>
    </GoogleButtonContainer>
  );
};

const GoogleButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid rgba(149, 157, 165, 0.12);
  box-shadow: rgba(149, 157, 165, 0.12) 0px 8px 24px;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.32) 0px 8px 24px;
  }
`;

const StyledGoogleLoginButton = styled.button`
  background: none;
  outline: none;
  padding: 8px;
  cursor: pointer;
  width: 100px;
  border: none;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageComponent = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 10px;
`;
const mapStateToProps = (state) => ({ state });
const mapActionsToProps = { loginUser };

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
