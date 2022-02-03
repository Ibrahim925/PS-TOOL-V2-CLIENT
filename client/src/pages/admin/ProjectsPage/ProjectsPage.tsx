import React, { useEffect, useState } from "react";
import Input from "../../../components/Form/Input";
import Header from "../../../components/Header/Header";
import Button from "../../../components/Form/Button";
import Select from "../../../components/Form/Select";
import PopupMenu from "../../../components/Form/PopupMenu";
import Logo from "../../../components/Logo/Logo";
import { Add } from "@mui/icons-material";
import Loading from "../../../components/Loading/Loading";
import { CircularProgress, Grid, Box, Paper, styled } from "@mui/material";
import "./ProjectsPage.css";
import { Errors, URLS, IProject } from "../../../types";
import { request } from "../../../helpers/request";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: 5,
	textAlign: "center",
	height: 150,
	backgroundColor: "var(--foreground)",
	borderRadius: 15,
	position: "relative",
	fontSize: 30,
	lineHeight: 5,
	cursor: "pointer",
	boxShadow: "var(--shadow)",
	transition: "0.5s ease",
	overflow: "clip",
	"&:hover": {
		transform: "scale(1.03)",
	},
}));

const Project: React.FC<IProject> = (props) => {
	const navigate = useNavigate();

	const handleProjectClick = () => {
		navigate(`/Admin/Projects/${props.projectName}/Dashboard`);
	};
	return <Item onClick={handleProjectClick}>{props.projectName}</Item>;
};

const ProjectsPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [showAddProjectForm, setShowAddProjectForm] = useState(false);
	const [projects, setProjects] = useState<IProject[]>([]);
	const [projectName, setProjectName] = useState("");
	const [projectVersion, setProjectVersion] = useState("");
	const [createProjectLoading, setCreateProjectLoading] = useState(false);
	const [getProjectsLoading, setGetProjectsLoading] = useState(true);
	const [errors, setErrors] = useState<Errors>([]);

	const handlePopupClose = () => {
		setShowAddProjectForm(false);
		setProjectName("");
		setProjectVersion("");
		setErrors([]);
	};

	const handleProjectAdd = async () => {
		setCreateProjectLoading(true);
		setErrors([]);

		const projectAddResponse = await request(
			"POST",
			URLS.Resource,
			"/project",
			{
				projectName,
				projectVersion,
			}
		);

		if (Array.isArray(projectAddResponse)) {
			setCreateProjectLoading(false);
			return setErrors(projectAddResponse);
		}

		setProjects([...projects, projectAddResponse]);
		setCreateProjectLoading(false);
		setShowAddProjectForm(false);
	};

	useEffect(() => {
		// Get all projects from database
		(async () => {
			const getProjectsResponse = await request(
				"GET",
				URLS.Resource,
				"/project",
				{}
			);

			if (!getProjectsResponse.length) {
				setGetProjectsLoading(false);
				setProjects([]);
				return;
			}

			setProjects(getProjectsResponse);
			setGetProjectsLoading(false);
		})();
	}, []);

	if (getProjectsLoading) {
		return <Loading isOpen={getProjectsLoading} />;
	}

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
				onClose={handlePopupClose}
				header=''
				style={{ height: 450, width: 400, minWidth: 400 }}>
				<div id='projects-page-pop-up-form'>
					<Logo id='projects-page-popup-logo' scale={1.2} dark />
					<Input
						id='projects-page-popup-input'
						placeholder='Project Name'
						value={projectName}
						update={setProjectName}
						errors={errors}
						location='projectNameInput'
					/>
					<Select
						id='projects-page-popup-select'
						options={["V9", "V10"]}
						update={setProjectVersion}
						placeholder='Version'
						errors={errors}
						location='projectVersionSelect'
					/>
					<Button id='projects-page-popup-button' onClick={handleProjectAdd}>
						Create
					</Button>
					{createProjectLoading && (
						<CircularProgress
							style={{ color: "black", marginTop: 40 }}
							size={30}
						/>
					)}
				</div>
			</PopupMenu>

			<div id='projects-container'>
				{projects.length ? (
					<Box sx={{ flexGrow: 1 }}>
						<Grid container spacing={6}>
							{projects.map((project, key) =>
								project.projectName
									.toLowerCase()
									.includes(searchQuery.toLowerCase()) ? (
									<Grid item xs={5} md={3} key={key}>
										<Project {...project} key={key} />
									</Grid>
								) : null
							)}
						</Grid>
					</Box>
				) : (
					<h3 id='no-projects-message'>No projects... Make one!</h3>
				)}
			</div>
		</div>
	);
};

export default ProjectsPage;
