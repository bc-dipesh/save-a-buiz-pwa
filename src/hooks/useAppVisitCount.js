import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkIsInternetConnected } from '../utils/commonFunctions';

let APP_VISIT_ANALYTICS_URL;

// set a base url of the api based on the current environment
if (process.env.NODE_ENV === 'production') {
  APP_VISIT_ANALYTICS_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/analytics/app-visits';
} else {
  APP_VISIT_ANALYTICS_URL = 'http://localhost:5000/api/v1/analytics/app-visits';
}

const useAppVisitCount = () => {
  const [appVisitCount, setAppVisitCount] = useState(0);

  useEffect(async () => {
    if (await checkIsInternetConnected()) {
      const response = await axios.get('https://api.countapi.xyz/get/save-a-buiz/appVisits');
      setAppVisitCount(response.data.value);
    }
  }, [appVisitCount]);

  const updateAppVisitCount = async () => {
    if (await checkIsInternetConnected()) {
      const response = await axios.get('https://api.countapi.xyz/hit/save-a-buiz/appVisits');
      setAppVisitCount(response.data.value);
      await axios.get(APP_VISIT_ANALYTICS_URL);
    }
  };

  return { appVisitCount, updateAppVisitCount };
};

export default useAppVisitCount;
