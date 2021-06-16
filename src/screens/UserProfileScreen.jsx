/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { yupResolver } from '@hookform/resolvers/yup';
import { Button as SnackbarButton } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import {
	closeSnackbar as closeSnackbarAction,
	enqueueSnackbar as enqueueSnackbarAction,
} from '../actions/snackbarActions';
import {
	getUserProfile,
	updateUserPassword,
	updateUserProfile,
} from '../actions/userActions';
import { checkIsInternetConnected } from '../utils/commonFunctions';
import { mobilePhoneNumberRegEx } from '../utils/regex';

const userProfileSchema = yup.object().shape({
	name: yup.string().required('Please enter a valid name.'),
	email: yup.string().email().required('Please enter a valid email address.'),
	mobilePhoneNumber: yup.string().matches(mobilePhoneNumberRegEx),
});

const userPasswordSchema = yup.object().shape({
	currentPassword: yup
		.string()
		.required('Please enter your current password.'),
	newPassword: yup
		.string()
		.required('Please enter the new password you want to use.'),
	confirmNewPassword: yup.string().oneOf([yup.ref('newPassword'), null]),
});

const UserProfileScreen = ({ history }) => {
	const {
		register: registerUpdateUserProfile,
		handleSubmit: handleSubmitUserProfileUpdate,
		formState: { errors: updateUserProfileErrors },
		setValue: setUpdateUserProfileFormValue,
	} = useForm({
		resolver: yupResolver(userProfileSchema),
	});

	const {
		register: registerUpdateUserPassword,
		handleSubmit: handleSubmitUserPasswordUpdate,
		formState: { errors: updateUserPasswordErrors },
	} = useForm({
		resolver: yupResolver(userPasswordSchema),
	});

	const dispatch = useDispatch();

	const enqueueSnackbar = (...args) =>
		dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

	const displaySnackbar = (message, variant = 'success') => {
		enqueueSnackbar({
			message,
			options: {
				key: uuidv4(),
				variant,
				action: (key) => (
					<SnackbarButton
						style={{ color: 'cyan' }}
						onClick={() => closeSnackbar(key)}
					>
						dismiss
					</SnackbarButton>
				),
			},
		});
	};

	const userProfile = useSelector((state) => state.userProfile);
	const { loading, error, user } = userProfile;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		loading: loadingProfileUpdate,
		success: isUserProfileUpdateSuccessful,
		error: profileUpdateError,
	} = userUpdateProfile;

	const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
	const {
		loading: loadingPasswordUpdate,
		success: isUserPasswordUpdateSuccessful,
		error: passwordUpdateError,
	} = userUpdatePassword;

	useEffect(() => {
		if (!(!!userInfo?.token && !!userInfo?.user)) {
			displaySnackbar(
				'You are not signed in. Please sign in to access user profile page.',
				'info'
			);
			history.push('/sign-in');
		} else if (
			userInfo.user.name &&
			userInfo.user.email &&
			userInfo.user.mobilePhoneNumber
		) {
			setUpdateUserProfileFormValue('name', userInfo.user.name);
			setUpdateUserProfileFormValue('email', userInfo.user.email);
			setUpdateUserProfileFormValue(
				'mobilePhoneNumber',
				userInfo.user.mobilePhoneNumber
			);
		} else {
			dispatch(getUserProfile());
		}
		if (isUserProfileUpdateSuccessful) {
			displaySnackbar('User profile updated successfully.');
		}
		if (isUserPasswordUpdateSuccessful) {
			displaySnackbar('User password updated successfully.');
		}
		if (error || profileUpdateError || passwordUpdateError) {
			displaySnackbar(
				error || profileUpdateError || passwordUpdateError,
				'error'
			);
		}
	}, [
		history,
		userInfo,
		user,
		error,
		isUserProfileUpdateSuccessful,
		isUserPasswordUpdateSuccessful,
		profileUpdateError,
		passwordUpdateError,
	]);

	const submitUpdateUserProfileForm = async (data) => {
		if (await checkIsInternetConnected()) {
			dispatch(updateUserProfile(data));
		} else {
			displaySnackbar(
				'No internet. Please check your internet connection and try again',
				'error'
			);
		}
	};

	const submitUpdateUserPasswordForm = async (data) => {
		if (await checkIsInternetConnected()) {
			dispatch(updateUserPassword(data));
		} else {
			displaySnackbar(
				'No internet. Please check your internet connection and try again',
				'error'
			);
		}
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col xs={12} sm={7}>
					<h2 className="mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							fill="currentColor"
							className="bi bi-person"
							viewBox="0 0 16 16"
						>
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
						</svg>{' '}
						User Profile
					</h2>
					<Form
						noValidate
						onSubmit={handleSubmitUserProfileUpdate(
							submitUpdateUserProfileForm
						)}
						className="my-3"
					>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							{loading ? (
								<Skeleton variant="text" />
							) : (
								<Form.Control
									type="text"
									name="name"
									placeholder="Enter name"
									{...registerUpdateUserProfile('name')}
									isInvalid={
										!!updateUserProfileErrors.name?.message
									}
								/>
							)}
							<Form.Control.Feedback type="invalid">
								{updateUserProfileErrors.name?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="email" className="my-3">
							<Form.Label>Email Address</Form.Label>
							{loading ? (
								<Skeleton variant="text" />
							) : !userInfo.user.isEmailConfirmed ? (
								<Alert variant="info">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-exclamation"
										viewBox="0 0 16 16"
									>
										<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z" />
									</svg>{' '}
									We&apos;ve sent you a email verification
									link to the email address you provided.
									Please verify your email then logout and
									sign in again after email verification.
								</Alert>
							) : (
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter email"
									{...registerUpdateUserProfile('email')}
									isInvalid={
										!!updateUserProfileErrors.email?.message
									}
								/>
							)}
							<Form.Control.Feedback type="invalid">
								{updateUserProfileErrors.email?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							controlId="mobilePhoneNumber"
							className="my-3"
						>
							<Form.Label>Mobile Phone Number</Form.Label>
							{loading ? (
								<Skeleton variant="text" />
							) : (
								<Form.Control
									type="mobilePhoneNumber"
									name="mobilePhoneNumber"
									placeholder="Enter mobile phone number"
									{...registerUpdateUserProfile(
										'mobilePhoneNumber'
									)}
									isInvalid={
										!!updateUserProfileErrors
											.mobilePhoneNumber?.message
									}
								/>
							)}
							<Form.Control.Feedback type="invalid">
								Please enter a valid mobile phone number.
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							className="mt-5"
							type="submit"
							variant="outline-primary"
						>
							{loadingProfileUpdate && (
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							)}{' '}
							Update Profile
						</Button>
					</Form>
				</Col>

				<Col xs={12} sm={4}>
					<h2 className="mb-3">Update Password</h2>
					<Form
						noValidate
						onSubmit={handleSubmitUserPasswordUpdate(
							submitUpdateUserPasswordForm
						)}
						className="py-3"
					>
						<Form.Group controlId="currentPassword">
							<Form.Label>Current Password</Form.Label>
							<Form.Control
								type="password"
								name="currentPassword"
								placeholder="Enter your current password"
								{...registerUpdateUserPassword(
									'currentPassword'
								)}
								isInvalid={
									!!updateUserPasswordErrors.currentPassword
										?.message
								}
							/>
							<Form.Control.Feedback type="invalid">
								{
									updateUserPasswordErrors.currentPassword
										?.message
								}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="newPassword" className="my-3">
							<Form.Label>New Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter new password"
								{...registerUpdateUserPassword('newPassword')}
								isInvalid={
									!!updateUserPasswordErrors?.newPassword
								}
							/>
							<Form.Control.Feedback type="invalid">
								{updateUserPasswordErrors.newPassword?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							controlId="confirmNewPassword"
							className="my-3"
						>
							<Form.Label>Confirm New Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirm new password"
								{...registerUpdateUserPassword(
									'confirmNewPassword'
								)}
								isInvalid={
									!!updateUserPasswordErrors.confirmNewPassword
								}
							/>
							<Form.Control.Feedback type="invalid">
								{updateUserPasswordErrors.confirmNewPassword &&
									'Passwords must match. Please enter the same password in new and confirm password.'}
							</Form.Control.Feedback>
						</Form.Group>

						<Button
							className="mt-5"
							type="submit"
							variant="outline-primary"
						>
							{loadingPasswordUpdate && (
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							)}{' '}
							Update Password
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

UserProfileScreen.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
};

export default UserProfileScreen;
