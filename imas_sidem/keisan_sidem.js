// ----------------------------------------
// innerText挿入処理
// ----------------------------------------
function setInnerText(strId, strMsg) {
	if (document.getElementById(strId).textContent != "undefined") {
		document.getElementById(strId).textContent = strMsg;
	} else {
		document.getElementById(strId).innerText = strMsg;
	}
}

// ----------------------------------------
// 変換機能ここから
// ----------------------------------------
// 各種変換処理
function change(flg) {
	switch (flg) {
		// 体力から変換
		case 0:
			var sta = getValue("stamina_now");
			var sta_m = getValue("stamina_max");
			if (sta > 0) {
				var min = sta_m - sta;
				var setMin = min % 60;
				document.getElementById("appeal_now").value = min;
				document.getElementById("min").value = setMin;
				document.getElementById("hour").value = (min - setMin) / 60;
				changeText("　");
				setEstimatedTime((min - setMin) / 60, setMin);
				setTimerValue((min - setMin) / 60, setMin);
			} else {
				changeText("体力が0です");
				setEstimatedTime(0, 0);
				setTimerValue(0, 0);
			}
		break;

		// アピール力から変換
		case 1:
			var appeal = getValue("appeal_now");
			var appeal_m = getValue("appeal_max");
			var minOnly = appeal_m - appeal;
			if (appeal > 0) {
				var setMin = minOnly % 60;
				document.getElementById("stamina_now").value = minOnly;
				document.getElementById("min").value = setMin;
				document.getElementById("hour").value = (minOnly - setMin) / 60;
				changeText("　");
				setEstimatedTime((minOnly - setMin) / 60, setMin);
				setTimerValue((minOnly - setMin) / 60, setMin);
			} else {
				changeText("アピール力が0です");
				setEstimatedTime(0, 0);
				setTimerValue(0, 0);
			}
		break;

		// 到達時刻から変換
		case 2:
			var l_hour = getValue("limit_hour");
			var l_min = getValue("limit_min");
			if (l_hour + l_min > 0) {
				// 到達時刻を分のみに変換
				var l_minOnly = l_hour * 60 + l_min;

				// 現在時刻を分のみに変換
				var nowYmdhms　=　new Date();
				var nowHour = nowYmdhms.getHours();
				var nowMin = nowYmdhms.getMinutes();
				var n_minOnly = nowHour * 60 + nowMin;

				// 所要時間（分のみ）
				var minOnly = l_minOnly - n_minOnly;

				// 表示
				document.getElementById("stamina_now").value = minOnly;
				document.getElementById("appeal_now").value = minOnly;
				var setMin = minOnly % 60;
				document.getElementById("min").value = setMin;
				document.getElementById("hour").value = (minOnly - setMin) / 60;
				changeText("　");
				setEstimatedTime((minOnly - setMin) / 60, setMin);
				setTimerValue((minOnly - setMin) / 60, setMin);
			} else {
				changeText("到達時刻が0です");
				setEstimatedTime(0, 0);
				setTimerValue(0, 0);
			}
		break;

		// 所要時間から変換
		case 3:
			var hour = getValue("hour");
			var min = getValue("min");
			if (hour + min > 0) {
				document.getElementById("stamina_now").value = hour * 60 + min;
				document.getElementById("appeal_now").value = hour * 60 + min;
				changeText("　");
				setEstimatedTime(hour, min);
				setTimerValue(hour, min);
			} else {
				changeText("所要時間が0です");
				setEstimatedTime(0, 0);
				setTimerValue(0, 0);
			}
		break;

		// 上記以外は何もしない
		default:
		break;
	}
}

// テキストボックス値の取得処理
// null・underfindの場合は0に変換して返却
function getValue(valueName) {
	var ret = 0;
	var getVal = document.getElementById(valueName).value;
	if (getVal) {
		ret = parseInt(getVal);
	} else {
		// 何もしない
	}
	return (ret);
}

// エラーメッセージ更新処理
function changeText(text) {
	setInnerText("errMessage", text);
}

// 回復予定時刻表示処理
function setEstimatedTime(addHour, addMin){
	if (addHour == 0 && addMin == 0) {
		// セットする値が無い場合
		setInnerText("estimatedTime", "");
	} else {
		// セットする値がある場合
		// 現在時刻
		var Nowymdhms　=　new Date();

		// 加算用時刻(ミリ秒)
		var addMiliSecond = parseInt(addHour) * 3600000 + parseInt(addMin) * 60000;

		// 加算
		var a = Nowymdhms.getTime();
		var b = a + addMiliSecond;
		Nowymdhms.setTime(b)

		// 回復予定時刻表示
		var NowYear = Nowymdhms.getFullYear();
		var NowMon = Nowymdhms.getMonth() + 1;
		var NowDay = Nowymdhms.getDate();
		var NowWeek = Nowymdhms.getDay();
		var NowHour = Nowymdhms.getHours();
		var NowMin = Nowymdhms.getMinutes();
		var NowSec = Nowymdhms.getSeconds();
		var Week = new Array("日","月","火","水","木","金","土");			
		var myMsg = NowYear+"/"+NowMon+"/"+NowDay+"/("+Week[NowWeek]+") "+NowHour+":"+NowMin+":"+NowSec;
		setInnerText("estimatedTime", myMsg);

		// 到達時刻表示
		document.getElementById("limit_hour").value = NowHour;
		document.getElementById("limit_min").value = NowMin;
	}
}

// タイマー用表示処理
function setTimerValue (setHour, setMin) {
	document.getElementById("timer_hour").value = setHour;
	document.getElementById("timer_min").value = setMin;
	document.getElementById("timer_second").value = "0";
}
// ----------------------------------------
// 変換機能ここまで
// ----------------------------------------

// ----------------------------------------
// 現在時刻表示機能ここから
// ----------------------------------------
setInterval("myTimeprev()",1000);
function myTimeprev(){
	var Nowymdhms　=　new Date();
	var NowYear = Nowymdhms.getFullYear();
	var NowMon = Nowymdhms.getMonth() + 1;
	var NowDay = Nowymdhms.getDate();
	var NowWeek = Nowymdhms.getDay();
	var NowHour = Nowymdhms.getHours();
	var NowMin = Nowymdhms.getMinutes();
	var NowSec = Nowymdhms.getSeconds();
	var Week = new Array("日","月","火","水","木","金","土");
	var myMsg = NowYear+"/"+NowMon+"/"+NowDay+"/("+Week[NowWeek]+") "+NowHour+":"+NowMin+":"+NowSec;
	setInnerText("currentTime", myMsg);
}
// ----------------------------------------
// 現在時刻表示機能ここまで
// ----------------------------------------

// ----------------------------------------
// タイマー機能ここから
// ----------------------------------------
var timer1;	//タイマーを格納する変数(タイマーID)
var setHour;	// セット時間
var setMin;	// セット分
var setSecond;	// セット秒

//カウントダウン関数を1000ミリ秒毎に呼び出す関数
function cntStart() {
	document.timer.elements[3].disabled=true;
	document.timer.elements[5].disabled=true;
	setHour = document.timer.elements[0].value;
	if (setHour == "") setHour = 0;
	setMin=document.timer.elements[1].value;
	if (setMin == "") setMin = 0;
	setSecond = document.timer.elements[2].value;
	if (setSecond == "") setSecond = 0;
	timer1=setInterval("countDown()",1000);
}

//タイマー停止関数
function cntStop() {
	document.timer.elements[3].disabled=false;
	document.timer.elements[5].disabled=false;
	clearInterval(timer1);
}

//カウントダウン関数
function countDown() {
	var hour=document.timer.elements[0].value;
  			if (hour=="") hour=0;
	hour=parseInt(hour);
	var min=document.timer.elements[1].value;
	if (min=="") min=0;
	min=parseInt(min);
	var sec=document.timer.elements[2].value;
	if (sec=="") sec=0;
	sec=parseInt(sec);

	if(hour + min + sec < 1) {
		reSet();
	} else {
		tmWrite((hour*3600+min*60+sec-1)*1000);
	}
}

//残り時間を書き出す関数
function tmWrite(int) {
	int=parseInt(int);
	if (int<=0) {
		reSet();
		alert(setHour + "時間" + setMin + "分" + setSecond + "秒経過しました！");
		setHour = "";
		setMin="";
		setSecond = "";
	} else {
		var myNextHour = Math.floor ( int / (1000*60*60) );	// '時' を計算
		int -= ( myNextHour * (1000*60*60) );				// 経過秒から '時' を引く
		var myNextMin = Math.floor ( int / (1000*60) );		// '分' を計算
		int -= ( myNextMin * (1000*60) );					// 経過秒から '分' を引く
		var myNextSec = Math.floor ( int / 1000 );			// '秒' を計算
		
		document.timer.elements[0].value = myNextHour;
		document.timer.elements[1].value = myNextMin;
		document.timer.elements[2].value = myNextSec;
	}
}

//フォームを初期状態に戻す（リセット）関数
function reSet() {
	document.timer.elements[0].value="0";
	document.timer.elements[1].value="0";
	document.timer.elements[2].value="0";
	document.timer.elements[3].disabled=false;
	document.timer.elements[5].disabled=false;
	clearInterval(timer1);
}
// ----------------------------------------
// タイマー機能ここまで
// ----------------------------------------

// ----------------------------------------
// MMM予想値計算ここから
// ----------------------------------------
//メイン処理
function MMMkeisan() {
	//レアリティ
	var rare = getValue("q1");
	//編成値
	var cost = getValue("cost");
	
	//ボーカル
	var vocal = getValue("vocal");		//入力値
	var MMM_Vo = MMM_child(rare, vocal);	//計算値
	setInnerText("MMM_Vo", MMM_Vo);
	setInnerText("Kosuhi_Vo", Math.ceil(MMM_Vo / cost));
	
	//ダンス
	var dance = getValue("dance");		//入力値
	var MMM_Da = MMM_child(rare, dance);	//計算値
	setInnerText("MMM_Da", MMM_Da);
	setInnerText("Kosuhi_Da", Math.ceil(MMM_Da / cost));
	
	//ヴィジュアル
	var visual = getValue("visual");		//入力値
	var MMM_Vi = MMM_child(rare, visual);	//計算値
	setInnerText("MMM_Vi", MMM_Vi);
	setInnerText("Kosuhi_Vi", Math.ceil(MMM_Vi / cost));
}

//サブ処理
function MMM_child(rare, getVal) {
	//返却値
	var ret = 0;

	//参考： http://imas-cg.net/archives/40367065.html
	//LvMax係数：N=3, R=8/3, SR=2.5, N+=3.5, R+=29/9, SR+=2.7
	//チェンジ係数：N=1.4, R=1.45, SR=1.5
	var cng = 0;
	if (rare == 0) {
		cng = 1.45;	//R
	} else {
		cng = 1.5;	//SR
	}

	//チェンジ後LvMAXステ
	var palam = parseInt(getVal);

	if (palam > 0) {
		//チェンジ前LvMAXステ
		var r1 = Math.floor(palam / cng) / 10;
		r1 = Math.round(r1) * 10;
		
		//(チェンジ後LvMaxステ+チェンジ前MMステ*0.2)*1.1 = MMMステ
		ret = (palam + r1 * 1.1 * 0.2) * 1.1;
		ret = Math.floor(ret);
	}
	
	return ret;
}
// ----------------------------------------
// MMM予想値計算ここまで
// ----------------------------------------

// ----------------------------------------
// レベルアップ計算ここから
// ----------------------------------------
function levelUp() {
	//現在の経験値
	var keiken_now = getValue("keiken_now");

	//必要経験値
	var keiken_max = getValue("keiken_max");

	//経験値表示
	setInnerText("dispKeiken", keiken_max - keiken_now);

	//お仕事表示
	setInnerText("dispJob", (keiken_max - keiken_now) / 2);
}
// ----------------------------------------
// レベルアップ計算ここまで
// ----------------------------------------






