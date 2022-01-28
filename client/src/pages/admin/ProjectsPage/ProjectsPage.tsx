import React from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../../types";
import Header from "../../../components/Header/Header";

const ProjectsPage: React.FC = () => {
	const userState: UserState = useSelector((state: any) => state.userReducer);

	return (
		<div className='page-with-header' id='admin-projects-page'>
			<Header />
			<h1>PROJECTS PAGE</h1>
			<p>YAY</p>
			<p>{userState.userEmail}</p>
		</div>
	);
};

export default ProjectsPage;
