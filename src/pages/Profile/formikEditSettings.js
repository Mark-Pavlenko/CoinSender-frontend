import * as Yup from 'yup';

export const validationSchemaForCompany = Yup.object().shape({
  name: Yup.string().required('Is required'),
  second_name: Yup.string().required('Is required'),
});

export const initialValuesForCompany = {
  name: '',
  second_name: '',
  company: '',
  phone: '',
  email: '',
};
