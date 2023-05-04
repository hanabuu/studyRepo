const promise1 = (count) => {
    return new Promise((resolve => {
        setTimeout( () => {
            resolve( "3秒経過" + count) ;
        }, 3000 ) ;
    }))
}

const promise2 = (count) => {
    return new Promise((resolve => {
        setTimeout( () => {
            resolve( "1秒経過"  + count) ;
        }, 1000 ) ;
    }))
}

const promise3 = (count) => {
    return new Promise((resolve => {
        setTimeout( () => {
            resolve( "2秒経過"  + count) ;
        }, 2000 ) ;
    }))
}

const promise11 = (count) => {
    return new Promise((resolve => {
        setTimeout( () => {
            resolve( "5秒経過" + count) ;
        }, 5000 ) ;
    }))
}

const main2 = async () => {
    const array = [1,2];
    for(let arr of array){
        console.log(await promise11(arr));
    }

}

const main = async () => {
    const results = [];
    const array = [1,2];
    
    for(let arr of array){
        results.push(promise1(arr));
        results.push(promise2(arr));
        results.push(promise3(arr));
    }
    
    await Promise.all(results).then(message => {
        console.log(message);
        main2();
    });
}

main();