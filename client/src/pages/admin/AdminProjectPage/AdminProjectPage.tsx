import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import Dashboard from "../../../components/Dashboard/Dashboard";
// import ObjectView from "./ObjectView";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Button from "../../../components/Form/Button";
import { Add } from "@mui/icons-material";
import "./AdminProjectPage.css";
import ConfigUploadDrawer from "../../../components/ConfigUploadDrawer/ConfigUploadDrawer";
import { LogiObject } from "../../../types";

const AdminProjectPage: React.FC = () => {
	const { page } = useParams();

	const [showConfigUploadDrawer, setShowConfigUploadDrawer] = useState(false);
	const [objects, setObjects] = useState<LogiObject[]>([]);

	return (
		<div>
			<Header
				Right={
					<Button
						id='project-page-header-button'
						onClick={() => setShowConfigUploadDrawer(true)}
						icon={<Add />}>
						Add Rules
					</Button>
				}
			/>

			<Sidebar objects={objects} setObjects={setObjects} />
			<div id='projectPage' className='page-with-header page-with-sidebar'>
				<ConfigUploadDrawer
					isOpen={showConfigUploadDrawer}
					objects={objects}
					setObjects={setObjects}
					toggleOpen={setShowConfigUploadDrawer}
				/>

				{page === "Dashboard" ? (
					<Dashboard />
				) : (
					// <ObjectView accountType={accountType} page={page} />
					"OBJECT: " + page
				)}
			</div>
		</div>
	);
};

export default AdminProjectPage;
