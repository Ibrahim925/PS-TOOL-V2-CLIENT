import React from "react";
import "./Form.css";

export default function Button(props) {
	const { children, ...restProps } = props;

	return (
		<button className='formButton' {...restProps}>
			{children}
		</button>
	);
}
