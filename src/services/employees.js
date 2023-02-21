import { instance } from './index';

export const getEmployee = (userId) => instance.get(`/employee/${userId}`);
export const getEmployeeList = () => instance.get(`/employee`);
export const getClientList = (data) => instance.get(`/clients/organization/${data}`);
export const getClientById = (id) => instance.get(`/clients/${id}`);
export const editEmployeeProfile = (data) => instance.patch(`/employee/editprofile`, data);
export const editClientProfile = (data) => instance.patch(`/clients/edit`, data);

export const addEmployee = (data) => instance.post(`/employee/create`, data);
export const addClient = (data) => instance.post(`/clients/add`, data);
export const deleteEmployee = (id) => instance.delete(`/employee`, { data: id });
export const deleteClient = (id) => instance.delete(`/clients`, { data: id });

export const editEmployeeAvatar = ({ image, id }) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('id', id);
  return instance.post(`/employee/avatar`, formData, {
    headers: {
      ...instance.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};
