	$.ajax({
		type: "GET",
		url: "https://dl.dropboxusercontent.com/u/15532246/enable/menu.html",
		dataType: "html",
		success: function(data) {
			// 画面の先頭にメニューを挿入
			$("body").prepend(data);
			// 初期表示でメニューが展開されないよう、一度クリックしておく
			//$(".toggle").click();
		}
	});
