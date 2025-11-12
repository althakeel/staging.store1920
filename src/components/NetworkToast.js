// src/components/NetworkToast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNetworkSlowToast = () => {
  toast.warn('⚠️ Your network seems slow. Loading might take longer than usual.', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
