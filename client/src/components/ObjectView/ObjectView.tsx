import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { IUser, LogiObject, Rules, URLS } from "../../types";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import UploadCSVInput from "../UploadCSVInput/UploadCSVInput";

interface ObjectViewProps {
	objects: LogiObject[];
	object: LogiObject;
}

const ObjectView: React.FC<ObjectViewProps> = (props) => {
	const { projectName } = useParams();
	const userState: IUser = useSelector((state: any) => state.userReducer);

	const [rules, setRules] = useState<Rules>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setLoading(true);
			// Get rules for object
			const getObjectRulesResponse = await request(
				"GET",
				URLS.Resource,
				`/rule/object/${projectName}/${props.object.objectName}`,
				{}
			);

			setRules(getObjectRulesResponse);
			setLoading(false);
		})();
	}, [props.object.objectName]);

	const handleCSVUpload = async (e: any) => {
		const file = e.target.files[0];
		// Handles no file uploaded (user clicked cancel)
		if (!file) return;

		// setCsvName(file.name);
		// setErrors([]);

		// Get csv as text from file
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = async (e: any) => {
			setLoading(true);

			const csvText = e.target.result;
			const uploadCSVResponse = await request(
				"POST",
				URLS.Validation,
				"/validate",
				{ projectName, objectName: props.object.objectName, csvText }
			);

			console.log(uploadCSVResponse);

			const blob = new Blob([uploadCSVResponse.csvText], {
				type: "text/csv",
			});
			const a = document.createElement("a");
			a.href = window.URL.createObjectURL(blob);
			a.download = "/TEST DOWNLOAD BABY";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			setLoading(false);
		};
	};

	if (loading) {
		return <Loading isOpen={loading} />;
	}

	return (
		<div id='object-view-container'>
			{userState.userType === "CUSTOMER" ? (
				<UploadCSVInput handleCSVUpload={handleCSVUpload} />
			) : null}
			<DataTable object={props.object} rules={rules} />
		</div>
	);
};

export default ObjectView;
