// import { v4 as uuidv4 } from 'uuid';
// import { Button as SnackbarButton } from '@material-ui/core';
// import {
//   enqueueSnackbar as enqueueSnackbarAction,
//   closeSnackbar as closeSnackbarAction,
// } from '../actions/snackbarActions';

// const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
// const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

// const Snackbar = ({ message, variant = 'success' }) => {
//   enqueueSnackbar({
//     message,
//     options: {
//       key: uuidv4(),
//       variant,
//       action: (key) => (
//         <SnackbarButton onClick={() => closeSnackbar(key)}>dismiss</SnackbarButton>
//       ),
//     },
//   });
// };

// export default Snackbar;
