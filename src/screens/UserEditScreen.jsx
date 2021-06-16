/* eslint-disable react/jsx-props-no-spreading */
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Container, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button as SnackbarButton } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getUserProfile, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../actions/snackbarActions';

const userEditSchema = yup.object().shape({
	name: yup.string().required('Please enter a valid name.'),
	email: yup.string().email().required('Please enter a valid email address.'),
});

const UserEditScreen = ({ match, history }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ resolver: yupResolver(userEditSchema) });

	const userId = match.params.id;
	const [isAdmin, setIsAdmin] = useState(false);

	const userProfile = useSelector((state) => state.userProfile);
	const { loading, error, user } = userProfile;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

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

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			displaySnackbar('User profile successfully updated.');
			history.push('/admin/user-list');
		} else if (user?._id === userId) {
			setValue('name', user.name);
			setValue('email', user.email);
			setIsAdmin(user.isAdmin);
		} else {
			dispatch(getUserProfile(userId));
		}
		if (errorUpdate) {
			displaySnackbar(errorUpdate, 'error');
		}
	}, [dispatch, user, userId, successUpdate, errorUpdate]);

	if (!error) {
		const submitUserProfileUpdateForm = (data) => {
			dispatch(
				updateUser({
					_id: userId,
					name: data.name,
					email: data.email,
					isAdmin,
				})
			);
		};

		return (
			<Container>
				<Link
					to="/admin/user-list"
					className="btn btn-outline-primary mt-5"
				>
					Go Back
				</Link>
				<FormContainer>
					<h1 className="mb-3">Edit User</h1>
					<Form
						noValidate
						onSubmit={handleSubmit(submitUserProfileUpdateForm)}
						className="my-3"
					>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							{loading || loadingUpdate ? (
								<Skeleton type="text" />
							) : (
								<Form.Control
									type="text"
									name="name"
									placeholder="Enter name"
									{...register('name')}
									isInvalid={!!errors.name?.message}
								/>
							)}
							<Form.Control.Feedback type="invalid">
								{errors.name?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="email" className="my-3">
							<Form.Label>Email Address</Form.Label>
							{loading || loadingUpdate ? (
								<Skeleton type="text" />
							) : (
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter email"
									{...register('email')}
									isInvalid={!!errors.email?.message}
								/>
							)}
							<Form.Control.Feedback type="invalid">
								{errors.email?.message}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="isAdmin">
							<Row>
								<Col>
									<Form.Label>Is Admin</Form.Label>
								</Col>
								<Col xs={8} sm={8}>
									{loading || loadingUpdate ? (
										<Skeleton
											type="rect"
											width={20}
											height={20}
										/>
									) : (
										<Form.Check
											type="checkbox"
											checked={isAdmin}
											onChange={(e) =>
												setIsAdmin(e.target.checked)
											}
										/>
									)}
								</Col>
							</Row>
						</Form.Group>

						<Button type="submit" variant="outline-primary">
							{loadingUpdate && (
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
				</FormContainer>
			</Container>
		);
	}
	return (
		<Container className="my-5">
			<Link
				to="/admin/user-list"
				className="btn btn-outline-primary my-3"
			>
				Go Back
			</Link>
			<Message variant="danger">Something went wrong</Message>
			<Button
				variant="outline-primary"
				onClick={() => window.location.reload()}
			>
				Refresh page ?
			</Button>
		</Container>
	);
};

UserEditScreen.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
};

export default UserEditScreen;
