import React, { useState } from "react";
import Input from "../../../components/Form/Input";
import Header from "../../../components/Header/Header";
import Button from "../../../components/Form/Button";
import PopupMenu from "../../../components/Form/PopupMenu";
import { Add } from "@mui/icons-material";

const ProjectsPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showAddProjectForm, setShowAddProjectForm] = useState(false);
	const [projects, setProjects] = useState([]);
	const [users, setUsers] = useState("");
	// TODO: GIVE USER THE ABILITY TO CREATE PROJECTS AND VIEW THEM

	const handleProjectAdd = async () => {};

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
				Right={
					<Button
						id='projects-page-header-button'
						onClick={() => setShowAddProjectForm(true)}
						icon={<Add />}>
						Add Project
					</Button>
				}
			/>

			<PopupMenu
				open={showAddProjectForm}
				onClose={() => setShowAddProjectForm(false)}
				header='Add Project'
				style={{ height: 400 }}>
				<Input
					id='projects-page-add-project-input'
					placeholder='Users'
					value={users}
					update={setUsers}
				/>
			</PopupMenu>
		</div>
	);
};

export default ProjectsPage;
