let flg: boolean = false;
let arr: number[] = [1,2,3,4];
let num: number = 0;

try {
    console.log(arr.length)
    if(arr.length == 5) throw "NG";    // throwで以降の処理は実行されない

    for(let i=0; i<arr.length; i++){
        num++;
        if(arr[i] == 1){
            console.log(arr[i]);
        } else if(arr[i] == 2){
            console.log(arr[i]);
        } else if(arr[i] == 3){
            throw "NG";              // throwで以降の処理は実行されない
            console.log(arr[i]);
        } else if(arr[i] == 4){
            console.log(arr[i]);
        } else {
            console.log(arr[i]);
        }
    }
    console.log(num)
//    if(flg){
//        console.log("aaa");
//    } else {
//        throw "NG";
//    }
} catch(e: unknown) {
    console.log(e);
} finally {
    console.log("final");
}