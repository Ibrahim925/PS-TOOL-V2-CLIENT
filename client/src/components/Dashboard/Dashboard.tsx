import React, { useState, useEffect } from "react";
import { Delete, Mail, Add, Bento } from "@mui/icons-material";
import { IconButton, Tooltip, CircularProgress, Snackbar } from "@mui/material";
import { Errors, INotification, IUser, URLS } from "../../types";
import Loading from "../Loading/Loading";
import PopupMenu from "../Form/PopupMenu";
import Logo from "../Logo/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import "./Dashboard.css";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import downloadFile from "../../helpers/downloadFile";

interface NotificationProps extends INotification {
	accountType: IUser["userType"];
	setNotifications: (
		callback: (notifications: INotification[]) => INotification[]
	) => void;
}

// Notifications
const Notification: React.FC<NotificationProps> = (props) => {
	const handleNotificationDelete = async () => {
		const isOk = window.confirm(
			"Are you sure?\nThis action is not reversible!"
		);

		if (!isOk) return;

		try {
			await request("DELETE", URLS.Resource, `/notification/${props.id}`, {});

			props.setNotifications((notifications: INotification[]) =>
				notifications.filter((notification) => notification.id !== props.id)
			);
		} catch (error) {}
	};

	return (
		<div id='notification-container'>
			<div id='paper-actions'>
				{/* Make sure that the user is an admin so that they are able to delete other users */}
				{props.accountType === "ADMIN" ? (
					<Tooltip title='Delete'>
						<IconButton onClick={handleNotificationDelete}>
							<Delete />
						</IconButton>
					</Tooltip>
				) : null}
			</div>
			<p id='notification-time'>
				{props.notificationDate} - {props.notificationTime}
			</p>
			<p id='notification-text'>{props.notificationText}</p>
		</div>
	);
};

// Users
interface UserProps extends IUser {
	accountType: IUser["userType"];
	setUsers: (callback: (users: IUser[]) => IUser[]) => void;
}

const User: React.FC<UserProps> = (props) => {
	const handleUserEmail = () => {
		const emailLink = `https://mail.google.com/mail/?view=cm&source=mailto&to=${props.userEmail}`;
		window.open(emailLink, "_blank");
	};

	const handleUserDelete = async () => {
		const isOk = window.confirm(
			"Are you sure?\nThis action is not reversible!"
		);

		if (!isOk) return;

		try {
			await request("DELETE", URLS.Resource, `/user/${props.id}`, {});

			props.setUsers((users: IUser[]) =>
				users.filter((user) => user.id !== props.id)
			);
		} catch (error) {}
	};

	return (
		<div id='user-container'>
			<p id='user-email'>{props.userEmail}</p>
			<div id='paper-actions'>
				{/* Make sure that the user is an admin so that they are able to delete other users */}
				{props.accountType === "ADMIN" ? (
					<Tooltip title='Delete'>
						<IconButton onClick={handleUserDelete}>
							<Delete />
						</IconButton>
					</Tooltip>
				) : null}
				<Tooltip title='Email'>
					<IconButton onClick={handleUserEmail}>
						<Mail />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
};

const Dashboard: React.FC = () => {
	const [showAddUserForm, setShowAddUserForm] = useState(false);
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [errors, setErrors] = useState<Errors>([]);
	const [userEmail, setUserEmail] = useState("");
	const [userCreateLoading, setUserCreateLoading] = useState(false);
	const [getDashboardDataLoading, setGetDashboardDataLoading] = useState(true);

	const { projectName } = useParams();

	const userState: IUser = useSelector((state: any) => state.userReducer);

	const handleAddUserFormClose = () => {
		setShowAddUserForm(false);
		setUserEmail("");
		setErrors([]);
		setUserCreateLoading(false);
	};

	const handleUserCreate = async () => {
		setUserCreateLoading(true);

		const userCreateResponse = await request("POST", URLS.Resource, "/user", {
			userEmail,
			userProject: projectName,
		});

		if (Array.isArray(userCreateResponse)) {
			setUserCreateLoading(false);
			return setErrors(userCreateResponse);
		}

		setUsers([...users, userCreateResponse]);
		handleAddUserFormClose();
	};

	const handleErrorReportGenerate = async () => {
		const errorReport = await request(
			"GET",
			URLS.Resource,
			`/error/${projectName}`,
			{}
		);

		downloadFile(errorReport, `${projectName} Report.csv`);
	};

	useEffect(() => {
		(async () => {
			// Get all users in project
			const getProjectUsersResponse: IUser[] = await request(
				"GET",
				URLS.Resource,
				`/user/${projectName}`,
				{}
			);

			const getNotificationsResponse = await request(
				"GET",
				URLS.Resource,
				`/notification/${projectName}`,
				{}
			);

			setUsers(getProjectUsersResponse);
			setNotifications(getNotificationsResponse);
			setGetDashboardDataLoading(false);
		})();
	}, []);

	if (getDashboardDataLoading) {
		return <Loading isOpen={getDashboardDataLoading} />;
	}

	return (
		<div id='dashboard-container'>
			<div id='inbox-section' className='dashboard-section'>
				<h2 className='dasboard-section-header'>Inbox</h2>
				<div className='dashboard-section-actions'>
					<Tooltip title='Generate Error Report'>
						<IconButton onClick={handleErrorReportGenerate}>
							<Bento />
						</IconButton>
					</Tooltip>
				</div>
				<div id='dashboard-section-scrollable-content'>
					{notifications.length ? (
						notifications.map((notification) => (
							<Notification
								key={notification.id}
								{...notification}
								setNotifications={setNotifications}
								accountType={userState.userType}
							/>
						))
					) : (
						<p id='dashboard-section-scrollable-content-empty'>
							No Notifications
						</p>
					)}
				</div>
			</div>

			<div id='users-section' className='dashboard-section'>
				<h2 className='dasboard-section-header'>Users</h2>
				<div className='dashboard-section-actions'>
					{userState.userType === "ADMIN" ? (
						<Tooltip title='Add User'>
							<IconButton onClick={() => setShowAddUserForm(true)}>
								<Add />
							</IconButton>
						</Tooltip>
					) : null}
				</div>
				<div id='dashboard-section-scrollable-content'>
					{users.length ? (
						users.map((user) => (
							<User
								key={user.id}
								{...user}
								setUsers={setUsers}
								accountType={userState.userType}
							/>
						))
					) : (
						<p id='dashboard-section-scrollable-content-empty'>No Users</p>
					)}
				</div>
			</div>

			<PopupMenu
				open={showAddUserForm}
				onClose={handleAddUserFormClose}
				header=''
				style={{ height: 350, width: 400, minWidth: 400 }}>
				<div id='projects-page-pop-up-form'>
					<Logo id='projects-page-popup-logo' scale={1.2} dark />
					<Input
						id='dashboard-popup-input'
						placeholder='User Email'
						value={userEmail}
						update={setUserEmail}
						errors={errors}
						location='emailInput'
					/>
					<Button id='dashboard-popup-button' onClick={handleUserCreate}>
						Add
					</Button>
					{userCreateLoading && (
						<CircularProgress
							style={{ color: "black", marginTop: 30 }}
							size={30}
						/>
					)}
				</div>
			</PopupMenu>
		</div>
	);
};

export default Dashboard;
