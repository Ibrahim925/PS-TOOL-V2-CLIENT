import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { LogiObject, Rules, URLS } from "../../types";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable/DataTable";

interface ObjectViewProps {
	objects: LogiObject[];
	object: LogiObject;
}

const ObjectView: React.FC<ObjectViewProps> = (props) => {
	const { projectName } = useParams();

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

	if (loading) {
		return <Loading isOpen={loading} />;
	}

	return (
		<div id='object-view-container'>
			<DataTable object={props.object} rules={rules} />
		</div>
	);
};

export default ObjectView;
