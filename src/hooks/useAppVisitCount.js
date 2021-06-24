import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkIsInternetConnected } from '../utils/commonFunctions';

const APP_VISIT_ANALYTICS_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/analytics/app-visits';

const useAppVisitCount = () => {
  const [appVisitCount, setAppVisitCount] = useState(0);

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      const response = await axios.get(
        'https://api.countapi.xyz/get/save-a-buiz/dd503015-068e-4327-a5a8-6896d9d6e6aa'
      );
      setAppVisitCount(response.data.value);
    }
  }, [appVisitCount]);

  const updateAppVisitCount = async () => {
    if (await checkIsInternetConnected()) {
      const response = await axios.get(
        'https://api.countapi.xyz/hit/save-a-buiz/dd503015-068e-4327-a5a8-6896d9d6e6aa'
      );
      setAppVisitCount(response.data.value);
      await axios.get(APP_VISIT_ANALYTICS_URL);
    }
  };

  return { appVisitCount, updateAppVisitCount };
};

export default useAppVisitCount;
