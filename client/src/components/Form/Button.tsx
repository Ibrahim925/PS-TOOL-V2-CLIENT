import React from "react";
import "./Form.css";

const Button: React.FC = (props) => {
	return <button className='form-button'>{props.children}</button>;
};

export default Button;
