import React from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../../types";

const ProjectsPage: React.FC = () => {
	const userState: UserState = useSelector((state: any) => state.userReducer);

	console.log(userState);

	return (
		<div>
			<h1>PROJECTS PAGE</h1>
			<p>YAY</p>
			<p>{userState.userEmail}</p>
		</div>
	);
};

export default ProjectsPage;
