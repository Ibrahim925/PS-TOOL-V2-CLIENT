import React, { useState, useEffect } from "react";
import { Delete, Mail, Add } from "@mui/icons-material";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import { Errors, INotification, IUser, URLS } from "../../types";
import Loading from "../Loading/Loading";
import PopupMenu from "../Form/PopupMenu";
import Logo from "../Logo/Logo";
import Input from "../Form/Input";
import Button from "../Form/Button";
import "./Dashboard.css";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";

// Notifications
const Notification: React.FC<INotification> = (props) => {
	return (
		<div id='notification-container'>
			<p id='notification-time'>
				{props.notificationDate} - {props.notificationTime}
			</p>
			<p id='notification-text'>{props.notificationText}</p>
		</div>
	);
};

// Users
interface UserProps extends IUser {
	handleDelete: (id: number) => void;
}

const User: React.FC<UserProps> = (props) => {
	const handleUserEmail = () => {
		const emailLink = `https://mail.google.com/mail/?view=cm&source=mailto&to=${props.userEmail}`;
		window.open(emailLink, "_blank");
	};

	return (
		<div id='user-container'>
			<p id='user-email'>{props.userEmail}</p>
			<div id='user-actions'>
				<Tooltip title='Delete'>
					<IconButton onClick={() => props.handleDelete(props.id)}>
						<Delete />
					</IconButton>
				</Tooltip>
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
	const [getDashboardDataLoading, setGetDashboardData] = useState(true);

	const { projectName } = useParams();

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

	const handleUserDelete = async (id: number) => {
		const isOk = window.confirm(
			"Are you sure?\nThis action is not reversible!"
		);

		if (!isOk) return;

		try {
			await request("DELETE", URLS.Resource, `/user/${id}`, {});

			setUsers(users.filter((user) => user.id !== id));
		} catch (error) {}
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

			setUsers(getProjectUsersResponse);
			setGetDashboardData(false);
		})();
	}, []);

	if (getDashboardDataLoading) {
		return <Loading isOpen={getDashboardDataLoading} />;
	}

	return (
		<div id='dashboard-container'>
			<div id='inbox-section' className='dashboard-section'>
				<h2 className='dasboard-section-header'>Inbox</h2>
				<div id='dashboard-section-scrollable-content'>
					{notifications.length ? (
						notifications.map((notification) => (
							<Notification key={notification.id} {...notification} />
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
					<Tooltip title='Add User'>
						<IconButton onClick={() => setShowAddUserForm(true)}>
							<Add />
						</IconButton>
					</Tooltip>
				</div>
				<div id='dashboard-section-scrollable-content'>
					{users.length ? (
						users.map((user) => (
							<User key={user.id} {...user} handleDelete={handleUserDelete} />
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
