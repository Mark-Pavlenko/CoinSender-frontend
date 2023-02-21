import { instance } from './index';

export const uploadTransferList = (file) => {
  const formData = new FormData();
  formData.append('report', file[0]);

  return instance.post(`/employee/upload`, formData, {
    headers: {
      ...instance.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTransferList = () => instance.get(`/transfers`);
export const downloadFile = () => instance.get(`/transfers/example-download.xlsx`);
export const getPaymentsList = () => instance.get(`/transfers/completedtransfers`);

export const addTransfer = (newEmployee) => instance.post(`/employee`, newEmployee);

export const editTransfer = (employee) => {
  return instance.post(`/transfers/edit`, employee);
};

export const importTransfers = () => {
  return instance.post(`/transfers/create`);
};

export const deleteTransfer = (employeeId) => {
  return instance.delete(`/transfers/delete`, { data: { ...employeeId } });
};

export const deleteTransferMulti = (transfers) => {
  return instance.delete(`/transfers/delete-multiple`, { data: { transfers } });
};
