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
// テキストボックス値の取得処理
// null・underfindの場合は0に変換して返却
// ----------------------------------------
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

// ----------------------------------------
// 日付フォーマット（2桁）
// ----------------------------------------
function format2d(str) {
	return ("0"+str).substr(-2);
}

// ----------------------------------------
// 現在時刻表示機能ここから
// ----------------------------------------
// 曜日リスト
var Week = new Array("日","月","火","水","木","金","土");

// 1秒間隔で現在時刻表示処理を行う
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
	var myMsg = NowYear + "/" + format2d(NowMon) + "/" + format2d(NowDay)
				+ "/("+Week[NowWeek]+") "
				+ format2d(NowHour) + ":" + format2d(NowMin) + ":" + format2d(NowSec);
	setInnerText("currentTime", myMsg);
}
// ----------------------------------------
// 現在時刻表示機能ここまで
// ----------------------------------------

// ----------------------------------------
// 時刻計算機能ここから
// ----------------------------------------
// 所要時間計算処理
function getFinishTime() {
	// 所要時間から変換
	var hour = getValue("hour");
	var min = getValue("min");
	if (hour + min > 0) {
		setEstimatedTime(hour, min);
		setTimerValue(hour, min);
	} else {
		setEstimatedTime(0, 0);
		setTimerValue(0, 0);
	}
}

// 完了予定時刻表示処理
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
		var myMsg = NowYear + "/" + format2d(NowMon) + "/" + format2d(NowDay)
					+ "/("+Week[NowWeek]+") "
					+ format2d(NowHour) + ":" + format2d(NowMin) + ":" + format2d(NowSec);
		setInnerText("estimatedTime", myMsg);
	}
}

// タイマー用表示処理
function setTimerValue (setHour, setMin) {
	document.getElementById("timer_hour").value = setHour;
	document.getElementById("timer_min").value = setMin;
	document.getElementById("timer_second").value = "0";
}
// ----------------------------------------
// 時刻計算機能ここまで
// ----------------------------------------

// ----------------------------------------
// タイマー機能ここから
// ----------------------------------------
var timer1;		//タイマーを格納する変数(タイマーID)
var setHour;		// セット時間
var setMin;		// セット分
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
// 強化判定処理ここから
// ----------------------------------------
// 初期処理：刀剣json読込
var toukenList = {};
$.getJSON("token.json", function(json){
	// リスト保持
	toukenList = json;

	// コンボボックスセット
	var sel = document.getElementById("selTouken");
	for (i = 0; i < toukenList.length; i++) {
		var opt = document.createElement("option"); 
		opt.setAttribute("value", toukenList[i].id);
		opt.innerHTML = toukenList[i].name;
		sel.appendChild(opt);
	}

	// IDセット
	document.getElementById("numID").value = sel.value;
});

// ID入力後イベント
function setID() {
	// コンボボックス選択
	document.getElementById("selTouken").value = getValue("numID");
}

// 刀剣コンボボックス　変更イベント
function selTouken() {
	// IDセット
	document.getElementById("numID").value = getValue("selTouken");
};

// 強化判定処理
function kyoukaHantei() {
	// ID
	var id = getValue("numID");
	// 特
	var toku = document.getElementById("chkToku").checked;

	// 刀剣リストから該当値を検索
	var status;
	for (i = 0; i < toukenList.length; i++) {
		if (toukenList[i].id == id) {
			if (toku) {
				status = toukenList[i].status_toku;
			} else {
				status = toukenList[i].status;
			}
			break;
		}
	}

	// 生存
	setInnerText("kkSeizon", status.seizon - getValue("numSeizon"));
	// 打撃
	setInnerText("kkDageki", status.dageki - getValue("numDageki"));
	// 統率
	setInnerText("kkTousotu", status.tousotu - getValue("numTousotu"));
	// 機動
	setInnerText("kkKidou", status.kidou - getValue("numKidou"));
	// 衝力
	setInnerText("kkSyouryoku", status.syouryoku - getValue("numSyouryoku"));
	// 必殺
	setInnerText("kkHissatu", status.hissatu - getValue("numHissatu"));
	// 偵察
	setInnerText("kkTeisatu", status.teisatu - getValue("numTeisatu"));
	// 隠蔽
	setInnerText("kkInpei", status.inpei - getValue("numInpei"));
}
// ----------------------------------------
// 強化判定処理ここまで
// ----------------------------------------

// ----------------------------------------
// 適正エリア検索処理ここから
// ----------------------------------------
// 初期処理：合戦場一覧読込
var fieldList;
$.getJSON("field.json", function(json){
	// リスト保持
	fieldList = json;
});

// 適正エリア判定
function getField() {
	// 合計Lv
	var sumLv = 0;	
	// 人数
	var cnt = 0;
	// 6マス合計を取得
	for (i = 1; i < 7; i++) {
		if (getValue("numMember" + i) > 0) {
			sumLv += getValue("numMember" + i);
			cnt += 1;
		}
	}
	// 平均値計算
	var avLv = sumLv / cnt;
	// 合戦場一覧から近似値を検索
	var dispField;
	for (i = fieldList.length - 1; i >= 0; i--) {
		if (avLv <= fieldList[i].lv) {
			dispField = fieldList[i];
		}
	}
	// 表示
	setInnerText("nowLv", "部隊平均レベル：" + avLv);
	setInnerText("field", "適正エリア　　：[" + dispField.id + "]" + dispField.memoryName + " " + dispField.fieldName + "(Lv" + dispField.lv + ")");
}
// ----------------------------------------
// 適正エリア検索処理ここまで
// ----------------------------------------

