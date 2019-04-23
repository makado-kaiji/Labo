/*
	■jsshell
		http://hugoware.net/projects/jsshell/commands
		一覧確認　：js.custom.list()
		作成・編集：js.custom.edit("pixiv")
		削除　　　：js.custom.remove("pixiv")
*/

// Document Ready
$(function(){

	// 初期表示：10点選択状態にする
	alwaysRate10();

	// 評価エリア
	$(".rating .star")
	.on("mouseover", function () {
		// [イベント]マウスオーバー
		alwaysRate10();
	})
	.on("mousemove", function () {
		// [イベント]マウス移動
		alwaysRate10();
	});

	console.log(new Date() + "enablePixiv.js読込完了");
});

// 常に10点しか送信出来ないようにする
function alwaysRate10 () {
	console.log("変更前：" + $(this).parent().attr("class"));
	$(".star").parent().attr("class", "rating rate-10");
}
