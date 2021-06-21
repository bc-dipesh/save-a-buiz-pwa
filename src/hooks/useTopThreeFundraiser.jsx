import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { listTopThreeFundraisers } from '../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const useTopThreeFundraiser = () => {
  const dispatch = useDispatch();
  const topThreeFundraiser = useSelector((state) => state.topThreeFundraiser);
  const { loading, error, fundraisers } = topThreeFundraiser;

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

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      dispatch(listTopThreeFundraisers());
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  }, [dispatch]);

  return { loading, error, fundraisers };
};

export default useTopThreeFundraiser;
