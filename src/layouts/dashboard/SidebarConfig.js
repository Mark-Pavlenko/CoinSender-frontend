import {
  SIGN_IN,
  SIGN_UP,
  OVERVIEW,
  CANDIDATES,
  EMPLOYEES,
  CALENDAR,
  WEEKENDS,
  STATISTIC,
  STRUCTURE,
  SCHEDULE,
  WAREHOUSE,
  PROJECTS,
  LOADING,
  TIMESHEET,
  INVOICE,
  BANKING,
  INVOICE_LIST,
  INVOICE_DETAILS,
  INVOICE_CREATE,
  INVOICE_EDIT,
  TRANSACTIONS,
  CLIENTS,
} from '../../constants/routes';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InvoiceIcon from '../../assets/icons/invoice-icon.svg';

const getIcon = (name) => <img src={name} alt="" />;
const user = JSON.parse(localStorage.getItem('authorization_login'));

const sidebarConfig = [
  // {
  //   title: 'overview',
  //   path: OVERVIEW,
  // },
  // {
  //   title: 'HR',
  //   children: [
  //     {
  //       title: 'calendar',
  //       path: CALENDAR,
  //     },
  //     {
  //       title: 'weekends',
  //       path: WEEKENDS,
  //     },
  //     {
  //       title: 'statistic',
  //       path: STATISTIC,
  //     },
  //     {
  //       title: 'structure',
  //       path: STRUCTURE,
  //     },
  //   ],
  // },
  // {
  //   title: 'PM',
  //   children: [
  //     {
  //       title: 'projects',
  //       path: PROJECTS,
  //     },
  //     {
  //       title: 'timesheet',
  //       path: TIMESHEET,
  //     },
  //   ],
  // },
  // {
  //   title: 'schedule',
  //   path: SCHEDULE,
  // },
  // {
  //   title: 'warehouse',
  //   path: WAREHOUSE,
  // },

  {
    title: 'My Invoices',
    icon: getIcon(InvoiceIcon),
    children: [
      {
        title: 'Invoices',
        path: INVOICE,
      },
      {
        title: 'Customers',
        path: CLIENTS,
      },
    ],
  },
  {
    title: 'Expenses',
    icon: <AccountBalanceIcon />,
    children: [
      {
        title: 'Make Payment ',
        path: BANKING,
      },
      {
        title: 'employees',
        path: EMPLOYEES,
      },
      // {
      //   title: 'My transfers',
      //   path: TRANSACTIONS,
      // },
    ],
  },

  // {
  //   title: 'login',
  //   path: SIGN_IN,
  //   icon: getIcon('eva:lock-fill'),
  // },

  // {
  //   title: 'register',
  //   path: SIGN_UP,
  //   icon: getIcon('eva:person-add-fill'),
  // },
];

export default sidebarConfig;
