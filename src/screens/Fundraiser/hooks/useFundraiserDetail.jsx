import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { listFundraiserDetails } from '../../../actions/fundraiserActions';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../../actions/snackbarActions';
import { checkIsInternetConnected } from '../../../utils/commonFunctions';

const useFundraiserDetail = (fundraiserId) => {
  const dispatch = useDispatch();

  const fundraiserDetails = useSelector((state) => state.fundraiserDetails);
  const { loading, error, fundraiser } = fundraiserDetails;

  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  const displaySnackbar = (message, variant = 'success') => {
    enqueueSnackbar({
      message,
      options: {
        key: uuidv4(),
        variant,
        action: (key) => (
          <SnackbarButton style={{ color: 'cyan' }} onClick={() => closeSnackbar(key)}>
            dismiss
          </SnackbarButton>
        ),
      },
    });
  };

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      dispatch(listFundraiserDetails(fundraiserId));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  }, [dispatch, fundraiserId]);

  return { loading, error, fundraiser };
};

export default useFundraiserDetail;
