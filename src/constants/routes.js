/* Auth */
export const SIGN_IN = '/application/auth';
export const SIGN_UP = '/application/auth/signup';
export const CHANGE_PASSWORD = '/application/restore-password/:token';
export const FORGOT_PASSWORD = '/application/forgot';
export const COMPLETE_INVITE = '/auth/complete-invite';
export const ERROR = '/404';
export const APPLICATION = '/application';
export const REFRESH = `${SIGN_IN}/refresh`;
export const SIGN_IN_COMPANY = `${SIGN_IN}/company`;

/* Settings */
export const SETTINGS = `${APPLICATION}/settings`;
export const SETTINGS_ACCOUNT = `${SETTINGS}/account`;
export const SETTINGS_USER = `${SETTINGS}/user`;
export const SETTINGS_USERS = `${SETTINGS}/users`;

/* Dashboard */
export const OVERVIEW = `${APPLICATION}/overview`;
export const EMPLOYEES = `${APPLICATION}/employees`;
export const CLIENTS = `${APPLICATION}/partners`;
export const TRANSACTIONS = `${APPLICATION}/transfers`;
export const NEW_EMPLOYEES = `${EMPLOYEES}/new`;
export const NEW_CLIENT = `${CLIENTS}/new`;
export const EDIT_EMPLOYEE = `${EMPLOYEES}/:id/edit`;
export const EDIT_CLIENT = `${CLIENTS}/:id/edit`;
export const CANDIDATES = `${APPLICATION}/candidates`;
export const NEW_CANDIDATE = `${CANDIDATES}/new`;
export const CALENDAR = `${APPLICATION}/calendar`;
export const WEEKENDS = `${APPLICATION}/weekends`;
export const STATISTIC = `${APPLICATION}/statistic`;
export const STRUCTURE = `${APPLICATION}/structure`;
export const SCHEDULE = `${APPLICATION}/schedule`;
export const PROJECTS = `${APPLICATION}/projects`;
export const INVOICE = `${APPLICATION}/invoice`;
export const BANKING = `${APPLICATION}/banking`;
export const LOADING = `${APPLICATION}/loading`;
export const TIMESHEET = `${APPLICATION}/timesheet`;
export const WAREHOUSE = `${APPLICATION}/warehouse`;
export const PROFILE = `${APPLICATION}/profile`;
export const EDIT_PROFILE = `${APPLICATION}/profile/edit`;
export const PROFILE_BY_ID = `${EMPLOYEES}/:id/profile`;
export const CLIENT_PROFILE = `${CLIENTS}/:id/profile`;
export const USER = `${APPLICATION}/user`;
export const PRODUCTS = `${APPLICATION}/products`;
export const BLOG = `${APPLICATION}/blog`;
export const ACCOUNT_CHANGE_PASSWORD = `${APPLICATION}/account/change-password`;
export const APP = `${APPLICATION}/app`;
export const NEW_TECHNIQUE = `${WAREHOUSE}/new`;
export const EDIT_WEEKENDS = `${WEEKENDS}/edit`;
export const INVOICE_LIST = `${INVOICE}/list`;
export const INVOICE_DETAILS = `${INVOICE}/details`;
export const INVOICE_CREATE = `${INVOICE}/create`;
export const INVOICE_EDIT = `${INVOICE}/:id/edit`;
export const INVOICE_DETAIL = `${INVOICE}/:id`;
