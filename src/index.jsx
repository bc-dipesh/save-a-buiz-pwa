import Fade from '@material-ui/core/Fade';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './bootstrap.min.css';
import './index.css';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider TransitionComponent={Fade}>
			<App />
		</SnackbarProvider>
	</Provider>,
	document.getElementById('root')
);
