import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { IUser, LogiObject, Rules, URLS } from "../../types";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import UploadCSVInput from "../UploadCSVInput/UploadCSVInput";
import downloadFile from "../../helpers/downloadFile";
import "./ObjectView.css";

interface ObjectViewProps {
	objects: LogiObject[];
	object: LogiObject;
}

const ObjectView: React.FC<ObjectViewProps> = (props) => {
	const { projectName } = useParams();
	const userState: IUser = useSelector((state: any) => state.userReducer);

	const [rules, setRules] = useState<Rules>([]);
	const [loading, setLoading] = useState(true);
	const [errorCount, setErrorCount] = useState(0);
	const [csvName, setCsvName] = useState("");
	const [outputCsvPath, setOutputCsvPath] = useState("");

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

		setCsvName(file.name);
		setErrorCount(0);

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

			downloadFile(uploadCSVResponse.csvText, uploadCSVResponse.path);

			setOutputCsvPath(uploadCSVResponse.path);
			setErrorCount(uploadCSVResponse.errorCount);
			setLoading(false);
		};
	};

	if (loading) {
		return <Loading isOpen={loading} />;
	}

	return (
		<div id='object-view-container'>
			{userState.userType === "CUSTOMER" ? (
				<UploadCSVInput handleCSVUpload={handleCSVUpload} csvName={csvName} />
			) : null}

			{errorCount ? (
				<h2 id='object-view-error-message'>
					The file had {errorCount > 1000000000 ? "1000000000+" : errorCount}{" "}
					error{errorCount > 1 ? "s" : ""}.<br />
					<span id='object-view-error-message-more'>
						You can view these errors in the downloaded CSV file:{" "}
						<span style={{ color: "black", fontFamily: "bold" }}>
							{outputCsvPath.split(".")[0]}
						</span>
					</span>
				</h2>
			) : (
				<DataTable object={props.object} rules={rules} />
			)}
		</div>
	);
};

export default ObjectView;
