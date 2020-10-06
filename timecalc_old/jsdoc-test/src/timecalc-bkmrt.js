javascript:
(() => {
  let baseTime = prompt("回復基準は？(デフォルト5)");
  if (baseTime.length <= 0) baseTime = 5;
  baseTime = Number(baseTime.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }));

  let targetValue = prompt('回復量は？(未入力の場合終了)');
  if (targetValue.length <= 0) return;
  targetValue = Number(targetValue.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }));

  const ret = targetValue * baseTime;
  const hour = Math.floor(ret / 60);
  const min = ret % 60;
  let setDate = new Date();
  setDate.setMinutes(setDate.getMinutes() + ret);

  const result = `回復到達時刻：${setDate.getFullYear()}/${setDate.getMonth().toString().padStart(2, '0')}/${setDate.getDate().toString().padStart(2, '0')}(${'日月火水木金土'[setDate.getDay()]}) ${setDate.getHours().toString().padStart(2, '0')}:${setDate.getMinutes().toString().padStart(2, '0')}:${setDate.getSeconds().toString().padStart(2, '0')}\nあと${hour > 0 ? ` ${hour}時間` : ''} ${min}分`;
  console.log(result);
  alert(result);
})();

// --------------------------------------------------
// 以下はただの参考資料
// --------------------------------------------------


dispResult(null, hour, min, setDate.getHours(), setDate.getMinutes());


// --------------------------------------------------
function calcFromKaihukuryo() {
  clearInterval(timer);
  var ret = Number($(".numTargetValue").val()) * baseTime;
  var hour = Math.floor(ret / 60);
  var min = ret % 60;
  var setDate = new Date();
  setDate.setMinutes(setDate.getMinutes() + ret);
  dispResult(null, hour, min, setDate.getHours(), setDate.getMinutes());
  // タイマー準備
  timerSet = (hour * 60 + min) * 60;
  dispTimer();
}

// 計算結果表示
function dispResult(ret, hour, min, addHour, addMin) {
  // 回復量
  if (ret != null) $(".numTargetValue").val(ret);

  // 所要時間
  if (hour != null) $(".numRequiredTime.hour").val(hour);
  if (min != null) $(".numRequiredTime.min").val(min);

  // 到達時刻
  if (addHour != null) $(".numTargetTime.hour").val(addHour);
  if (addMin != null) $(".numTargetTime.min").val(addMin);
}

// --------------------------------------------------
javascript: (function () {
  if (window.Promise == undefined) {
    var d = window.navigator.userAgent.toLowerCase();
    if (d.indexOf("msie") > -1 || d.indexOf("trident/7") > -1) {
      document.write('<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"><\/script>')
    }
  }
  if (typeof c != "function") {
    function c() {
      if (!document.querySelector(a)) {
        alert("その要素はありません")
      } else {
        html2canvas(document.querySelector(a), {
          useCORS: true,
          backgroundColor: null
        }).then(function (f) {
          console.log("canvas.toDataURL() : \n" + f.toDataURL());
          document.body.appendChild(f)
        })
      }
    }
  }
  var a = prompt("キャプチャしたい要素のセレクタを入力(未指定:html)");
  if (a.length <= 0) {
    a = "html"
  }
  console.log("selector : " + a);
  if (typeof html2canvas == "function") {
    c()
  } else {
    var b = document.createElement("script");
    b.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    document.querySelector("body").appendChild(b);
    var e = setInterval(function () {
      if (typeof html2canvas == "function") {
        clearInterval(e);
        c()
      }
    }, 500)
  }
})();