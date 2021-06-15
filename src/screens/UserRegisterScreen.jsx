/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button as SnackbarButton } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { register as registerUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../actions/snackbarActions';
import { mobilePhoneNumberRegEx } from '../utils/regex';

const userRegisterSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	mobilePhoneNumber: yup.string().matches(mobilePhoneNumberRegEx),
	password: yup.string().required(),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

const UserRegisterScreen = ({ location, history }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(userRegisterSchema),
	});

	const redirect = location.search ? location.search.split('=')[1] : '/';

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
					<SnackbarButton onClick={() => closeSnackbar(key)}>
						dismiss
					</SnackbarButton>
				),
			},
		});
	};

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			displaySnackbar('You have successfully registered to the app.');
			history.push(redirect);
		}
		if (error) {
			displaySnackbar(error, 'error');
		}
	}, [history, userInfo, redirect, error]);

	const submitUserRegistrationForm = (data) => {
		dispatch(registerUser(data));
	};

	return (
		<FormContainer>
			<h1>Register</h1>
			{loading && <Loader />}
			<Form
				noValidate
				onSubmit={handleSubmit(submitUserRegistrationForm)}
				className="py-3"
			>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						placeholder="Enter name"
						{...register('name')}
						isInvalid={!!errors.name?.message}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.name?.message}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="email" className="py-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Enter email"
						{...register('email')}
						isInvalid={!!errors.email?.message}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.email?.message}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="mobilePhoneNumber" className="py-3">
					<Form.Label>Mobile Phone Number</Form.Label>
					<Form.Control
						type="mobilePhoneNumber"
						name="mobilePhoneNumber"
						placeholder="Enter mobile phone number"
						{...register('mobilePhoneNumber')}
						isInvalid={!!errors.mobilePhoneNumber?.message}
					/>
					<Form.Control.Feedback type="invalid">
						Please enter a valid mobile phone number
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Enter password"
						{...register('password')}
						isInvalid={!!errors.password?.message}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.password?.message}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="confirmPassword" className="py-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						{...register('confirmPassword')}
						isInvalid={!!errors.confirmPassword}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.confirmPassword && 'Passwords must match'}
					</Form.Control.Feedback>
				</Form.Group>

				<Button type="submit" variant="outline-primary">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an account?{' '}
					<Link
						to={
							redirect
								? `/sign-in?redirect=${redirect}`
								: '/sign-in'
						}
					>
						Sign In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

UserRegisterScreen.propTypes = {
	location: PropTypes.shape({
		search: PropTypes.string,
	}),
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
};

export default UserRegisterScreen;
