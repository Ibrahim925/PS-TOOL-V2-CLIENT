import React from "react";
import LogiSenseLogoLight from "../../assets/images/LogiSenseWhiteLogo.png";
import LogiSenseLogoDark from "../../assets/images/LogiSenseDarkLogo.png";

interface LogoProps {
	id: string;
	scale: number;
	dark?: boolean;
}

const Logo: React.FC<LogoProps> = (props) => {
	const { scale, dark, ...restProps } = props;

	const height = 50 * scale;
	const width = 40 * scale;

	return (
		<img
			src={dark ? LogiSenseLogoDark : LogiSenseLogoLight}
			alt='Logo'
			style={{
				height,
				width,
				padding: 5,
			}}
			{...restProps}
		/>
	);
};

export default Logo;
