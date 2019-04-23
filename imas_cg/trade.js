javascript: 
var beforeMoney = document.querySelector(".yellow").innerHTML;
var afterMoney = beforeMoney.replace(/,/g, "");
document.querySelector("input[name='money_num']").value = afterMoney;
setTimeout(function(){document.querySelector("form[name='gotrade']").submit();},500);

// ルナスケでたまにミスってたのでsubmit実行遅延を追加＠2018/11/30

/*
javascript: var beforeMoney = document.querySelector(".yellow").innerHTML;var afterMoney = beforeMoney.replace(/,/g, "");document.querySelector("input[name='money_num']").value = afterMoney;setTimeout(function(){document.querySelector("form[name='gotrade']").submit();},500);
*/
