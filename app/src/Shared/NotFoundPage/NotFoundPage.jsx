import React from "react";
import PageNotFound from "../../images/PageNotFound.png";
import Header from "../../Header/Header";
import "./NotFoundPage.css";

export default function NotFoundPage() {
	return (
		<div id='notFoundPage' className='pageWithHeader'>
			<Header />
			<img id='notFoundPageImage' src={PageNotFound} alt='Page Not Found' />
		</div>
	);
}
