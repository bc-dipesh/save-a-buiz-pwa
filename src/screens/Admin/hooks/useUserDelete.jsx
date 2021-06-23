import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteUserById } from '../../../actions/userActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../../actions/snackbarActions';
import { checkIsInternetConnected } from '../../../utils/commonFunctions';

const useUserDelete = () => {
  const dispatch = useDispatch();
  const userDelete = useSelector((state) => state.userDelete);
  const { loading, success, error } = userDelete;

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton className="snackbar-btn" onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  const handleDelete = async (userId) => {
    if (await checkIsInternetConnected()) {
      dispatch(deleteUserById(userId));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  useEffect(async () => {
    if (success) {
      displaySnackbar('User successfully deleted.');
    } else if (error) {
      displaySnackbar(error, 'error');
    }
  }, [dispatch, loading, error, success]);

  return { loading, success, handleDelete };
};

export default useUserDelete;
