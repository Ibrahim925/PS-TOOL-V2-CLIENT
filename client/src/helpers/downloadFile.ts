const downloadFile = (csvText: string, path: string) => {
	const blob = new Blob([csvText], {
		type: "text/csv",
	});

	const a = document.createElement("a");
	a.href = window.URL.createObjectURL(blob);
	a.download = path;
	a.target = "_blank";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};

export default downloadFile;
