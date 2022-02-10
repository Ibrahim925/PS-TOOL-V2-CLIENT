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

	const handleCSVUpload = async () => {};

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
