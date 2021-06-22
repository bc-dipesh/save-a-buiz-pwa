import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteFundraiser } from '../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const useFundraiserDelete = () => {
  const dispatch = useDispatch();
  const fundraiserDelete = useSelector((state) => state.fundraiserDelete);
  const { loading, error, success } = fundraiserDelete;

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton onClick={() => closeSnackbar(key)}>dismiss</SnackbarButton>
        ),
      },
    });
  };

  const handleDelete = async (fundraiserId) => {
    if (await checkIsInternetConnected()) {
      dispatch(deleteFundraiser(fundraiserId));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  };

  useEffect(async () => {
    if (success) {
      displaySnackbar('Fundraiser successfully deleted.');
    } else if (error) {
      displaySnackbar(error, 'error');
    } else if (loading) {
      displaySnackbar('Deleting fundraiser please wait...', 'info');
    }
  }, [dispatch, loading, error, success]);

  return { loading, success, handleDelete };
};

export default useFundraiserDelete;
