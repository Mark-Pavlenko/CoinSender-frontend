import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';

import {
  SIGN_IN,
  BANKING,
  ERROR,
  SIGN_UP,
  PROFILE,
  EMPLOYEES,
  TRANSACTIONS,
  PROFILE_BY_ID,
  EDIT_EMPLOYEE,
  EDIT_PROFILE,
  NEW_EMPLOYEES,
  INVOICE_CREATE,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  INVOICE,
  INVOICE_DETAIL,
  CLIENTS,
  CLIENT_PROFILE,
  EDIT_CLIENT,
  NEW_CLIENT,
} from './constants/routes';
import { Banking } from './pages/Dashboard/Dashboard';
import { NewInvoice } from './pages/Invoice/NewInvoice';
import { Invoice } from './pages/Invoice/invoice';
import DashboardLayout from './layouts/dashboard';
import Register from './pages/Register';
import { Profile } from './pages/Profile/Profile';
import { EditProfile } from './pages/Profile/EditProfile';
import { EmployeesProfile } from './pages/Profile/EmployeesProfile';
import Employees from './pages/Employees';
import Clients from './pages/Clients';
import { EditEmployee } from './pages/Employees/EditEmployee';
import { Transactions } from './pages/Transactions/Transactions';
import { NewEmployee } from './pages/Employees/NewEmployee';
import { InvoiceDetails } from './pages/Invoice/invoice_details';
import { ClientProfile } from './pages/Clients/ClientProfile';
import { EditClient } from './pages/Clients/EditClient';
import { NewClient } from './pages/Clients/NewClient';

export default function Router() {
  const auth = useSelector(({ AuthUser: { isAuth } }) => {
    return isAuth;
  });
  const localStorageAuth = localStorage.getItem('authorization_login');

  return useRoutes([
    {
      path: '/application',
      element: !auth && !localStorageAuth ? <AuthLayout /> : <Navigate to={INVOICE} />,
      children: [
        { path: '/application', element: <Navigate to={INVOICE} /> },
        { path: SIGN_UP, element: <Register /> },
        { path: SIGN_IN, element: <Login /> },

        { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
        { path: CHANGE_PASSWORD, element: <ChangePassword /> },
        // http://localhost:3000/application/auth/signup
      ],
    },
    {
      path: '/application',
      element: auth || localStorageAuth ? <DashboardLayout /> : <Navigate to={SIGN_IN} />,
      children: [
        { path: '/application', element: <Navigate to={SIGN_IN} /> },
        { path: BANKING, element: <Banking /> },
        { path: EMPLOYEES, element: <Employees /> },
        { path: CLIENTS, element: <Clients /> },
        { path: PROFILE, element: <Profile /> },
        { path: EDIT_PROFILE, element: <EditProfile /> },
        { path: PROFILE_BY_ID, element: <EmployeesProfile /> },
        { path: CLIENT_PROFILE, element: <ClientProfile /> },
        { path: SIGN_IN, element: <Login /> },
        { path: TRANSACTIONS, element: <Transactions /> },
        { path: EDIT_EMPLOYEE, element: <EditEmployee /> },
        { path: NEW_EMPLOYEES, element: <NewEmployee /> },
        { path: EDIT_CLIENT, element: <EditClient /> },
        { path: NEW_CLIENT, element: <NewClient /> },
        { path: INVOICE_CREATE, element: <NewInvoice /> },
        { path: INVOICE, element: <Invoice /> },
        { path: INVOICE_DETAIL, element: <InvoiceDetails /> },
        // user.role === "user" && { path: SIGN_IN, element: <Login /> },
      ],
    },
    {
      path: '/',
      element: !auth ? <AuthLayout /> : <Navigate to={SIGN_IN} />,
      children: [
        { path: '/', element: <Navigate to={SIGN_IN} /> },
        // { path: '*', element: <Navigate to={ERROR} /> },
      ],
    },
    {
      path: '/',
      element: auth ? <AuthLayout /> : <Navigate to={BANKING} />,
      children: [{ path: '/', element: <Navigate to={BANKING} /> }],
    },
    { path: '/api/google/redirect', element: <GoogleAuth /> },
  ]);
}

const GoogleAuth = () => {
  return <h1>test</h1>;
};
