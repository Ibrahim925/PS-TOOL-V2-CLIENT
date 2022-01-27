import React, { useState, useEffect } from "react";
import { Errors, Error } from "../../types";
import "./Form.css";

interface InputProps {
	placeholder: string;
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
		<div className='form-input-container'>
			<input
				className='form-input'
				id={props.id}
				onChange={(e) => props.update(e.target.value)}
				placeholder={props.placeholder}
				style={error ? { border: "1.5px solid red" } : {}}
				type={props.type || "text"}
				value={props.value}
			/>

			{error && <p className='form-input-error-message'>{error.message}</p>}
		</div>
	);
};
export default Input;
