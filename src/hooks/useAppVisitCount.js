import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkIsInternetConnected } from '../utils/commonFunctions';

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
    }
  };

  return { appVisitCount, updateAppVisitCount };
};

export default useAppVisitCount;
