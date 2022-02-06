import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Dashboard from "../../../components/Dashboard/Dashboard";
import ObjectView from "../../../components/ObjectView/ObjectView";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import Button from "../../../components/Form/Button";
import { Add } from "@mui/icons-material";
import "./AdminProjectPage.css";
import ConfigUploadDrawer from "../../../components/ConfigUploadDrawer/ConfigUploadDrawer";
import { LogiObject, URLS } from "../../../types";
import NotFoundPage from "../../NotFoundPage/NotFoundPage";
import { request } from "../../../helpers/request";

const AdminProjectPage: React.FC = () => {
	const { page, projectName } = useParams();

	const [showConfigUploadDrawer, setShowConfigUploadDrawer] = useState(false);
	const [objects, setObjects] = useState<LogiObject[]>([]);

	useEffect(() => {
		(async () => {
			const getObjectsResponse: LogiObject[] = await request(
				"GET",
				URLS.Resource,
				`/rule/object/${projectName}`,
				{}
			);

			setObjects(getObjectsResponse);
		})();
	}, []);

	return page &&
		!objects.map((object) => object.objectName).includes(page) &&
		page !== "Dashboard" ? (
		<NotFoundPage />
	) : (
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

			<Sidebar objects={objects} />
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
					<ObjectView objects={objects} object={page} />
				)}
			</div>
		</div>
	);
};

export default AdminProjectPage;
