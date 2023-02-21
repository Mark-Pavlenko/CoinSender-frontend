import React from 'react';
import './styles.css'
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Notification(){

  return (
    <div>
      <ToastContainer
        pauseOnHover
        closeOnClick
        autoClose={1500}
        transition={Zoom}
        hideProgressBar={true}
      />
    </div>
  );
}
export default Notification;