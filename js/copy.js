function exec_copy(){
	const cpdiv = document.createElement('textarea');
	var copyString = document.title + "\n" + document.URL;
	cpdiv.textContent = copyString;
	document.body.appendChild(cpdiv);
	const userAgent = window.navigator.userAgent.toLowerCase();
	if (userAgent.indexOf('chrome') != -1) { cpdiv.select(); } else {
		const cprange = document.createRange();
		cprange.selectNode(cpdiv);
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(cprange);
	}
	var result = document.execCommand('copy');
	document.body.removeChild(cpdiv);
	console.log("copy: " + result);
	console.log(copyString);
}
