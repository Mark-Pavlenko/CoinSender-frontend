import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { connect, useDispatch } from 'react-redux';

import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

function ForgotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      corporate_email: '',
    },

    validationSchema: Yup.object().shape({
      corporate_email: Yup.string()
        .email('Email must be a valid email address')
        .required('Email is required'),
    }),

    onSubmit: () => {
      dispatch({ type: 'FORGOT_USER_PASSWORD', payload: values, navigate });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          {...getFieldProps('corporate_email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <LoadingButton
          disabled={!formik.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Send
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

const mapStateToProps = (state) => ({ state });
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ForgotForm);
