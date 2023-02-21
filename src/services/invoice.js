import { instance } from './index';

export const getAllInvoices = () => instance.get(`/invoices/getallinvoices`);
export const getAllWallets = (data) => instance.get(`/general-wallets/organization-id/${data}`);
export const getAdminInvoices = () => instance.get(`/invoices/admin-invoices`);
export const getInvoiceNumber = () => instance.get(`/invoices/getinvoicenumber`);
export const addInvoice = (data) => instance.post(`/invoices/create`, data);
export const editWallet = (data) => instance.patch(`/general-wallets/edit`, data);
export const deleteWallet = (data) => instance.delete(`/general-wallets/delete`, { data });
export const addGeneralWallet = (data) => instance.post(`/general-wallets/bind`, data);
export const getInvoiceById = (data) => instance.post(`/invoices/by-id`, data);
