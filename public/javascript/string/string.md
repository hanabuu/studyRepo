# 文字列操作

javascript内で扱う文字コードはUTF-16.
length等のカウントは日本語、英数字問わず１文字を１コードとして扱うので、「人間から見た文字数」となるとのこと

``` js
let str: string = "aiueoあいうえお"
console.log(str.length) // => 10
```

## 文字列分割
split(区切り文字／正規表現, 分割数)
``` js
let str: string = "あいうえお\nかきくけこ"
let ret: string[] = string.split(/\n/);  // SJISなら/\r\n/で分割する
console.log(ret);  // => ["あいうえお", "かきくけこ"]
```



## 切り出し
substring
``` js
let str: string = "あいうえお";
console.log(str.substring(0,3));
```

### SJISでバイト数で文字を切り出したい場合
SJISは全角と半角でバイト数が異なるため、以下の関数を使う

``` js
/**
 * SJIS文字列からバイト数分の文字列を切り出す
 * @param str 文字列
 * @param begin 開始バイト(0から数えたバイト数で)
 * @param byteNum 切り出すバイト数
 */
export const substr_b = (str: string, begin: number, byteNum: number): string => {
    let length: number = 0;
    let res: string = "";
    // let uArray: Uint8Array = Uint8Array.from(str);
    for(let i:number=0; i<str.length; i++){             // 文字数でループ
        let bytelen: number = str.charCodeAt(i);        // utf-16コードを取得
        if ( (bytelen >= 0x0 && bytelen < 0x81) || (bytelen === 0xf8f0) || 
            (bytelen >= 0xff61 && bytelen < 0xffa0) || (bytelen >= 0xf8f1 && bytelen < 0xf8f4) ) {                       // 半角
            length += 1;
        } else {                                        // 全角
            length += 2;
        }
        if((length == begin+1) && (byteNum == 1)){
            res += str[i];
            break;
        } else if((length > begin) && (length <= begin+byteNum)){
            res += str[i];
            if(length >= begin+byteNum) break;
        } else {
            ;
        }
    }
    return res;
}

```

## 参考
[JavaScriptでマルチバイト文字列のsubstringは問題なく動く](https://zenn.dev/leaner_dev/articles/20221014-javascript-unicode-substring)
[JavaScriptでバイト単位で文字列を切り取る方法](https://www.sukerou.com/2022/10/javascript.html)