import axios from 'axios';
import { API_BASE_URL } from '../constants/defaultURL';
import { instance } from './index';

export const getOrganisationList = () => axios.get(`${API_BASE_URL}organization`);
export const getWalletList = () => axios.get(`${API_BASE_URL}wallet`);
export const addOrganisation = (newOrganisation) =>
  axios.post(`${API_BASE_URL}organization`, newOrganisation);

export const addPayment = ({ payload, transfers }) =>
  instance.post(`/payment/savetransaction`, { hash: payload, transfers });

export const addWallet = (newWallet) => axios.post(`${API_BASE_URL}wallet`, newWallet);

export const getPaymentList = () => instance.get(`/payment`);

export const getBalance = (organisationId) =>
  axios.get(`${API_BASE_URL}payment/balance/${organisationId}`);
