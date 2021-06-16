import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './bootstrap.min.css';
import CustomSnackbarProvider from './components/CustomSnackbarProvider';
import './index.css';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<CustomSnackbarProvider AppComponent={App} />
	</Provider>,
	document.getElementById('root')
);
