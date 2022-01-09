import React from "react";
import "./Form.css";

export default function Input(props) {
	const { update, ...restProps } = props;

	return (
		<input
			id='formInput'
			onChange={(e) => update(e.target.value)}
			{...restProps}
		/>
	);
}
