import React, { useState } from "react";
import Header from "../../components/Header/Header";
import "./SettingsPage.css";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import { useSelector } from "react-redux";
import { Errors, URLS } from "../../types";
import { request } from "../../helpers/request";
import { CheckCircle } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const pages = [{ section: "Account Settings", page: "Password" }];

const SettingsPageSidebar: React.FC = () => {
	const navigate = useNavigate();
	const { settingsPage } = useParams();

	const handlePageClick = (page: string) => {
		navigate(`/Settings/${page}`);
	};

	return (
		<div id='settings-page-sidebar-container'>
			<h3 id='settings-page-sidebar-container-header'>Account Settings</h3>
			{pages.map(({ section, page }, key) =>
				section === "Account Settings" ? (
					<p
						key={key}
						id='settings-page-sidebar-container-select'
						style={{
							backgroundColor:
								page === settingsPage ? "var(--foreground-content)" : "",
						}}
						onClick={() => handlePageClick(page)}>
						{page}
					</p>
				) : null
			)}
		</div>
	);
};

const PasswordPage: React.FC = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [errors, setErrors] = useState<Errors>([]);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const userState = useSelector((state: any) => state.userReducer);

	const handlePasswordUpdate = async () => {
		setLoading(true);
		setErrors([]);
		setSuccess(false);

		const updatePasswordResponse = await request("PUT", URLS.Auth, "/user", {
			userEmail: userState.userEmail,
			currentPassword,
			newPassword,
		});

		setLoading(false);

		if (Array.isArray(updatePasswordResponse)) {
			setErrors(updatePasswordResponse);
			return;
		}

		setSuccess(true);
	};

	return (
		<div>
			<Input
				id='settings-page-input'
				value={currentPassword}
				update={setCurrentPassword}
				label='Current Password'
				location='currentPasswordInput'
				type='password'
				errors={errors}
			/>
			<Input
				id='settings-page-input'
				value={newPassword}
				type='password'
				update={setNewPassword}
				label='New Password'
			/>

			<Button id='settings-page-button' onClick={handlePasswordUpdate}>
				{success ? (
					<CheckCircle
						style={{
							marginTop: 5,
						}}
					/>
				) : (
					"Save"
				)}
			</Button>

			{loading && (
				<CircularProgress
					style={{ color: "var(--accent)", margin: 30 }}
					size={30}
				/>
			)}
		</div>
	);
};

const settingsPages: { [key: string]: JSX.Element } = {
	Password: <PasswordPage />,
};

const SettingsPage: React.FC = () => {
	const { settingsPage } = useParams();

	return (
		<div id='settings-page' className='page-with-header page-with-sidebar'>
			<Header />
			<SettingsPageSidebar />

			{settingsPages[settingsPage ? settingsPage : "Password"]}
		</div>
	);
};

export default SettingsPage;
