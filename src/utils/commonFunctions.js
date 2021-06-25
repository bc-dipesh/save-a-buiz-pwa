import isOnline from 'is-online';

/**
 * Check if the user is logged in or not.
 *
 * @param {*} userInfo  The object that contains user information.
 * @returns {Boolean}   true if the user is loggedIn.
 */
const isUserLoggedIn = (userInfo) =>
  !!userInfo?.user && !!userInfo?.user?.name && !!userInfo?.token;

/**
 *  Check if user is admin or not.
 *
 * @param {*} userInfo  The object that contains user information.
 * @returns {Boolean}   true if the user is admin.
 */
const isUserAdmin = (userInfo) =>
  !!userInfo?.user && !!userInfo?.user?.isAdmin && !!userInfo?.token;

/**
 * Check if app is connected to the internet.
 *
 */
const checkIsInternetConnected = async () => {
  const isInternetConnected = await isOnline();
  return isInternetConnected;
};

/**
 * Calculate percentage of work completed.
 *
 * @param  {} completed Current progress
 * @param  {} target    Final progress
 */
const calculateProgress = (completed, target) => Math.ceil((completed / target) * 100);

/**
 * converts number to string representation with K and M.
 * toFixed(d) returns a string that has exactly 'd' digits
 * after the decimal place, rounding if necessary.
 *
 * @param  {} num The number to convert
 */
const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  }
  return num; // value < 1000, nothing to do
};

/**
 * Subtract and calculate the total days it has been from current date.
 *
 * @param  {} dateToSubtract The date to subtract from current date
 */
const differenceFromCurrentDate = (dateToSubtract) => {
  const currentDate = new Date();
  return currentDate.getDate() - new Date(dateToSubtract).getDate();
};

const reloadPage = () => {
  window.location.reload();
};

export {
  isUserLoggedIn,
  isUserAdmin,
  checkIsInternetConnected,
  calculateProgress,
  numFormatter,
  differenceFromCurrentDate,
  reloadPage,
};
