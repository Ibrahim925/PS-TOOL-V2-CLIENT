import React from "react";
import "./Form.css";

export default function Input(props) {
	console.log(props);
	return <input className='formInput' {...props} />;
}
