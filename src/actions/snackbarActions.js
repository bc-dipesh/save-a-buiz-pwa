import { v4 as uuidv4 } from 'uuid';
import {
  CLOSE_SNACKBAR, ENQUEUE_SNACKBAR, REMOVE_SNACKBAR,
} from '../constants/snackbarConstants';

const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || uuidv4(),
    },
  };
};

const closeSnackbar = (key) => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});

export {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
};
