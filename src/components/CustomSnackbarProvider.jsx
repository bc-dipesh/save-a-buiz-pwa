/* eslint-disable react/prop-types */
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';

// custom snackbar styles
const useStyles = makeStyles({
	success: { backgroundColor: 'rgba(49, 49, 49, 1)' },
	error: { backgroundColor: 'rgba(49, 49, 49, 1)' },
	warning: { backgroundColor: 'rgba(49, 49, 49, 1)' },
	info: { backgroundColor: 'rgba(49, 49, 49, 1)' },
});

const CustomSnackbarProvider = ({ AppComponent }) => {
	const classes = useStyles();
	return (
		<SnackbarProvider
			classes={{
				variantSuccess: classes.success,
				variantError: classes.error,
				variantWarning: classes.warning,
				variantInfo: classes.info,
			}}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			TransitionComponent={Grow}
		>
			<AppComponent />
		</SnackbarProvider>
	);
};

export default CustomSnackbarProvider;
