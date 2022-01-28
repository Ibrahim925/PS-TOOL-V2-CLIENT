import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../../types";
import Input from "../../../components/Form/Input";
import Header from "../../../components/Header/Header";

const ProjectsPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [projects, setProjects] = useState([]);

	const userState: UserState = useSelector((state: any) => state.userReducer);

	return (
		<div className='page-with-header' id='admin-projects-page'>
			<Header
				Middle={
					<Input
						id='projects-page-header-input'
						value={searchQuery}
						placeholder='Search'
						update={setSearchQuery}
					/>
				}
			/>
		</div>
	);
};

export default ProjectsPage;
