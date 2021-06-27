/* eslint-disable import/no-mutable-exports */
// backend api url endpoints
let AUTH_ROUTE = '';
let USERS_ROUTE = '';
let FUNDRAISERS_ROUTE = '';
let ANALYTICS_ROUTE = '';
let NEWS_LETTER_SUBSCRIBERS_ROUTE = '';

if (process.env.NODE_ENV === 'development') {
  AUTH_ROUTE = 'http://localhost:5000/api/v1/auth';
  USERS_ROUTE = 'http://localhost:5000/api/v1/users';
  FUNDRAISERS_ROUTE = 'http://localhost:5000/api/v1/fundraisers';
  ANALYTICS_ROUTE = 'http://localhost:5000/api/v1/analytics';
  NEWS_LETTER_SUBSCRIBERS_ROUTE = 'http://localhost:5000/api/v1/subscribe-to-news-letter';
} else {
  AUTH_ROUTE = 'https://save-a-buiz-api.herokuapp.com/api/v1/auth';
  USERS_ROUTE = 'https://save-a-buiz-api.herokuapp.com/api/v1/users';
  FUNDRAISERS_ROUTE = 'https://save-a-buiz-api.herokuapp.com/api/v1/fundraisers';
  ANALYTICS_ROUTE = 'https://save-a-buiz-api.herokuapp.com/api/v1/analytics';
  NEWS_LETTER_SUBSCRIBERS_ROUTE =
    'https://save-a-buiz-api.herokuapp.com/api/v1/subscribe-to-news-letter';
}

export {
  AUTH_ROUTE,
  USERS_ROUTE,
  FUNDRAISERS_ROUTE,
  ANALYTICS_ROUTE,
  NEWS_LETTER_SUBSCRIBERS_ROUTE,
};
