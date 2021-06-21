import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import axios from 'axios';
import qs from 'qs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
  closeSnackbar as closeSnackbarAction,
  enqueueSnackbar as enqueueSnackbarAction,
} from '../../../actions/snackbarActions';
import { checkIsInternetConnected } from '../../../utils/commonFunctions';

const AMT_FIELD_ERR = 'Please enter a valid donation amount to donate.';
const CMNT_FIELD_ERR = 'Please enter a valid message.';

const donationSchema = yup.object().shape({
  donationAmount: yup.number(AMT_FIELD_ERR).required(AMT_FIELD_ERR),
  comment: yup.string(CMNT_FIELD_ERR).required(CMNT_FIELD_ERR),
});

const useDonationForm = (fundraiserId) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(donationSchema),
  });

  const showHideForm = () => {
    setDisplayForm(!displayForm);
    clearErrors();
  };

  const sendPaymentRequestToEsewa = async (donationAmount) => {
    setIsLoading(true);
    const currentPageUrl = window.location.href;

    // set eSewa credentials
    const pid = fundraiserId;
    const scd = 'EPAYTEST';
    const su = currentPageUrl;
    const fu = currentPageUrl;
    const url = 'https://uat.esewa.com.np/epay/main';

    try {
      // submit donation amount to eSewa
      await axios.post(
        url,
        qs.stringify({
          tAmt: donationAmount,
          amt: donationAmount,
          txAmt: 0,
          psc: 0,
          pdc: 0,
          scd,
          pid,
          su,
          fu,
        }),
        { headers: { 'Content-type': 'application/x-www-form-urlencoded' } }
      );
    } catch (error) {
      displaySnackbar('Something went wrong. Please try again later.', 'error');
    }
    setIsLoading(false);
  };

  const donate = async ({ donationAmount }) => {
    if (await checkIsInternetConnected()) {
      sendPaymentRequestToEsewa(donationAmount);
    } else {
      displaySnackbar('No internet. Please check your internet connection and try again.', 'info');
    }
  };

  return {
    displayForm,
    isLoading,
    setDisplayForm,
    setIsLoading,
    showHideForm,
    register,
    handleSubmit,
    errors,
    clearErrors,
    donate,
  };
};

export default useDonationForm;
