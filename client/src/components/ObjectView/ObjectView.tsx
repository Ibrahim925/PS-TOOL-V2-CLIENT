import React from "react";
import { LogiObject } from "../../types";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

interface ObjectViewProps {
	objects: LogiObject[];
	object?: string;
}

const ObjectView: React.FC<ObjectViewProps> = (props) => {
	return (
		<div
			// className='page-with-header page-with-sidebar'
			id='object-view-container'></div>
	);
};

export default ObjectView;
