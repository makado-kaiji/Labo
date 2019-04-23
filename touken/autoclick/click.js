var p = 0;	// ポイント指定中フラグ
var c = 0;	// クリック中フラグ
var x = 0;	// x座標
var y = 0;	// y座標

// jQuery読込
if (!window.jQuery) {
	var addScript = document.createElement("script");
	addScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";
	document.querySelector("body").appendChild(addScript);
}

// jQueryが読み込まれてからjQueryイベント定義実行
var hoge = setInterval(function () {
	if (window.jQuery) {
		clearInterval(hoge);
		
		// ----------------------------------------
		// Document Ready ここから
		// ----------------------------------------
		// iframeにz-indexを効かせるおまじない→はDMMエラー吐いたのでボツ
		/* 
		$('iframe#game_frame').attr('src',$(this).attr('src')+'?wmode=transparent');
		console.log("iframe#game_frameのsrc置換完了");
		 */
		// キーイベント
		$(window).keyup(function(e){
			switch (e.keyCode) {
				case 80:		// p
					// ポインタモード開始
					if (p==0) {
						p=1;
						$('#game_frame')[0].contentWindow.document;
						$("#flash").append("<div id='pointerArea' style='background-color:rgba(255,255,255,0);width:100vw;height:100vh;z-index:999999998;position:absolute;top:0px;left:0px;'></div>");
						$("#game_frame").on("mousemove", "#pointerArea", function(e){
								x = e.pageX;
								y = e.pageY;
								console.log(x + " , " + y);
						});
						console.log(new Date() + " : " + "ポインタモード開始");
					}
					break;
				case 83:		// s
					// 可視ポインタ追加
					$("#pointRed,#pointerArea").remove();
					$("#game_frame").append("<div id='pointRed' style='background-color:red;width:10px;height:10px;border-radius:50%;z-index:999999999;position:absolute;top:" + (y - 5) + "px;left:" + (x - 5) +"px;'></div>");
					// ポインタモード終了
					pointerModeEnd(true);
					break;
				case 46:		// delete
					// ポインタモード終了
					pointerModeEnd(true);
					break;
				case 13:		// enter
					// 5秒間隔で連続クリック開始
					break;
				case 27:	// esc
					break;
			}
		});
		// ----------------------------------------
		// Document Ready ここまで
		// ----------------------------------------
	}
}, 500);

// ポインタモード終了（座標クリアフラグ付き）
function pointerModeEnd(clearFlg) {
	if (p!=0) {
		p=0;
		$("#game_frame").off("mousemove", "#pointerArea");
		console.log(new Date() + " : " + "ポインタモード終了 : " + x + " , " + y);
	}
	if (clearFlg) {
		x=0,y=0;
	}
}
