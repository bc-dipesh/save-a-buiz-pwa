import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './bootstrap.min.css';
import CustomSnackbarProvider from './components/CustomSnackbarProvider';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <CustomSnackbarProvider AppComponent={App} />
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById('root')
);
