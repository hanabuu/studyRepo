let flg: boolean = true;

try {
    if(flg){
        console.log("aaa");
    } else {
        throw "NG";
    }
} catch(e: unknown) {
    console.log(e);
} finally {
    console.log("final");
}