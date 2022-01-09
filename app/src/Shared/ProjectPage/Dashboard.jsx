import React, { useState } from "react";
import "./ProjectPage.css";
import { Delete, Mail } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

function Notification({ notification }) {
	return (
		<div id='notificationContainer'>
			<p id='notificationTime'>
				{notification.notificationDate} - {notification.notificationTime}
			</p>
			<p id='notificationText'>{notification.notificationText}</p>
		</div>
	);
}

function User({ user }) {
	const handleUserDelete = () => {
		// TODO: IMPLEMENT USER DELETION IN DASHBOARD COMPONENT
	};

	const handleUserEmail = () => {
		const emailLink = `https://mail.google.com/mail/?view=cm&source=mailto&to=${user.userEmail}`;
		console.log(emailLink);
		window.open(emailLink, "_blank");
	};

	return (
		<div id='userContainer'>
			<p id='userEmail'>{user.userEmail}</p>
			<div id='userActions'>
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
}

export default function Dashboard() {
	const [notifications, setNotifications] = useState([]);
	const [users, setUsers] = useState([{ userEmail: "ikb1703@gmail.com" }]);

	return (
		<div id='dashboardContainer'>
			<div id='inboxSection' className='dashboardSection'>
				<h2 className='dasboardSectionHeader'>Inbox</h2>
				<div id='dashboardSectionScrollableContent'>
					{notifications.length ? (
						notifications.map((notification) => (
							<Notification notification={notification} />
						))
					) : (
						<p id='dashboardSectionScrollableContentEmpty'>No Notifications</p>
					)}
				</div>
			</div>
			<div id='usersSection' className='dashboardSection'>
				<h2 className='dasboardSectionHeader'>Users</h2>
				<div id='dashboardSectionScrollableContent'>
					{users.length ? (
						users.map((user) => <User user={user} />)
					) : (
						<p id='dashboardSectionScrollableContentEmpty'>No Users</p>
					)}
				</div>
			</div>
		</div>
	);
}
