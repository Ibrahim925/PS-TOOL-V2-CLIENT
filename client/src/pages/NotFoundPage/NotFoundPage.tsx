import React from "react";
import Header from "../../components/Header/Header";
import PageNotFound from "../../assets/images/PageNotFound.png";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
	return (
		<div className='page-with-header' id='not-found-page'>
			<Header />
			<img
				id='page-not-found-image'
				src={PageNotFound}
				alt='404 Page Not Found'
			/>
		</div>
	);
};

export default NotFoundPage;
