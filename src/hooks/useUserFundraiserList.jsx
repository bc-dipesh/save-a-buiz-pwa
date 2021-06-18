import { Button as SnackbarButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import { getUserFundraiserList } from '../actions/userActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const useUserFundraiserList = (history) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userFundraiser = useSelector((state) => state.userFundraiser);
  const { loading, error, fundraisers } = userFundraiser;

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
      if (!(!!userInfo?.token && !!userInfo?.user)) {
        history.push('/sign-in');
      } else {
        dispatch(getUserFundraiserList());
      }
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again', 'info');
    }
  }, [userInfo, dispatch]);

  return { loading, error, fundraisers };
};

export default useUserFundraiserList;
