// calculates the percentage of work completed
const calculateProgress = (completed, target) => Math.ceil((completed / target) * 100);

// converts number to string representation with K and M.
// toFixed(d) returns a string that has exactly 'd' digits
// after the decimal place, rounding if necessary.
const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  } if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  }
  return num; // value < 1000, nothing to do
};

const isUserLoggedIn = (userInfo) => userInfo;

const differenceFromCurrentDate = (dateToSubtract) => {
  const currentDate = new Date();
  return currentDate.getDate() - new Date(dateToSubtract).getDate();
};

const checkIfObjectsHaveSameData = (obj1, obj2) => {
  const obj1Length = Object.keys(obj1).length;
  const obj2Length = Object.keys(obj2).length;

  if (obj1Length === obj2Length) {
    return Object.keys(obj1).every(
      (key) => Object.prototype.hasOwnProperty.call(obj2, key)
              && obj2[key] === obj1[key],
    );
  }
  return false;
};

export {
  calculateProgress,
  numFormatter,
  isUserLoggedIn,
  differenceFromCurrentDate,
  checkIfObjectsHaveSameData,
};
