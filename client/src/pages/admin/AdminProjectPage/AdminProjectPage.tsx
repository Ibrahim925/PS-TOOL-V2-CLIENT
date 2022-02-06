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

const AdminProjectPage: React.FC = () => {
	const { page } = useParams();

	const [showConfigUploadDrawer, setShowConfigUploadDrawer] = useState(false);

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

			<Sidebar />
			<div id='projectPage' className='page-with-header page-with-sidebar'>
				<ConfigUploadDrawer
					isOpen={showConfigUploadDrawer}
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
