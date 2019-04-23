javascript: (function () {
	// IE11の場合はPromiseオブジェクトが無い場合があるので読み込む
	if (window.Promise == undefined) {
		var agent = window.navigator.userAgent.toLowerCase();
		if (agent.indexOf('msie') > -1 || agent.indexOf('trident/7') > -1) {
			document.write('<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"><\/script>');
		}
	}

	// キャプチャ処理
	if (typeof doCap != "function") {
		function doCap() {
			if (!document.querySelector(selector)) {
				alert("その要素はありません")
			} else {
				html2canvas(document.querySelector(selector), {
					useCORS: true,
					backgroundColor: null
				}).then(function (canvas) {
					console.log("canvas.toDataURL() : \n" + canvas.toDataURL());
					document.body.appendChild(canvas);
				})
			}
		}
	}

	// セレクタ選択
	var selector = prompt("キャプチャしたい要素のセレクタを入力(未指定:html)");
	if (selector.length <= 0) {
		selector = "html"
	}
	console.log("selector : " + selector);

	if (typeof html2canvas == "function") {
		// html2canvas実行
		doCap()
	} else {
		// html2canvas読込
		var addScript = document.createElement("script");
		addScript.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
		document.querySelector("body").appendChild(addScript);
		var hoge = setInterval(function () {
			// html2canvasが読み込まれるまで待機
			if (typeof html2canvas == "function") {
				clearInterval(hoge);
				doCap()
			}
		}, 500)
	};
})();


/* 
コレをブックマークレットにしてください
javascript:(function(){if(window.Promise==undefined){var d=window.navigator.userAgent.toLowerCase();if(d.indexOf("msie")>-1||d.indexOf("trident/7")>-1){document.write('<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"><\/script>')}}if(typeof c!="function"){function c(){if(!document.querySelector(a)){alert("その要素はありません")}else{html2canvas(document.querySelector(a),{useCORS:true,backgroundColor:null}).then(function(f){console.log("canvas.toDataURL() : \n"+f.toDataURL());document.body.appendChild(f)})}}}var a=prompt("キャプチャしたい要素のセレクタを入力(未指定:html)");if(a.length<=0){a="html"}console.log("selector : "+a);if(typeof html2canvas=="function"){c()}else{var b=document.createElement("script");b.src="https://html2canvas.hertzen.com/dist/html2canvas.min.js";document.querySelector("body").appendChild(b);var e=setInterval(function(){if(typeof html2canvas=="function"){clearInterval(e);c()}},500)}})();
 */

