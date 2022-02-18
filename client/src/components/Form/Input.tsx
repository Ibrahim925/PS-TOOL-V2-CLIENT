import React, { useState, useEffect } from "react";
import { Errors, Error } from "../../types";
import "./Form.css";

interface InputProps {
	placeholder?: string;
	label?: string;
	id: string;
	location?: string;
	errors?: Errors | null;
	value: string;
	type?: React.HTMLInputTypeAttribute;
	update: (value: any) => void;
}

const Input: React.FC<InputProps> = (props) => {
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setError(null);
		if (props.errors) {
			for (let i = 0; i < props.errors.length; i++) {
				const error = props.errors[i];
				if (props.location === error.location) {
					setError(error);
				}
			}
		}
	}, [props.errors]);

	return (
		<div className='form-input-container' id={props.id}>
			{props.label && <p className='form-input-label'>{props.label}</p>}
			<input
				className='form-input'
				placeholder={props.placeholder ? props.placeholder : ""}
				onChange={(e) => props.update(e.target.value)}
				style={{
					border: error ? "1.5px solid red" : "",
				}}
				type={props.type || "text"}
				value={props.value}
			/>

			{error && (
				<p
					className='form-input-error-message'
					style={{ top: props.label ? 50 : 30 }}>
					{error.message}
				</p>
			)}
		</div>
	);
};
export default Input;
