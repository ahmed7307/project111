import toast from 'react-hot-toast';

export const Toast = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast(msg),
};

export default Toast;


