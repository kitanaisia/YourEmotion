// // ファイル選択後に実行される
// function dochange(event) {
//     var file = event.target.files[0];   // select only 1 file.
//     if (file) {
//         readfile(file);
//     }
// }
// 
// function readfile(file) {
//     var reader = new FileReader();
// 
//     // ロード完了時，エラー時のイベントリスナーの設定
//     reader.addEventListener('load', onLoaded);
//     reader.addEventListener('error', onError);
// 
//     // 実際に読み込み開始．読み込み後，loadイベント発生
//     reader.readAsText(file,"utf-8");
// }
// 
// function onLoaded(event) {
//     var str = event.target.result;
//     console.log("text has read.");
// 
//     // JSON解析
//     var json = JSON.parse(str);
//     var like = Number(json.likedislike);
//     var joy = Number(json.joysad);
//     var anger = Number(json.angerfear);
//     var result_str = emotion(like, joy, anger);
//     var analyzed = decodeURI(json.analyzed_text);
//     document.getElementById("result").innerHTML = analyzed;
//     document.getElementById("result").innerHTML += "<br>";
//     document.getElementById("result").innerHTML += result_str;
//     
// }
// 
// function emotion(like, joy, anger) {
//     // 最も強い感情を見つける
//     // TODO:強い感情が負の値の場合にどうしようもなくなるから直す
//     var arr = [Math.abs(like), Math.abs(joy), Math.abs(anger)];
//     var max = Math.max.apply(null, arr);
//     var max_index = arr.indexOf(max);
//     
//     var isPositiveNum = function(x) {return x > 0; };
// 
//     // 感情毎に表示する文を設定する
//     var result_str = "";
//     // 好ましい
//     if ( max_index == 0 && isPositiveNum(arr[max_index]) ) {
//         result_str = "良いことがあったようです．";
//     }
//     // 嫌い
//     if ( max_index == 0 && !isPositiveNum(arr[max_index]) ) {
//         result_str = "嫌なことがあったようです．";
//     }
//     // 嬉しい
//     if ( max_index == 1 && isPositiveNum(arr[max_index]) ) {
//         result_str = "舞い上がっているようです．";
//     }
//     // 悲しい
//     if ( max_index == 1 && !isPositiveNum(arr[max_index]) ) {
//         result_str = "落ち込んでいるようです．";
//     }
//     // 怒り
//     if ( max_index == 2 && isPositiveNum(arr[max_index]) ) {
//         result_str = "激おこのようです．";
//     }
//     // 恐れ
//     if ( max_index == 2 && !isPositiveNum(arr[max_index]) ) {
//         result_str = "怖がっているようです．";
//     }
// 
//     return result_str;
// }   
// 
// function onError(event) {
//     if (event.target.error.code == event.target.error.NOT_READABLE_ERR) {
//         alert("ファイルの読み込みに失敗しました！");
//     } else {
//         alert("エラーが発生しました。" + event.target.error.code);
//     }
// }
// 

function loadText(){
    var text = document.getElementById("input").value;
    var enc_text = encodeURI(text);
    var requestURL = "http://ap.mextractr.net/emotion_measure?out=json&apikey=E794CDE21BD6F7118953A9BE7571B4817D5A0552&text=" + enc_text;    // ロード完了イベント
    $.ajax({
        url: requestURL,
        type: 'GET',
        cache: false, // キャッシュOFF

    // データのロード完了時の処理
    success: function(res) {
        content = $(res.responseText).text();
        console.log(content);
        var json = JSON.parse(content);
        dec_content = decodeURI(json.analyzed_text)
        document.getElementById("result").innerHTML = dec_content;
    }
    });
}

