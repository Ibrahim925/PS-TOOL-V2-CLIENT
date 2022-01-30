import React, { useState } from "react";
import { Delete, Mail } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { INotification, IUser } from "../../types";
import "./Dashboard.css";

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
const User: React.FC<IUser> = (props) => {
	const handleUserDelete = () => {
		// TODO: IMPLEMENT USER DELETION IN DASHBOARD COMPONENT
	};

	const handleUserEmail = () => {
		const emailLink = `https://mail.google.com/mail/?view=cm&source=mailto&to=${props.userEmail}`;
		console.log(emailLink);
		window.open(emailLink, "_blank");
	};

	return (
		<div id='user-container'>
			<p id='user-email'>{props.userEmail}</p>
			<div id='user-actions'>
				<Tooltip title='Delete'>
					<IconButton>
						<Delete />
					</IconButton>
				</Tooltip>
				<Tooltip title='Email' onClick={handleUserEmail}>
					<IconButton>
						<Mail />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
};

const Dashboard: React.FC = () => {
	const [notifications, setNotifications] = useState([]);
	const [users, setUsers] = useState<IUser[]>([
		{
			userEmail: "ikb1703@gmail.com",
			id: 4,
			userType: "ADMIN",
			userProject: null,
		},
	]);

	return (
		<div id='dashboard-container'>
			<div id='inbox-section' className='dashboard-section'>
				<h2 className='dasboard-section-header'>Inbox</h2>
				<div id='dashboard-section-scrollable-content'>
					{notifications.length ? (
						notifications.map((notification) => (
							<Notification {...notification} />
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
				<div id='dashboard-section-scrollable-content'>
					{users.length ? (
						users.map((user) => <User {...user} />)
					) : (
						<p id='dashboard-section-scrollable-content-empty'>No Users</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
