import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { resetPassword } from '../../../actions/authActions';
import { AUTH_FORGOT_PASSWORD_RESET } from '../../../constants/authConstants';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../../actions/snackbarActions';
import { checkIsInternetConnected } from '../../../utils/commonFunctions';

const passwordResetSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide the email associated with your account.')
    .required('Please provide the email associated with your account.'),
});

const usePasswordReset = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordResetSchema),
  });

  const {
    loading,
    error,
    success,
    message: resetMessage,
  } = useSelector((state) => state.resetPassword);

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

  const sendPasswordResetRequest = async (email) => {
    if (await checkIsInternetConnected()) {
      dispatch(resetPassword(email));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  useEffect(() => {
    if (error) {
      displaySnackbar(error, 'error');
      dispatch({ type: AUTH_FORGOT_PASSWORD_RESET });
    }
    if (success) {
      displaySnackbar(resetMessage);
      dispatch({ type: AUTH_FORGOT_PASSWORD_RESET });
    }
  }, [dispatch, error, success]);

  return {
    loading,
    register,
    handleSubmit,
    errors,
    sendPasswordResetRequest,
  };
};

export default usePasswordReset;
