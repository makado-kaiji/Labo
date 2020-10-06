// ※クラス内関数はアロー関数が使えないので旧形式で書く

/**
 * 共通クラス
 * @classdesc 共通処理格納用クラス
 */
export class Common {
  /**
  * 【日付変換】
  *
  * Date型を受け取った場合はその値で、
  * 受け取らなかったら呼び出された時点の日時を
  * [YYYY/MM/DD(d) HH:mm:ss]形式で返却する。
  *
  * @param {Date} d 変換したい日付
  * @default  現在日時
  * @returns {string} [YYYY/MM/DD(d) HH:mm:ss] 形式文字列
  */
  FormatDate (d = new Date()) {
    return `${d.getFullYear()}/${d.getMonth().toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}(${'日月火水木金土'[d.getDay()]}) ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  }

  /**
  * 【全角数字変換】
  *
  * {@link https://qiita.com/yamikoo@github/items/5dbcc77b267a549bdbae JavaScriptで英数を全角/半角に変換する方法 - Qiita}
  *
  * @param {string} str 全角数字
  * @returns {number} 数値型(変換不可能だった場合はログ出力&null返却)
  */
  ConvertFullToHalf (str) {
    str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    return parseInt(str, 10) ? Number(str) : null;
  }

  /**
   * 左ゼロパディング
   * @param {string} str ゼロ詰め対象文字列
   * @param {number} dgt 桁数
   * @returns {string} 例：123→0000123
   */
  ZeroPadStart (str, dgt) {
    str.padStart(dgt, '0');
  }

  /**
   * 右ゼロパディング
   * @param {string} str ゼロ詰め対象文字列
   * @param {number} dgt 桁数
   * @returns {string} 例：123→1230000
   */
  ZeroPadEnd (str, dgt) {
    str.padEnd(dgt, '0');
  }

  /** 
   * バックスラッシュ(忘れた時用)
   * 
   * macはoptionキーを押しながら¥マークキーするんだぞ…
   * 
   */
  BackSlash = () => "\n";
}
