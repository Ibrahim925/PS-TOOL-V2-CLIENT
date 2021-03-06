import React, { useEffect, useState } from "react";
import { Errors, URLS, IUser } from "../../types";
import { useDispatch } from "react-redux";
import { USER_LOG_IN } from "../../state/actions";
import { useParams, Link, useNavigate } from "react-router-dom";
import { register, logIn, request } from "../../helpers/request";
import { SuccessMessage } from "../../types";
import { CircularProgress, Snackbar } from "@mui/material";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import "./AuthPage.css";

const LogInPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [errors, setErrors] = useState<Errors | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleUserLogIn = async () => {
		setLoading(true);
		setErrors(null);
		const userLogInResponse = await logIn(userEmail, userPassword);
		if (Array.isArray(userLogInResponse)) {
			setErrors(userLogInResponse);
			setLoading(false);
		} else if (userLogInResponse.refreshToken) {
			localStorage.setItem("REFRESH-TOKEN", userLogInResponse.refreshToken);

			const userDataResponse: IUser = await request(
				"GET",
				URLS.Resource,
				"/user",
				{}
			);

			setLoading(false);

			// Get user data and store it in global state
			dispatch(USER_LOG_IN(userDataResponse));

			// Based on user type, navigate to next page
			if (userDataResponse.userType === "ADMIN") {
				navigate("/Admin/Projects");
			} else if (userDataResponse.userType === "CUSTOMER") {
				navigate(
					`/Customer/Projects/${userDataResponse.userProject}/Dashboard`
				);
			}
		}
	};

	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Log In</h1>
					<Input
						id='auth-page-input'
						placeholder='Email'
						update={setUserEmail}
						location='emailInput'
						errors={errors}
						value={userEmail}
					/>
					<Input
						id='auth-page-input'
						placeholder='Password'
						update={setUserPassword}
						location='passwordInput'
						errors={errors}
						type='password'
						value={userPassword}
					/>
					<Button id='auth-page-button' onClick={handleUserLogIn}>
						Continue
					</Button>
					<Link to='/Welcome/Register'>Don't have an account?</Link>
					{loading && (
						<CircularProgress
							style={{ color: "white", marginTop: 40 }}
							size={30}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const RegisterPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");
	const [errors, setErrors] = useState<Errors | null>();
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleUserRegister = async () => {
		setSuccess(false);
		setErrors(null);
		setLoading(true);

		const userRegisterResponse = await register(userEmail);

		// Check if response is an array of errors
		if (Array.isArray(userRegisterResponse)) {
			setErrors(userRegisterResponse);
		} else if (SuccessMessage.Success) {
			setSuccess(true);
		}

		setLoading(false);
	};

	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Register</h1>
					<Input
						id='auth-page-input'
						placeholder='Email'
						update={setUserEmail}
						errors={errors}
						location='emailInput'
						value={userEmail}
					/>
					<Button
						id='auth-page-button'
						onClick={handleUserRegister}
						disabled={loading}>
						Continue
					</Button>
					<Link to='/Welcome/LogIn'>Already have an account?</Link>
					{loading && (
						<CircularProgress
							style={{ color: "white", marginTop: 40 }}
							size={30}
						/>
					)}
				</div>
			</div>
			<Snackbar
				open={success}
				autoHideDuration={10000}
				onClose={() => setSuccess(false)}
				message={`An email has been sent to ${userEmail}`}
			/>
		</div>
	);
};

const AuthPage: React.FC = () => {
	const { page } = useParams();

	return (
		<div>
			{page === "LogIn" && <LogInPage />}
			{page === "Register" && <RegisterPage />}
		</div>
	);
};

export default AuthPage;
