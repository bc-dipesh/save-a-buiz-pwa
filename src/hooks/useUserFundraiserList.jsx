import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import { getUserFundraiserList } from '../actions/fundraiserActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const useUserFundraiserList = ({ pageNumber }) => {
  const dispatch = useDispatch();

  const userFundraiser = useSelector((state) => state.userFundraiser);
  const { loading, error, fundraisers, pages, page } = userFundraiser;

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

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      dispatch(getUserFundraiserList(pageNumber));
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  }, [dispatch, pageNumber]);

  return { loading, error, fundraisers, pages, page };
};

export default useUserFundraiserList;
